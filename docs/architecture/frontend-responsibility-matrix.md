# Frontend Responsibility Matrix

| Responsibility | Current Location | Target Module | Dependency | Public API | Test Evidence |
| -------------- | ---------------- | ------------- | ---------- | ---------- | ------------- |
| Application bootstrap | `frontend/src/main.js` | `frontend/src/app/bootstrap.js` | Application context | `bootstrapApplication()` | `test-application-bootstrap` |
| Dependency creation | `frontend/src/app/application-context.js` | `frontend/src/app/application-context.js` | Controllers, shared UI | `buildApplicationContext()` | `test-feature-integration` |
| DOM resolution | `frontend/src/app/dom-registry.js` | `frontend/src/app/dom-registry.js` | Document | `required()`, `optional()` | `test-dom-registry` |
| Event listener lifecycle | `frontend/src/shared/event-listener-registry.js` | `frontend/src/shared/event-listener-registry.js` | DOM targets | `add()`, `dispose()`, `size()` | `test-event-listener-registry` |
| Dashboard rendering | `frontend/src/legacy-main.js` | `frontend/src/features/dashboard/` | Dashboard model, projection | `initialize()`, `refresh()` | `validate:frontend` |
| Scenario persistence | `frontend/src/legacy-main.js` | `frontend/src/features/scenario/` | IndexedDB scenario repository | `onScenarioChanged()` | `test-feature-integration` |
| Decision commands | `frontend/src/legacy-main.js` | `frontend/src/features/decision/` | Decision workbench, repository | `initialize()` | `test-feature-integration` |
| Knowledge search | `frontend/src/legacy-main.js` | `frontend/src/features/knowledge/` | Generated knowledge index | `initialize()` | `test-feature-integration` |
| Loan calculation orchestration | `frontend/src/legacy-main.js` | `frontend/src/features/loan/` | UI input parsing | `initialize()` | `test-feature-integration` |
| Portfolio export | `frontend/src/legacy-main.js` | `frontend/src/features/portfolio/` | File download | `initialize()` | `test-feature-integration` |
| Backup and restore | `frontend/src/legacy-main.js` | `frontend/src/features/backup/` | Backup repository | `initialize()` | `test-feature-integration` |
| Profile persistence | `frontend/src/legacy-main.js` | `frontend/src/features/profile/` | Settings repository | `initialize()` | `test-feature-integration` |
| Navigation | `frontend/src/legacy-main.js` | `frontend/src/features/navigation/` | Hash state | `initialize()` | `test-feature-integration` |
| PWA state | `frontend/src/legacy-main.js` | `frontend/src/features/pwa/` | Service worker, readiness policy | `initialize()` | `test-feature-integration` |
