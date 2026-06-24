#!/usr/bin/env python3
from pathlib import Path
import subprocess


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_PUBLIC_FILES = [
  "README.md",
  "docs/JUDGE_PACKET.md",
  "LICENSE",
  ".github/workflows/check.yml",
  ".github/workflows/pages.yml",
  "PROJECT_MANIFEST.json",
  "docs/HACKATHON_SUBMISSION.md",
  "docs/SUBMISSION_FORM_DRAFT.md",
  "docs/JUDGING_CHECKLIST.md",
  "docs/SUBMISSION_AUDIT_REPORT.md",
  "docs/SUBMISSION_READINESS.md",
  "docs/DEMO_SCRIPT.md",
  "docs/PITCH_DECK.md",
  "docs/FINAL_HANDOFF.md",
  "docs/FORM_INSPECTION.md",
  "docs/PUBLIC_REPO_CHECKLIST.md",
  "docs/GITHUB_PUBLISH_GUIDE.md",
  "docs/DEPLOYMENT.md",
  "docs/AI_USE_AND_ETHICS.md",
  "docs/AI_READY_ASEAN.md",
  "docs/SOURCES.md",
  "assets/event-buddy-demo-current.png",
  "assets/event-buddy-demo.mp4",
  "tools/build_static_preview.py"
]

REQUIRED_GITIGNORE_ENTRIES = [
  "__pycache__/",
  "*.pyc",
  ".DS_Store",
  ".agent/",
  "dist/",
  "data/saved_routes.json"
]

FORBIDDEN_TRACKED_PARTS = [
  "__pycache__",
  ".agent/",
  "dist/",
  "data/saved_routes.json",
  ".DS_Store"
]


def assert_true(condition, message):
  if not condition:
    raise AssertionError(message)


def run_git(args):
  return subprocess.run(
    ["git", *args],
    cwd=ROOT,
    text=True,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    check=False
  )


def inside_git_repo():
  result = run_git(["rev-parse", "--is-inside-work-tree"])
  return result.returncode == 0 and result.stdout.strip() == "true"


def audit_required_files():
  missing = [relative for relative in REQUIRED_PUBLIC_FILES if not (ROOT / relative).exists()]
  assert_true(not missing, "missing public repo files: " + ", ".join(missing))


def audit_gitignore():
  gitignore = ROOT / ".gitignore"
  assert_true(gitignore.exists(), ".gitignore is missing")
  text = gitignore.read_text(encoding="utf-8")
  missing = [entry for entry in REQUIRED_GITIGNORE_ENTRIES if entry not in text]
  assert_true(not missing, ".gitignore missing entries: " + ", ".join(missing))


def audit_tracked_files_if_git():
  if not inside_git_repo():
    print("Git status: not initialized yet")
    print("Next step: create an empty public GitHub repo, then follow docs/GITHUB_PUBLISH_GUIDE.md")
    return

  result = run_git(["ls-files"])
  assert_true(result.returncode == 0, "could not list git-tracked files")
  tracked = [line for line in result.stdout.splitlines() if line.strip()]
  forbidden = [
    name for name in tracked
    if any(part in name for part in FORBIDDEN_TRACKED_PARTS)
  ]
  assert_true(not forbidden, "forbidden generated/local files are tracked: " + ", ".join(forbidden))

  status = run_git(["status", "--short"])
  if status.returncode == 0 and status.stdout.strip():
    print("Git status: local changes exist; review before pushing")
    print(status.stdout.strip())
  else:
    print("Git status: clean")


def main():
  audit_required_files()
  audit_gitignore()
  audit_tracked_files_if_git()
  print("Public repo preflight passed")
  print(f"- Public-facing files checked: {len(REQUIRED_PUBLIC_FILES)}")
  print("- Generated/local files are covered by .gitignore")


if __name__ == "__main__":
  main()
