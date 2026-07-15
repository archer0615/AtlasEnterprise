# Portfolio Stress and Dashboard

## Purpose

This split document isolates portfolio stress and dashboard behavior from the larger Portfolio knowledge base.

## Source

- Parent specification: [Portfolio Knowledge Base](../portfolio.md)

## Stress Rules

- Stress scenarios should include baseline, stressed, and mitigation alternatives.
- Drawdown stress must preserve assumption version and formula version.
- Stress outputs should include warning references for recommendation explanation.

## Dashboard Rules

- Dashboard portfolio metrics may summarize value, drawdown, allocation, and risk.
- Dashboard outputs must not replace Portfolio source state.
- Scenario outputs should remain deterministic for the same fixture inputs.

## Related References

- [Investment Drawdown Fixture](../../../simulator/fixtures/investment-drawdown-stress.json)
- [Portfolio Performance Split Progress Report](../../../docs/roadmap/portfolio-performance-split-progress-report.md)
- [Dashboard Scenario Switching Report](../../../docs/roadmap/dashboard-scenario-switching-report.md)
