# Event Buddy Submission Readiness

## Official Fit

Event Buddy fits Track 2 Open Track: it is playful, useful, community-facing, and built around a real attendee problem: choosing what to do at a busy event without losing energy or social momentum.

## Repo-Ready Evidence

| Evidence | File Or Flow |
| --- | --- |
| Working app | `src/App.jsx`, `src/styles.css`, `index.html` |
| Backend proof | `server.py` with `/api/health` and `/api/import-event` |
| Verification | `make check`, `make smoke`, `make pages-preview-check` |
| Package | `dist/event-buddy-submission.zip` from `make package` |
| Final audit | `make final-preflight` |
| Judge path | `JUDGE_PACKET.md`, `DEMO_SCRIPT.md`, `PITCH_DECK.md` |

## Demo Proof Points

1. Built-in PyConSG sample works immediately.
2. Upload schedule supports CSV and `.ics`.
3. Paste/manual import paths support messy small-event data.
4. Website import exists through the backend.
5. A visible session code verifies attendance.
6. Buddy-code networking updates progress.

## External Actions Still Required

1. Publish a public GitHub repository.
2. Verify the GitHub Pages static preview.
3. Complete the official Google form.
4. Submit before the hackathon deadline.
