# Goal Identity and Ownership

## Purpose

This split document isolates Goal identity, ownership, relationships, and navigation from the canonical `knowledge/entity/Goal.md` parent.

## Canonical Parent

- Parent: `knowledge/entity/Goal.md`
- Entity: Goal
- Aggregate boundary: GoalPlan ownership through GoalRepository
- Access scope: one User through UserId

## Covered Sections

- Document Control
- Entity Overview
- GoalId, GoalNumber, UserId
- GoalType, GoalCategory, GoalStatus, GoalName, Description
- ParentGoalId, Sequence
- ScenarioId, DecisionId, RecommendationId, ExecutionPlanId

## Ownership Rules

- Goal belongs to one User access scope.
- Goal lifecycle, persistence, authorization, concurrency, and audit boundaries are owned by GoalPlan.
- Goal references Scenario, Decision, Recommendation, ExecutionPlan, ActionPlan, Portfolio, Asset, Liability, CashFlow, Notification, and DomainEvent by identity or immutable snapshot.
- ParentGoalId hierarchy is scoped inside GoalPlan and cannot form cycles.

## Split Notes

- Keep identity and relationship rules here.
- Keep progress, funding, review, and target metrics in `funding-progress-and-review.md`.
- Keep security, audit, testing, and edge cases in `governance-and-testing.md`.
