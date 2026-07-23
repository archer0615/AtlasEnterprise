# Knowledge Runtime Consistency Report

Version: v1.0.0 candidate
Date: 2026-07-23

## Scope

This report maps canonical knowledge expectations to implemented local runtime surfaces.

| Capability | Knowledge Source | Runtime / Domain Evidence | Test Evidence |
| --- | --- | --- | --- |
| Asset and Liability | `knowledge/entity/Asset.md`, `knowledge/entity/Liability.md` | `frontend/src/domain/asset`, `frontend/src/domain/liability`, `frontend/src/runtime/net-worth-projection.js` | `test:asset-liability-domain`, `test:asset-liability-application`, `test:asset-liability-runtime-boundary` |
| Income, Expense, CashFlow | `knowledge/supporting/cashflow.md` | `frontend/src/domain/income`, `frontend/src/domain/expense`, `frontend/src/runtime/cashflow-projection.js` | `test:income-expense-cashflow-domain`, `test:income-expense-cashflow-application`, `test:income-expense-cashflow-runtime-boundary` |
| Goal and Financial Health | `knowledge/entity/Goal.md`, `knowledge/supporting/scoring-model.md` | `frontend/src/domain/goal`, `frontend/src/runtime/goal-progress-projection.js`, `frontend/src/runtime/financial-health-projection.js` | `test:goal-financial-health-domain`, `test:goal-financial-health-application`, `test:goal-financial-health-runtime-boundary` |
| Scenario and Decision | `knowledge/entity/Scenario.md`, `knowledge/entity/Decision.md` | `frontend/src/infrastructure/indexeddb/repositories/scenario-indexeddb-repository.js`, decision workbench runtime | `test:runtime-projection`, `test:decision-workbench` |
| Recommendation and Execution Planning | `knowledge/entity/Recommendation.md`, recommendation execution references | `frontend/src/domain/recommendation`, `frontend/src/runtime/recommendation-runtime.js`, `frontend/src/runtime/execution-plan-runtime.js`, `frontend/src/runtime/action-plan-runtime.js` | `test:recommendation-execution-domain`, `test:recommendation-execution-application` |
| Notification, Automation, Scheduler, Calendar | notification, scheduler, automation, and background job frameworks | `frontend/src/domain/notification`, `frontend/src/runtime/notification-runtime.js`, `frontend/src/runtime/automation-runtime.js`, `frontend/src/runtime/scheduler-runtime.js`, `frontend/src/runtime/business-calendar-runtime.js` | `test:notification-automation-domain`, `test:notification-automation-application` |

## Consistency Rules

- Canonical catalogs define allowed type and status values.
- Domain validators reject unsupported type, status, priority, and owner fields.
- Runtime functions remain pure and do not call DOM, IndexedDB, cloud, email, push, or automation execution services.
- Application services own repository calls and append-only audit evidence.
- Backup, restore, offline, and PWA checks remain covered by feature, full, and release profiles.

## Result

Knowledge, runtime, implementation, and tests are traceable for the v1.0.0 local runtime scope.
