# Next Priority

1. Generate the detailed Codex implementation prompt for v1.1 BATCH-002.
2. Keep BATCH-002 limited to notification duplicate prevention and backup coverage planning.
3. Do not add domains, business concepts, formulas, state-machine states, IndexedDB migrations, service worker changes, backend, cloud runtime, remote database, external analytics, AI, or automated financial execution.
4. Use existing Atlas catalog naming and canonical knowledge references from `docs/roadmap/v1.1-candidate-inventory.md`.
5. Validate BATCH-002 with `npm run validate:quick` and `npm run validate:full`.
6. Keep rejected, deferred, needs-specification, and needs-architecture-decision candidates out of `.codex/atlas-v1.1-implementation-queue.json` active batches.
7. Mark unsupported runtime surfaces as `Not Implemented` instead of implying hidden backend or cloud behavior.
