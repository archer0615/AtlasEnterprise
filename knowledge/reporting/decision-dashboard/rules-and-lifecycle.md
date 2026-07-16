# Decision Dashboard Rules and Lifecycle

## Purpose
This split document isolates Decision Dashboard lifecycle, validation rules, business rules, permissions, refresh behavior, and state handling from the parent Decision Dashboard specification.

## Source
- Parent specification: [Decision Dashboard](../decision-dashboard.md)

## Lifecycle
Decision Dashboard lifecycle covers dashboard definition, widget configuration, filter configuration, refresh, sharing, export, archive, restore, deletion, and dashboard history.

## Validation Rules
Validation covers dashboard creation and update, widget configuration, filter allowlist, layout, refresh policy, permission, cache key generation, state transition, export format, sorting, pagination, and source projection availability.

## Business Rules
Decision Dashboard is a governed read model for monitoring Decisions. It must not mutate Decision, Recommendation, Goal, Portfolio, CashFlow, Risk, Scenario, Simulation, Workflow, Automation, Notification, or User source data.

## State and Refresh
Refresh operations update projections and cached values without mutating source domain data. Created, Configured, Active, Refreshing, Refreshed, Shared, Exported, Archived, Restored, Deleted, and Failed transitions must be auditable.
