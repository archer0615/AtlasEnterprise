# Position Commands and Events

## Purpose

This split document summarizes the command, event, and repository execution boundaries for Position. Position is the business/API synonym for the cataloged Holding entity inside AssetPortfolio. The parent specification remains the source of truth.

## Commands

| Command or Use Case | Catalog Status | Handler Boundary | Repository | Events | Notes |
|---|---|---|---|---|---|
| BuySecurity | Catalog Command | PortfolioApplicationService | PortfolioRepository | SecurityPurchased | Increases Holding quantity |
| SellSecurity | Catalog Command | PortfolioApplicationService | PortfolioRepository | SecuritySold | Decreases Holding quantity |
| RebalancePortfolio | Catalog Command | PortfolioApplicationService; AllocationService | PortfolioRepository | PortfolioRebalanced | May change holdings |
| RecordIncome | Catalog Command in cash flow context | PortfolioApplicationService where dividend event applies | PortfolioRepository | DividendDistributed | Event maps to Holding |
| CreatePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | SecurityPurchased when mapped to BuySecurity | API use case only |
| UpdatePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case only |
| ArchivePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | Audit only |
| RestorePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case |
| ActivatePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case |
| DeactivatePosition | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case |
| QuantityAdjustment | Catalog Gap unless mapped to BuySecurity/SellSecurity | PortfolioApplicationService | PortfolioRepository | Catalog event only when mapped | Do not add command |
| CostAdjustment | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case with audit only |

## Domain Events

| Event | Catalog Status | Producer | Consumer | Position Impact |
|---|---|---|---|---|
| SecurityPurchased | Catalog Event | BuySecurity | Dashboard, Allocation Projection, Scenario | Quantity increases. |
| SecuritySold | Catalog Event | SellSecurity | Dashboard, Allocation Projection, Scenario | Quantity decreases. |
| PortfolioRebalanced | Catalog Event | RebalancePortfolio | Dashboard, Risk Projection, Scenario | Holdings may change. |
| DividendDistributed | Catalog Event | PortfolioApplicationService or catalog income workflow | Cash Flow Projection, Dashboard | Income projection updates. |
| PositionCreated | Catalog Gap | None | None | Use SecurityPurchased and audit. |
| PositionUpdated | Catalog Gap | None | None | Use audit. |
| PositionArchived | Catalog Gap | None | None | Use audit. |
| PositionDeleted | Catalog Gap | None | None | Use audit. |

## Repository Boundary

```csharp
public interface IPortfolioRepository
{
    Task<AssetPortfolio?> GetAssetPortfolioAsync(Guid tenantId, Guid householdId, Guid assetPortfolioId, CancellationToken cancellationToken);
    Task<Holding?> GetHoldingAsync(Guid tenantId, Guid householdId, Guid portfolioId, Guid holdingId, CancellationToken cancellationToken);
    Task<bool> ExistsHoldingAsync(Guid tenantId, Guid householdId, Guid holdingId, CancellationToken cancellationToken);
    Task<PagedResult<Holding>> ListHoldingsAsync(HoldingSearchSpecification specification, CancellationToken cancellationToken);
    Task AddAsync(AssetPortfolio assetPortfolio, CancellationToken cancellationToken);
    Task UpdateAsync(AssetPortfolio assetPortfolio, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
```

## Query Methods

| Query | Filters | Sorts | Index Used |
|---|---|---|---|
| Search holdings | tenantId, householdId, portfolioId, assetId, status | securityIdentifier, quantity, updatedAt | tenant-portfolio indexes |
| Active holdings | tenantId, portfolioId, status Active | securityIdentifier | status index |
| Closed holdings | tenantId, portfolioId, status Closed | closedAt | closed index |
| Asset holdings | tenantId, assetId | updatedAt | asset index |

## Specification Pattern

Specifications describe filters only. They do not calculate price, return, gain, FX, risk, authorization, or recommendations.

