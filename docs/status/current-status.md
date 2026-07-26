# Current Status

Atlas v1.0.0 is a Static-first, Local-first, Offline-first GitHub Pages PWA.

## v1.1 Planning Status

- Current branch: `master`.
- Baseline commit: `71dc590ddbe6e9165faf90b9eeea81b8c6a510f7`.
- Latest release tag found locally: none for v1.0.0.
- Planning output: `docs/roadmap/v1.1-roadmap.md` and `.codex/atlas-v1.1-implementation-queue.json`.
- Completed batches: BATCH-001 read-only execution, notification, and calendar surfaces; BATCH-002 notification duplicate prevention and backup coverage planning; BATCH-003 command/event traceability and status documentation alignment.
- Next selected batch: BATCH-004, accessibility status announcements and security static audit.
- No schema migration, catalog change, service worker change, release version change, backend, cloud runtime, or remote database is part of the current v1.1 queue state.

## Runtime Boundary

- Implemented runtime: static PWA, browser runtime, generated knowledge JSON, IndexedDB persistence, local calculation and simulator fixtures.
- Canonical knowledge source: `knowledge/**/*.md`.
- Generated knowledge output: `frontend/knowledge/**`.
- Future optional architecture: `backend/`, `database/`, and `ai/`.
- Not a v1 runtime dependency: ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync.

## Implemented Surfaces

- Knowledge index generation from canonical Markdown into frontend JSON.
- PWA shell with manifest, service worker, offline cache validation, and GitHub Pages workflow.
- Dashboard snapshot rendering, scenario switching, local scenario comparison, recommendation decisions, loan calculation panel, export report preview, and validation export.
- Domain contracts and command services for Scenario and Decision local runtime, including lifecycle/state-machine validation and recommendation disposition audit evidence.
- IndexedDB repositories for scenarios, recommendation decisions, settings, audit entries, backup export, encrypted backup export, dry-run restore, staged restore, merge restore, and migration metadata.
- Simulator fixtures, formula registry validation, score policy validation, dashboard runtime snapshots, dashboard fixture drift validation, and runtime fixture drift validation.
- v1.1 planning governance, candidate gates, dependency map, implementation queue, risk register, acceptance baseline, and validation plan.
- v1.1 BATCH-001 read-only execution, action planning, calendar, scheduler status, and notification surfaces.
- v1.1 BATCH-002 notification duplicate prevention and backup coverage plan.
- v1.1 BATCH-003 command/event traceability matrix and status documentation alignment.

## Evidence

- README runtime boundary: `README.md`.
- Frontend runtime boundary: `frontend/README.md`.
- PWA shell: `frontend/index.html`, `frontend/src/main.js`, `frontend/src/indexeddb-runtime.js`, `frontend/sw.js`, `frontend/manifest.webmanifest`.
- Knowledge generation: `frontend/scripts/build-knowledge-index.mjs`.
- Simulator: `simulator/scripts/`, `simulator/fixtures/`, `frontend/fixtures/`.
- GitHub Pages workflow: `.github/workflows/pages.yml`.
