# PyConSG Hackathon Submission Notes

## Project

**Event Buddy** is a live event companion for conferences, meetups, and workshops. It imports an agenda, helps attendees choose a humane plan, verifies session attendance by room code, encourages low-friction buddy-code networking, and turns verified participation into claimable AI-credit reward requests.

## Track Fit

Primary framing: **Open Track** because the project is playful, community-focused, and useful beyond a single event.

Secondary relevance: event organizers can adapt it as a lightweight engagement layer without needing paid services for the demo.

## User

- First-time conference attendees.
- Introverted developers who want low-pressure conversation prompts.
- AI/data/backend practitioners choosing between parallel talks.
- Hackathon participants trying to preserve energy.
- Event organizers who want simple engagement mechanics.

## Demo Flow

1. Run `make check` and `make run`.
2. Open `http://127.0.0.1:8000/index.html`.
3. Start with the built-in PyConSG sample.
4. Show agenda import: paste, CSV, `.ics`, website URL, and manual quick entry.
5. Pick an audience template and tune energy/social/venue controls.
6. Show the recommended fieldwork plan.
7. Verify a session using the displayed room code.
8. Connect with another attendee code.
9. Show the Reward Wallet, generate an AI-credit claim request ID, and explain that real vouchers would be sponsor/organizer issued.
10. Show venue movement guidance.

## Judging Criteria Coverage

### Data Quality

The app uses a curated PyConSG sample, supports structured CSV and `.ics` imports, parses pasted agenda lines, and labels website/PDF/image limits honestly.

### User Focus

The interface accounts for energy, social comfort, interests, venue movement, and protected breaks. It gives introvert-friendly conversation prompts instead of assuming everyone wants high-volume networking.

### Overall Experience & Project Value

The MindMarket-inspired design makes the app feel like a human research studio rather than a generic calendar. The planner, check-ins, buddy codes, AI-credit reward wallet, and transfer map make the event day more actionable.

### Technical Execution

The project uses React, Tailwind, Vite, a Python stdlib backend, local persistence, smoke tests, package tooling, and static preview tooling.

## Honest Limitations

- Website URL import is best effort.
- PDF/image upload is an OCR-next placeholder.
- Saved plans are browser-local only.
- Reward claim IDs are demo request IDs, not real voucher codes.
- Calendar export and organizer admin tools are not implemented yet.

## Next Best Upgrade

Add OCR-backed schedule extraction and organizer QR-code generation so event teams can publish room codes directly.
