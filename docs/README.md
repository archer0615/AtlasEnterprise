# Atlas Documentation

Atlas v1 documentation is governed by [ADR-001 Static Local First PWA](architecture/ADR-001-static-local-first-pwa.md).

## PWA v1 Architecture

- GitHub Pages
- Static PWA
- Browser Runtime
- Offline-first
- IndexedDB Persistence
- Local Calculation Runtime
- Repository Interfaces with IndexedDB Repository Adapters
- Generated Knowledge JSON from canonical Markdown

## Future Optional Architecture

The following are not required for Atlas v1 and must remain Future Optional Architecture unless a later ADR changes that:

- ASP.NET Core
- PostgreSQL
- EF Core
- Server REST API
- Cloud Database
- Authentication Server
- Multi-device Sync

## Documentation Boundaries

- Canonical knowledge remains in `knowledge/**/*.md`.
- Generated `frontend/knowledge/` JSON must not be edited manually.
- Architecture documents may describe future adapters, but v1 startup, Browser Runtime calculation, Offline-first dashboards, and IndexedDB Persistence must not depend on them.
