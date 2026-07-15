# Large Document Split Plan - Batch 14

## Purpose

This batch prepares portfolio and risk documents for simulator-driven stress testing.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/framework/portfolio-performance-framework.md` | 64.1 | Performance inputs, calculation, benchmark, attribution |
| 2 | `knowledge/framework/risk-budget-framework.md` | 62.8 | Budget definition, allocation, breach, reporting |
| 3 | `knowledge/supporting/portfolio-lifecycle.md` | 61.4 | Lifecycle state, rebalance, review, audit |
| 4 | `knowledge/framework/rebalancing-framework.md` | 60.7 | Drift detection, trade proposal, validation |
| 5 | `knowledge/supporting/portfolio.md` | 58.9 | Portfolio concept, holdings, allocation, reporting |

## Batch 14 Recommendation

Start with `portfolio-performance-framework.md` so investment drawdown fixtures can later compare baseline, stressed, and recovered portfolio states.

## Guardrails

- Preserve formula references and benchmark terms exactly.
- Keep simulator stress assumptions separate from canonical portfolio definitions.
- Rebuild generated knowledge and run validation.

## Related Documents

- [Fixture Output Tolerance Report](fixture-output-tolerance-report.md)
- [Scenario Fixture Schema](../../simulator/fixtures/scenario-fixture-schema.md)
- [Offline Cache Validation Report](offline-cache-validation-report-2026-07-15.md)
