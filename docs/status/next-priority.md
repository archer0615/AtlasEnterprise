# Next Priority

1. Keep `knowledge/**/*.md` as the only canonical source and regenerate `frontend/knowledge/**` through `npm run build:knowledge`.
2. Keep v1 runtime dependency-free from backend, cloud database, authentication server, sync services, external analytics, AI, and automated financial execution.
3. Treat v1.1 as release certified and closed at tag `v1.1.0`.
4. Start v1.2 planning from `docs/roadmap/v1.2-roadmap.md` and `docs/roadmap/v1.2-candidate-inventory.md`.
5. Complete specifications before runtime for Insurance, CSV import, and any new domain behavior.
6. Complete an ADR before Position persistence, schema migration, backup version changes, or rollback behavior.
7. Add performance automation only after measured evidence identifies a regression or bottleneck.
8. Keep simulator and dashboard fixtures deterministic and validated before changing generated runtime snapshots.
9. Run `npm run validate:frontend` before changes that affect knowledge, PWA, offline runtime, simulator-facing fixtures, or IndexedDB stores.
10. Use existing Atlas catalog naming and canonical knowledge references; do not introduce new business concepts through UI-only changes.
11. Keep rejected backend/cloud candidates out of active queues unless a future architecture decision changes the static-first boundary.
12. Mark unsupported runtime surfaces as `Not Implemented` instead of implying hidden backend or cloud behavior.
