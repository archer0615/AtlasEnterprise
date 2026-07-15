# Large Document Split Plan - Batch 11

## Purpose

This batch moves from Loan extraction toward decision insight and recommendation execution documents.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/supporting/decision-insights.md` | 85.9 | Insight inputs, generation, warnings, dashboard display |
| 2 | `knowledge/supporting/recommendation-execution.md` | 105.7 | Execution planning, rollback, validation, audit |
| 3 | `knowledge/supporting/recommendation-evaluation.md` | 77.6 | Outcome tracking, feedback, score calibration |
| 4 | `knowledge/supporting/financial-health-score.md` | 75.8 | Ratio inputs, score weights, warning thresholds |
| 5 | `knowledge/framework/goal-funding-framework.md` | 70.1 | Funding sources, priority, tracking, reallocation |

## Batch 11 Recommendation

Start with `decision-insights.md` because dashboard metrics and scenario recommendations need stable explanation and warning references.

## Guardrails

- Preserve warning IDs and explanation categories exactly.
- Keep display guidance separate from generation rules.
- Rebuild generated knowledge and run validation after each split.
- Link extracted insight docs from dashboard reports.

## Related Documents

- [Batch 10 Split Plan](large-document-split-plan-batch-10.md)
- [Dashboard Scenario Switching Report](dashboard-scenario-switching-report.md)
- [Fixture Output Tolerance Report](fixture-output-tolerance-report.md)
