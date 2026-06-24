# Event Buddy Two-Minute Demo Script

## Two-Minute Demo Script

### 0:00 - 0:20, Open The Studio

"This is Event Buddy, a live event companion for conferences, meetups, and workshops. It turns a dense agenda into a personal fieldwork plan: what to attend, where to take breaks, and who to meet without making the hallway track feel awkward."

Point to:

- `Human agenda lab`
- `Research desk`
- `Upload schedule`
- `Listen / Sense / Nudge / Remember`

### 0:20 - 0:45, Import A Schedule

"The built-in demo uses a PyConSG sample, but the app is not locked to PyConSG. You can paste agenda text, upload CSV, upload `.ics`, add a session manually, or try a website URL through the backend importer."

Click `Upload schedule`, then mention the supported inputs.

### 0:45 - 1:10, Generate The Plan

"The planner balances goals, interests, energy, venue preference, social mode, conflicts, and protected breaks. It recommends a plan and explains the day rhythm rather than dumping every session into a calendar."

Show:

- recommended sessions,
- protected breaks,
- conflicts,
- venue rhythm.

### 1:10 - 1:35, Verify Participation

"For a hackathon demo, participation is verified with session room codes and attendee buddy codes. A real event could swap these for QR scans, badge taps, or organizer-issued codes."

Enter a visible session code and show XP/session progress changing.

### 1:35 - 2:00, Backend Proof And Boundaries

"The frontend handles local schedule parsing. The Python backend serves the built app and provides `/api/import-event` for best-effort website imports. Website parsing is intentionally honest: it works when schedule text is present in public HTML, and PDF/image OCR is clearly marked as a next upgrade."

Mention:

- `make check`
- `make smoke`
- `make pages-preview-check`
- `make package`

## Recommendation Logic

Event Buddy scores agenda blocks from selected goals, interests, session type, time conflicts, energy settings, social preference, venue preference, and break protection. It is deterministic and explainable enough for judges to inspect during a short demo.

## Backend Proof

The backend is a Python stdlib server with `/api/health` and `/api/import-event`. The app also builds into a static Vite bundle for GitHub Pages-style preview, with website import disabled there unless a backend is running.
