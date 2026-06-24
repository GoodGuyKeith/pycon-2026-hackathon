#!/usr/bin/env python3
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import re
import sys
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent
MAX_IMPORT_BYTES = 600_000


class TextExtractor(HTMLParser):
  def __init__(self):
    super().__init__()
    self.parts = []
    self.skip_depth = 0

  def handle_starttag(self, tag, attrs):
    if tag in ("script", "style", "noscript", "svg"):
      self.skip_depth += 1
    if tag in ("br", "p", "div", "li", "tr", "section", "article", "h1", "h2", "h3", "td", "th"):
      self.parts.append("\n")

  def handle_endtag(self, tag):
    if tag in ("script", "style", "noscript", "svg") and self.skip_depth:
      self.skip_depth -= 1
    if tag in ("p", "div", "li", "tr", "section", "article"):
      self.parts.append("\n")

  def handle_data(self, data):
    if self.skip_depth:
      return
    text = " ".join(data.split())
    if text:
      self.parts.append(text)

  def text(self):
    raw = " ".join(self.parts)
    raw = re.sub(r"\s*\n\s*", "\n", raw)
    raw = re.sub(r"[ \t]{2,}", " ", raw)
    return "\n".join(line.strip() for line in raw.splitlines() if line.strip())


def event_name_from_url(url):
  host = urlparse(url).hostname or "Imported event"
  host = host.removeprefix("www.")
  label = host.split(".")[0].replace("-", " ").replace("_", " ")
  return " ".join(part.capitalize() for part in label.split()) or "Imported event"


def fetch_event_page(url):
  parsed = urlparse(url)
  if parsed.scheme not in ("http", "https") or not parsed.netloc:
    raise ValueError("Enter a full http or https event URL.")
  host = parsed.hostname or ""
  if host in ("localhost", "127.0.0.1", "::1") or host.endswith(".local"):
    raise ValueError("Local/private URLs are blocked for safe imports.")
  request = Request(url, headers={"User-Agent": "EventBuddy/0.1 (+https://local.demo)"})
  with urlopen(request, timeout=8) as response:
    content_type = response.headers.get("Content-Type", "")
    if "text/html" not in content_type and "text/plain" not in content_type:
      raise ValueError("This importer currently supports HTML or text event pages.")
    return response.read(MAX_IMPORT_BYTES).decode("utf-8", errors="replace")


def html_to_text(raw):
  parser = TextExtractor()
  parser.feed(raw)
  text = parser.text()
  return text or re.sub(r"<[^>]+>", " ", raw)


def infer_tags(text):
  value = text.lower()
  tags = []
  if re.search(r"\b(ai|agent|llm|machine learning|ml|copilot)\b", value):
    tags.append("ai")
  if re.search(r"\b(data|analytics|model|forecast|database)\b", value):
    tags.append("data")
  if re.search(r"\b(python|cpython|package|testing|type)\b", value):
    tags.append("python-core")
  if re.search(r"\b(security|trust|risk|supply chain|privacy)\b", value):
    tags.append("security")
  if re.search(r"\b(infra|cloud|backend|api|deploy|platform)\b", value):
    tags.append("infra")
  if re.search(r"\b(career|learn|skill|student|mentor)\b", value):
    tags.append("career")
  if re.search(r"\b(community|network|hallway|meetup|social)\b", value):
    tags.append("community")
  return tags or ["community"]


def infer_type(text):
  value = text.lower()
  if re.search(r"\b(break|lunch|coffee|tea)\b", value):
    return "break"
  if re.search(r"\b(workshop|lab|hands-on|sprint)\b", value):
    return "workshop"
  if re.search(r"\b(keynote|opening|closing)\b", value):
    return "keynote"
  if re.search(r"\b(network|community|meetup|hackathon)\b", value):
    return "community"
  return "talk"


def normalize_time(value):
  hour, minute = value.replace(".", ":").split(":", 1)
  return f"{int(hour):02d}:{minute[:2]}"


def extract_schedule_sessions(text):
  sessions = []
  time_pattern = re.compile(r"(\d{1,2}[:.]\d{2})\s*(?:-|–|—|to)\s*(\d{1,2}[:.]\d{2})", re.I)
  for line in text.splitlines():
    clean = re.sub(r"\s+", " ", line).strip()
    if not clean:
      continue
    match = time_pattern.search(clean)
    if not match:
      continue
    remainder = clean.replace(match.group(0), "").strip(" |,;-")
    parts = [part.strip() for part in remainder.split("|") if part.strip()]
    venue = parts[0] if len(parts) > 1 else "Event space"
    title = parts[1] if len(parts) > 1 else (parts[0] if parts else "Untitled event block")
    speaker = parts[2] if len(parts) > 2 else "Event team"
    session_type = infer_type(clean)
    sessions.append({
      "id": f"url-{len(sessions)}-{normalize_time(match.group(1)).replace(':', '')}",
      "day": "day1",
      "time": normalize_time(match.group(1)),
      "end": normalize_time(match.group(2)),
      "venue": venue,
      "title": title,
      "speaker": speaker,
      "tags": infer_tags(clean),
      "type": session_type,
      "description": parts[3] if len(parts) > 3 else f"Imported from website text as a {session_type} block."
    })
  return sessions[:80]


def import_event_from_url(url):
  raw = fetch_event_page(url)
  text = html_to_text(raw)
  return {
    "event": {"name": event_name_from_url(url), "source": url},
    "rawText": text[:12000],
    "sessions": extract_schedule_sessions(text),
    "status": "imported"
  }


class Handler(SimpleHTTPRequestHandler):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, directory=str(ROOT), **kwargs)

  def translate_path(self, path):
    dist_dir = ROOT / "dist"
    request_path = urlparse(path).path
    if dist_dir.exists() and not request_path.startswith("/api/"):
      if request_path in ("", "/", "/index.html"):
        return str(dist_dir / "index.html")
      candidate = (dist_dir / request_path.lstrip("/")).resolve()
      if str(candidate).startswith(str(dist_dir.resolve())) and candidate.exists():
        return str(candidate)
    return super().translate_path(path)

  def end_headers(self):
    self.send_header("Cache-Control", "no-store")
    super().end_headers()

  def read_body(self):
    length = int(self.headers.get("Content-Length", "0"))
    if length == 0:
      return {}
    return json.loads(self.rfile.read(length).decode("utf-8"))

  def send_json(self, value, status=200):
    body = json.dumps(value, ensure_ascii=False).encode("utf-8")
    self.send_response(status)
    self.send_header("Content-Type", "application/json; charset=utf-8")
    self.send_header("Content-Length", str(len(body)))
    self.end_headers()
    self.wfile.write(body)

  def do_GET(self):
    if self.path == "/api/health":
      self.send_json({"status": "ok", "app": "Event Buddy"})
      return
    super().do_GET()

  def do_POST(self):
    try:
      payload = self.read_body()
      if self.path == "/api/import-event":
        url = (payload.get("url") or "").strip()
        self.send_json(import_event_from_url(url))
        return
      self.send_json({"error": "Unknown endpoint"}, status=404)
    except Exception as exc:
      self.send_json({"error": str(exc)}, status=500)


def parse_port():
  if len(sys.argv) < 2:
    return 8000
  try:
    port = int(sys.argv[1])
  except ValueError:
    return 8000
  return port if 0 < port < 65536 else 8000


def make_server(preferred_port):
  for port in range(preferred_port, preferred_port + 20):
    try:
      return port, ThreadingHTTPServer(("127.0.0.1", port), Handler)
    except OSError as exc:
      if exc.errno not in (48, 98):
        raise
  raise OSError(f"No open port found from {preferred_port} to {preferred_port + 19}")


if __name__ == "__main__":
  port, server = make_server(parse_port())
  print(f"Event Buddy running at http://127.0.0.1:{port}/index.html")
  server.serve_forever()
