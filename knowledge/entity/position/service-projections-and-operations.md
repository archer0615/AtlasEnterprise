# Position Service Projections and Operations

## Purpose

This split document summarizes how Position/Holding interacts with services, application services, caches, security, audit, observability, and performance controls. It does not introduce behavior beyond the parent Position specification.

## Domain Service Interaction

| Service | Catalog Status | Position Interaction |
|---|---|---|
| PortfolioService | Catalog-aligned | Calculates valuation and projection input from holdings. |
| AllocationService | Catalog-aligned | Validates allocation and supports RebalancePortfolio. |
| RiskService | Catalog-aligned | Consumes holding projections for risk analysis. |
| ScenarioService | Catalog-aligned | Uses holding snapshots as scenario input. |
| DecisionService | Catalog-aligned | Uses holding projections for decisions. |
| RecommendationService | Catalog-aligned | Uses projections outside Holding. |
| Calculation Engine | Catalog-aligned capability | Performs formulas for services. |
| Projection Engine | Catalog-aligned capability | Builds read models, never writes aggregate. |

## Application Service Interaction

| Application Service | Catalog Status | Position Responsibility |
|---|---|---|
| PortfolioApplicationService | Catalog-aligned | Handles BuySecurity, SellSecurity, RebalancePortfolio, and holding API use cases. |
| DashboardApplicationService | Catalog-aligned | Reads holding valuation projections. |
| ScenarioApplicationService | Catalog-aligned where present | Uses holding snapshots. |
| DecisionApplicationService | Catalog-aligned where present | Uses holding projections. |
| RecommendationApplicationService | Catalog-aligned where present | Reads projections. |
| ReportApplicationService | Catalog-aligned | Position reports and audit explanations. |
| AdministrationApplicationService | Catalog-aligned | Audit and operational queries. |

## Cache Strategy

| Cache | Key | Invalidation | Source of Truth |
|---|---|---|---|
| Position detail | tenant:{tenantId}:portfolio:{portfolioId}:holding:{holdingId}:v{version} | Any Holding write | PortfolioRepository |
| Holding valuation | tenant:{tenantId}:holding:{holdingId}:valuation:{hash} | Market source, quantity, cost change | Projection |
| Portfolio allocation | tenant:{tenantId}:portfolio:{portfolioId}:allocation:{hash} | Holding quantity/cost change | AllocationService output |
| Search cache | tenant:{tenantId}:holdings:search:{hash} | Any holding write in tenant | PortfolioRepository |

## Security

| Area | Rule |
|---|---|
| Authorization | Actor must have TenantId, HouseholdId, PortfolioId, and permission before repository access. |
| Permission | Asset:Read, Asset:Update, Asset:Archive, Asset:Restore, Asset:Delete map to Holding operations. |
| Data Masking | SecurityIdentifier, PositionName, quantity, cost, and valuation data are masked in low-trust logs. |
| Encryption | No field encrypted by default; policy may encrypt account-linked fields outside Holding. |
| Tenant Isolation | TenantId comes from trusted context. |
| Household Isolation | HouseholdId required on every command and query. |
| Market Data | Market data cannot overwrite quantity or cost source fields. |

## Audit

| Audit Requirement | Implementation |
|---|---|
| Command trace | Capture BuySecurity, SellSecurity, RebalancePortfolio, idempotency key, handler. |
| Write trace | Capture before and after values for quantity, cost, asset reference, status. |
| Actor trace | Capture CreatedBy, UpdatedBy, ArchivedBy, DeletedBy. |
| Scope trace | Capture TenantId, HouseholdId, AssetPortfolioId, PortfolioId, HoldingId. |
| Quantity trace | Capture quantity, available, locked, reserved changes. |
| Cost trace | Capture average, total, acquisition, book, base currency cost changes. |
| Projection trace | Capture valuation source and timestamp when returned, not as source. |
| Retention | Audit retained after close, archive, and soft delete. |

## Observability

| Signal | Metric or Log |
|---|---|
| API latency | position.api.duration |
| Command latency | position.command.duration |
| Repository latency | position.repository.duration |
| Projection latency | position.projection.duration |
| Concurrency conflicts | position.concurrency.conflict.count |
| Quantity updates | position.quantity.update.count |
| Cost updates | position.cost.update.count |
| Projection lag | position.projection.lag.seconds |
| Audit failure | position.audit.failure.count |

