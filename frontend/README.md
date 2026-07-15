# Frontend

Static-first PWA shell for Atlas Enterprise Knowledge.

## Scripts

- `npm run build:knowledge` generates static JSON content from `knowledge/**/*.md`.
- `npm run build` refreshes the static knowledge artifact.
- `npm run validate:pwa` validates the static shell, manifest, service worker, and generated knowledge index.
- Serve the `frontend/` directory with any static HTTP server for local testing or deployment.

## Runtime Data

The app does not require a backend database. Knowledge content is generated at build time into `frontend/knowledge/` and served as static assets.

## Runtime Boundaries

- Canonical content remains in `knowledge/**/*.md`.
- Generated JSON under the frontend is runtime data, not the source of truth.
- User financial data must stay in local browser storage and must not be bundled into static assets.
- Backend services are optional future extensions and must not be required for core PWA startup.

## Validation

Before deployment, run the knowledge build and PWA validation so the shell can load generated content, install metadata, and offline cache entries consistently.
