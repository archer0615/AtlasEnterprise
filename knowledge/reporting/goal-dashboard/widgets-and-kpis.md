# Goal Dashboard Widgets and KPIs

## Purpose

This split document isolates Goal Dashboard widgets, KPIs, filters, refresh rules, validation, business rules, and state behavior from the canonical `knowledge/reporting/goal-dashboard.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-dashboard.md`
- Domain: Goal dashboard
- Status: Enterprise Specification

## Covered Sections

- Dashboard Widgets
- Dashboard KPIs
- Dashboard Filters
- Dashboard Refresh Rules
- Validation Rules
- Business Rules
- State Machine

## Boundary Rules

- Widgets must declare source projections, layout behavior, visibility, refresh requirements, authorization, and empty-state behavior.
- KPIs must preserve calculation source, unit, version, time window, and masking rules.
- Filters and refresh rules must not expose unauthorized goals, household data, tenant data, financial records, or user-specific dashboard configuration.
