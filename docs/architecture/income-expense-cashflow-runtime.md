# Income, Expense, and Cashflow Runtime

## Boundary

Income and expense domain validation lives under `frontend/src/domain`. Cashflow projection lives under `frontend/src/runtime` and accepts plain records only. Browser APIs remain isolated to `frontend/src/indexeddb-runtime.js` and `frontend/src/legacy-main.js`.

## Local Stores

| Store | Key | Indexed fields |
| --- | --- | --- |
| `incomes` | `id` | `ownerId`, `status`, `incomeType`, `currency`, `frequency`, `startDate`, `endDate`, `updatedAt` |
| `expenses` | `id` | `ownerId`, `status`, `expenseType`, `currency`, `frequency`, `startDate`, `endDate`, `updatedAt` |

Current database version is `5`. Backup migration accepts versions `2`, `3`, `4`, and `5`, then normalizes missing income and expense collections to empty arrays.

## Commands

| Command | Service | Audit action |
| --- | --- | --- |
| Create income | `createIncome` | `IncomeCreated` |
| Update income | `updateIncome` | `IncomeUpdated` |
| Archive income | `archiveIncome` | `IncomeArchived` |
| Restore income | `restoreIncome` | `IncomeRestored` |
| Create expense | `createExpense` | `ExpenseCreated` |
| Update expense | `updateExpense` | `ExpenseUpdated` |
| Archive expense | `archiveExpense` | `ExpenseArchived` |
| Restore expense | `restoreExpense` | `ExpenseRestored` |

## Projection

`projectCashFlow` expands active one-time, monthly, quarterly, semiannual, and annual records within a requested period. Archived and inactive records are excluded. Multiple currencies are reported as incomplete conversion data rather than converted implicitly.
