# Runtime Boundary ADR

## Status

Accepted for Atlas v1.

## Decision

Atlas v1 runtime is a Static-first, Local-first, Offline-first GitHub Pages PWA.

Production startup and daily use must depend only on:

- Static files under `frontend/`.
- Generated knowledge JSON under `frontend/knowledge/**`.
- Browser runtime APIs.
- IndexedDB persistence.
- Local calculation and simulator-compatible fixtures.
- Service worker and offline cache assets.

## Future Optional Architecture

The following areas are allowed for prototypes, build-time checks, test-time checks, documentation, and future architecture exploration:

- `backend/`
- `database/`
- `ai/`
- ASP.NET Core
- PostgreSQL
- EF Core
- Server REST API
- Cloud Database
- Authentication Server
- Multi-device Sync

They are prohibited as required dependencies for `npm run dev`, GitHub Pages deployment, production PWA startup, knowledge browsing, dashboard rendering, offline use, or IndexedDB persistence.

## Allowed

- Frontend importing from `frontend/src/**`.
- Frontend fetching static relative assets such as `knowledge/index.json`, `fixtures/*.json`, and `reports/*.json`.
- Test scripts reading `backend/`, `database/`, or `ai/` as prototype evidence.
- Simulator scripts using deterministic local fixtures.
- Build scripts generating static frontend artifacts.

## Prohibited

- Production frontend importing files from `backend/`, `database/`, or `ai/`.
- Production frontend requiring server endpoints to render the home screen, dashboard, knowledge explorer, offline repair, backup, or scenario workflows.
- Committing database credentials, server connection strings, tokens, or cloud secrets.
- Adding authentication server, cloud database, or multi-device sync as a v1 runtime gate.

## Promotion Criteria

Future optional architecture can be promoted only when:

- A new ADR changes the v1 runtime boundary.
- Static PWA fallback remains available.
- Secrets and credentials stay out of static assets.
- Offline-first behavior has an explicit degradation path.
- Release validation proves no production frontend imports server-only dependencies.
