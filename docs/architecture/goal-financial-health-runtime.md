# Goal and Financial Health Runtime

## Purpose

This runtime slice persists Atlas goals locally and derives goal progress plus financial health read models from browser-local assets, liabilities, incomes, expenses, and goals.

## Canonical Boundary

Goal is the persisted aggregate root. Goal Progress and Financial Health are derived projections. The implementation does not introduce prioritization, conflict resolution, recommendation, decision, optimization, simulation, backend, cloud sync, or external exchange-rate behavior.

## Goal Contract

| Field | Runtime use |
| --- | --- |
| `id` | Stable local identifier |
| `ownerId` | Owner isolation |
| `name` | User-facing goal name |
| `goalType` | Catalog-aligned type |
| `targetAmount` | Monetary target |
| `currentAmount` | Current progress amount |
| `currency` | Currency consistency marker |
| `priority` | Stored catalog priority reference |
| `startDate`, `targetDate` | Progress timing |
| `status` | Lifecycle state |
| `parentGoalId`, `scenarioId` | Optional references |
| `createdAt`, `updatedAt`, `archivedAt`, `version` | Runtime lifecycle metadata |

## Lifecycle

Supported states are `draft`, `active`, `inactive`, `completed`, `cancelled`, and `archived`. `canTransitionGoal`, `transitionGoal`, and `getAllowedGoalTransitions` are pure and deterministic.

## IndexedDB

Database version is `6`. Store `goals` uses key `id` and indexes `ownerId`, `status`, `goalType`, `currency`, `priority`, `targetDate`, `parentGoalId`, and `updatedAt`.

## Commands and Audit

`createGoal`, `updateGoal`, `archiveGoal`, `restoreGoal`, `activateGoal`, `deactivateGoal`, `completeGoal`, and `cancelGoal` resolve the current owner, validate lifecycle and dependency rules, persist through the repository, and write audit evidence.

## Projections

`projectGoalProgress` calculates remaining amount, percentage completion, days remaining, completion count, average progress, and currency completeness. `projectFinancialHealth` derives net worth, net cashflow, savings rate, income-expense ratio, debt-asset ratio, average goal progress, score, and classification.

## Security and Offline

Goal records stay in IndexedDB and are never cached by the service worker as data records. Service worker caching includes only static module paths. Backup and encrypted backup include goal records through the existing local backup envelope.
