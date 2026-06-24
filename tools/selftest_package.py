#!/usr/bin/env python3
from pathlib import Path
import shutil
import tempfile
import zipfile
import py_compile


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "dist" / "event-buddy-submission.zip"

REQUIRED_EXTRACTED_FILES = [
  "index.html",
  "package.json",
  "pnpm-lock.yaml",
  "vite.config.js",
  "src/App.jsx",
  "src/main.jsx",
  "src/styles.css",
  "server.py",
  "smoke_test.py",
  "tools/audit_submission.py",
  "tools/build_submission.py",
  "tools/build_static_preview.py",
  "tools/final_preflight.py",
  "tools/public_repo_preflight.py"
]

PYTHON_FILES = [
  "server.py",
  "smoke_test.py",
  "tools/audit_submission.py",
  "tools/build_submission.py",
  "tools/build_static_preview.py",
  "tools/final_preflight.py",
  "tools/public_repo_preflight.py"
]


def main():
  if not PACKAGE.exists():
    raise FileNotFoundError(f"Missing package: {PACKAGE.relative_to(ROOT)}")

  temp_root = Path(tempfile.mkdtemp(prefix="event-buddy-selftest-"))
  try:
    with zipfile.ZipFile(PACKAGE) as archive:
      archive.extractall(temp_root)

    missing = [relative for relative in REQUIRED_EXTRACTED_FILES if not (temp_root / relative).exists()]
    if missing:
      raise AssertionError("extracted package missing files: " + ", ".join(missing))

    for relative in PYTHON_FILES:
      py_compile.compile(str(temp_root / relative), doraise=True)

    app = (temp_root / "src" / "App.jsx").read_text(encoding="utf-8")
    for token in ("Human agenda lab", "parseCsvSchedule", "parseIcsSchedule", "/api/import-event", "import { gsap } from \"gsap\""):
      if token not in app:
        raise AssertionError(f"src/App.jsx missing {token!r}")

    print(f"Package self-test passed in {temp_root}")
  finally:
    shutil.rmtree(temp_root, ignore_errors=True)


if __name__ == "__main__":
  main()
