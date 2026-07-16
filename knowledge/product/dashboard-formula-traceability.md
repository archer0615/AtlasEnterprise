# Dashboard Formula Traceability

Document Path: knowledge/product/dashboard-formula-traceability.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Dashboard
Owner: Project Atlas
Source of Truth: Atlas Dashboard Formula Traceability Source of Truth
Last Updated: 2026-07-16

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

## Known Gaps

- Current dashboard snapshots are fixture-backed rather than generated from a production calculation service.
- Some metrics have document-level traceability but do not yet map to a named formula identifier.
- Formula identifiers should be added when the formula catalog is expanded.

## Related Specifications

- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/product/current-capability-matrix.md`
- `knowledge/product/simulator-formula-coverage.md`
- `frontend/fixtures/dashboard-snapshots.json`
