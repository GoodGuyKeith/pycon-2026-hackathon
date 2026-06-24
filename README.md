# Event Buddy

A Track 2 Open Track prototype for turning any conference, meetup, or workshop day into a live companion game. It can run from the built-in PyConSG sample agenda, paste text, upload CSV/calendar files, add sessions manually, or try a best-effort website import through the local backend.

Install and build with the bundled or system `pnpm`, then run the Python backend:

```bash
pnpm install
make check
make run
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

The app also works as a static browser app if opened through any local static server.

For active frontend design work:

```bash
make run
make dev
```

Open the Vite dev server printed by `make dev`; it proxies `/api` to the Python backend.

## What It Does

- Imports pasted agenda lines into structured sessions
- Uses a React, Tailwind, Vite, and GSAP frontend with a MindMarket-inspired human research studio design language
- Imports CSV schedule exports and `.ics` calendar files locally in the browser
- Tries best-effort website importing through `/api/import-event`
- Supports manual quick-add for small events or cleanup
- Accepts PDF/image uploads as clear OCR-next placeholders
- Keeps PyConSG as a built-in sample event for demo reliability
- Recommends talks, workshops, and community blocks from user goals
- Resolves same-time conflicts between venues
- Protects breaks based on energy level
- Verifies attendance through session QR or room codes
- Counts verified networking through attendee buddy codes
- Generates introvert-friendly or high-social networking prompts
- Shows why a plan was recommended
- Unlocks AI-credit-style reward tickets from verified sessions and buddy-code connections
- Generates demo-safe claim request IDs instead of exposing real voucher codes
- Summarizes venue rhythm across rooms, breaks, and workshops
- Copies and saves plans locally in the browser

## Why This Is Track 2

It is useful, playful, and community-focused. The product is not trying to be a generic calendar; it is an event companion that helps attendees reduce choice overload, verify participation, and make the hallway track less awkward.

## Demo Flow

1. Start with the built-in PyConSG sample.
2. Paste a few agenda lines from another event, or upload a CSV / `.ics` file.
3. Try a website URL to show the backend import path and fallback behavior.
4. Add one manual session to show small-event cleanup.
5. Set goals and generate a plan.
6. Verify a session using the displayed room code.
7. Connect with another attendee using their buddy code.
8. Show XP, session progress, the Reward Wallet AI-credit claim flow, and venue movement guidance.

Demo capture assets:

- `assets/event-buddy-demo-current.png`
- `assets/event-buddy-demo.mp4` — captioned walkthrough of import, planning, verification, buddy connection, Reward Wallet claim, and venue guidance

## Verification

```bash
make check
make pages-preview-check
make package
make smoke
```

`make check` builds the Vite app and compiles Python files. `make pages-preview-check` validates the static preview bundle. `make package` builds and audits `dist/event-buddy-submission.zip`. `make smoke` verifies a running local server.

## Data Note

The built-in sample agenda is seeded from the public PyConSG schedule page. Generic import supports pasted schedule text in a simple `time | venue | title | speaker | tags` format, CSV columns such as `start,end,venue,title,speaker,track`, and `.ics` calendar files. Website import is best-effort because event websites vary widely. PDF/image OCR is intentionally labeled as the next API-backed upgrade rather than pretending it works locally.
