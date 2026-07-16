# Goal Funding Progress and Review

## Purpose

This split document isolates Goal target, funding, progress, review cadence, and feasibility fields from the canonical `knowledge/entity/Goal.md` parent.

## Covered Sections

- Priority, Importance, Urgency
- TargetAmount, CurrentAmount, CompletionPercentage
- TargetDate, StartDate, CompletedDate
- ReviewFrequency, ReviewDate
- SuccessProbability, RiskLevel, ExpectedReturn
- Constraints, Assumptions, Tags
- Validation Rules
- Business Rules
- State Machine

## Review Rules

- Goal progress is represented by CurrentAmount, CompletionPercentage, progress events, and progress projections.
- Goal review cadence is governed by ReviewFrequency and ReviewDate.
- Goal conflict, priority, dependency, and progress behavior must not mutate external aggregates directly.
- CompletionPercentage must remain derived from valid target and current amount inputs.

## Split Notes

- Use this document for review and funding behavior.
- Keep commands, persistence, API, and infrastructure details in the parent until a dedicated command/persistence split is assigned.
