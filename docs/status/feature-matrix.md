# Feature Matrix

| Area | Runtime Status | Evidence | Notes |
| --- | --- | --- | --- |
| Knowledge catalog | Implemented | `knowledge/**/*.md`, `frontend/knowledge/index.json` | Canonical Markdown is generated into static frontend JSON. |
| Knowledge browser UI | Implemented | `frontend/src/main.js` | Category navigation, search scoring, document viewer, heading links. |
| PWA shell | Implemented | `frontend/index.html`, `frontend/manifest.webmanifest`, `frontend/sw.js` | Static app shell for GitHub Pages deployment. |
| Offline cache | Implemented | `frontend/scripts/validate-offline-cache.mjs` | Validates service worker cache contract. |
| IndexedDB runtime | Implemented | `frontend/src/indexeddb-runtime.js` | Local persistence repositories and backup workflows. |
| Dashboard snapshots | Implemented | `frontend/fixtures/dashboard-snapshots.json`, `frontend/src/dashboard-model.js` | Static dashboard fixtures plus fallback normalization. |
| Scenario persistence | Implemented | `frontend/src/indexeddb-runtime.js` | Local scenario save, delete, reset, template save. |
| Scenario domain runtime | Implemented | `frontend/src/domain/scenario/`, `frontend/src/application/scenarios/scenario-application-service.js` | Catalog-bounded assumptions, lifecycle validation, owner-scoped commands, and audit evidence. |
| Decision domain runtime | Implemented | `frontend/src/domain/decision/`, `frontend/src/application/decisions/decision-application-service.js` | Decision validation, state-machine transitions, required rationale evidence, and recommendation disposition recording. |
| Recommendation decisions | Implemented | `frontend/src/main.js`, `frontend/src/indexeddb-runtime.js` | Accept/reject/defer decision persistence and audit trail. |
| Loan panel | Implemented | `frontend/src/main.js` | Local amortized payment calculation and input validation. |
| Portfolio export report | Implemented | `frontend/src/main.js`, `frontend/reports/export-report-sample.json` | JSON report versioning and sample export. |
| Backup and restore | Implemented | `frontend/src/indexeddb-runtime.js` | Plain/encrypted backup, dry run, staged restore, merge policy. |
| Simulator fixtures | Implemented | `simulator/fixtures/`, `simulator/scripts/` | Local fixture validation and deterministic output checks. |
| Backend API | Prototype only | `backend/README.md`, `backend/*.mjs` | Not required for v1 PWA runtime. |
| Database | Future optional | `database/README.md` | Not required for v1 PWA runtime. |
| AI integration | Future optional | `ai/README.md` | Not required for v1 PWA runtime. |
