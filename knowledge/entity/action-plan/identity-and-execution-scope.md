# ActionPlan Identity and Execution Scope

## Purpose

This split document isolates ActionPlan identity, ownership, relationship, and sequencing rules from the canonical `knowledge/entity/ActionPlan.md` parent.

## Canonical Parent

- Parent: `knowledge/entity/ActionPlan.md`
- Entity: ActionPlan
- Ownership: ExecutionPlan behavior and Decision execution
- Aggregate root: No

## Covered Sections

- Document Control
- Entity Overview
- ActionPlanId, ActionPlanNumber
- ExecutionPlanId, DecisionId, RecommendationId, GoalId, ScenarioId, UserId
- Title, Description, ActionType, Priority, Status
- Owner, Assignee, Sequence

## Ownership Rules

- ActionPlan belongs to exactly one ExecutionPlan.
- ActionPlan references Decision, Recommendation, Goal, Scenario, Workflow, Task, Notification, User, and DomainEvent by identity.
- Sequence ordering is scoped to ExecutionPlanId.
- ActionPlan read models may include related summaries but cannot mutate referenced entities.
