# Goal Metrics Scope and Architecture

## Purpose

This split document isolates Goal Metrics overview, ownership, relationships, lifecycle, collection, calculation, refresh, and calculation architecture from the canonical `knowledge/reporting/goal-metrics.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-metrics.md`
- Domain: Goal metrics
- Status: Enterprise Specification

## Covered Sections

- Goal Metrics Overview
- Purpose and business meaning
- Metric lifecycle, ownership, categories, collection strategy, calculation strategy, and refresh policy
- Relationships with Goal, Milestone, Task, Decision, Recommendation, Scenario, Portfolio, CashFlow, Notification, Dashboard, and User
- Calculation Engine

## Boundary Rules

- Goal Metrics defines governed measurements and calculated results for GoalPlan; it does not replace GoalPlan ownership.
- Metric calculations must remain deterministic for the same source snapshot, formula version, assumptions, precision, rounding, and calculation date.
- Refresh behavior must preserve historical metric evidence and avoid overwriting append-only records.
