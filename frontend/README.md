# Frontend

Static-first, Local-first GitHub Pages PWA shell for Atlas Enterprise.

Atlas v1 runtime is Browser Runtime, Offline-first behavior, IndexedDB Persistence, generated Knowledge JSON, and Local Calculation Runtime.

## Scripts

- `npm run build:knowledge` generates static JSON content from `knowledge/**/*.md`.
- `npm run build` refreshes the static knowledge artifact.
- `npm run start` serves the generated static PWA from `frontend/`.
- `npm run dev` refreshes generated static JSON and starts the local static PWA server.
- `npm run validate:pwa` validates the static shell, manifest, service worker, and generated knowledge index.
- Serve the `frontend/` directory with any static HTTP server for local testing or deployment.

## Runtime Data

The app does not require a backend, Cloud Database, Authentication Server, Multi-device Sync, or Server REST API to start or operate. Knowledge content is generated at build time into `frontend/knowledge/` and served as static assets. User-owned runtime state belongs in IndexedDB Persistence through repository adapters.

## Runtime Boundaries

- Canonical content remains in `knowledge/**/*.md`.
- Generated JSON under the frontend is runtime data, not the source of truth.
- User financial data must stay in local browser storage and must not be bundled into static assets.
- Backend services, ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync are Future Optional Architecture and must not be required for core PWA startup, Browser Runtime calculation, or Offline-first dashboards.

## Validation

Before deployment, run the knowledge build, PWA validation, offline validation, and deployment validation so the shell can load generated content, install metadata, and offline cache entries consistently.
