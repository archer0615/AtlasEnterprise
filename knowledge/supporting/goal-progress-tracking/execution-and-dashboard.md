# Goal Progress Execution and Dashboard

## Purpose
This split document isolates Goal Progress commands, state machine, APIs, persistence, dashboard projection, audit, and testing from the parent Goal Progress Tracking specification.

## Source
- Parent specification: [Goal Progress Tracking](../goal-progress-tracking.md)

## Commands
- RefreshGoalProgress
- RecalculateGoalProgress
- UpdateGoalProgress
- FreezeProgress
- ResumeProgress
- ResetProgress
- ArchiveProgress
- RestoreProgress

## Domain Events
- GoalProgressUpdated
- GoalProgressRecalculated
- GoalCompleted
- GoalDelayed
- GoalAheadOfSchedule
- GoalBehindSchedule
- GoalHealthChanged
- GoalForecastChanged
- GoalProgressReset

## Dashboard Projection
Dashboard projection exposes progress summary, forecast, health, variance, confidence, and stale-state indicators without owning canonical Goal state.

## Testing
Testing covers calculation, integration, concurrency, performance, API, cache, audit, and edge-case behavior.

