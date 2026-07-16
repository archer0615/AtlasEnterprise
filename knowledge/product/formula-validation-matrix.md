# Formula Validation Matrix

Document Path: knowledge/product/formula-validation-matrix.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Formula Governance
Bounded Context: Calculation
Owner: Project Atlas
Source of Truth: Atlas Formula Validation Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines validation coverage expected for active formula identifiers.

## Matrix

| Formula ID | Required Tests | Fixture Coverage | Remaining Gap |
| --- | --- | --- | --- |
| FORM-PMT | Positive rate, zero rate, invalid term | Mortgage and refinancing fixtures | Production formula test IDs. |
| FORM-LOAN-AMORTIZATION | Terminal balance, extra payment, rounding | Mortgage fixture | Full schedule fixture. |
| FORM-REFI-BREAK-EVEN | Benefit, no benefit, conditional, fee shock | Refinancing fixture | Fee breakdown fixture. |
| FORM-DTI | Normal, threshold breach, zero income rejection | Mortgage/refinancing fixtures | Explicit zero denominator case. |
| FORM-LTV | Normal, collateral drop, missing collateral | Loan fixtures | Collateral valuation versioning. |
| FORM-CF-COVERAGE | Monthly coverage, stress coverage, negative cash flow | Dashboard fixtures | Runtime cash-flow source. |
| FORM-PORTFOLIO-DRAWDOWN | Peak/trough, no drawdown, recovery date | Investment drawdown fixture | Holding-level reconciliation. |
| FORM-DRAWDOWN-ATTRIBUTION | Holding contribution, classification contribution, rounding | Investment drawdown fixture | Attribution by factor. |
| FORM-WITHDRAWAL-SUSTAINABILITY | Base, stress, failure period, guardrail | Retirement fixture | Stochastic simulation coverage. |
| FORM-DECISION-SCORE | Weighted score, missing category, tie handling | Dashboard fixtures | Rule-driven scoring fixtures. |

## Rules

- Every active formula must have at least one positive and one negative validation case.
- Schedule formulas must validate ordering and terminal conditions.
- Ratio formulas must validate denominator behavior.
- Dashboard formulas must validate readable user-facing output.

## Related Specifications

- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/product/simulator-formula-coverage.md`
- `knowledge/product/dashboard-metric-formula-mapping.md`
