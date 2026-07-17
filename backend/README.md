# Backend

Atlas v1 is a Static-first, Local-first GitHub Pages PWA. `backend/` is not the v1 core Runtime and must not become a required dependency for frontend startup, Browser Runtime calculation, Offline-first dashboards, IndexedDB Persistence, or Knowledge JSON loading.

This directory is retained only as Future Optional Architecture, a Future Adapter location, or a prototype area for services that cannot be handled safely or efficiently by the static frontend.

## Reserved Scope

- Optional Future Cloud Architecture API services for sync, shared accounts, or integrations.
- Server-side job processing for workflows that require trusted execution.
- Secure storage adapters if local-first storage is later extended to multi-device scenarios.
- Integration gateways for external financial, calendar, notification, or reporting systems.
- ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync experiments only when they remain optional for v1.

## Current Constraint

- Do not introduce a backend dependency for core knowledge browsing, PWA startup, or local scenario work.
- Frontend runtime data should continue to come from static generated artifacts unless a documented architecture decision changes this.
- Backend behavior must align with `docs/api/`, `docs/specification/`, and `knowledge/api/`.
- Backend prototypes must not change Domain meaning, Business Rules, Formulas, Entities, Calculations, or generated fixture expected results.

## Implementation Notes

- Keep APIs deterministic, versioned, and auditable.
- Avoid duplicating domain rules that already belong in `knowledge/rule/`.
- Treat local-first behavior as the baseline user experience.
- Introduce any required backend runtime only through a future ADR.
