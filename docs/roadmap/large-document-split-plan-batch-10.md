# Large Document Split Plan - Batch 10

## Purpose

This batch prepares the next set of focused extractions after Asset split scaffolding and dashboard fixture validation.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/entity/Loan.md` | 85.4 | Identity, amortization, repayment decisions, refinancing, audit |
| 2 | `knowledge/supporting/decision-insights.md` | 85.9 | Insight generation, warning rules, dashboard rendering |
| 3 | `knowledge/supporting/recommendation-evaluation.md` | 77.6 | Evaluation metrics, feedback, lifecycle, governance |
| 4 | `knowledge/supporting/financial-health-score.md` | 75.8 | Score inputs, ratio weighting, warnings, display |
| 5 | `knowledge/framework/goal-funding-framework.md` | 70.1 | Funding targets, prioritization, tracking, rebalancing |

## Batch 10 Recommendation

Start with `Loan.md` because mortgage and loan decisions are already represented in simulator fixtures and dashboard scenarios.

## Guardrails

- Preserve loan field names and rule-catalog references exactly.
- Keep repayment and refinancing rules traceable to decision rule catalogs.
- Rebuild generated knowledge after each split.
- Keep dashboard fixture references valid.
- Run `npm run validate`.

## Related Documents

- [Batch 9 Split Plan](large-document-split-plan-batch-9.md)
- [Scenario Fixture Schema](../../simulator/fixtures/scenario-fixture-schema.md)
- [Dashboard Persistence Scaffold](dashboard-persistence-scaffold.md)
