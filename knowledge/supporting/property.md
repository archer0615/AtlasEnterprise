# Property Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Property 定義 Project Atlas 對不動產的領域知識、商業規則與共同語言。

所有房屋相關模組（Home Upgrade、Loan、Cash
Flow、Decision）皆引用本文件。

------------------------------------------------------------------------

# Objectives

-   支援自住房決策
-   支援換屋決策
-   支援保留第一間房分析
-   支援出租與現金流分析
-   支援退休住宅規劃

------------------------------------------------------------------------

# Property Types

-   Primary Residence
-   Secondary Residence
-   Rental Property
-   Investment Property
-   Commercial Property
-   Land

------------------------------------------------------------------------

# Property Attributes

每筆 Property 至少包含：

-   Property Id
-   Name
-   Owner
-   Address
-   Country
-   Usage Type
-   Purchase Date
-   Purchase Price
-   Current Market Value
-   Floor Area
-   Land Area
-   Mortgage
-   Ownership Ratio
-   Occupancy Status

------------------------------------------------------------------------

# Valuation

支援：

-   Purchase Price
-   Market Value
-   Appraised Value
-   Estimated Value

------------------------------------------------------------------------

# Ownership

-   Sole Ownership
-   Joint Ownership
-   Trust
-   Company

------------------------------------------------------------------------

# Property Cash Flow

收入：

-   Rental Income
-   Parking Income
-   Other Income

支出：

-   Mortgage
-   Management Fee
-   Property Tax
-   Maintenance
-   Insurance
-   Vacancy Cost
-   Renovation

------------------------------------------------------------------------

# KPIs

-   Net Property Value
-   Loan To Value
-   Rental Yield
-   Net Rental Yield
-   Monthly Cash Flow
-   Annual Cash Flow
-   Appreciation Rate

------------------------------------------------------------------------

# Business Rules

## PR-001

Primary Residence 優先滿足居住需求。

## PR-002

換屋決策必須比較保留與出售兩種方案。

## PR-003

Rental Property 必須評估空置率。

## PR-004

所有房產皆需納入資產配置。

## PR-005

房屋交易必須納入稅費與交易成本。

## PR-006

重大房產決策須重新模擬至少30年現金流。

------------------------------------------------------------------------

# Risks

-   Interest Rate Risk
-   Vacancy Risk
-   Liquidity Risk
-   Market Risk
-   Maintenance Risk
-   Regulatory Risk

------------------------------------------------------------------------

# Domain Events

-   PropertyAdded
-   PropertyUpdated
-   PropertySold
-   PropertyPurchased
-   RentalStarted
-   RentalEnded
-   PropertyValuationUpdated
-   MortgageLinked

------------------------------------------------------------------------

# Related Engines

-   Home Upgrade Engine
-   Loan Engine
-   Cash Flow Engine
-   Decision Engine
-   Retirement Engine

------------------------------------------------------------------------

# Related Documents

-   docs/11-HomeUpgradeEngine.md
-   docs/10-LoanEngine.md
-   docs/08-CashFlowEngine.md
-   knowledge/loan.md
-   knowledge/cashflow.md
-   knowledge/decision-principles.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Property Contract

| Field | Requirement |
|---|---|
| Aggregate | Property |
| Identity | propertyId |
| Scope | tenantId, householdId |
| Required State | name, owner, address, country, usageType, purchaseDate, purchasePrice, ownershipRatio |
| Derived State | currentMarketValue, netPropertyValue, loanToValue, netRentalYield, monthlyCashFlow |
| Invariant | Ownership ratio must be greater than 0 and not exceed 100%. |

## Required Commands

| Command | Purpose |
|---|---|
| AddProperty | Register property asset. |
| UpdatePropertyProfile | Update property attributes. |
| UpdatePropertyValuation | Record market, appraised, or estimated value. |
| LinkMortgageToProperty | Link mortgage liability. |
| StartPropertyRental | Start rental cash flow tracking. |
| EndPropertyRental | End rental cash flow tracking. |
| SellProperty | Close property ownership with transaction costs. |
| ReplayPropertyState | Rebuild property state from events. |

## Domain Events

| Event | Trigger |
|---|---|
| PropertyAdded | Property is registered. |
| PropertyUpdated | Property attributes change. |
| PropertyValuationUpdated | Valuation is refreshed. |
| MortgageLinked | Mortgage is linked. |
| RentalStarted | Rental period begins. |
| RentalEnded | Rental period ends. |
| PropertySold | Property is sold. |
| PropertyStateReplayed | Property state is rebuilt. |

## Validation Rules

1. Purchase price and current market value must be non-negative.
2. Rental property must include vacancy and maintenance assumptions.
3. Property sale must include transaction cost and tax assumptions.
4. Mortgage linkage must reference an existing loan.
5. Sold properties cannot receive new valuation, rental, or mortgage-link commands.

## API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/properties | POST | Add property. |
| /api/properties/{propertyId} | GET | Retrieve property state. |
| /api/properties/{propertyId}/valuation | POST | Update valuation. |
| /api/properties/{propertyId}/mortgage | POST | Link mortgage. |
| /api/properties/{propertyId}/rental/start | POST | Start rental tracking. |
| /api/properties/{propertyId}/rental/end | POST | End rental tracking. |
| /api/properties/{propertyId}/sell | POST | Sell property. |

## Testing Matrix

| Scenario | Expected Result |
|---|---|
| Add valid primary residence | PropertyAdded is emitted. |
| Ownership ratio above 100% | Validation fails. |
| Rental without vacancy assumption | Validation fails. |
| Sell with transaction costs | PropertySold records net proceeds. |
| Replay property state | Valuation, mortgage, rental, and sold status match events. |

## Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
