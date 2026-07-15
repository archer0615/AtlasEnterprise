# Large Document Split Plan - Batch 13

## Purpose

This batch continues medium-sized supporting document extraction after Financial Health Score, Recommendation, and Goal Funding scaffolds.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/supporting/goal-progress-tracking.md` | 68.2 | Milestones, variance, status, dashboard summaries |
| 2 | `knowledge/framework/decision-history-framework.md` | 65.7 | Decision log, replay, audit, reporting |
| 3 | `knowledge/framework/portfolio-performance-framework.md` | 64.1 | Return, benchmark, attribution, reporting |
| 4 | `knowledge/framework/risk-budget-framework.md` | 62.8 | Risk budget definition, allocation, breach handling |
| 5 | `knowledge/supporting/portfolio-lifecycle.md` | 61.4 | Portfolio lifecycle state, transitions, audit |

## Batch 13 Recommendation

Start with `goal-progress-tracking.md` because goal progress is a direct dashboard readiness input and affects funding recommendations.

## Guardrails

- Preserve milestone and status names exactly.
- Keep dashboard summaries separate from canonical goal state.
- Rebuild generated knowledge and run validation after split work.

## Related Documents

- [Goal Funding Split Progress Report](goal-funding-split-progress-report.md)
- [Financial Health Score Split Progress Report](financial-health-score-split-progress-report.md)
- [Dashboard Scenario Switching Report](dashboard-scenario-switching-report.md)
