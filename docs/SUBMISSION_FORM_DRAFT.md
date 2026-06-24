# Submission Form Draft

## Project Title

Event Buddy

## One-Liner

A warm event companion that imports agendas, recommends a personalized day plan, verifies attendance by room code, helps attendees make buddy-code connections, and turns participation into claimable AI-credit reward requests.

## Track

Open Track.

## Problem

Conference schedules are dense. Attendees, especially first-timers or introverts, often do not know which talks to choose, how much movement they are signing up for, when to take breaks, or how to start useful conversations.

## Solution

Event Buddy turns an event agenda into a human-centered fieldwork plan. Users can start with the PyConSG sample, paste agenda text, upload CSV or `.ics` files, try a website URL import, or add sessions manually. The app then builds a personalized plan using goals, energy level, social mode, venue preference, and break protection.

It adds a lightweight participation layer: attendees verify sessions through room codes, connect through buddy codes, earn XP as soft progress, unlock AI-credit-style reward tickets, generate demo-safe claim request IDs, and get venue movement guidance.

## Why It Fits PyConSG

- **Data Quality:** Uses a public PyConSG sample agenda, clear source notes, CSV/calendar importers, and honest best-effort website parsing.
- **User Focus:** Helps first-time attendees, introverted developers, AI/data/backend practitioners, and hackathon participants reduce choice overload.
- **Overall Experience & Project Value:** Combines agenda planning, social nudges, session verification, tangible reward readiness, and room movement into one event companion.
- **Technical Execution:** React, Tailwind, Vite, Python stdlib backend, local persistence, local smoke tests, static preview tooling, and package scripts.

## Tech Stack

- React frontend
- Tailwind CSS design system
- Vite build workflow
- Python `ThreadingHTTPServer` backend
- Browser localStorage persistence
- No paid runtime service required for the demo

## Demo Script

1. Run `make check`, then `make run`.
2. Open `http://127.0.0.1:8000/index.html`.
3. Show the built-in PyConSG sample and the MindMarket-inspired `Human agenda lab`.
4. Paste agenda text or upload CSV / `.ics`.
5. Add a manual session with `Quick interview card`.
6. Select goals, energy, social mode, and venue drift.
7. Show the generated fieldwork plan and why it was recommended.
8. Enter a displayed room code to verify attendance.
9. Open Buddy and enter another attendee code.
10. Open Rewards, show the Reward Wallet, and generate an AI-credit claim request ID.
11. Open Venue to show movement guidance.
12. Run `make smoke` to verify the live app.

## Honest Limitations

- Website import is best effort.
- PDF/image upload is an OCR-next placeholder.
- Progress and saved plans are browser-local.
- Calendar export is not implemented yet.
- Reward claim IDs are demo request IDs, not real voucher codes.

## Future Work

- Add OCR/API extraction for PDF and image schedules.
- Add calendar export.
- Add organizer-facing analytics with privacy-preserving aggregates.
- Add QR generation for event organizers.
