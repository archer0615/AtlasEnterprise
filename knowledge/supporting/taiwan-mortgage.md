# Taiwan Mortgage Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Project Atlas
在台灣房屋貸款（Mortgage）領域的知識模型、商業規則與預設假設。

本文件提供 Loan Engine、Home Upgrade Engine、Cash Flow Engine、Decision
Engine 共用。

------------------------------------------------------------------------

# Scope

涵蓋：

-   首購房貸
-   一般房貸
-   換屋房貸
-   增貸
-   轉貸
-   寬限期
-   提前清償
-   利率模式

------------------------------------------------------------------------

# Mortgage Types

-   First Home Mortgage
-   General Mortgage
-   Home Upgrade Mortgage
-   Home Equity Loan
-   Refinancing Mortgage

------------------------------------------------------------------------

# Interest Types

-   Fixed Rate
-   Floating Rate
-   Mixed Rate

------------------------------------------------------------------------

# Repayment Methods

-   Equal Principal and Interest
-   Equal Principal
-   Interest Only (Grace Period)

------------------------------------------------------------------------

# Loan Attributes

每筆房貸至少包含：

-   Loan Id
-   Property Id
-   Principal
-   Outstanding Balance
-   Interest Rate
-   Interest Type
-   Loan Term
-   Grace Period
-   Payment Method
-   Monthly Payment
-   LTV
-   Start Date
-   End Date

------------------------------------------------------------------------

# Evaluation Indicators

-   Loan To Value (LTV)
-   Debt Service Ratio (DSR)
-   Monthly Payment
-   Total Interest
-   Remaining Balance
-   Remaining Term
-   Free Cash Flow Impact

------------------------------------------------------------------------

# Cash Flow Impact

房貸分析必須評估：

-   每月還款能力
-   緊急預備金
-   被動收入覆蓋率
-   換屋影響
-   退休影響

------------------------------------------------------------------------

# Home Upgrade Rules

需同時比較：

-   保留第一間房
-   出售第一間房
-   出租第一間房

至少模擬 30 年。

------------------------------------------------------------------------

# Business Rules

## TM-001

房貸不得導致 Free Cash Flow 長期為負。

## TM-002

增貸前須重新評估 DSR。

## TM-003

轉貸須比較：

-   利率
-   手續費
-   違約成本
-   現金流改善

## TM-004

提前還款須比較：

-   節省利息
-   投資機會成本
-   流動性影響

## TM-005

所有房貸決策均需進行情境分析。

------------------------------------------------------------------------

# Scenario Support

-   Interest Rate Increase
-   Property Price Decline
-   Income Reduction
-   Job Loss
-   Rental Vacancy

------------------------------------------------------------------------

# Domain Events

-   MortgageCreated
-   MortgageUpdated
-   MortgageRefinanced
-   MortgagePaidOff
-   GracePeriodChanged
-   InterestRateChanged

------------------------------------------------------------------------

# Related Documents

-   docs/10-LoanEngine.md
-   docs/11-HomeUpgradeEngine.md
-   docs/08-CashFlowEngine.md
-   knowledge/loan.md
-   knowledge/property.md
-   knowledge/cashflow.md
