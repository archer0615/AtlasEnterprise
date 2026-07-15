# Goal Progress Milestones and Variance

## Purpose

This split document isolates milestone and variance tracking from the larger Goal Progress Tracking specification.

## Source

- Parent specification: [Goal Progress Tracking](../goal-progress-tracking.md)

## Milestone Rules

- Goal progress is derived data attached to GoalPlan.
- Milestones must preserve GoalPlan authority and lifecycle boundaries.
- Completed progress is immutable at 100% unless approved correction restores the GoalPlan.
- Cancelled and archived progress are read-only.

## Variance Rules

- Progress variance compares current, forecast, and target values.
- Variance calculations must remain deterministic for the same inputs and calculation version.
- Scenario simulation may create forecast progress but must not overwrite committed progress.

## Related References

- [Goal Entity](../../entity/Goal.md)
- [Goal Funding Framework](../../framework/goal-funding-framework.md)
- [Goal Review](../goal-review.md)
