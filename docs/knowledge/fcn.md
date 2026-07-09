# FCN Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Fixed Coupon Note（FCN）於 Project Atlas
中的領域知識、商業規則、風險模型與現金流特性。

FCN 被視為 Portfolio 中的固定收益型結構商品，並由 Investment
Engine、Cash Flow Engine、Decision Engine 共用。

------------------------------------------------------------------------

# Objectives

-   建立穩定配息現金流
-   提升被動收入
-   納入退休現金流規劃
-   控制下檔風險
-   作為資產配置的一部分

------------------------------------------------------------------------

# Product Definition

FCN（Fixed Coupon Note）為結構型商品，投資人於約定期間收取固定
Coupon，但需承擔標的資產價格風險。

------------------------------------------------------------------------

# Core Components

-   Underlying Assets
-   Coupon Rate
-   Observation Date
-   Knock-In Level
-   Strike Price
-   Maturity Date
-   Settlement Method
-   Currency
-   Issuer
-   Principal

------------------------------------------------------------------------

# Cash Flow

收入來源：

-   Fixed Coupon
-   Principal Redemption
-   Early Redemption

支出：

-   Subscription Fee
-   Transaction Cost
-   FX Cost（如適用）

------------------------------------------------------------------------

# Lifecycle

-   Planned
-   Subscribed
-   Active
-   Early Redeemed
-   Matured
-   Settled

------------------------------------------------------------------------

# Risk Factors

-   Underlying Price Risk
-   Issuer Credit Risk
-   Liquidity Risk
-   Currency Risk
-   Early Redemption Risk
-   Opportunity Cost

------------------------------------------------------------------------

# Evaluation Metrics

-   Annual Coupon Yield
-   Expected Cash Flow
-   Effective Yield
-   Remaining Term
-   Unrealized P/L
-   Downside Buffer

------------------------------------------------------------------------

# Business Rules

## FCN-001

FCN 不得作為唯一被動收入來源。

## FCN-002

退休規劃不得完全依賴 FCN Coupon。

## FCN-003

FCN 必須納入最壞情境分析。

## FCN-004

所有 FCN 現金流均須納入 Cash Flow Engine。

## FCN-005

Decision Engine 應揭露所有主要風險與假設。

------------------------------------------------------------------------

# Scenario Analysis

-   Underlying Price Drop
-   Coupon Suspension
-   FX Appreciation
-   FX Depreciation
-   Issuer Default
-   Early Redemption

------------------------------------------------------------------------

# Domain Events

-   FCNCreated
-   FCNSubscribed
-   CouponReceived
-   EarlyRedeemed
-   Matured
-   Settled

------------------------------------------------------------------------

# Related Engines

-   Investment Engine
-   Cash Flow Engine
-   Portfolio Engine
-   Decision Engine

------------------------------------------------------------------------

# Related Documents

-   docs/09-InvestmentEngine.md
-   docs/08-CashFlowEngine.md
-   knowledge/portfolio.md
-   knowledge/cashflow.md
-   knowledge/decision-principles.md
