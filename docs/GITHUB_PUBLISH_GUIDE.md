# GitHub Publish Guide

## Recommended Repository Settings

- Public repository
- MIT license file included
- Static preview workflow enabled in `.github/workflows/pages.yml`
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
- `.github/workflows/pages.yml` should validate the static preview bundle.
- Locally run `make pages-preview-check` before relying on Pages.
- Run `make repo-preflight` before pushing.

## Final Sanity Check

Open the public repo in a private browser window. Confirm the README renders, the demo media loads, and no generated local files are visible. If you enable GitHub Pages later, also confirm the Pages URL loads the static preview.
