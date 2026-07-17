# Project Context

Atlas v1 is governed by `docs/architecture/ADR-001-static-local-first-pwa.md`.

## PWA v1 Runtime

- GitHub Pages
- Static PWA
- Browser Runtime
- Offline-first
- IndexedDB Persistence
- Local Calculation Runtime
- Repository Interfaces with IndexedDB Repository Adapters
- Generated Knowledge JSON from canonical Markdown

## Future Optional Architecture

ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, Multi-device Sync, hosted APIs, and always-online backend behavior are Future Optional Architecture only.

## Boundaries

- Do not make `backend/` required for frontend startup or operation.
- Do not modify Business Rules, Formula definitions, Entity meaning, Calculation semantics, Domain Catalogs, or fixture expected results as part of architecture governance alignment.
- Do not manually edit generated `frontend/knowledge/` JSON.