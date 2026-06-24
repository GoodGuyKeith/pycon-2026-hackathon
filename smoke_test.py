#!/usr/bin/env python3
from urllib.error import URLError
from urllib.request import urlopen
from pathlib import Path
import sys


BASE_URL = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:8000"
ROOT = Path(__file__).resolve().parent


def fetch_text(path):
  with urlopen(f"{BASE_URL}{path}", timeout=5) as response:
    return response.read().decode("utf-8")


def assert_true(condition, message):
  if not condition:
    raise AssertionError(message)


def main():
  try:
    index = fetch_text("/index.html")
  except URLError as exc:
    raise SystemExit(f"Smoke test could not reach {BASE_URL}: {exc}") from exc

  app = (ROOT / "src" / "App.jsx").read_text(encoding="utf-8")
  styles = (ROOT / "src" / "styles.css").read_text(encoding="utf-8")

  assert_true("Event Buddy" in index, "index.html should contain the Event Buddy title")
  assert_true("/assets/" in index or "/src/main.jsx" in index, "index.html should load the Vite app")
  assert_true("sampleSessions = [" in app, "React app should include schedule seed data")
  assert_true("Research desk" in app, "React app should expose the event import flow")
  assert_true("Upload schedule" in app, "React app should expose file-based schedule import")
  assert_true("Quick interview card" in app, "React app should expose manual session entry")
  assert_true("Generate plan" in app, "React app should expose the main planning action")
  assert_true("Session QR / room code" in app, "React app should expose code-based session verification")
  assert_true("parseScheduleText" in app, "React app should parse pasted agenda text")
  assert_true("parseCsvSchedule" in app, "React app should parse CSV schedules")
  assert_true("parseIcsSchedule" in app, "React app should parse calendar schedules")
  assert_true("importScheduleFile" in app, "React app should import uploaded schedule files")
  assert_true("/api/import-event" in app, "React app should call backend website import")
  assert_true("buildPlan" in app, "React app should build personalized plans")
  assert_true("verifySessionCode" in app, "React app should verify attendance with session codes")
  assert_true("sessionCodeFor" in app, "React app should generate session room codes")
  assert_true("market-bg" in styles, "Tailwind CSS should include the MindMarket-inspired surface")
  assert_true("people-card" in styles, "Tailwind CSS should include human-centered visual cards")
  assert_true("movementSegments" in app, "React app should compute venue movement guidance")

  print("Smoke test passed")
  print(f"- Base URL: {BASE_URL}")
  print("- App: Event Buddy")


if __name__ == "__main__":
  main()
