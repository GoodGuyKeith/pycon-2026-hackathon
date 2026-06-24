# Public Repo Checklist

## Before Publishing

- Run `make check`.
- Run `make pages-preview-check`.
- Run `make package`.
- Run `make repo-preflight`.
- Confirm `dist/`, `.agent/`, caches, and local saved data are ignored.

## Do not commit generated/local files

- `dist/`
- `.agent/`
- `__pycache__/`
- `.DS_Store`
- browser-local saved plans or exported scratch files

## Recommended Repo Description

Event Buddy: a MindMarket-inspired live event companion for PyConSG 2026 that imports schedules, recommends a personal day plan, verifies session attendance by code, and helps attendees meet people with less friction.

## Final Public Check

After publishing, open the repository in a private browser window and confirm the README, screenshot, judge packet, and static preview link are visible without private account access.
