# Mortgage Property and Collateral Rules

## Purpose

This split document isolates Mortgage properties, monetary semantics, interest model, repayment model, grace period model, collateral reference model, validation rules, business rules, aggregate invariants, and state machine behavior from the larger Mortgage entity specification.

## Source

- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Property Semantics

- Mortgage maintains MortgageId or LoanId subtype identity, LoanId linkage, PropertyId or CollateralAssetId reference, principal state, balance state, interest metadata, repayment metadata, grace period metadata, Taiwan mortgage detail, audit fields, and versioning.
- Mortgage is a property-backed loan subtype inside the Loan aggregate and is not an aggregate root.
- Principal, remaining principal, outstanding balance, accrued interest snapshots, fees, and repayment values must keep Money and Currency semantics.
- Fixed/floating rate inputs, effective dates, payment cadence, repayment model, and grace period inputs feed LoanService and calculation engine behavior.

## Collateral Reference Rules

- PropertyId or CollateralAssetId is a reference only and must not transfer Asset or Property valuation ownership into Mortgage.
- Appraisal ownership and lien ownership are not Catalog Concepts here.
- Collateral validation must reject invalid or cross-scope references while preserving Loan aggregate ownership.

## Validation and Invariants

- Mortgage requires Loan linkage, valid household scope through Loan, valid currency, valid principal and balance values, valid interest metadata, and valid collateral references where provided.
- Mortgage lifecycle follows Loan lifecycle; payment, refinance, and closure behavior route through Loan commands.
- Mortgage-specific status values are implementation values and must not create new catalog enumerations.

## Related References

- [Mortgage Entity Specification](../Mortgage.md)
- [Mortgage identity and repayment](identity-and-repayment.md)
- [Mortgage persistence and API](persistence-and-api.md)
- [Loan Entity Specification](../Loan.md)
