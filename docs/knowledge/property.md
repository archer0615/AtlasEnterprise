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
