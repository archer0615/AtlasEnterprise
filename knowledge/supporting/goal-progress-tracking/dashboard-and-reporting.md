# Goal Progress Dashboard and Reporting

## Purpose

This split document isolates dashboard and reporting behavior from the larger Goal Progress Tracking specification.

## Source

- Parent specification: [Goal Progress Tracking](../goal-progress-tracking.md)

## Dashboard Rules

- Dashboard progress summaries must not replace GoalPlan state.
- Dashboard readiness should include completion, schedule position, dependency readiness, and forecast confidence.
- Dashboard warnings should identify the constraint driving progress risk.
- Scenario comparison may show forecast progress without mutating committed progress.

## Reporting Rules

- Progress reports must include version, source snapshot, and history.
- Audit and replay must preserve progress source data.
- Reporting must remain permission-aware and household-scoped.

## Related References

- [Goal Dashboard](../../reporting/goal-dashboard.md)
- [Goal Reporting](../../reporting/goal-reporting.md)
- [Dashboard Scenario Switching Report](../../../docs/roadmap/dashboard-scenario-switching-report.md)
