# Decision Reporting Scope and Architecture

## Purpose

This split document isolates Decision Reporting overview, ownership, relationships, and reporting architecture from the canonical `knowledge/reporting/decision-reporting.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/decision-reporting.md`
- Domain: Decision reporting
- Status: Enterprise Specification

## Covered Sections

- Decision Reporting Overview
- Purpose and business meaning
- Reporting scope, lifecycle, objectives, and ownership
- Relationships with Decision, Decision Lifecycle, Decision Evaluation, Decision Execution, Decision Governance, Decision Analytics, Decision Explainability, Decision History, Decision Audit, Decision Rule, Recommendation, Goal, Scenario, Portfolio, CashFlow, Optimization, Simulation, Risk, Workflow, Automation, Notification, Business Calendar, and User
- Reporting Architecture

## Boundary Rules

- Decision reports are reporting projections, not decision mutation surfaces.
- Reporting must preserve links to decision lifecycle, evaluation, execution, governance, analytics, explainability, history, and audit sources.
- Reporting architecture must keep rendering, aggregation, export, scheduling, distribution, cache, audit, and permission concerns explicit.
