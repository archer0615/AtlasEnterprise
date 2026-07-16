# Portfolio Commands and Events

## Purpose

This split document summarizes the command, event, and repository execution boundaries for Portfolio. Portfolio remains owned inside AssetPortfolio, and the parent specification remains the source of truth.

## Commands

| Command or Use Case | Catalog Status | Handler Boundary | Repository | Events | Notes |
|---|---|---|---|---|---|
| CreatePortfolio | Catalog Command | CreatePortfolioCommandHandler; PortfolioApplicationService | PortfolioRepository | PortfolioCreated | Mutates AssetPortfolio only |
| BuySecurity | Catalog Command | PortfolioApplicationService | PortfolioRepository | SecurityPurchased | Mutates Holding |
| SellSecurity | Catalog Command | PortfolioApplicationService | PortfolioRepository | SecuritySold | Mutates Holding |
| RebalancePortfolio | Catalog Command | PortfolioApplicationService; AllocationService | PortfolioRepository | PortfolioRebalanced | Updates allocation and holdings |
| ArchivePortfolio | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case only |
| RestorePortfolio | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | Audit only |
| ActivatePortfolio | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case |
| DeactivatePortfolio | Catalog Gap | PortfolioApplicationService | PortfolioRepository | None | API use case |
| AssignAsset | Catalog Gap unless mapped to BuySecurity or Holding command | PortfolioApplicationService | PortfolioRepository | SecurityPurchased when buy | Do not create new Domain Command |
| RemoveAsset | Catalog Gap unless mapped to SellSecurity | PortfolioApplicationService | PortfolioRepository | SecuritySold when sell | Do not create new Domain Command |

## Domain Events

| Event | Catalog Status | Producer | Consumer | Portfolio Impact |
|---|---|---|---|---|
| PortfolioCreated | Catalog Event | CreatePortfolio | Decision, Dashboard | Portfolio exists. |
| SecurityPurchased | Catalog Event | BuySecurity | Decision, Dashboard | Holding quantity increases. |
| SecuritySold | Catalog Event | SellSecurity | Decision, Dashboard | Holding quantity decreases. |
| PortfolioRebalanced | Catalog Event | RebalancePortfolio | Decision, Dashboard | Allocation changed. |
| DividendDistributed | Catalog Event | PortfolioApplicationService | Cash Flow, Dashboard | Income projection updates. |
| PortfolioUpdated | Catalog Gap | None | None | Use audit. |
| PortfolioArchived | Catalog Gap | None | None | Use audit. |
| PortfolioDeleted | Catalog Gap | None | None | Use audit. |

## Repository Boundary

```csharp
public interface IPortfolioRepository
{
    Task<AssetPortfolio?> GetAssetPortfolioAsync(Guid tenantId, Guid householdId, Guid assetPortfolioId, CancellationToken cancellationToken);
    Task<Portfolio?> GetPortfolioAsync(Guid tenantId, Guid householdId, Guid portfolioId, CancellationToken cancellationToken);
    Task<bool> ExistsPortfolioAsync(Guid tenantId, Guid householdId, Guid portfolioId, CancellationToken cancellationToken);
    Task<bool> ExistsNumberAsync(Guid tenantId, string portfolioNumber, CancellationToken cancellationToken);
    Task<PagedResult<Portfolio>> ListPortfoliosAsync(PortfolioSearchSpecification specification, CancellationToken cancellationToken);
    Task AddAsync(AssetPortfolio assetPortfolio, CancellationToken cancellationToken);
    Task UpdateAsync(AssetPortfolio assetPortfolio, CancellationToken cancellationToken);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}
```

## Query Methods

| Query | Filters | Sorts | Index Used |
|---|---|---|---|
| Search portfolios | tenantId, householdId, ownerUserId, status, portfolioType | portfolioName, updatedAt, totalMarketValue | tenant-household indexes |
| Active portfolios | tenantId, householdId, status Active | portfolioName | status index |
| Archived portfolios | tenantId, householdId, isArchived | archivedAt | archive index |
| Owner portfolios | tenantId, ownerUserId | portfolioName | owner index |

## Specification Pattern

Specifications describe persistence filters only. They do not calculate performance, market value, risk, allocation optimization, authorization, or recommendations.

