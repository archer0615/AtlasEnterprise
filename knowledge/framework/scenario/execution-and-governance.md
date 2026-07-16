# Scenario Execution and Governance

## Purpose

This split document isolates Scenario execution modes, templates, storage, API, frontend display, explanations, business rules, formulas, tests, implementation rules, open items, and summary sections from the canonical `knowledge/framework/scenario-framework.md` parent.

## Covered Sections

- Engine Execution Order
- Deterministic, Stress, and Monte Carlo Modes
- Scenario Template Model
- Database Design Guidance
- API Design Guidance
- Frontend Display Guidance
- Explanation Requirements
- Business Rules
- Formula Requirements
- Testing Requirements
- Codex Implementation Rules
- Open Items and Follow-up Documents
- Summary

## Governance Rules

- Execution order must be reproducible and traceable.
- Scenario templates must not override explicit scenario assumptions without visibility.
- API and frontend views must expose scenario identity, version, assumptions, output, score, and explanation evidence.
- Testing must cover deterministic replay, stress behavior, Monte Carlo boundaries, and comparison consistency.
