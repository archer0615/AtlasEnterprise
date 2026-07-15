# Market Assumptions Returns and Inflation

## Purpose

This split document isolates return and inflation assumptions from the larger Market Assumptions document.

## Source

- Parent specification: [Market Assumptions](../market-assumptions.md)

## Return Rules

- Return assumptions must be versioned.
- Baseline and stress return assumptions must remain explicit.
- Simulator fixtures must identify the assumption version they use.

## Inflation Rules

- Inflation assumptions must identify currency and planning period.
- Inflation should remain separate from nominal return and cashflow assumptions.
- Long-term goal readiness should preserve inflation assumption traceability.

## Related References

- [Retirement Supporting Document](../retirement.md)
- [Portfolio Performance Framework](../../framework/portfolio-performance-framework.md)
- [Investment Drawdown Fixture](../../../simulator/fixtures/investment-drawdown-stress.json)
