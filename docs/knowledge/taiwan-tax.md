# Taiwan Tax Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Project Atlas 在台灣稅務領域的知識模型、商業規則與共同假設。

所有涉及稅務計算的 Engine 均應引用本文件。

------------------------------------------------------------------------

# Scope

-   綜合所得稅
-   房屋持有稅負
-   房屋交易稅負
-   租賃所得
-   股利所得
-   利息所得
-   海外所得
-   遺產與贈與
-   投資相關稅務

------------------------------------------------------------------------

# Tax Categories

-   Income Tax
-   Property Tax
-   House Tax
-   Land Value Tax
-   Land Value Increment Tax
-   Deed Tax
-   Securities Transaction Tax
-   Dividend Tax
-   Interest Income Tax
-   Estate Tax
-   Gift Tax

------------------------------------------------------------------------

# Tax Attributes

每筆稅務資料至少包含：

-   Tax Type
-   Tax Year
-   Taxpayer
-   Tax Base
-   Tax Rate
-   Deduction
-   Exemption
-   Tax Amount
-   Currency
-   Effective Date

------------------------------------------------------------------------

# Tax Calculation Principles

-   採年度計算
-   支援家庭合併分析
-   稅率可版本化
-   支援未來法規變更
-   不得於程式碼中寫死稅率

------------------------------------------------------------------------

# Decision Impact

所有重大決策皆須評估：

-   稅後現金流
-   稅後報酬
-   房屋交易成本
-   長期持有成本
-   退休稅務影響

------------------------------------------------------------------------

# Business Rules

## TT-001

所有模擬均應以稅後結果作為主要輸出。

## TT-002

稅率與扣除額必須可版本管理。

## TT-003

Scenario 可覆寫稅務假設。

## TT-004

房屋出售需納入完整交易稅費。

## TT-005

股利、利息及租金收入均需納入稅務分析。

------------------------------------------------------------------------

# Domain Events

-   TaxRuleUpdated
-   TaxScenarioCalculated
-   TaxYearChanged
-   TaxImpactCalculated

------------------------------------------------------------------------

# Related Engines

-   Decision Engine
-   Cash Flow Engine
-   Investment Engine
-   Home Upgrade Engine
-   Retirement Engine

------------------------------------------------------------------------

# Related Documents

-   docs/03-Formula.md
-   docs/08-CashFlowEngine.md
-   docs/09-InvestmentEngine.md
-   docs/11-HomeUpgradeEngine.md
-   docs/13-DecisionEngine.md
-   knowledge/assumptions.md
