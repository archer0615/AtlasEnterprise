# Risk Budget Breach and Reporting

## Purpose

This split document isolates breach handling and reporting behavior from the larger Risk Budget Framework.

## Source

- Parent specification: [Risk Budget Framework](../risk-budget-framework.md)

## Breach Rules

- Risk budget breach detection must identify the breached limit and source exposure.
- Breaches should produce warning references suitable for recommendations and dashboard display.
- Breach handling must preserve audit context and household scope.

## Reporting Rules

- Reports must show allocated budget, consumed budget, remaining budget, and breach status.
- Dashboard summaries must not replace canonical risk budget state.
- Scenario stress outputs should identify risk budget consumption under each alternative.

## Related References

- [Dashboard Scenario Switching Report](../../../docs/roadmap/dashboard-scenario-switching-report.md)
- [Investment Drawdown Fixture Report](../../../docs/roadmap/investment-drawdown-fixture-report.md)
- [Audit Framework](../../security/audit-framework.md)
