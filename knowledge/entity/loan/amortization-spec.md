# Loan Amortization Spec

Document Path: knowledge/entity/loan/amortization-spec.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Debt Management
Bounded Context: Loan
Owner: Project Atlas
Source of Truth: Atlas Loan Amortization Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines `FORM-LOAN-AMORTIZATION`, the canonical schedule formula for principal, interest, payment, and remaining balance.

## Inputs

| Input | Required | Unit | Rule |
| --- | --- | --- | --- |
| Principal | Yes | Money | Must be greater than zero. |
| AnnualRate | Yes | Percentage | Must be zero or greater. |
| TermMonths | Yes | Count | Must be a positive integer. |
| PaymentFrequency | Yes | Enum | Monthly by default. |
| StartDate | Yes | Date | Defines first schedule period. |
| ExtraPayment | No | Money | Defaults to zero and cannot be negative. |
| Currency | Yes | Currency | Must match loan currency. |
| RoundingPolicy | Yes | Policy | Defines money rounding precision. |

## Formula

- PeriodicRate = AnnualRate / 12.
- StandardPayment = PMT(PeriodicRate, TermMonths, Principal).
- InterestForPeriod = OpeningBalance * PeriodicRate.
- PrincipalForPeriod = StandardPayment + ExtraPayment - InterestForPeriod.
- ClosingBalance = OpeningBalance - PrincipalForPeriod.
- Final period must adjust payment so ClosingBalance does not become negative unless residual balance is explicitly configured.

When AnnualRate is zero:

- StandardPayment = Principal / TermMonths.
- InterestForPeriod = 0.

## Outputs

- Amortization schedule by period.
- Total interest.
- Total principal paid.
- Payoff date.
- Remaining balance.
- Formula version and assumption references.

## Validation

- Reject negative principal, rate, term, or extra payment.
- Reject currency mismatch.
- Verify schedule length does not exceed term unless extra payment is disabled and residual balance is configured.
- Verify final balance equals zero or configured residual after rounding.
- Replay must use the original formula version and rounding policy.

## Related Specifications

- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/entity/Loan.md`
- `knowledge/entity/loan/identity-and-repayment.md`
- `knowledge/entity/loan/risk-and-refinancing.md`
- `knowledge/workflow/loan-workflow.md`
