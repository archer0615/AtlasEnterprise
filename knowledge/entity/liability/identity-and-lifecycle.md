# Liability Identity and Lifecycle

## Purpose
This split document isolates Liability identity, aggregate root behavior, aggregate boundary, lifecycle, ownership, relationships, navigation, properties, validation, business rules, invariants, and state machine from the parent Liability Entity Specification.

## Source
- Parent specification: [Liability Entity Specification](../Liability.md)

## Identity
Liability stores debt identity, classification, amount, rate, payment terms, dates, lender, secured status, collateral reference, audit fields, version, and concurrency metadata.

## Lifecycle
Liability lifecycle covers active obligation, payment recording, balance adjustment, payoff, archive, restore, delete, and terminal state protection.

## Invariants
Outstanding balance cannot be negative, archived liabilities cannot accept mutation, payment and balance adjustments must be audited, and Loan-owned behavior must not be mutated by Liability.

