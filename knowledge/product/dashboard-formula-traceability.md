# Dashboard Formula Traceability

Document Path: knowledge/product/dashboard-formula-traceability.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.1
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Dashboard
Owner: Project Atlas
Source of Truth: Atlas Dashboard Formula Traceability Source of Truth
Last Updated: 2026-07-20

## Purpose

Maps dashboard snapshot fields to formula, KPI, scenario, and domain knowledge sources.

## Traceability Matrix

| Dashboard Area | Field | Source Type | Canonical Source | Validation |
| --- | --- | --- | --- | --- |
| Snapshot | `snapshotId` | Identity | `knowledge/product/dashboard-snapshot-contract.md` | Frontend validation |
| Snapshot | `sourceFixture` | Fixture link | `simulator/fixtures/*.json` | Fixture validation |
| Metrics | Cash-flow values | KPI/formula | `knowledge/reporting/kpi-definitions.md`, `knowledge/supporting/cashflow.md` | Simulator output validation |
| Metrics | Emergency reserve months | Ratio/formula | `knowledge/framework/emergency-fund-framework.md`, `knowledge/framework/cash-reserve-framework.md` | Simulator output validation |
| Metrics | Decision score | Scoring | `knowledge/supporting/scoring-model.md`, `knowledge/supporting/decision-evaluation.md` | Simulator output validation |
| Metrics | Loan pressure | Loan formula | `knowledge/entity/Loan.md`, `knowledge/workflow/loan-workflow.md` | Simulator output validation |
| Metrics | Portfolio drawdown | Portfolio formula | `knowledge/supporting/portfolio.md`, `knowledge/framework/portfolio-performance-framework.md` | Simulator output validation |
| Scenarios | `score` | Scenario score | `knowledge/framework/scenario-framework.md`, `knowledge/engine/simulation-engine-framework.md` | Frontend validation |
| Actions | Next action text | Recommendation/action | `knowledge/entity/ActionPlan.md`, `knowledge/entity/Recommendation.md` | Frontend validation |

## Rules

- Every dashboard metric must be traceable to a source fixture and at least one canonical knowledge document.
- Every scenario score must be numeric and reproducible from fixture assumptions or simulator output.
- Every next action must be tied to a scenario, metric, recommendation, or rule.
- User-visible dashboard strings must pass readable UTF-8 validation.
- Every metric `formulaIds` value must resolve through `frontend/fixtures/dashboard-field-traceability.json`.
- Field traceability must be validated by `npm run validate:dashboard-field-traceability`.

## Known Gaps

- Current dashboard snapshots are fixture-backed rather than generated from a production calculation service.
- Formula identifiers are now machine-mapped to canonical knowledge sources for visible dashboard metrics.
- Runtime service projection remains fixture-backed until production calculation service output owns dashboard generation.

## Related Specifications

- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/product/current-capability-matrix.md`
- `knowledge/product/simulator-formula-coverage.md`
- `frontend/fixtures/dashboard-snapshots.json`
- `frontend/fixtures/dashboard-field-traceability.json`
