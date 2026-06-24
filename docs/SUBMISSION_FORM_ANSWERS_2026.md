# PyConSG 2026 Hackathon Submission Form Answers

Drafted on `2026-06-24T08:37:27+0800` for the official form:

`https://docs.google.com/forms/d/e/1FAIpQLSeMMo_Ss8upjB0Pam2NjfWbNQg4VqY3KhernuvMv0sFbslUTQ/viewform`

## Email

Use the Google account you want recorded for the team submission.

## Team Name

UNCONFIRMED

## Team Members

UNCONFIRMED

## Project Title

Event Buddy

## Track

Open Track

## Public Repository URL

UNCONFIRMED

Paste the final public GitHub repository URL after publishing.

## Demo / Preview URL

UNCONFIRMED

If GitHub Pages is enabled, paste the Pages URL. For local judging/demo, use:

`http://127.0.0.1:8000/index.html`

## Submission Package

`dist/event-buddy-submission.zip`

## One-Liner

Event Buddy is a warm live-event companion that imports agendas, recommends a personalized day plan, verifies attendance by room code, helps attendees make buddy-code connections, and turns verified participation into claimable AI-credit reward requests.

## Problem

Conference schedules are dense. Attendees, especially first-timers or introverts, often do not know which talks to choose, how much movement they are signing up for, when to take breaks, or how to start useful conversations.

## Solution

Event Buddy turns an event agenda into a human-centered fieldwork plan. Users can start with the PyConSG sample, paste agenda text, upload CSV or `.ics` files, try a website URL import, or add sessions manually. The app then builds a personalized plan using goals, interests, energy level, social mode, venue preference, and break protection.

It adds a lightweight participation layer: attendees verify sessions through room codes, connect through buddy codes, earn XP as soft progress, unlock AI-credit-style reward tickets, generate non-redeemable claim request IDs for the demo, and get venue movement guidance.

## What Was Built

- React, Vite, Tailwind, and GSAP frontend.
- MindMarket-inspired human research studio design language.
- Python stdlib backend serving the app and `/api/import-event`.
- Local paste, CSV, `.ics`, text, and manual schedule import paths.
- Best-effort website schedule importer.
- Personalized plan generation based on interests, goals, energy, venue, breaks, and social mode.
- Room-code session verification.
- Buddy-code attendee connection flow.
- Reward Wallet with AI-credit-style claim tickets, server-side-minting explanation, and demo-safe claim request IDs.
- XP, progress, and venue rhythm panels.
- Submission package, static preview builder, audit scripts, and smoke tests.

## Data Quality Evidence

The built-in sample agenda is curated from the public PyConSG schedule source for demo stability. The app also supports user-provided event data through pasted agenda lines, CSV files, `.ics` calendar files, text files, manual quick-add, and best-effort website import through the Python backend.

The app is honest about data boundaries: website parsing depends on public HTML/text structure, PDF/image OCR is clearly marked as a future upgrade, and saved plans remain browser-local.

## User Focus Evidence

Event Buddy is designed for first-time conference attendees, introverted developers, AI/data/backend practitioners choosing between parallel talks, hackathon participants preserving energy, and event organizers who want a lightweight engagement layer.

User controls include goals, interests, energy level, social comfort, venue preference, protected breaks, and audience templates. The planner gives a humane plan rather than a generic calendar dump.

## Overall Experience And Project Value

The app combines agenda planning, social nudges, session verification, tangible reward readiness, and room movement into one event companion. It helps attendees decide what to attend, when to rest, how to make useful connections, and what proof they need for post-event AI-credit-style rewards without turning networking into pressure.

The design uses a bright, human-centered studio interface with a GSAP-powered pointer-follow hero signal and progress microinteraction, while keeping the interface focused on actual event-day workflows.

## Technical Execution

Stack:

- React 19
- Vite 8
- Tailwind CSS 4
- GSAP 3
- Python `ThreadingHTTPServer`
- Browser `localStorage`
- Makefile verification workflow

Verification:

- `make check`
- `make package`
- `make pages-preview-check`
- `make final-preflight`
- `make smoke`

Latest local verification passed on `2026-06-24`.

## AI Concepts / AI Ready ASEAN Notes

AI assistance was used to ideate, implement, debug, package, verify, and document the project. The runtime app does not send attendee data to a live AI model. Current recommendation behavior is deterministic and explainable: it scores sessions based on selected interests, session type, conflicts, venue movement, energy settings, social preference, and protected breaks.

The project is AI-ready because a later AI extractor could improve PDF, image, or messy website schedule import while preserving source labels and fallback behavior.

## Effective AI Tool Use

AI was used as a coding and product-design collaborator, with verification through local builds, smoke tests, package audits, and source checks. The repo includes explicit documentation of setup, limitations, demo flow, judging evidence, and AI-use boundaries so judges can inspect the work instead of relying on claims.

## Ethical AI Tool Use

- The app does not require sensitive personal data.
- Progress and saved plans stay in browser localStorage.
- Website import only fetches public event pages supplied by the user.
- Recommendations are assistive, not authoritative.
- PDF/image OCR and fully reliable website extraction are not overclaimed.
- Future AI extraction should preserve source labels, privacy boundaries, and user review before importing data.

## Demo Flow

1. Run `make check`, then `make run`.
2. Open `http://127.0.0.1:8000/index.html`.
3. Show the built-in PyConSG sample and the `Human agenda lab`.
4. Open `Upload schedule`.
5. Paste agenda text or upload CSV / `.ics`.
6. Add a manual session with the quick-add fields.
7. Select goals, interests, energy, social mode, and venue preference.
8. Show the generated fieldwork plan and why it was recommended.
9. Enter a displayed room code to verify attendance.
10. Open Buddy and enter another attendee code.
11. Open Rewards, show the Reward Wallet, and generate an AI-credit claim request ID.
12. Open Venue to show movement guidance.
13. Run `make smoke` to verify the live app.

## How To Run

```bash
pnpm install
make check
make run
```

Open:

```text
http://127.0.0.1:8000/index.html
```

For static preview:

```bash
make pages-preview-check
```

For package:

```bash
make package
```

## Honest Limitations

- Website import is best-effort and depends on the event page structure.
- PDF/image upload is an OCR-next placeholder.
- Progress and saved plans are browser-local.
- Calendar export is not implemented yet.
- Room codes, buddy codes, and claim request IDs are demo verification mechanics, not production-grade security or real voucher codes.

## Future Work

- Add OCR/API extraction for PDF and image schedules.
- Add calendar export.
- Add organizer-facing QR-code generation.
- Add privacy-preserving organizer analytics.
- Add public deployment with a small hosted backend for website imports.
