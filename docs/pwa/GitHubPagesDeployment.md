# GitHub Pages Deployment

## Build

- Use Vite.
- Set `base` to `/<repository-name>/` for a project site.
- Use HashRouter unless a verified 404 fallback is maintained.
- Produce immutable hashed assets.
- Generate PWA manifest and service worker.

## GitHub Actions Pipeline

1. Checkout.
2. Install with locked dependencies.
3. Type-check.
4. Run unit tests.
5. Run build.
6. Run PWA asset validation.
7. Upload Pages artifact.
8. Deploy to GitHub Pages.

## Repository Safety

The repository contains only code, specifications, fixtures with synthetic data, and public assets. Real backups and financial data are ignored by Git.
