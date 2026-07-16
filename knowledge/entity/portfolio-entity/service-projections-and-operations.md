# Portfolio Service Projections and Operations

## Purpose

This split document summarizes how Portfolio interacts with services, application services, caches, security, audit, observability, and performance controls. It preserves the parent specification behavior and does not add new product behavior.

## Domain Service Interaction

| Service | Catalog Status | Portfolio Interaction |
|---|---|---|
| PortfolioService | Catalog-aligned | Calculates portfolio value, allocation analysis, and projection input outside repository. |
| AllocationService | Catalog-aligned | Validates target allocation and supports RebalancePortfolio. |
| RiskService | Catalog-aligned | Consumes portfolio data for risk analysis. |
| ScenarioService | Catalog-aligned | Uses portfolio snapshot as scenario input. |
| DecisionService | Catalog-aligned | Uses portfolio projections for decision analysis. |
| RecommendationService | Catalog-aligned | Uses projections outside Portfolio. |
| Calculation Engine | Catalog-aligned capability | Performs formulas for services. |
| Projection Engine | Catalog-aligned capability | Builds read models, never writes aggregate. |

## Application Service Interaction

| Application Service | Catalog Status | Portfolio Responsibility |
|---|---|---|
| PortfolioApplicationService | Catalog-aligned | Handles CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio, and API use cases. |
| DashboardApplicationService | Catalog-aligned | Reads valuation and allocation projections. |
| ScenarioApplicationService | Catalog-aligned where present | Uses portfolio snapshots. |
| DecisionApplicationService | Catalog-aligned where present | Uses portfolio projections. |
| RecommendationApplicationService | Catalog-aligned where present | Reads projections. |
| ReportApplicationService | Catalog-aligned | Investment reports and audit explanations. |
| AdministrationApplicationService | Catalog-aligned | Audit and operational queries. |

## Cache Strategy

| Cache | Key | Invalidation | Source of Truth |
|---|---|---|---|
| Portfolio detail | tenant:{tenantId}:household:{householdId}:portfolio:{portfolioId}:v{version} | Any AssetPortfolio write | PortfolioRepository |
| Portfolio valuation | tenant:{tenantId}:portfolio:{portfolioId}:valuation:{hash} | Holding, market data, valuation source change | Projection |
| Allocation summary | tenant:{tenantId}:portfolio:{portfolioId}:allocation:{hash} | Holding or target allocation change | AllocationService output |
| Performance summary | tenant:{tenantId}:portfolio:{portfolioId}:performance:{hash} | Holding, transaction, market source change | Projection |
| Search cache | tenant:{tenantId}:portfolios:search:{hash} | Any portfolio write in tenant | PortfolioRepository |

## Security

| Area | Rule |
|---|---|
| Authorization | Actor must have TenantId, HouseholdId, and permission before repository access. |
| Permission | Asset:Read, Asset:Create, Asset:Update, Asset:Archive, Asset:Restore, Asset:Delete map to portfolio operations. |
| Data Masking | PortfolioName, AccountReference, value fields, and owner references are masked in low-trust logs. |
| Encryption | AccountReference is encrypted at rest. |
| Tenant Isolation | TenantId comes from trusted context. |
| Household Isolation | HouseholdId required on every command and query. |
| Market Data | External market data cannot be persisted as aggregate fact without approved import. |

## Audit

| Audit Requirement | Implementation |
|---|---|
| Command trace | Capture CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio and idempotency. |
| Write trace | Capture before and after values for portfolio metadata and lifecycle fields. |
| Actor trace | Capture CreatedBy, UpdatedBy, ArchivedBy, DeletedBy. |
| Scope trace | Capture TenantId, HouseholdId, AssetPortfolioId, PortfolioId. |
| Allocation trace | Capture target allocation and rebalance policy changes. |
| Event trace | Link catalog events to command and transaction. |
| Retention | Audit retained after archive and soft delete. |

## Observability

| Signal | Metric or Log |
|---|---|
| API latency | portfolio.api.duration |
| Command latency | portfolio.command.duration |
| Repository latency | portfolio.repository.duration |
| PortfolioService latency | portfolio.service.duration |
| AllocationService latency | portfolio.allocation.duration |
| RiskService latency | portfolio.risk.duration |
| Concurrency conflicts | portfolio.concurrency.conflict.count |
| Projection lag | portfolio.projection.lag.seconds |
| Audit failure | portfolio.audit.failure.count |

## Performance

| Concern | Strategy |
|---|---|
| Index Strategy | Tenant, household, status, type, owner, and market value indexes. |
| Caching | Versioned detail cache and hash-based valuation/allocation/performance caches. |
| Optimistic Concurrency | Version and ConcurrencyToken on all writes. |
| Batch Calculation | Performance, NAV, market value, risk, and allocation projections calculated in service batches. |
| Partition Strategy | Partition by tenant_id for high-volume tenants. |
| Event Processing | Idempotent consumers by event id and aggregate version. |

