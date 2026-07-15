# Large Document Split Plan - Batch 12

## Purpose

This batch prepares financial health, goal funding, and recommendation evaluation documents for smaller implementation references.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/supporting/financial-health-score.md` | 75.8 | Liquidity, debt, savings, portfolio, goal readiness scoring |
| 2 | `knowledge/framework/goal-funding-framework.md` | 70.1 | Funding target, contribution plan, reallocation, reporting |
| 3 | `knowledge/supporting/recommendation-evaluation.md` | 77.6 | Evaluation metrics, result capture, learning loop |
| 4 | `knowledge/supporting/goal-progress-tracking.md` | 68.2 | Milestones, variance, status, dashboard summaries |
| 5 | `knowledge/framework/decision-history-framework.md` | 65.7 | Decision log, audit, replay, reporting |

## Batch 12 Recommendation

Start with `financial-health-score.md` because its components map directly to dashboard metrics and simulator warnings.

## Guardrails

- Preserve score thresholds and ratio formulas exactly.
- Keep dashboard labels separate from canonical scoring definitions.
- Rebuild knowledge indexes after split work.
- Run `npm run validate`.

## Related Documents

- [Batch 11 Split Plan](large-document-split-plan-batch-11.md)
- [PWA Visual Validation Report](pwa-visual-validation-report-2026-07-15.md)
- [Dashboard Persistence Migration](dashboard-persistence-migration.md)
