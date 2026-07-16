# Loan Property and Lifecycle Rules

## Purpose

This split document isolates Loan properties, monetary semantics, interest model, repayment model, grace period model, validation rules, business rules, aggregate invariants, and state machine behavior from the larger Loan entity specification.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## Property Semantics

- Loan maintains `LoanId`, optional `LoanNumber`, household scope, principal state, balance state, interest metadata, term metadata, payment metadata, refinance metadata, lifecycle status, audit fields, and versioning.
- Original principal, outstanding principal, remaining balance, fees, penalties, and payment allocation must keep Money and Currency semantics.
- Interest metadata includes InterestRate, rate type values, margin, reference rate, reset metadata, and effective dates.
- Term metadata includes LoanTerm, origination date, maturity date, remaining term, payment frequency, and amortization assumptions where supported.

## Lifecycle Rules

- Loan lifecycle includes active, suspended, closed, archived, deleted, and implementation states described by the parent specification.
- `RecordLoanPayment` reduces balance and emits `LoanPaymentMade`.
- `RefinanceLoan` changes terms and emits `LoanRefinanced`.
- Closing a Loan must preserve audit history and emit catalog-aligned closure behavior.
- Mortgage behavior remains owned by Loan when Mortgage is represented as subtype/entity inside Loan.

## Validation and Invariants

- Loan requires stable identity, household authorization scope, valid currency, non-negative principal and balance values, valid interest metadata, and valid term metadata.
- Payment application must not create invalid negative balances unless explicitly defined by settlement behavior.
- Refinance behavior must preserve command/event mapping and audit completeness.
- Repository logic must not perform business calculations; LoanService and calculation engine own calculation behavior.

## Related References

- [Loan Entity Specification](../Loan.md)
- [Loan identity and repayment](identity-and-repayment.md)
- [Loan risk and refinancing](risk-and-refinancing.md)
- [Mortgage Entity Specification](../Mortgage.md)
