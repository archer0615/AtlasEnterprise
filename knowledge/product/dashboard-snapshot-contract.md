# Dashboard Snapshot Contract
# Dashboard Snapshot Contract

Document Path: knowledge/product/dashboard-snapshot-contract.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Dashboard
Owner: Project Atlas
Source of Truth: Atlas Dashboard Snapshot Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the contract for dashboard snapshots used by the static-first PWA dashboard and fixture-backed scenario views.

## Snapshot Shape

Each dashboard snapshot must contain:

- `snapshotId`: stable identifier for the dashboard snapshot.
- `label`: display label for the selected dashboard scenario.
- `asOfDate`: ISO date representing the snapshot date.
- `currency`: ISO or product-approved currency code.
- `sourceFixture`: fixture or runtime source used to produce the snapshot.
- `metrics`: ordered list of dashboard metric cards.
- `scenarios`: ordered list of scenario comparison rows.
- `actions`: ordered list of next actions.

## Metric Contract

Each metric must contain:

- `label`: user-visible metric name.
- `value`: formatted metric value.
- `detail`: short explanation of the metric source, period, or interpretation.

Metric values should map to canonical KPI, ratio, simulator, goal, portfolio, loan, or decision definitions when possible.

## Scenario Contract

Each scenario must contain:

- `name`: scenario display name.
- `score`: normalized score used for comparison.
- `status`: scenario state or recommendation summary.

Scenario scores must be reproducible from simulator output, decision scoring, or documented fixture assumptions.

## Action Contract

Each action must be:

- User-actionable.
- Traceable to a metric, scenario, recommendation, or rule.
- Stable enough to validate in fixtures.

## Source Traceability

| Snapshot Area | Canonical Source |
| --- | --- |
| Metrics | `knowledge/reporting/decision-dashboard.md`, `knowledge/reporting/kpi-definitions.md`, `knowledge/reporting/financial-dashboard-metrics.md` |
| Scenarios | `knowledge/framework/scenario-framework.md`, `knowledge/engine/simulation-engine-framework.md` |
| Recommendations | `knowledge/entity/Recommendation.md`, `knowledge/supporting/recommendation-lifecycle.md` |
| Goals | `knowledge/entity/Goal.md`, `knowledge/workflow/goal-workflow.md` |
| Portfolio | `knowledge/entity/Portfolio.md`, `knowledge/workflow/portfolio-workflow.md` |
| Loan | `knowledge/entity/Loan.md`, `knowledge/workflow/loan-workflow.md` |
| Actions | `knowledge/entity/ActionPlan.md`, `knowledge/supporting/decision-execution.md` |

## Validation Rules

- `snapshotId`, `label`, `asOfDate`, `currency`, `metrics`, `scenarios`, and `actions` are required.
- `metrics` and `scenarios` must be non-empty arrays.
- Every scenario `score` must be numeric.
- Every user-visible string must be valid UTF-8 and readable in the frontend.
- Snapshot fixtures must be included in frontend validation.

## Known Gaps

- Fixture labels and details were normalized to readable UTF-8 in `frontend/fixtures/dashboard-snapshots.json` on 2026-07-16.
- Field-level traceability from each metric to a canonical formula is not complete.
- Runtime snapshots are fixture-backed and not yet generated from a production data service.

## Related Specifications

- `frontend/fixtures/dashboard-snapshots.json`
- `frontend/src/dashboard-model.js`
- `knowledge/product/current-capability-matrix.md`
- `knowledge/reporting/decision-dashboard.md`
- `knowledge/workflow/decision-workflow.md`
