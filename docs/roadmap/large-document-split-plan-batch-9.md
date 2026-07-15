# Large Document Split Plan - Batch 9

## Purpose

This batch continues focused entity and supporting document splits after the first Asset extraction pass.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/entity/Asset.md` | 173.7 | Remaining command, event, repository, database, cache, and audit sections |
| 2 | `knowledge/supporting/goal-conflict-resolution.md` | 134.9 | Detection, prioritization, resolution workflow, reporting |
| 3 | `knowledge/supporting/recommendation-execution.md` | 105.7 | Execution plan, rollback, tracking, validation |
| 4 | `knowledge/entity/Loan.md` | 85.4 | Identity, repayment, refinancing, rule integration |
| 5 | `knowledge/supporting/decision-insights.md` | 85.9 | Insight generation, warning surfacing, dashboard use |

## Batch 9 Recommendation

Finish Asset split scaffolding before moving to Loan and recommendation documents, because Asset fields feed dashboard, portfolio, scenario, and cash-flow projections.

## Guardrails

- Preserve Asset field names and catalog names exactly.
- Keep extracted split files narrowly scoped.
- Leave the parent Asset document as the canonical source until duplicated content is intentionally reduced.
- Rebuild generated knowledge after each extraction pass.
- Run `npm run validate`.

## Related Documents

- [Batch 8 Split Plan](large-document-split-plan-batch-8.md)
- [Dashboard Persistence Scaffold](dashboard-persistence-scaffold.md)
- [Offline Cache Validation Report](offline-cache-validation-report-2026-07-15.md)
