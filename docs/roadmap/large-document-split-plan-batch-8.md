# Large Document Split Plan - Batch 8

## Purpose

This batch moves from high-level governance documents into high-value entity and recommendation documents that are large enough to benefit from focused implementation references.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/entity/Asset.md` | 173.7 | Asset identity, valuation, ownership, lifecycle, reporting |
| 2 | `knowledge/supporting/goal-conflict-resolution.md` | 134.9 | Conflict detection, prioritization, resolution workflow, audit |
| 3 | `knowledge/supporting/recommendation-execution.md` | 105.7 | Execution planning, tracking, rollback, validation |
| 4 | `knowledge/supporting/decision-insights.md` | 85.9 | Insight generation, explanation, warnings, dashboard display |
| 5 | `knowledge/entity/Loan.md` | 85.4 | Loan identity, amortization, repayment, refinancing, risk |

## Batch 8 Recommendation

Start with `Asset.md` because asset valuation and ownership feed dashboard metrics, portfolio scenarios, liquidity checks, and long-term decision fixtures.

## Guardrails

- Preserve entity field names and lifecycle state names exactly.
- Keep entity definitions separate from reporting or dashboard projections.
- Add parent-document forwarding links before extracting large sections.
- Rebuild generated knowledge and run `npm run validate`.
- Confirm dashboard fixtures still reference valid source documents after each split.

## Related Documents

- [Batch 7 Split Plan](large-document-split-plan-batch-7.md)
- [Scenario Fixture Schema](../../simulator/fixtures/scenario-fixture-schema.md)
- [PWA Visual Validation Report](pwa-visual-validation-report-2026-07-15.md)
- [Offline Cache Validation Report](offline-cache-validation-report-2026-07-15.md)
