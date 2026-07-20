# Core Financial Data Workflows

## Catalog Scope

| Domain | v1 Workflow Scope | Lifecycle |
| --- | --- | --- |
| User | Local profile/settings only | Summary, update, restore |
| Household | Knowledge specification only | Not Implemented in v1 runtime |
| Asset | Projection input | List, summary, detail, create, update, archive, restore |
| Liability | Projection input | List, summary, detail, create, update, archive, restore |
| Loan/Mortgage | Local calculation and projection input | Detail, update, scenario, archive |
| Income | Projection input | List, summary, create, update, archive |
| Expense | Projection input | List, summary, create, update, archive |
| CashFlow | Projection output | Summary, validation, empty state |
| Goal | Projection input/output | List, summary, detail, update, archive |
| Portfolio | Projection input/output | Summary, report, archive |
| Position | Portfolio child input | List, summary, update, archive |

Delete is not a default financial workflow. Archive/restore is preferred so backup and audit history remain explainable.

## Data Boundaries

- User data belongs in IndexedDB stores and backup envelopes.
- Demo data and test fixtures can live in static JSON.
- Production PWA must not bundle user financial data into static JSON or Git.
- Backup/restore must preserve `scenarioId`, `decisionId`, `key`, and `auditId` identifiers.

## Shared Form Contracts

- Money parser: accepts numbers and comma-formatted numeric strings.
- Currency formatter: default `TWD`.
- Date values: ISO date strings.
- Percentage formatter: ratio input, percent output.
- Status values: active, archived, pending, accepted, rejected, deferred.
- Empty state: user data missing should not silently become fixture data unless source mode is marked Demo Data.

## Validation Targets

- Repository integration for local writes and restore.
- Browser workflow coverage for create/update/archive/restore flows.
- Fixture coverage for demo and test data.
- Projection coverage for empty, normal, boundary, negative, archived, and missing data.
