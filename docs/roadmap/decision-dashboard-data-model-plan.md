# Decision Dashboard Data Model Plan

## Purpose

This plan defines the first frontend-facing data model for the future Atlas LifeOS decision dashboard. The current PWA remains a knowledge entry point, but the main product surface should move toward financial decision support.

## Dashboard Scope

The first decision dashboard should summarize:

- Household financial position
- Monthly cash-flow safety
- Emergency reserve status
- Debt and mortgage pressure
- Goal readiness
- Scenario comparison
- Decision recommendation status
- Key warnings and next actions

## Core View Models

| View Model | Purpose |
| --- | --- |
| `DashboardSnapshot` | Top-level immutable dashboard state for one planning date. |
| `HouseholdSummary` | Household members, currency, planning horizon, and profile completeness. |
| `CashFlowSummary` | Income, expenses, free cash flow, savings rate, and negative month count. |
| `LiquiditySummary` | Cash reserve months, emergency fund target, and liquidity status. |
| `LiabilitySummary` | Mortgage, loan, total debt, DTI, and early repayment pressure. |
| `GoalReadinessSummary` | Home upgrade, retirement, car purchase, and other goal readiness. |
| `ScenarioComparisonSummary` | Baseline and alternative scenario KPIs. |
| `RecommendationSummary` | Decision outcome, score, constraints, risks, and next actions. |

## Minimal JSON Shape

```json
{
  "snapshotId": "dashboard-2026-07-15",
  "asOfDate": "2026-07-15",
  "currency": "TWD",
  "household": {},
  "cashFlow": {},
  "liquidity": {},
  "liabilities": {},
  "goals": [],
  "scenarios": [],
  "recommendations": [],
  "warnings": []
}
```

## First Implementation Direction

- Keep dashboard data static or fixture-backed until real local persistence exists.
- Use deterministic mock scenarios that map to existing knowledge assumptions.
- Do not add backend requirements.
- Keep knowledge search available as a secondary documentation view.

## Validation

- Dashboard fields must be traceable to formulas, assumptions, or user inputs.
- Scenario outputs must include assumption version and formula version.
- Recommendation outputs must include explanation and warning references.
