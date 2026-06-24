# GitHub Publish Guide

## Recommended Repository Settings

- Public repository
- MIT license file included
- GitHub Pages enabled from the workflow in `.github/workflows/pages.yml`
- Default branch protected if time allows

## Publish With Git

```bash
make repo-preflight
git status --short
git add .
git commit -m "Prepare Event Buddy hackathon submission"
git branch -M main
git remote add origin <public-repo-url>
git push -u origin main
```

## Required Checks

- `.github/workflows/check.yml` should run `make check`.
- `.github/workflows/pages.yml` should build the static preview.
- Locally run `make pages-preview-check` before relying on Pages.
- Run `make repo-preflight` before pushing.

## Final Sanity Check

Open the public repo and Pages URL in a private browser window. Confirm the app loads, the README renders, and no generated local files are visible.
