# Next Priority

1. Generate the detailed Codex implementation prompt for v1.1 BATCH-001.
2. Keep BATCH-001 limited to read-only execution, notification, and calendar surfaces.
3. Do not add domains, business concepts, formulas, state-machine states, IndexedDB migrations, service worker changes, backend, cloud runtime, remote database, external analytics, AI, or automated financial execution.
4. Use existing Atlas catalog naming and canonical knowledge references from `docs/roadmap/v1.1-candidate-inventory.md`.
5. Validate BATCH-001 with `npm run validate:quick`, `npm run validate:feature`, and `npm run validate:visual-regression`.
6. Keep rejected, deferred, needs-specification, and needs-architecture-decision candidates out of `.codex/atlas-v1.1-implementation-queue.json` active batches.
7. Mark unsupported runtime surfaces as `Not Implemented` instead of implying hidden backend or cloud behavior.
