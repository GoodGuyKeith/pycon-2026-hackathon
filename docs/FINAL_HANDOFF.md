# Final Handoff

## Current State

Event Buddy is a working local web app with:

- Python backend
- React frontend
- Tailwind CSS styling
- Vite build workflow
- GSAP microinteractions without entrance-motion choreography
- MindMarket-inspired human research studio visual language
- Agenda paste, CSV, `.ics`, manual, and best-effort website import paths
- PyConSG sample agenda
- Personalized event route recommendations
- Session room-code verification
- Buddy-code connection tracking
- XP, quest, and rewards panels
- Venue transfer guidance
- Smoke test
- GitHub Actions workflow for public `make check`
- GitHub Pages workflow for static preview
- Submission draft, judging checklist, and demo script

## Files To Know

- `README.md`: main project overview and run instructions
- `docs/JUDGE_PACKET.md`: shortest judge-facing review path through the submission
- `LICENSE`: MIT license for public repo clarity
- `docs/DEMO_SCRIPT.md`: two-minute live demo script
- `docs/SUBMISSION_FORM_DRAFT.md`: copy-ready form answers
- `docs/JUDGING_CHECKLIST.md`: criteria evidence and final audit
- `docs/SUBMISSION_AUDIT_REPORT.md`: final criteria-to-evidence audit and remaining user-only actions
- `docs/SUBMISSION_READINESS.md`: repo-ready evidence, external actions, and honest limitations
- `docs/HACKATHON_SUBMISSION.md`: track fit and honest limitations
- `docs/PITCH_DECK.md`: slide-by-slide pitch outline
- `PROJECT_MANIFEST.json`: machine-readable submission metadata and criteria evidence
- `docs/SUBMISSION_LINKS_TEMPLATE.md`: fill-in template for final repo, static preview, zip, and form confirmation links
- `docs/FORM_INSPECTION.md`: read-only notes from the official Google submission form
- `docs/PUBLIC_REPO_CHECKLIST.md`: what to publish and what not to commit
- `docs/GITHUB_PUBLISH_GUIDE.md`: recommended GitHub settings, Git commands, and final public-link sanity check
- `docs/DEPLOYMENT.md`: Python-server, static preview, and Docker run modes
- `docs/AI_USE_AND_ETHICS.md`: AI-use disclosure, data/privacy notes, and limitations
- `docs/AI_READY_ASEAN.md`: mapping to the form's visible AI concepts and ethical AI tool-use expectations
- `docs/SOURCES.md`: dataset provenance and app resource links
- ``: ready-to-use submission thumbnail
- `assets/event-buddy-demo-current.png`: fresh full-page product screenshot
- `assets/event-buddy-demo.mp4`: short demo slideshow from current UI states
- `src/App.jsx`: React app, schedule logic, importers, and planner UI
- `src/styles.css`: Tailwind 4 entry and MindMarket-inspired component styles
- `vite.config.js`: Vite React/Tailwind configuration
- `package.json` / `pnpm-lock.yaml`: frontend dependency lock
- `tools/public_repo_preflight.py`: public repo readiness check for required files and generated/local file safety
- `smoke_test.py`: live backend verification

## Final Pre-Submit Commands

```bash
make check
make pages-preview-check
make repo-preflight
make selftest-package
make final-preflight
make run
```

`make check` builds the Vite React app and compiles the Python files. `make pages-preview-check` validates the static GitHub Pages preview bundle directly. `make repo-preflight` checks public-facing files and generated/local file safety before publishing. `make selftest-package` extracts the clean zip into a temporary directory, verifies required files, compiles Python tools, and checks frontend source markers without requiring network access. `make final-preflight` runs the package self-test and prints the remaining public-repo and Google Form actions.

In another terminal:

```bash
make smoke
```

Build the clean upload archive:

```bash
make package
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

## Submission Steps Still Requiring User Action

1. Decide final team/project name.
2. Decide whether to submit as Open Track only or mention event-organizer/community relevance in the description.
3. Sign in to Google; the official form requires sign-in before filling.
4. Put the project in a public repo or create another public project link.
5. Fill the official submission form using `docs/SUBMISSION_FORM_DRAFT.md`.
6. Attach or link the project repository/folder according to the form requirements.
   - If the form accepts file uploads, use `dist/event-buddy-submission.zip`.
7. Submit before the official deadline: **24 Jun 2026, 6 pm SGT**.
8. Run through `docs/DEMO_SCRIPT.md` once before live judging.

## Recommended Positioning

Submit as:

> Open Track project for live event planning and attendee engagement.

Reason:

The app's strongest hook is playful and community-focused, while the underlying structure directly helps attendees choose sessions, protect energy, verify participation, and meet people.

## Do Not Overclaim

Say:

- "Curated PyConSG sample agenda"
- "Best-effort website import"
- "Explainable heuristic planning"

Avoid saying:

- "Guaranteed schedule extraction from every website"
- "Real security-grade attendance verification"
- "PDF/image OCR is already implemented"
