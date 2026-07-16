# Position Rules and State

## Purpose
This split document isolates Position/Holding validation rules, business rules, aggregate invariants, state machine, commands, and domain event boundaries from the parent Position Entity Specification.

## Source
- Parent specification: [Position Entity Specification](../Position.md)

## Validation Rules
Position/Holding validation requires AssetPortfolioId, PortfolioId, AssetId, SecurityIdentifier, Quantity, Currency, quantity precision, non-negative cost fields, valid available and locked quantities, and trusted tenant, household, portfolio, and asset references.

## Business Rules
Position is business/API terminology only. The final Atlas Domain name is Holding, owned by AssetPortfolio through Portfolio, and calculations for valuation, performance, risk, recommendation, scenario projection, and decision score remain outside the aggregate.

## Aggregate Invariants
AssetPortfolio is the transaction and concurrency boundary. Quantity cannot be negative, AvailableQuantity cannot exceed Quantity, zero Quantity closes Holding, projection values cannot write source fields, and PortfolioRepository must not calculate or authorize.

## State and Events
Active, Closed, Suspended, Archived, and Deleted are implementation status values. Catalog commands and events remain BuySecurity, SellSecurity, RebalancePortfolio, SecurityPurchased, SecuritySold, PortfolioRebalanced, and DividendDistributed.
