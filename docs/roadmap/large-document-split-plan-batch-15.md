# Large Document Split Plan - Batch 15

## Purpose

This batch prepares goal progress, decision history, and portfolio lifecycle documents for later simulator and dashboard integration.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/framework/decision-history-framework.md` | 65.7 | Decision log, replay, audit, reporting |
| 2 | `knowledge/supporting/portfolio-lifecycle.md` | 61.4 | Lifecycle state, review, rebalance, audit |
| 3 | `knowledge/framework/rebalancing-framework.md` | 60.7 | Drift detection, proposal, validation, execution |
| 4 | `knowledge/framework/risk-budget-framework.md` | 62.8 | Budget definition, allocation, breach handling |
| 5 | `knowledge/supporting/goal-review.md` | 58.2 | Review cadence, evidence, recommendations |

## Batch 15 Recommendation

Start with `decision-history-framework.md` so dashboard scenario choices and recommendation decisions can later be audited and replayed.

## Guardrails

- Preserve audit and replay terminology exactly.
- Keep dashboard preference persistence separate from canonical decision history.
- Rebuild generated knowledge and run validation.

## Related Documents

- [Dashboard Persistence Migration](dashboard-persistence-migration.md)
- [Simulator Output Validation Report](simulator-output-validation-report.md)
- [Goal Progress Tracking Split Progress Report](goal-progress-tracking-split-progress-report.md)
