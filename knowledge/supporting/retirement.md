# Retirement Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Retirement 定義 Project Atlas
對退休規劃的核心知識、商業規則、共同語言與基本假設。

本文件提供 Retirement Engine、Decision Engine、Cash Flow Engine 與
Scenario Engine 共用。

------------------------------------------------------------------------

# Objectives

-   確保退休後現金流可持續
-   維持目標生活品質
-   降低長壽風險
-   控制提領風險
-   建立可持續退休策略

------------------------------------------------------------------------

# Retirement Phases

-   Accumulation
-   Transition
-   Early Retirement
-   Standard Retirement
-   Late Retirement

------------------------------------------------------------------------

# Income Sources

-   Pension
-   Labor Pension
-   Social Security
-   Dividend
-   Bond Coupon
-   Rental Income
-   Investment Withdrawal
-   Part-time Income
-   Other Passive Income

------------------------------------------------------------------------

# Retirement Expenses

-   Living Expenses
-   Housing
-   Healthcare
-   Insurance
-   Travel
-   Family Support
-   Long-term Care
-   Tax
-   Other

------------------------------------------------------------------------

# Core Metrics

-   Retirement Age
-   Financial Independence Age
-   Retirement Portfolio
-   Passive Income Ratio
-   Safe Withdrawal Rate
-   Monthly Retirement Cash Flow
-   Retirement Funding Gap
-   Success Probability

------------------------------------------------------------------------

# Withdrawal Strategy

Supported Strategies

-   Fixed Amount
-   Fixed Percentage
-   Guardrail
-   Dynamic Withdrawal
-   Bucket Strategy

------------------------------------------------------------------------

# Risk Factors

-   Longevity Risk
-   Inflation Risk
-   Sequence of Return Risk
-   Market Risk
-   Healthcare Risk
-   Policy Risk

------------------------------------------------------------------------

# Scenario Analysis

Every retirement plan shall support:

-   Base Case
-   Optimistic
-   Conservative
-   Stress Scenario

------------------------------------------------------------------------

# Business Rules

## RT-001

退休前必須建立足夠緊急預備金。

## RT-002

退休後每月現金流不得長期為負。

## RT-003

退休提領不得超過可持續提領策略限制。

## RT-004

重大人生事件後必須重新評估退休計畫。

## RT-005

退休分析至少模擬至預期壽命。

## RT-006

退休建議必須揭露所有重要假設。

------------------------------------------------------------------------

# KPIs

-   Retirement Readiness
-   Retirement Funding Ratio
-   Success Rate
-   Years of Sustainability
-   Passive Income Coverage
-   Withdrawal Rate
-   Cash Flow Stability

------------------------------------------------------------------------

# Domain Events

-   RetirementPlanCreated
-   RetirementPlanUpdated
-   RetirementScenarioCalculated
-   RetirementAgeChanged
-   WithdrawalStrategyChanged
-   RetirementGoalReached

------------------------------------------------------------------------

# Related Engines

-   Retirement Engine
-   Cash Flow Engine
-   Investment Engine
-   Decision Engine
-   Scenario Engine

------------------------------------------------------------------------

# Related Documents

-   docs/12-RetirementEngine.md
-   docs/08-CashFlowEngine.md
-   docs/09-InvestmentEngine.md
-   docs/13-DecisionEngine.md
-   knowledge/cashflow.md
-   knowledge/portfolio.md
-   knowledge/assumptions.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Retirement Plan Contract

| Field | Requirement |
|---|---|
| Aggregate | RetirementPlan |
| Identity | retirementPlanId |
| Scope | tenantId, householdId |
| Required State | retirementAge, phase, incomeSources, expenseModel, withdrawalStrategy, assumptions |
| Derived State | readinessScore, fundingRatio, successProbability, monthlyRetirementCashFlow, fundingGap |
| Invariant | Retirement plan must disclose all material assumptions before recommendation output. |

## Required Commands

| Command | Purpose |
|---|---|
| CreateRetirementPlan | Create retirement plan with baseline assumptions. |
| UpdateRetirementPlan | Update age, expenses, income sources, or assumptions. |
| CalculateRetirementScenario | Run retirement projection and stress scenarios. |
| ChangeRetirementAge | Update retirement age and recalculate readiness. |
| ChangeWithdrawalStrategy | Update withdrawal strategy under sustainability validation. |
| PublishRetirementReadiness | Publish retirement readiness snapshot. |
| ReplayRetirementCalculation | Rebuild calculation from stored assumptions and formula versions. |

## Domain Events

| Event | Trigger |
|---|---|
| RetirementPlanCreated | Plan is created. |
| RetirementPlanUpdated | Plan inputs change. |
| RetirementScenarioCalculated | Scenario calculation completes. |
| RetirementAgeChanged | Retirement age changes. |
| WithdrawalStrategyChanged | Withdrawal strategy changes. |
| RetirementReadinessPublished | Readiness snapshot is published. |
| RetirementCalculationReplayed | Historical calculation is reproduced. |

## Validation Rules

1. Retirement analysis must include base, optimistic, conservative, and stress scenarios.
2. Simulation horizon must run at least through expected lifespan.
3. Withdrawal strategy must pass sustainability and liquidity constraints.
4. Published readiness snapshots cannot be overwritten.
5. Replay must reference original assumptions, formula versions, and market assumption set.

## API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/retirement/plans | POST | Create retirement plan. |
| /api/retirement/plans/{retirementPlanId} | GET | Retrieve plan state. |
| /api/retirement/plans/{retirementPlanId} | PUT | Update plan. |
| /api/retirement/plans/{retirementPlanId}/scenarios/calculate | POST | Calculate scenarios. |
| /api/retirement/plans/{retirementPlanId}/withdrawal-strategy | PUT | Change withdrawal strategy. |
| /api/retirement/plans/{retirementPlanId}/readiness/publish | POST | Publish readiness snapshot. |
| /api/retirement/plans/{retirementPlanId}/replay | POST | Replay calculation. |

## Testing Matrix

| Scenario | Expected Result |
|---|---|
| Create valid plan | RetirementPlanCreated is emitted. |
| Missing stress scenario | Validation fails. |
| Unsafe withdrawal rate | Strategy change is rejected or constrained. |
| Publish readiness | Immutable readiness snapshot is created. |
| Replay calculation | Success probability and funding gap match original output. |

## Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
