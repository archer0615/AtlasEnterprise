# Portfolio Execution and Reporting

## Purpose
This split document isolates portfolio commands, events, validation, API, KPIs, and testing from the parent Portfolio Knowledge Base.

## Source
- Parent specification: [Portfolio Knowledge Base](../portfolio.md)

## Portfolio Contract
Portfolio owns name, owner, base currency, target allocation, current allocation, holdings, risk level, market value, cost basis, unrealized gain/loss, annual income, and allocation drift.

## Required Commands
- CreatePortfolio
- UpdatePortfolioProfile
- AddPortfolioHolding
- RemovePortfolioHolding
- UpdatePortfolioValuation
- ChangePortfolioAllocation
- ArchivePortfolio
- ReplayPortfolioState

## Domain Events
- PortfolioCreated
- PortfolioProfileUpdated
- PortfolioHoldingAdded
- PortfolioHoldingRemoved
- PortfolioValuationUpdated
- PortfolioAllocationChanged
- PortfolioArchived
- PortfolioStateReplayed

## KPIs
Portfolio reporting exposes portfolio value, net investment value, annual income, passive income ratio, asset allocation accuracy, portfolio return, drawdown, and risk score.

## Testing Matrix
Testing covers valid portfolio creation, invalid allocation totals, unsupported asset class rejection, IPS validation, archive protection, and replay accuracy.

