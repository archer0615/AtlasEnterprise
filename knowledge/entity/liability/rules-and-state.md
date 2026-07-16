# Liability Rules and State

## Purpose
This split document isolates Liability validation rules, business rules, aggregate invariants, state machine, commands, and domain event boundaries from the parent Liability Entity Specification.

## Source
- Parent specification: [Liability Entity Specification](../Liability.md)

## Validation Rules
Liability validation requires TenantId, HouseholdId, LiabilityPortfolioId, LiabilityName, Currency, non-negative OutstandingBalance, valid amount ordering, valid payment dates, and trusted cross-aggregate references for LoanId, MortgageId, and CollateralAssetId.

## Business Rules
Liability remains a child entity owned by LiabilityPortfolio. Loan, Mortgage, CashFlow, Asset, Goal, Scenario, Decision, Recommendation, and Notification behavior is reference-only or projection-only and cannot be mutated through Liability.

## Aggregate Invariants
LiabilityPortfolio is the consistency and concurrency boundary. Closed Liability requires zero OutstandingBalance, archived or deleted Liability rejects ordinary update, read model values cannot become aggregate source state, and every amount mutation must be audited.

## State and Events
Active, Suspended, Closed, Archived, and Deleted are implementation status values. No LiabilityPortfolio domain events are cataloged; use audit records and catalog-owned Loan events without creating new Liability domain events.
