# Deployment Guide

Event Buddy has two useful run modes.

## Recommended Judged Demo: Built React App + Python Server

Use this when demonstrating the full project.

```bash
make check
make run
```

Open:

```text
http://127.0.0.1:8000/index.html
```

Then verify in another terminal:

```bash
make smoke
```

This mode supports:

- local backend API
- built React/Tailwind/Vite frontend
- best-effort website agenda import
- CSV and `.ics` browser imports
- session room-code verification
- buddy-code networking progress
- smoke test verification

## Active Frontend Design Mode

Run the Python API and Vite dev server in separate terminals:

```bash
make run
make dev
```

Open the Vite URL printed by `make dev`. Vite proxies `/api` to `http://127.0.0.1:8000`.

## Static Preview Mode

Run `make pages-preview-check` to build the Vite app and copy a static preview bundle to `dist/pages-preview`.

If the repository is published on GitHub, `.github/workflows/pages.yml` validates the same static preview bundle on every push to `main`. If you later enable GitHub Pages, use `dist/pages-preview` as the build output pattern for the deploy step.

To check the static preview bundle locally:

```bash
make pages-preview-check
```

This writes the preview files to `dist/pages-preview`, which is ignored by Git.

This mode supports:

- Event Buddy planner UI
- agenda paste, CSV, and `.ics` imports
- browser-local check-ins, saved plans, and buddy-code progress

Static mode does **not** support the Python backend endpoints:

- `/api/import-event`

For judging, prefer the Python server mode because it demonstrates Technical Execution more clearly.

## Public Repo Recommendation

Use the public repo as the source of truth for:

- project description
- judging criteria evidence
- demo script
- pitch deck outline
- screenshot
- clean submission zip

Use `docs/PUBLIC_REPO_CHECKLIST.md` before publishing so generated local files are not committed.

## Container Option

If Docker is available:

```bash
make docker-build
make docker-run
```

Docker was not available in the current Codex environment, so this path is provided for reproducibility but not locally verified here.
