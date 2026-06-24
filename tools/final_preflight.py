#!/usr/bin/env python3
from datetime import datetime, timezone, timedelta
from pathlib import Path
import json
import zipfile


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "dist" / "event-buddy-submission.zip"
DEADLINE = datetime(2026, 6, 24, 18, 0, tzinfo=timezone(timedelta(hours=8)))

REQUIRED_REVIEW_FILES = [
  "README.md",
  "JUDGE_PACKET.md",
  "SUBMISSION_AUDIT_REPORT.md",
  "SUBMISSION_FORM_DRAFT.md",
  "JUDGING_CHECKLIST.md",
  "SUBMISSION_READINESS.md",
  "DEMO_SCRIPT.md",
  "GITHUB_PUBLISH_GUIDE.md",
  "SUBMISSION_LINKS_TEMPLATE.md",
  "FINAL_HANDOFF.md"
]


def assert_true(condition, message):
  if not condition:
    raise AssertionError(message)


def package_count():
  assert_true(PACKAGE.exists(), "submission zip missing; run make package or make check")
  with zipfile.ZipFile(PACKAGE) as archive:
    return len(archive.namelist())


def main():
  manifest = json.loads((ROOT / "PROJECT_MANIFEST.json").read_text(encoding="utf-8"))
  for relative in REQUIRED_REVIEW_FILES:
    assert_true((ROOT / relative).exists(), f"missing review file: {relative}")

  now = datetime.now(DEADLINE.tzinfo)
  remaining = DEADLINE - now
  if remaining.total_seconds() > 0:
    deadline_line = f"Deadline: {DEADLINE:%Y-%m-%d %H:%M %Z} ({remaining.days}d {remaining.seconds // 3600}h remaining)"
  else:
    deadline_line = f"Deadline: {DEADLINE:%Y-%m-%d %H:%M %Z} (deadline has passed)"

  print("Final preflight passed")
  print(f"- Project: {manifest.get('projectTitle', 'Event Buddy')}")
  print(f"- Positioning: {manifest.get('hackathon', {}).get('primaryTrack')}")
  print(f"- Package: {PACKAGE.relative_to(ROOT)} ({package_count()} files)")
  print(f"- {deadline_line}")
  print("")
  print("User-only actions still required:")
  print("1. Create/publish the public repo using GITHUB_PUBLISH_GUIDE.md.")
  print("2. Run make repo-preflight before pushing or immediately after git init.")
  print("3. Open the public repo in a private/incognito window and confirm README links render.")
  print("4. Sign in to Google and fill the official form using SUBMISSION_FORM_DRAFT.md.")
  print("5. Paste the public repo URL and attach the zip if uploads are accepted.")
  print("6. Submit before 24 Jun 2026, 6 pm SGT.")


if __name__ == "__main__":
  main()
