# Projection Read Model

## Canonical Runtime Projection

The v1 projection module is `frontend/src/runtime-projection.js`.

It is pure, serializable, deterministic, DOM-free, timezone-aware, currency-aware, and tolerant of missing data.

## Read Model Shape

| Section | Coverage |
| --- | --- |
| `netWorth` | Asset total minus liability total. |
| `assetSummary` | Asset count and total. |
| `liabilitySummary` | Liability count and total. |
| `cashFlowSummary` | Monthly income, monthly expense, monthly cash flow. |
| `debtLoanSummary` | Liability total and debt ratio. |
| `portfolioSummary` | Position count and market value total. |
| `goalSummary` | Goal count, target amount, current amount, funding ratio. |
| `financialHealth` | Deterministic score from cash flow, net worth, and goal funding. |
| `scenarioSummary` | Scenario count and active count. |
| `decisionRecommendationSummary` | Accepted, deferred, rejected, and total decision counts. |

## Contracts

- Schema: `atlas-enterprise.runtime-projection.v1`.
- Version: `1`.
- Default timezone: `Asia/Taipei`.
- Default currency: `TWD`.
- Missing arrays are treated as empty arrays.
- Invalid numeric values are parsed to fallback values.
- Projection code must not read DOM or fetch remote resources.

## Test Matrix

- Empty input.
- Normal populated input.
- Boundary zero values.
- Negative cash flow.
- Archived scenario exclusion from active count.
- Missing data tolerance.
- Fixture vs runtime drift through dashboard and simulator validation.
