# ExecutionPlan Identity and Planning Scope

## Purpose

This split document isolates ExecutionPlan identity, planning ownership, relationships, and planning fields from the canonical `knowledge/entity/ExecutionPlan.md` parent.

## Canonical Parent

- Parent: `knowledge/entity/ExecutionPlan.md`
- Entity: ExecutionPlan
- Ownership: Decision execution and recommendation execution planning

## Covered Sections

- Document Control
- Entity Overview
- ExecutionPlanId, ExecutionPlanNumber
- DecisionId, RecommendationId, UserId, GoalId, ScenarioId
- Title, Description, PlanType, Priority, Status
- ExecutionStrategy

## Ownership Rules

- ExecutionPlan coordinates execution for accepted decisions or recommendations.
- ExecutionPlan references Decision, Recommendation, User, Goal, Scenario, ActionPlan, Workflow, Task, Notification, and DomainEvent by identity.
- Planning scope must not mutate referenced aggregates outside approved commands.
