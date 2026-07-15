# Large Document Split Plan - Batch 16

## Purpose

This batch focuses on portfolio risk and rebalancing documents that support drawdown and allocation scenarios.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/framework/risk-budget-framework.md` | 62.8 | Risk budget definition, allocation, breach handling |
| 2 | `knowledge/framework/rebalancing-framework.md` | 60.7 | Drift detection, proposal, validation, execution |
| 3 | `knowledge/supporting/portfolio.md` | 58.9 | Holdings, allocation, reporting, dashboard use |
| 4 | `knowledge/supporting/market-assumptions.md` | 55.6 | Return, volatility, inflation, stress assumptions |
| 5 | `knowledge/framework/asset-allocation-framework.md` | 53.4 | Allocation targets, constraints, drift, rebalance |

## Batch 16 Recommendation

Start with `risk-budget-framework.md` because drawdown fixtures and portfolio performance reporting need clear budget breach semantics.

## Guardrails

- Preserve risk budget terms and breach thresholds exactly.
- Keep scenario stress assumptions versioned.
- Rebuild generated knowledge and run validation.

## Related Documents

- [Portfolio Performance Split Progress Report](portfolio-performance-split-progress-report.md)
- [Investment Drawdown Fixture Report](investment-drawdown-fixture-report.md)
- [Fixture Output Tolerance Report](fixture-output-tolerance-report.md)
