# Portfolio Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Portfolio 在 Atlas 中代表整體資產配置，而非單一投資帳戶。

Decision Engine、Investment Engine、Retirement Engine 與 Cash Flow
Engine 皆以 Portfolio 作為共同資料來源。

------------------------------------------------------------------------

# Objectives

-   長期資產增值
-   穩定現金流
-   控制風險
-   支援人生重大事件
-   提高財務自主性

------------------------------------------------------------------------

# Portfolio Philosophy

投資組合應服務人生，而不是追求最高報酬。

投資決策必須符合 Blueprint、IPS 與 Life Goals。

------------------------------------------------------------------------

# Asset Classes

## Cash

-   Cash
-   Savings
-   Money Market

## Fixed Income

-   Government Bond
-   Corporate Bond
-   Bond ETF
-   FCN

## Equity

-   Domestic ETF
-   International ETF
-   Individual Stocks
-   REIT

## Alternative

-   Gold
-   Commodity
-   Cryptocurrency
-   Private Assets

------------------------------------------------------------------------

# Portfolio Structure

每個 Portfolio 至少包含：

-   Portfolio Id
-   Name
-   Owner
-   Base Currency
-   Target Allocation
-   Current Allocation
-   Holdings
-   Cost Basis
-   Market Value
-   Unrealized Gain/Loss
-   Annual Income
-   Risk Level

------------------------------------------------------------------------

# Allocation Rules

每個 Asset Class 必須定義：

-   Target Weight
-   Minimum Weight
-   Maximum Weight
-   Rebalance Threshold

------------------------------------------------------------------------

# Rebalancing

觸發條件：

-   Allocation Drift
-   定期再平衡
-   人生重大事件
-   市場重大變化

方式：

-   Buy
-   Sell
-   Cash Flow Reallocation

------------------------------------------------------------------------

# Performance Metrics

-   Total Return
-   Annual Return
-   CAGR
-   Dividend Yield
-   Coupon Yield
-   Cash Yield
-   Max Drawdown
-   Volatility

------------------------------------------------------------------------

# Cash Flow

Portfolio 必須提供：

-   Dividend
-   Coupon
-   Rental Income
-   Withdrawal
-   Asset Sale

供 Cash Flow Engine 使用。

------------------------------------------------------------------------

# Risk Levels

-   Conservative
-   Moderate
-   Growth
-   Aggressive

------------------------------------------------------------------------

# Business Rules

## PF-001

所有投資均需符合 IPS。

## PF-002

不得因短期市場波動偏離人生目標。

## PF-003

再平衡優先使用新增資金。

## PF-004

退休後應優先使用投資現金流，再考慮出售資產。

## PF-005

重大人生事件後必須重新檢視 Asset Allocation。

------------------------------------------------------------------------

# KPIs

-   Portfolio Value
-   Net Investment Value
-   Annual Income
-   Passive Income Ratio
-   Asset Allocation Accuracy
-   Portfolio Return
-   Drawdown
-   Risk Score

------------------------------------------------------------------------

# Domain Events

-   PortfolioCreated
-   PortfolioUpdated
-   HoldingAdded
-   HoldingRemoved
-   AllocationChanged
-   Rebalanced
-   DividendReceived
-   CouponReceived

------------------------------------------------------------------------

# Related Engines

-   Investment Engine
-   Cash Flow Engine
-   Decision Engine
-   Retirement Engine
-   Dashboard Engine

------------------------------------------------------------------------

# Related Documents

-   docs/09-InvestmentEngine.md
-   docs/13-DecisionEngine.md
-   knowledge/investment-policy.md
-   knowledge/cashflow.md
-   knowledge/retirement.md
