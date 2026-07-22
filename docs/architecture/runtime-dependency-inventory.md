# Runtime Dependency Inventory

| Module | Layer | Runtime / Build / Test | Depends On | Imported By | Allowed | Violation | Action |
| ------ | ----- | ---------------------- | ---------- | ----------- | ------- | --------- | ------ |
| `frontend/src/main.js` | Entry Point | Runtime | `frontend/src/app/bootstrap.js` | Browser | Yes | No | Keep entry small |
| `frontend/src/app/**` | Application | Runtime | Feature controllers, shared services | Entry | Yes | No | Own composition |
| `frontend/src/features/**/**-controller.js` | Feature Controller | Runtime | Same feature view, shared utility | App | Yes | No | Keep orchestration here |
| `frontend/src/features/**/**-view.js` | Feature View | Runtime | Shared UI helpers only | Controller | Yes | No | No repository/runtime imports |
| `frontend/src/*projection*.js` | Runtime Projection | Runtime | Pure data helpers | App/runtime | Yes | No | Keep DOM independent |
| `frontend/src/decision-workbench.js` | Decision Runtime | Runtime | Runtime projection parsing | App/runtime | Yes | No | Keep DOM independent |
| `frontend/src/knowledge-explorer.js` | Knowledge Runtime | Runtime | Generated knowledge contract data | App/runtime | Yes | No | No canonical knowledge import |
| `frontend/src/pwa-offline-state.js` | PWA Runtime | Runtime | PWA state data | PWA controller | Yes | No | No feature imports |
| `frontend/src/readiness-policy.js` | Readiness Runtime | Runtime | Policy data | PWA controller | Yes | No | No DOM dependency |
| `frontend/src/repositories/**` | Repository Contract | Runtime | JSDoc/runtime contracts | App/infrastructure | Yes | No | Contract only |
| `frontend/src/infrastructure/indexeddb/**` | IndexedDB Infrastructure | Runtime | Repository contracts, IndexedDB boundary | Compatibility facade | Yes | No | Raw API remains contained |
| `frontend/src/indexeddb-runtime.js` | IndexedDB Infrastructure | Runtime | Browser persistence APIs | Legacy runtime facade | Yes | No | Compatibility facade retained |
| `frontend/knowledge/**` | Generated Artifact Reader | Runtime | Build output JSON | Knowledge runtime/UI | Yes | No | Generated artifact only |
| `knowledge/**` | Canonical Knowledge | Build | Markdown source | Generator scripts | Yes | No | Not browser imported |
| `frontend/fixtures/**` | Test Fixture | Test/Demo | JSON fixture data | Validation/demo flows | Yes | No | Explicit fixture boundary |
| `frontend/scripts/**` | Validation Script | Test | Node APIs, browser tools | npm scripts | Yes | No | Not production imported |
| `frontend/service-worker.js` | Service Worker | Runtime | Cache contract | Browser SW runtime | Yes | No | No feature imports |
