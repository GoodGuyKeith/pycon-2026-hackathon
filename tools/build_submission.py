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
  "docs/JUDGE_PACKET.md",
  "LICENSE",
  "docs/HACKATHON_SUBMISSION.md",
  "docs/SUBMISSION_FORM_DRAFT.md",
  "docs/JUDGING_CHECKLIST.md",
  "docs/SUBMISSION_AUDIT_REPORT.md",
  "docs/SUBMISSION_READINESS.md",
  "docs/DEMO_SCRIPT.md",
  "docs/PITCH_DECK.md",
  "docs/FINAL_HANDOFF.md",
  "docs/SUBMISSION_LINKS_TEMPLATE.md",
  "docs/FORM_INSPECTION.md",
  "docs/PUBLIC_REPO_CHECKLIST.md",
  "docs/GITHUB_PUBLISH_GUIDE.md",
  "docs/DEPLOYMENT.md",
  "docs/AI_USE_AND_ETHICS.md",
  "docs/AI_READY_ASEAN.md",
  "docs/SOURCES.md",
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
