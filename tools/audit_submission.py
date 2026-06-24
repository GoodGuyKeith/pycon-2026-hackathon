#!/usr/bin/env python3
from pathlib import Path
import json
import zipfile


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "dist" / "event-buddy-submission.zip"

REQUIRED_FILES = [
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

PACKAGE_REQUIRED = [
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

DOC_KEYWORDS = {
  "README.md": ["Event Buddy", "MindMarket-inspired", "CSV", ".ics", "/api/import-event", "Verification", "assets/event-buddy-demo.mp4"],
  "docs/JUDGE_PACKET.md": ["Fast Review Path", "What To Click In The Demo", "Criteria Evidence", "Honest Boundaries"],
  "LICENSE": ["MIT License", "Event Buddy contributors"],
  "docs/HACKATHON_SUBMISSION.md": ["Data Quality", "User Focus", "Technical Execution"],
  "docs/SUBMISSION_FORM_DRAFT.md": ["Problem", "Solution", "Honest Limitations"],
  "docs/JUDGING_CHECKLIST.md": ["Criteria Evidence", "session code", "Known Limitations", "Last Local Verification"],
  "docs/SUBMISSION_AUDIT_REPORT.md": ["Criteria Audit", "make pages-preview-check", "make final-preflight", "Verification Gates", "Remaining User-Only Actions"],
  "docs/SUBMISSION_READINESS.md": ["Official Fit", "Repo-Ready Evidence", "make final-preflight", "session code", "External Actions Still Required"],
  "docs/DEMO_SCRIPT.md": ["Two-Minute Demo Script", "Upload schedule", "Recommendation Logic", "Backend Proof"],
  "docs/PITCH_DECK.md": ["Problem", "Solution", "Honest Limitations"],
  "docs/FINAL_HANDOFF.md": ["Final Pre-Submit Commands", "Submission Steps Still Requiring User Action", "Do Not Overclaim"],
  "docs/SUBMISSION_LINKS_TEMPLATE.md": ["Public repository URL", "GitHub Pages static preview URL", "Form Submission Checks"],
  "docs/FORM_INSPECTION.md": ["Google sign-in", "public project repo", "24 Jun 2026"],
  "docs/PUBLIC_REPO_CHECKLIST.md": ["Before Publishing", "Do not commit generated/local files", "Recommended Repo Description"],
  "docs/GITHUB_PUBLISH_GUIDE.md": ["Recommended Repository Settings", "Publish With Git", "make repo-preflight", "make pages-preview-check", ".github/workflows/check.yml", ".github/workflows/pages.yml", "Final Sanity Check"],
  "docs/DEPLOYMENT.md": ["Recommended Judged Demo", "Static Preview Mode", "make pages-preview-check", ".github/workflows/pages.yml", "Container Option"],
  "docs/AI_USE_AND_ETHICS.md": ["How AI Was Used", "Data And Privacy", "Fairness And Limitations"],
  "docs/AI_READY_ASEAN.md": ["Understanding Of AI Concepts", "Effective AI Tool Use", "Ethical AI Tool Use"],
  "docs/SOURCES.md": ["Official Hackathon References", "Local Resource Links", "Provenance Notes"]
}

FORBIDDEN_PACKAGE_PARTS = ["__pycache__", "saved_routes.json", ".agent/"]


def assert_true(condition, message):
  if not condition:
    raise AssertionError(message)


def read_text(relative):
  return (ROOT / relative).read_text(encoding="utf-8")


def audit_files():
  for relative in REQUIRED_FILES:
    assert_true((ROOT / relative).exists(), f"Missing required file: {relative}")


def audit_docs():
  for relative, keywords in DOC_KEYWORDS.items():
    text = read_text(relative)
    for keyword in keywords:
      assert_true(keyword in text, f"{relative} should mention {keyword!r}")


def audit_event_app():
  app = read_text("src/App.jsx")
  for token in [
    "sampleSessions = [",
    "parseCsvSchedule",
    "parseIcsSchedule",
    "/api/import-event",
    "import { gsap } from \"gsap\"",
    "gsap.quickTo",
    "gsap.to",
    "Human agenda lab",
    "Research desk",
    "Upload schedule"
  ]:
    assert_true(token in app, f"src/App.jsx should include {token!r}")


def audit_manifest():
  data = json.loads(read_text("PROJECT_MANIFEST.json"))
  assert_true(data.get("projectTitle") == "Event Buddy", "manifest should name the project")
  assert_true(data.get("hackathon", {}).get("sourceUrl") == "https://pycon.sg/hackathon.html", "manifest should include official source URL")
  assert_true("make check" == data.get("runCommands", {}).get("check"), "manifest should include check command")
  assert_true("make pages-preview-check" == data.get("runCommands", {}).get("pagesPreviewCheck"), "manifest should include static preview check command")
  assert_true("make repo-preflight" == data.get("runCommands", {}).get("repoPreflight"), "manifest should include repo preflight command")
  assert_true("make selftest-package" == data.get("runCommands", {}).get("selftestPackage"), "manifest should include package self-test command")
  assert_true("make final-preflight" == data.get("runCommands", {}).get("finalPreflight"), "manifest should include final preflight command")
  assert_true("dist/event-buddy-submission.zip" in data.get("submissionFiles", []), "manifest should list the submission zip")
  assert_true("docs/JUDGE_PACKET.md" in data.get("submissionFiles", []), "manifest should list judge packet")
  assert_true(".github/workflows/check.yml" in data.get("submissionFiles", []), "manifest should list GitHub Actions workflow")
  assert_true(".github/workflows/pages.yml" in data.get("submissionFiles", []), "manifest should list GitHub Pages workflow")
  assert_true("assets/event-buddy-demo-current.png" in data.get("submissionFiles", []), "manifest should list the fresh demo screenshot")
  assert_true("assets/event-buddy-demo.mp4" in data.get("submissionFiles", []), "manifest should list the demo video")
  assert_true("docs/SUBMISSION_AUDIT_REPORT.md" in data.get("submissionFiles", []), "manifest should list submission audit report")
  assert_true("docs/FORM_INSPECTION.md" in data.get("submissionFiles", []), "manifest should list the form inspection notes")
  assert_true("docs/PUBLIC_REPO_CHECKLIST.md" in data.get("submissionFiles", []), "manifest should list public repo checklist")
  assert_true("docs/GITHUB_PUBLISH_GUIDE.md" in data.get("submissionFiles", []), "manifest should list GitHub publish guide")
  assert_true("docs/DEPLOYMENT.md" in data.get("submissionFiles", []), "manifest should list deployment guide")
  assert_true("docs/AI_USE_AND_ETHICS.md" in data.get("submissionFiles", []), "manifest should list AI use and ethics notes")
  assert_true("docs/AI_READY_ASEAN.md" in data.get("submissionFiles", []), "manifest should list AI Ready ASEAN mapping")
  assert_true("docs/SOURCES.md" in data.get("submissionFiles", []), "manifest should list sources")
  assert_true("tools/selftest_package.py" in data.get("submissionFiles", []), "manifest should list package self-test tool")
  assert_true("tools/final_preflight.py" in data.get("submissionFiles", []), "manifest should list final preflight tool")
  assert_true("tools/build_static_preview.py" in data.get("submissionFiles", []), "manifest should list static preview builder")
  assert_true("tools/public_repo_preflight.py" in data.get("submissionFiles", []), "manifest should list public repo preflight tool")


def audit_gitignore():
  text = read_text(".gitignore")
  for value in ["__pycache__/", "dist/", "data/saved_routes.json", ".agent/"]:
    assert_true(value in text, f".gitignore should include {value}")


def audit_package():
  assert_true(PACKAGE.exists(), "submission zip is missing; run make package")
  with zipfile.ZipFile(PACKAGE) as archive:
    names = archive.namelist()
  for relative in PACKAGE_REQUIRED:
    assert_true(relative in names, f"submission zip missing {relative}")
  for name in names:
    for forbidden in FORBIDDEN_PACKAGE_PARTS:
      assert_true(forbidden not in name, f"submission zip should not include {name}")


def main():
  audit_files()
  audit_docs()
  audit_event_app()
  audit_manifest()
  audit_gitignore()
  audit_package()
  print("Submission audit passed")
  print(f"- Required files: {len(REQUIRED_FILES)}")
  print(f"- Package: {PACKAGE.relative_to(ROOT)}")
  print(f"- Package files checked: {len(PACKAGE_REQUIRED)}")


if __name__ == "__main__":
  main()
