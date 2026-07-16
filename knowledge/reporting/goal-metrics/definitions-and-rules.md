# Goal Metrics Definitions and Rules

## Purpose

This split document isolates Goal Metrics metric categories, named metric definitions, validation, business rules, and state behavior from the canonical `knowledge/reporting/goal-metrics.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-metrics.md`
- Domain: Goal metrics
- Status: Enterprise Specification

## Covered Sections

- Metric Categories
- Metric Definitions
- Validation Rules
- Business Rules
- State Machine

## Boundary Rules

- Metric definitions must keep units, scale, thresholds, precision, source requirements, and calculation versions explicit.
- Validation must reject missing source identifiers, incompatible units, invalid weights, stale inputs, unauthorized scope, and precision loss.
- State transitions must preserve metric lifecycle integrity across creation, update, refresh, recalculation, archival, restoration, and deletion.
