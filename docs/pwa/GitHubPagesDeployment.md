# GitHub Pages Deployment

## Build

- Run `npm run build`.
- Use `frontend/` as the static publish directory.
- Include generated `frontend/knowledge/` JSON files in the Pages artifact.
- Include `frontend/manifest.webmanifest`, `frontend/sw.js`, and `frontend/icons/`.
- Keep app navigation hash-based for direct document links such as `#doc=<id>`.
- Do not require Future Architecture services, hosted APIs, or server databases for the PWA v1 Runtime.
- IndexedDB Runtime is the browser-local persistence target for scenarios and user-owned runtime state.

## GitHub Actions Pipeline

1. Checkout.
2. Run `npm run build`.
3. Run `npm run validate:pwa`.
4. Upload `frontend/` as the Pages artifact.
5. Deploy to GitHub Pages.

## Static Server Validation

Use any static HTTP server with `frontend/` as the document root.

Required URLs:

- `/`
- `/manifest.webmanifest`
- `/sw.js`
- `/src/main.js`
- `/src/styles.css`
- `/knowledge/index.json`
- `/knowledge/search-index.json`
- `/icons/atlas-icon.svg`

All required URLs must return HTTP 200 before deployment.

## Repository Safety

The repository contains only code, specifications, fixtures with synthetic data, and public assets. Real backups and financial data are ignored by Git.

## Future Architecture

Future Cloud Architecture may add hosted APIs, cloud persistence, or sync later, but GitHub Pages deployment remains the PWA v1 deployment baseline.
