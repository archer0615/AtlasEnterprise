# Assumptions Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Project Atlas 所有財務模型、模擬、公式與 Decision Engine
共用的基本假設。

所有 Engine 均應引用本文件，而非於各模組重複定義。

------------------------------------------------------------------------

# General Principles

-   所有假設皆可版本化。
-   所有假設皆可由使用者覆寫。
-   未提供值時使用系統預設值。
-   Scenario 可建立獨立假設集合。

------------------------------------------------------------------------

# Economic Assumptions

## Inflation

-   General Inflation
-   Housing Inflation
-   Medical Inflation
-   Education Inflation

預設以年化百分比表示。

------------------------------------------------------------------------

## Interest Rate

包含：

-   Mortgage Rate
-   Personal Loan Rate
-   Deposit Rate
-   Bond Yield
-   Risk Free Rate

------------------------------------------------------------------------

## Investment Return

依資產類別設定：

-   Cash
-   Bond
-   Bond ETF
-   Equity ETF
-   Stock
-   REIT
-   Gold
-   Alternative Assets

所有報酬率均為年化假設。

------------------------------------------------------------------------

# Tax Assumptions

-   Income Tax
-   Capital Gain Tax
-   Dividend Tax
-   Property Tax
-   Transaction Tax

依國家/地區可替換。

------------------------------------------------------------------------

# Property Assumptions

-   Annual Appreciation
-   Rental Yield
-   Vacancy Rate
-   Maintenance Cost
-   Transaction Cost

------------------------------------------------------------------------

# Loan Assumptions

-   Maximum LTV
-   Default Mortgage Term
-   Early Repayment Cost
-   Refinancing Cost

------------------------------------------------------------------------

# Cash Flow Assumptions

-   Salary Growth
-   Bonus Growth
-   Living Expense Growth
-   Passive Income Growth

------------------------------------------------------------------------

# Retirement Assumptions

-   Retirement Age
-   Life Expectancy
-   Safe Withdrawal Rate
-   Pension Income
-   Healthcare Cost Growth

------------------------------------------------------------------------

# Scenario Assumptions

每個 Scenario 可覆寫：

-   Inflation
-   Return
-   Interest Rate
-   Salary
-   Expense
-   Property Price

------------------------------------------------------------------------

# Data Quality Rules

假設值需具備：

-   Source
-   Effective Date
-   Version
-   Owner
-   Last Review Date

------------------------------------------------------------------------

# Business Rules

## AS-001

所有模擬均需記錄所使用的假設版本。

## AS-002

不同 Scenario 不得共用可變假設物件。

## AS-003

任何重大假設變更皆需重新計算 KPI。

## AS-004

所有公式不得直接寫死數值。

## AS-005

預設值僅供初始化，不代表最佳建議。

------------------------------------------------------------------------

# Domain Events

-   AssumptionCreated
-   AssumptionUpdated
-   AssumptionVersionPublished
-   ScenarioAssumptionChanged

------------------------------------------------------------------------

# Related Documents

-   docs/specification/03-Formula.md
-   docs/08-CashFlowEngine.md
-   docs/09-InvestmentEngine.md
-   docs/10-LoanEngine.md
-   docs/12-RetirementEngine.md
-   docs/13-DecisionEngine.md
