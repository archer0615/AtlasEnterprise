# Mortgage Identity and Repayment

## Purpose
This split document isolates Mortgage identity, aggregate boundary, lifecycle, ownership, relationships, properties, monetary semantics, interest model, repayment model, grace period model, collateral reference model, validation, and business rules from the parent Mortgage Entity Specification.

## Source
- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Identity
Mortgage represents a housing loan record aligned to Loan ownership where mortgage behavior must preserve household, property, collateral, repayment, and audit context.

## Repayment Model
Repayment behavior covers principal, interest, installment amount, payment frequency, early repayment, refinance context, grace period, and amortization cache ownership.

## Invariants
Mortgage balances cannot become negative, repayment must preserve loan command ownership, collateral references must resolve, and closed mortgage records cannot receive payment.

