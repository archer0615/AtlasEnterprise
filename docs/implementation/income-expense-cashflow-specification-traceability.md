# Income, Expense, and Cashflow Specification Traceability

## Baseline

| Item | Value |
| --- | --- |
| Starting commit | `8f87f852a3c78b3932fcf005b716d795c019fbbc` |
| Target local schema | IndexedDB `5` |
| Stores | `incomes`, `expenses` |

## Traceability

| Requirement | Implementation | Validation |
| --- | --- | --- |
| Local income records | `frontend/src/domain/income`, `frontend/src/application/incomes`, `indexedDbIncomeRepository` | `test:income-expense-cashflow-domain`, `test:income-expense-cashflow-application` |
| Local expense records | `frontend/src/domain/expense`, `frontend/src/application/expenses`, `indexedDbExpenseRepository` | `test:income-expense-cashflow-domain`, `test:income-expense-cashflow-application` |
| Cashflow projection | `frontend/src/runtime/cashflow-projection.js` | `test:income-expense-cashflow-domain` |
| Runtime boundary | Domain and runtime modules avoid browser globals | `test:income-expense-cashflow-runtime-boundary`, `validate:runtime-boundaries` |
| Backup and restore | `frontend/src/indexeddb-runtime.js` exports, validates, migrates, and restores `incomes` and `expenses` | `validate:frontend`, `validate:pwa`, `validate:offline` |

## Validation Record

Validation results are recorded in `docs/roadmap/income-expense-cashflow-local-data-implementation-report.md`.
