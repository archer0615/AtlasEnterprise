# Loan Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Loan 是 Project Atlas 中的重要現金流工具，而非單純負債。

貸款的存在應提升人生決策彈性，而非增加財務風險。

------------------------------------------------------------------------

# Core Principles

-   不以「零負債」為目標。
-   以最佳化 Cash Flow 為優先。
-   保留流動性優先於過度提前還款。
-   貸款必須服務人生目標。

------------------------------------------------------------------------

# Loan Types

## Mortgage

-   First Mortgage
-   Second Mortgage
-   Home Equity Loan
-   Home Equity Line of Credit

## Personal Loan

-   Unsecured Loan
-   Salary Loan

## Auto Loan

-   Vehicle Financing

## Investment Loan

-   Margin Loan
-   Securities Financing

------------------------------------------------------------------------

# Loan Attributes

每筆 Loan 至少包含：

-   Principal
-   Outstanding Balance
-   Interest Rate
-   Interest Type
-   Loan Term
-   Payment Frequency
-   Payment Method
-   Start Date
-   End Date
-   Currency
-   Collateral
-   Scenario

------------------------------------------------------------------------

# Interest Types

-   Fixed Rate
-   Floating Rate
-   Mixed Rate

------------------------------------------------------------------------

# Repayment Methods

-   Equal Principal and Interest
-   Equal Principal
-   Interest Only
-   Balloon Payment
-   Bullet Payment

------------------------------------------------------------------------

# Loan Status

-   Planned
-   Active
-   PaidOff
-   Default
-   Closed

------------------------------------------------------------------------

# Business Rules

## LN-001

貸款不得使 Monthly Free Cash Flow 低於安全門檻。

## LN-002

提前還款前，必須比較：

-   投資報酬率
-   貸款利率
-   流動性影響
-   稅務影響

## LN-003

房貸優先視為長期策略工具。

## LN-004

信貸不得作為長期生活費來源。

## LN-005

任何增貸皆需重新模擬未來 30 年 Cash Flow。

------------------------------------------------------------------------

# Risk Levels

-   Low
-   Medium
-   High
-   Critical

依據：

-   Debt Service Ratio
-   Loan To Value
-   Cash Flow
-   Emergency Fund
-   Income Stability

------------------------------------------------------------------------

# KPIs

-   Total Outstanding
-   Monthly Payment
-   Interest Cost
-   Remaining Term
-   Debt Service Ratio
-   Loan To Value
-   Average Interest Rate

------------------------------------------------------------------------

# Domain Events

-   LoanCreated
-   LoanActivated
-   LoanRefinanced
-   LoanPaymentMade
-   LoanPartiallyPaid
-   LoanPaidOff
-   InterestRateChanged

------------------------------------------------------------------------

# Related Engines

-   Loan Engine
-   Cash Flow Engine
-   Decision Engine
-   Home Upgrade Engine
-   Retirement Engine

------------------------------------------------------------------------

# Related Documents

-   docs/10-LoanEngine.md
-   docs/08-CashFlowEngine.md
-   docs/11-HomeUpgradeEngine.md
-   knowledge/cashflow.md
-   knowledge/property.md
