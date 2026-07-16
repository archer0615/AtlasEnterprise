# Loan Workflow

Document Path: knowledge/workflow/loan-workflow.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Debt Management
Bounded Context: Loan
Owner: Project Atlas
Source of Truth: Atlas Loan Workflow Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the end-to-end workflow for loan intake, repayment modeling, affordability review, refinancing analysis, and lifecycle monitoring.

## Scope

- Loan and mortgage intake.
- Payment schedule and amortization modeling.
- Debt risk, affordability, DTI, and LTV assessment.
- Scenario comparison and refinancing review.
- Repayment tracking, delinquency handling, closure, and audit.

## Inputs

- Loan, mortgage, liability, asset, and household records.
- Principal, rate, term, repayment type, fees, collateral, and currency.
- Cash-flow, income, expense, tax, and market-rate assumptions.
- Scenario and refinancing options.

## Workflow Stages

1. Validate loan identity, borrower, lender, principal, rate, term, and collateral.
2. Classify loan type, repayment behavior, rate structure, and risk category.
3. Generate payment schedule, interest cost, outstanding balance, and payoff path.
4. Calculate DTI, LTV, liquidity impact, and goal funding impact.
5. Evaluate scenario sensitivity for income, rate, property value, and repayment changes.
6. Compare refinancing, prepayment, deferment, and restructuring options.
7. Generate recommendation with trade-offs, constraints, and approval requirements.
8. Persist loan snapshot, schedule version, assumptions, and audit evidence.
9. Monitor payment status, risk changes, and covenant or threshold breaches.
10. Close, refinance, restructure, or archive the loan record.

## Outputs

- Loan lifecycle state and repayment status.
- Payment schedule, interest cost, payoff date, and remaining balance.
- Affordability, DTI, LTV, and liquidity metrics.
- Refinancing or repayment recommendation.
- Audit trail with assumptions and formula versions.

## Governance And Testing

- Payment and amortization formulas must be deterministic and versioned.
- Refinancing comparisons must include fees, rate changes, term changes, and break-even logic.
- Tests must cover fixed and variable rates, early payoff, missed payments, collateral value changes, refinancing, and invalid inputs.

## Related Specifications

- `knowledge/entity/Loan.md`
- `knowledge/entity/Mortgage.md`
- `knowledge/entity/Liability.md`
- `knowledge/supporting/loan.md`
- `knowledge/supporting/taiwan-mortgage.md`
- `knowledge/rule/loan-decision-rule-catalog.md`
- `knowledge/engine/calculation-engine-framework.md`
