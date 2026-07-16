# Portfolio Rules and State

## Purpose
This split document isolates Portfolio validation rules, business rules, aggregate invariants, state machine, commands, and domain event boundaries from the parent Portfolio Entity Specification.

## Source
- Parent specification: [Portfolio Entity Specification](../Portfolio.md)

## Validation Rules
Portfolio validation requires AssetPortfolioId, HouseholdId, OwnerUserId, PortfolioName, BaseCurrency, unique tenant PortfolioNumber, valid target allocation totals, valid RebalancePolicy, and trusted owner, household, and asset portfolio references.

## Business Rules
Portfolio is a child entity owned by AssetPortfolio. Holding is the Catalog entity for positions inside Portfolio, and Goal, Scenario, Decision, Recommendation, MarketData, and external read models remain reference-only or projection-only outside Portfolio mutation.

## Aggregate Invariants
AssetPortfolio protects Portfolio, Holding membership, allocation metadata, lifecycle state, version, and ConcurrencyToken. Archived or deleted Portfolio rejects ordinary updates, repository business logic is forbidden, and performance, NAV, risk, allocation, and dashboard values remain projections.

## State and Events
Draft, Active, Suspended, Archived, and Deleted are implementation status values. Catalog command and event boundaries remain CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio, PortfolioCreated, SecurityPurchased, SecuritySold, PortfolioRebalanced, and DividendDistributed.
