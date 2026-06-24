#!/usr/bin/env python3
from pathlib import Path
import zipfile


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PACKAGE = DIST / "event-buddy-submission.zip"

INCLUDE = [
  "index.html",
  "package.json",
  "pnpm-lock.yaml",
  "vite.config.js",
  "src/App.jsx",
  "src/main.jsx",
  "src/styles.css",
  "server.py",
  "smoke_test.py",
  "Makefile",
  ".gitignore",
  ".github/workflows/check.yml",
  ".github/workflows/pages.yml",
  "Dockerfile",
  ".dockerignore",
  "PROJECT_MANIFEST.json",
  "README.md",
  "JUDGE_PACKET.md",
  "LICENSE",
  "HACKATHON_SUBMISSION.md",
  "SUBMISSION_FORM_DRAFT.md",
  "JUDGING_CHECKLIST.md",
  "SUBMISSION_AUDIT_REPORT.md",
  "SUBMISSION_READINESS.md",
  "DEMO_SCRIPT.md",
  "PITCH_DECK.md",
  "FINAL_HANDOFF.md",
  "SUBMISSION_LINKS_TEMPLATE.md",
  "FORM_INSPECTION.md",
  "PUBLIC_REPO_CHECKLIST.md",
  "GITHUB_PUBLISH_GUIDE.md",
  "DEPLOYMENT.md",
  "AI_USE_AND_ETHICS.md",
  "AI_READY_ASEAN.md",
  "SOURCES.md",
  "assets/demo-screenshot.jpg",
  "assets/event-buddy-demo-current.png",
  "assets/event-buddy-demo.mp4",
  "tools/build_submission.py",
  "tools/audit_submission.py",
  "tools/selftest_package.py",
  "tools/final_preflight.py",
  "tools/build_static_preview.py",
  "tools/public_repo_preflight.py",
  "tools/capture_demo_assets.mjs"
]


def main():
  DIST.mkdir(exist_ok=True)
  with zipfile.ZipFile(PACKAGE, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for relative in INCLUDE:
      path = ROOT / relative
      if not path.exists():
        raise FileNotFoundError(f"Missing package file: {relative}")
      archive.write(path, relative)

  print(f"Built {PACKAGE.relative_to(ROOT)}")
  print(f"Included {len(INCLUDE)} files")


if __name__ == "__main__":
  main()
