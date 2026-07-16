# Goal Dashboard Scope and Architecture

## Purpose

This split document isolates Goal Dashboard overview, ownership, data sources, refresh strategy, relationships, and dashboard architecture from the canonical `knowledge/reporting/goal-dashboard.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-dashboard.md`
- Domain: Goal dashboard
- Status: Enterprise Specification

## Covered Sections

- Goal Dashboard Overview
- Purpose and business meaning
- Dashboard lifecycle, ownership, data sources, and refresh strategy
- Relationships with Goal, Milestone, Task, Goal Progress, Goal Metrics, Goal Review, Decision, Recommendation, Scenario, Portfolio, CashFlow, Notification, and User
- Dashboard Architecture

## Boundary Rules

- Goal Dashboard is a read-oriented dashboard projection and must not mutate GoalPlan, metrics, review, decision, recommendation, scenario, portfolio, or cashflow source records.
- Dashboard rendering must keep aggregation, snapshot, real-time, historical, forecast, cache, export, and permission concerns explicit.
- Refresh behavior must preserve source timestamps, versions, HouseholdId, TenantId when applicable, and authorization scope.
