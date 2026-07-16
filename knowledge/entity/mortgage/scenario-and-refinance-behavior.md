# Mortgage Scenario and Refinance Behavior

## Purpose

This split document isolates Mortgage refinance, affordability, amortization, scenario, cash flow, recommendation, decision, and projection behavior from the larger Mortgage entity specification.

## Source

- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Refinance Behavior

- Mortgage refinance behavior uses `RefinanceLoan` and emits `LoanRefinanced`.
- Refinance analysis may include current rate, reset rate, refinancing rate, fees, remaining term, payment delta, interest savings, and break-even timing.
- Refinance output is calculation or decision support and must not bypass Loan aggregate lifecycle rules.

## Scenario and Projection Behavior

- Mortgage scenario inputs can support affordability, cash flow pressure, stress, rate shock, and Taiwan mortgage program comparisons.
- Projection outputs and dashboard summaries are read models and must not become source of truth.
- Amortization calculation belongs to LoanService and calculation engine, not Mortgage repository logic.
- CashFlow forecasting belongs to CashFlowService and Projection Engine.
- Recommendation generation belongs to RecommendationService and decision scoring belongs to DecisionService.

## Governance Boundaries

- Mortgage scenario behavior must preserve household isolation, tenant boundary where tenancy exists, audit traceability, deterministic formulas, and catalog command/event mapping.
- Taiwan mortgage detail is implementation value metadata unless a catalog concept explicitly defines otherwise.

## Related References

- [Mortgage Entity Specification](../Mortgage.md)
- [Mortgage governance and testing](governance-and-testing.md)
- [Loan scenario integration](../loan/scenario-integration.md)
- [Loan risk and refinancing](../loan/risk-and-refinancing.md)
