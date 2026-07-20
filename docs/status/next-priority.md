# Next Priority

1. Keep `knowledge/**/*.md` as the only canonical source and regenerate `frontend/knowledge/**` through `npm run build:knowledge`.
2. Keep v1 runtime dependency-free from backend, cloud database, authentication server, and sync services.
3. Expand traceability coverage from entity-level rows into field-level runtime mappings only where UI or fixture evidence exists.
4. Keep simulator and dashboard fixtures deterministic and validated before changing generated runtime snapshots.
5. Run `npm run validate:frontend` before changes that affect knowledge, PWA, offline runtime, simulator-facing fixtures, or IndexedDB stores.
6. Mark unsupported runtime surfaces as `Not Implemented` instead of implying hidden backend or cloud behavior.
