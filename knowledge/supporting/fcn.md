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

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Aggregate Boundary

| Aggregate | Root | Owned Entities | External References |
|-----------|------|----------------|---------------------|
| FCN Position | FCN | CouponSchedule, ObservationSchedule, SettlementInstruction | Portfolio, Asset, Issuer, Currency |

## Complete Properties

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| FCNId | UUID | Yes | Stable aggregate identifier |
| PortfolioId | UUID | Yes | Owning portfolio |
| IssuerId | UUID | Yes | Credit exposure source |
| UnderlyingAssetIds | UUID[] | Yes | One or more reference assets |
| PrincipalAmount | Money | Yes | Original notional |
| Currency | CurrencyCode | Yes | Settlement currency |
| CouponRate | Decimal | Yes | Annualized coupon |
| KnockInLevel | Decimal | Yes | Downside barrier |
| StrikePrice | Decimal | Yes | Initial strike reference |
| ObservationDates | Date[] | Yes | Coupon and redemption observations |
| MaturityDate | Date | Yes | Final settlement date |
| Status | Enumeration | Yes | Planned, Subscribed, Active, EarlyRedeemed, Matured, Settled |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateFCN | InvestmentApplicationService | FCNCreated |
| SubscribeFCN | InvestmentApplicationService | FCNSubscribed |
| RecordCouponReceipt | CashFlowApplicationService | CouponReceived |
| RecordObservation | InvestmentApplicationService | FCNObserved |
| RedeemFCNEarly | InvestmentApplicationService | EarlyRedeemed |
| SettleFCN | InvestmentApplicationService | Settled |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FCN-VR-001 | Principal amount must be positive. | Reject command |
| FCN-VR-002 | Coupon rate must be greater than zero. | Reject command |
| FCN-VR-003 | Knock-in level must be below strike price. | Reject command |
| FCN-VR-004 | Maturity date must be after subscription date. | Reject command |
| FCN-VR-005 | Observation dates must be ordered and within term. | Reject command |
| FCN-VR-006 | Issuer exposure must not exceed portfolio concentration limit. | Require review |

## Decision Rules

| Rule ID | Rule | Decision Impact |
|---------|------|-----------------|
| FCN-DR-001 | FCN allocation above risk budget reduces recommendation score. | Penalty |
| FCN-DR-002 | Issuer concentration above limit blocks new subscription. | Hard block |
| FCN-DR-003 | Negative worst-case settlement requires liquidity stress test. | Required scenario |
| FCN-DR-004 | Retirement cashflow may include coupon only with haircut. | Conservative projection |

## Cash Flow Mapping

| Flow | Timing | Engine Treatment |
|------|--------|------------------|
| Subscription | Trade date | Cash outflow |
| Coupon | Observation or payment date | Passive income inflow |
| Early Redemption | Redemption date | Principal inflow |
| Physical Settlement | Maturity date | Asset acquisition and cash adjustment |
| Cash Settlement | Maturity date | Principal or loss realization |

## API Contract

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/v1/investments/fcn | POST | Create FCN position |
| /api/v1/investments/fcn/{fcnId} | GET | Retrieve FCN position |
| /api/v1/investments/fcn/{fcnId}/observations | POST | Record observation |
| /api/v1/investments/fcn/{fcnId}/settlement | POST | Settle FCN |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Underlying price below knock-in | Worst-case settlement is calculated |
| Issuer concentration breach | Subscription is blocked or escalated |
| Coupon receipt | Cash Flow Engine records passive income |
| Early redemption | Position becomes EarlyRedeemed and principal inflow is created |
| FX-denominated FCN | FX impact is included in scenario analysis |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
