# Loan Split Progress Report

## Purpose

This report records the first Loan entity split scaffolding pass.

## Extracted Split Documents

| Split Document | Scope |
| --- | --- |
| `knowledge/entity/loan/identity-and-repayment.md` | Identity, household scope, repayment behavior |
| `knowledge/entity/loan/risk-and-refinancing.md` | Debt pressure, rate shock, refinancing |
| `knowledge/entity/loan/api-and-audit.md` | API boundary, permission, audit |
| `knowledge/entity/loan/scenario-integration.md` | Scenario simulator and dashboard integration |

## Validation

- Rebuild generated knowledge after Loan split changes.
- Run `npm run validate`.

## Follow-up

- Reduce duplicated content from parent `Loan.md` only after cross-links are stable.
- Add executable loan formula tests when simulator logic exists.
