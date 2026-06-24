# AI Ready ASEAN Mapping

The official submission form notes that a qualifying hackathon entry may also support AI Singapore AI Ready ASEAN in-depth certificate eligibility if it demonstrates understanding and application of AI concepts and skills, plus effective and ethical AI tool use.

This project does not claim certificate approval. This file maps the current project evidence to those visible expectations.

## Understanding Of AI Concepts

Evidence:

- `docs/AI_USE_AND_ETHICS.md` explains how Codex was used and what the runtime app does not do.
- `PROJECT_MANIFEST.json` separates current deterministic planning logic from future AI extraction plans.
- `docs/JUDGING_CHECKLIST.md` states that planning is heuristic and explainable, not a trained model.

## Application Of AI Skills

Evidence:

- Codex was used to build, iterate, debug, package, and verify the project.
- The app demonstrates AI-assisted software development with a working Python backend, frontend, smoke test, schedule importers, and submission audit.
- The project uses deterministic fallback data so the demo remains stable and inspectable.

## Effective AI Tool Use

Evidence:

- `make check` verifies code/data/package readiness.
- `smoke_test.py` validates live backend endpoints.
- `tools/audit_submission.py` prevents missing required submission artifacts.
- `docs/FORM_INSPECTION.md` records read-only form inspection without submitting or transmitting data.

## Ethical AI Tool Use

Evidence:

- No sensitive personal data is required.
- Saved local event plans are browser-local and generated build output is excluded from public repo/package outputs.
- The app includes explicit limitations and avoids claiming guaranteed extraction, production-grade verification, or personalized advice.
- Future AI/API use is documented as optional and should preserve source labels, visible reasoning, privacy boundaries, and curated fallback schedules.

## Practical Statement For The Form

Event Buddy was built with AI-assisted coding, but the current demo does not use live AI generation at runtime. It uses explainable heuristic planning and curated sample schedule data. The repo includes AI-use, ethics, source provenance, verification, and audit documents so judges can inspect how AI was used responsibly.
