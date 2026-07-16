# Formula Coverage Roadmap

Document Path: knowledge/product/formula-coverage-roadmap.md
Document Type: Atlas Enterprise Planning Note
Version: 1.0
Status: Planning
Domain: Formula Governance
Bounded Context: Calculation
Owner: Project Atlas
Source of Truth: Atlas Formula Coverage Roadmap
Last Updated: 2026-07-16

## Purpose

Tracks the next formula coverage increments after the current dashboard and simulator formula alignment work.

## Roadmap

| Priority | Work Item | Target |
| --- | --- | --- |
| P0 | Add explicit formula IDs to simulator outputs | Simulator result payloads include formula references. |
| P0 | Add amortization schedule fixture | Validate `FORM-LOAN-AMORTIZATION` period-by-period. |
| P0 | Add refinancing fee breakdown fixture | Validate `FORM-REFI-BREAK-EVEN` with fee components. |
| P1 | Add portfolio attribution fixture | Validate `FORM-DRAWDOWN-ATTRIBUTION` by holding and classification. |
| P1 | Add retirement withdrawal stress fixture | Validate `FORM-WITHDRAWAL-SUSTAINABILITY` under stress cases. |
| P1 | Add formula registry validation script | Ensure all mapped formula IDs exist in the catalog. |
| P2 | Add runtime formula evaluation contract | Align future services with current formula IDs. |

## Completion Criteria

- `npm run validate` passes.
- Formula IDs in dashboard and simulator docs match the formula catalog.
- Fixture outputs can name the formulas used for key metrics.

## Related Specifications

- `knowledge/product/formula-validation-matrix.md`
- `knowledge/product/dashboard-metric-formula-mapping.md`
- `knowledge/product/simulator-formula-coverage.md`
