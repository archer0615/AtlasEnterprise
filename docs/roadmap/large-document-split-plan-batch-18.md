# Large Document Split Plan - Batch 18

## Purpose

This batch prepares review, history, and policy documents for governed recommendation and decision workflows.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/supporting/goal-review.md` | 58.2 | Review cadence, evidence, status, recommendation refresh |
| 2 | `knowledge/framework/decision-history-framework.md` | 65.7 | Decision log, replay, audit, dashboard history |
| 3 | `knowledge/supporting/investment-policy.md` | 52.8 | Policy constraints, target allocation, review governance |
| 4 | `knowledge/framework/decision-learning-framework.md` | 51.9 | Feedback, calibration, governance |
| 5 | `knowledge/supporting/recommendation-lifecycle.md` | 50.6 | Lifecycle state, transitions, audit |

## Batch 18 Recommendation

Start with `goal-review.md` because review outputs refresh recommendations and dashboard next actions.

## Guardrails

- Preserve lifecycle and review cadence terms exactly.
- Keep historical audit separate from mutable dashboard preferences.
- Rebuild generated knowledge and run validation.

## Related Documents

- [Goal Progress Tracking Split Progress Report](goal-progress-tracking-split-progress-report.md)
- [Recommendation Evaluation Split Progress Report](recommendation-evaluation-split-progress-report.md)
- [Dashboard Persistence Migration](dashboard-persistence-migration.md)
