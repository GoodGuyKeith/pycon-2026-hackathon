# Event Buddy Judging Checklist

## Criteria Evidence

| Area | What To Show |
| --- | --- |
| User Focus | Import controls, goals, interests, energy, social mode, venue preference, and protected breaks |
| Experience Value | Personalized plan, venue rhythm, progress counters, rewards, session code verification, and buddy-code networking |
| Technical Execution | React/Vite/Tailwind frontend, Python `/api/import-event`, static preview, smoke test, and submission package |
| Data Quality | Built-in PyConSG sample plus paste, CSV, `.ics`, manual, and website import paths |

## Demo Checklist

1. Open `http://127.0.0.1:8000/index.html`.
2. Show `Human agenda lab` and `Research desk`.
3. Open `Upload schedule`.
4. Generate a plan from the PyConSG sample.
5. Verify a session with a visible session code.
6. Connect a buddy code.
7. Show rewards and venue rhythm.

## Known Limitations

- Website import is best-effort.
- PDF/image OCR is a marked next step.
- Calendar export is not implemented.
- Saved plans are local to the browser.

## Last Local Verification

Run before submission:

```bash
make check
make pages-preview-check
make package
make smoke
make final-preflight
```
