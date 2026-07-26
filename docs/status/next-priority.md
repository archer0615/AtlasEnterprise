# Next Priority

1. Keep `knowledge/**/*.md` as the only canonical source and regenerate `frontend/knowledge/**` through `npm run build:knowledge`.
2. Keep v1 runtime dependency-free from backend, cloud database, authentication server, and sync services.
3. Complete Recommendation and Execution Planning Local Data Vertical Slice without changing Scenario or Decision contracts.
4. Expand traceability coverage from entity-level rows into field-level runtime mappings only where UI or fixture evidence exists.
5. Keep simulator and dashboard fixtures deterministic and validated before changing generated runtime snapshots.
6. Run `npm run validate:frontend` before changes that affect knowledge, PWA, offline runtime, simulator-facing fixtures, or IndexedDB stores.
7. Generate the detailed Codex implementation prompt for v1.1 BATCH-002.
8. Keep BATCH-002 limited to notification duplicate prevention and backup coverage planning.
9. Do not add domains, business concepts, formulas, state-machine states, IndexedDB migrations, service worker changes, backend, cloud runtime, remote database, external analytics, AI, or automated financial execution.
10. Use existing Atlas catalog naming and canonical knowledge references from `docs/roadmap/v1.1-candidate-inventory.md`.
11. Validate BATCH-002 with `npm run validate:quick` and `npm run validate:full`.
12. Keep rejected, deferred, needs-specification, and needs-architecture-decision candidates out of `.codex/atlas-v1.1-implementation-queue.json` active batches.
13. Mark unsupported runtime surfaces as `Not Implemented` instead of implying hidden backend or cloud behavior.
