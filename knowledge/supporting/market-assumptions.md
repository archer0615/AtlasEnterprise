# knowledge/market-assumptions.md

# Project Atlas — Market Assumptions
## Split Navigation
- [Market assumptions returns and risk](market-assumptions/returns-and-risk.md)
- [Market assumptions scenarios and governance](market-assumptions/scenarios-and-governance.md)

## 1. 文件目的

本文件定義 Project Atlas 在進行長期財務決策模擬時所使用的市場假設，包括長期名目報酬率、實質報酬率、波動率、資產類別相關係數、匯率假設、再平衡假設、極端情境假設與 Codex 實作規則。

Project Atlas 的市場假設不是用來預測短期行情，也不是用來產生投資建議，而是用來建立一套穩定、一致、可被測試、可被版本控管的長期情境模擬基準。

本文件供以下模組使用：

- InvestmentEngine
- RetirementEngine
- CashFlowEngine
- DecisionEngine
- ScenarioEngine
- HomeUpgradeEngine
- LoanEngine
- Dashboard KPI
- Monte Carlo Simulation
- Stress Test

---

## 2. 核心定位

Project Atlas 的市場假設必須符合以下原則：

1. 偏長期，不服務短線預測。
2. 偏保守，不使用過度樂觀的資本市場假設。
3. 可覆寫，所有假設都應允許 Scenario 層或 User Assumption 層調整。
4. 可版本控管，假設變更必須留下版本與生效日期。
5. 可解釋，每一個報酬率、波動率與相關係數都必須可被呈現在 Dashboard 或 Scenario Report。
6. 不使用單年度預測做為核心決策依據。
7. 不因近期市場強弱而自動修改長期假設。

---

## 3. 名詞定義

### 3.1 名目報酬率 Nominal Return

尚未扣除通貨膨脹的年化報酬率。

公式：

```text
Nominal Return = Asset Growth Rate Before Inflation
```

### 3.2 實質報酬率 Real Return

扣除通貨膨脹後的年化報酬率。

公式：

```text
Real Return = ((1 + Nominal Return) / (1 + Inflation Rate)) - 1
```

### 3.3 波動率 Volatility

資產年化報酬率的標準差，用於 Monte Carlo、壓力測試與風險顯示。

### 3.4 Correlation

不同資產類別報酬率之間的相關係數，用於投資組合波動率計算。

### 3.5 Expected Return

Project Atlas 使用的長期預期報酬率，並非短期預測值。

### 3.6 Conservative Return

保守情境下使用的長期報酬率，常用於退休、換屋與重大負債決策。

### 3.7 Planning Return

主要規劃情境使用的預設報酬率。

### 3.8 Optimistic Return

樂觀情境使用的報酬率，只能作為壓力比較，不得作為唯一決策依據。

---

## 4. 市場假設分層

Project Atlas 應將市場假設分為四層：

```text
System Default Assumptions
        ↓
Taiwan Financial Assumptions
        ↓
User Profile Assumptions
        ↓
Scenario Override Assumptions
```

優先順序如下：

```text
Scenario Override > User Profile > Taiwan Financial Assumptions > System Default
```

任何模組不得直接硬編碼報酬率、波動率、通膨率、匯率或相關係數。

---

## 5. 資產類別分類

Project Atlas 預設支援以下資產類別：

| Asset Class Code | 中文名稱 | 說明 |
|---|---|---|
| TWD_CASH | 台幣現金 | 活存、薪轉戶、短期備用金 |
| USD_CASH | 美元現金 | 美元活存、短期美元部位 |
| TWD_DEPOSIT | 台幣定存 | 台幣定期存款 |
| USD_DEPOSIT | 美元定存 | 美元定期存款 |
| TWD_MONEY_MARKET | 台幣貨幣市場 | 貨幣市場基金、短天期固定收益工具 |
| TW_EQUITY | 台股 | 台灣股票或台股 ETF |
| US_EQUITY | 美股 | 美國股票或美股 ETF |
| GLOBAL_EQUITY | 全球股票 | 全球股票型 ETF 或基金 |
| EM_EQUITY | 新興市場股票 | 新興市場 ETF 或基金 |
| TW_BOND | 台灣債券 | 台灣公債、投資級債 |
| US_BOND | 美國債券 | 美國公債、投資級債 |
| GLOBAL_BOND | 全球債券 | 全球投資級債券 |
| HIGH_YIELD_BOND | 高收益債 | 非投資等級債 |
| REIT | REITs | 不動產投資信託 |
| GOLD | 黃金 | 黃金 ETF、實體黃金估值 |
| REAL_ESTATE_SELF_USE | 自住房 | 自用住宅估值 |
| REAL_ESTATE_INVESTMENT | 投資型不動產 | 出租房、保留房產 |
| FCN | FCN 結構型商品 | 固定配息但具股權風險商品 |
| OTHER_STRUCTURED_PRODUCT | 其他結構型商品 | 非 FCN 的結構型金融商品 |
| OTHER | 其他資產 | 暫未分類資產 |

---

## 6. 長期通膨假設

Project Atlas 應將通膨拆為生活通膨、教育通膨、醫療通膨、房價通膨與一般 CPI。

| Inflation Type | Base | Conservative | Stress | 說明 |
|---|---:|---:|---:|---|
| CPI_GENERAL | 2.0% | 2.5% | 4.0% | 一般生活物價 |
| LIVING_COST | 2.5% | 3.0% | 4.5% | 家庭生活費 |
| MEDICAL_COST | 3.5% | 4.5% | 6.0% | 醫療與照護成本 |
| EDUCATION_COST | 3.0% | 4.0% | 5.5% | 教育支出 |
| HOUSING_PRICE | 2.0% | 3.0% | 5.0% | 房價長期成長 |
| RENT | 2.0% | 2.5% | 4.0% | 租金成長 |
| SALARY | 2.5% | 1.5% | 0.0% | 薪資成長 |
| INSURANCE_PREMIUM | 2.0% | 3.0% | 5.0% | 保費調整與保障成本 |

注意：

1. 退休模擬不得只使用 CPI_GENERAL，應優先使用 LIVING_COST。
2. 醫療照護模擬應使用 MEDICAL_COST。
3. 子女教育模擬應使用 EDUCATION_COST。
4. 換屋模擬應同時使用 HOUSING_PRICE 與 SALARY。
5. 現金流壓力測試應至少包含 LIVING_COST stress 情境。

---

## 7. 長期報酬率假設

### 7.1 預設名目報酬率

| Asset Class | Conservative | Base | Optimistic | 說明 |
|---|---:|---:|---:|---|
| TWD_CASH | 0.5% | 1.0% | 1.5% | 現金不應被視為投資資產 |
| USD_CASH | 1.0% | 2.0% | 3.0% | 受美元利率循環影響 |
| TWD_DEPOSIT | 1.0% | 1.5% | 2.0% | 長期台幣定存假設 |
| USD_DEPOSIT | 2.0% | 3.0% | 4.0% | 長期美元定存假設 |
| TWD_MONEY_MARKET | 1.0% | 1.5% | 2.2% | 低波動短期資金工具 |
| TW_EQUITY | 4.0% | 6.0% | 8.0% | 台股長期股票風險溢酬 |
| US_EQUITY | 4.5% | 6.5% | 8.5% | 美股長期股票風險溢酬 |
| GLOBAL_EQUITY | 4.5% | 6.0% | 8.0% | 全球分散股票部位 |
| EM_EQUITY | 4.0% | 7.0% | 10.0% | 新興市場高波動高不確定性 |
| TW_BOND | 1.5% | 2.5% | 3.5% | 台灣債券長期假設 |
| US_BOND | 2.0% | 3.5% | 4.5% | 美債長期假設 |
| GLOBAL_BOND | 2.0% | 3.0% | 4.0% | 全球投資級債券 |
| HIGH_YIELD_BOND | 3.0% | 5.0% | 7.0% | 須反映信用風險與景氣循環 |
| REIT | 3.5% | 5.5% | 7.5% | 不動產證券化資產 |
| GOLD | 0.0% | 2.0% | 5.0% | 非生息資產，主要作為避險 |
| REAL_ESTATE_SELF_USE | 1.0% | 2.0% | 4.0% | 自住房估值，不應作為可動用投資資產 |
| REAL_ESTATE_INVESTMENT | 2.0% | 4.0% | 6.0% | 包含資本利得，不含租金淨收益時需註明 |
| FCN | -5.0% | 3.0% | 8.0% | 不得只使用票息率，必須反映下檔風險 |
| OTHER_STRUCTURED_PRODUCT | -5.0% | 2.0% | 6.0% | 預設保守處理 |
| OTHER | 0.0% | 2.0% | 4.0% | 未分類資產不得給予高報酬假設 |

### 7.2 實質報酬率計算規則

所有長期財務決策報告都必須同時支援名目與實質呈現。

公式：

```text
RealReturn(asset) = ((1 + NominalReturn(asset)) / (1 + InflationRate)) - 1
```

若模擬退休後購買力，預設使用 LIVING_COST inflation，而非 CPI_GENERAL。

---

## 8. 波動率假設

| Asset Class | Annual Volatility | 說明 |
|---|---:|---|
| TWD_CASH | 0.5% | 幾乎無市場價格波動 |
| USD_CASH | 6.0% | 對台幣使用者包含匯率波動 |
| TWD_DEPOSIT | 0.5% | 定存本金穩定 |
| USD_DEPOSIT | 6.0% | 對台幣使用者主要來自匯率 |
| TWD_MONEY_MARKET | 1.0% | 低波動工具 |
| TW_EQUITY | 20.0% | 台股集中度與景氣循環較高 |
| US_EQUITY | 18.0% | 股票市場波動 |
| GLOBAL_EQUITY | 16.0% | 全球分散後波動較低 |
| EM_EQUITY | 24.0% | 新興市場波動較高 |
| TW_BOND | 5.0% | 利率敏感度較低到中等 |
| US_BOND | 8.0% | 美元利率與匯率影響 |
| GLOBAL_BOND | 7.0% | 利率與匯率風險 |
| HIGH_YIELD_BOND | 12.0% | 信用風險顯著 |
| REIT | 18.0% | 股債與不動產風險混合 |
| GOLD | 16.0% | 避險資產但價格波動高 |
| REAL_ESTATE_SELF_USE | 8.0% | 估值波動低於股票，但流動性差 |
| REAL_ESTATE_INVESTMENT | 10.0% | 地區、槓桿與出租風險 |
| FCN | 25.0% | 連結標的股票風險，需保守估計 |
| OTHER_STRUCTURED_PRODUCT | 20.0% | 預設高不確定性 |
| OTHER | 10.0% | 未分類資產保守估算 |

---

## 9. 資產相關係數假設

### 9.1 核心相關係數矩陣

以下為主要資產類別的預設 correlation。完整資料庫可依此展開。

| Asset A / Asset B | TWD_CASH | TW_EQUITY | US_EQUITY | GLOBAL_EQUITY | TW_BOND | US_BOND | REIT | GOLD | REAL_ESTATE | FCN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| TWD_CASH | 1.00 | 0.00 | 0.00 | 0.00 | 0.10 | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |
| TW_EQUITY | 0.00 | 1.00 | 0.65 | 0.75 | -0.10 | 0.10 | 0.55 | 0.05 | 0.35 | 0.70 |
| US_EQUITY | 0.00 | 0.65 | 1.00 | 0.90 | -0.10 | 0.20 | 0.60 | 0.00 | 0.25 | 0.80 |
| GLOBAL_EQUITY | 0.00 | 0.75 | 0.90 | 1.00 | -0.10 | 0.20 | 0.60 | 0.00 | 0.30 | 0.75 |
| TW_BOND | 0.10 | -0.10 | -0.10 | -0.10 | 1.00 | 0.35 | 0.10 | 0.15 | 0.20 | -0.05 |
| US_BOND | 0.00 | 0.10 | 0.20 | 0.20 | 0.35 | 1.00 | 0.20 | 0.20 | 0.10 | 0.10 |
| REIT | 0.00 | 0.55 | 0.60 | 0.60 | 0.10 | 0.20 | 1.00 | 0.10 | 0.55 | 0.50 |
| GOLD | 0.00 | 0.05 | 0.00 | 0.00 | 0.15 | 0.20 | 0.10 | 1.00 | 0.10 | 0.00 |
| REAL_ESTATE | 0.00 | 0.35 | 0.25 | 0.30 | 0.20 | 0.10 | 0.55 | 0.10 | 1.00 | 0.30 |
| FCN | 0.00 | 0.70 | 0.80 | 0.75 | -0.05 | 0.10 | 0.50 | 0.00 | 0.30 | 1.00 |

### 9.2 相關係數使用規則

1. Correlation matrix 必須為對稱矩陣。
2. Diagonal 必須為 1.00。
3. Correlation 不得小於 -1 或大於 1。
4. 若資產類別未定義 correlation，預設使用 0.50，不得使用 0。
5. 若資產屬於同一高風險類別，預設 correlation 不得低於 0.60。
6. FCN 與其連結標的之 correlation 應接近股票，而非債券。
7. 自住房不得與可動用投資資產混為同一組合風險計算，除非 Scenario 明確指定出售或增貸。

---

## 10. 投資組合報酬率公式

### 10.1 Portfolio Expected Return

```text
PortfolioExpectedReturn = Σ(Weight_i × ExpectedReturn_i)
```

限制：

```text
Σ Weight_i = 1
```

### 10.2 Portfolio Variance

```text
PortfolioVariance = ΣΣ(Weight_i × Weight_j × Volatility_i × Volatility_j × Correlation_ij)
```

### 10.3 Portfolio Volatility

```text
PortfolioVolatility = sqrt(PortfolioVariance)
```

### 10.4 Real Portfolio Return

```text
RealPortfolioReturn = ((1 + PortfolioNominalReturn) / (1 + InflationRate)) - 1
```

---

## 11. 匯率假設

Project Atlas 的基準貨幣為 TWD。

所有外幣資產必須同時儲存：

1. 原幣金額。
2. 原幣報酬率。
3. TWD 換算金額。
4. 匯率假設。
5. 匯率波動率。
6. 匯率情境。

### 11.1 預設匯率假設

| Currency Pair | Base FX | Conservative | Stress | 說明 |
|---|---:|---:|---:|---|
| USD/TWD | 32.0 | 34.0 | 36.0 | 台幣貶值情境 |
| USD/TWD Strong TWD | 30.0 | 29.0 | 28.0 | 台幣升值情境 |
| JPY/TWD | 0.22 | 0.24 | 0.26 | 旅遊與日圓支出參考 |
| EUR/TWD | 35.0 | 37.0 | 40.0 | 歐元資產參考 |

### 11.2 匯率波動率

| Currency Pair | Annual Volatility |
|---|---:|
| USD/TWD | 6.0% |
| JPY/TWD | 10.0% |
| EUR/TWD | 8.0% |

### 11.3 外幣資產 TWD 報酬率公式

```text
TwdReturn = ((1 + ForeignAssetReturn) × (1 + FxReturn)) - 1
```

---

## 12. 再平衡假設

### 12.1 預設再平衡頻率

| Portfolio Type | Default Rebalance Frequency |
|---|---|
| Retirement Portfolio | Annually |
| Long-Term Investment Portfolio | Annually |
| Cash Reserve Portfolio | No Rebalance |
| House Upgrade Reserve | Quarterly Review, No Automatic Rebalance |
| FCN Income Portfolio | No Automatic Rebalance |
| Tactical Portfolio | Manual Only |

### 12.2 再平衡規則

1. 預設使用年度再平衡。
2. 若任一資產類別偏離目標權重超過 5 個百分點，可觸發再平衡建議。
3. 若使用者有重大現金流事件，應優先透過新增資金或提領資金調整權重，而不是賣出資產。
4. 若資產為 FCN、保單、不動產，不應自動再平衡。
5. 稅務成本、交易成本、流動性限制必須先估算後才可產生再平衡建議。

---

## 13. Sequence of Returns Risk

退休與提前退休模擬必須考慮報酬率順序風險。

### 13.1 不可接受的簡化

以下做法禁止作為退休決策唯一依據：

```text
每年固定使用 6% 報酬率
```

原因：退休提領階段，前期遇到市場下跌會顯著降低資產存活率。

### 13.2 必須支援的模擬方式

RetirementEngine 至少應支援：

1. Fixed Return Simulation。
2. Historical-like Sequence Simulation。
3. Monte Carlo Simulation。
4. Stress Sequence Simulation。
5. First-5-Year Bear Market Simulation。

### 13.3 First-5-Year Bear Market 預設

```text
Year 1: -20%
Year 2: -10%
Year 3: 0%
Year 4: +5%
Year 5: +8%
Year 6+: Base Expected Return
```

---

## 14. Monte Carlo 假設

### 14.1 預設參數

| Parameter | Default |
|---|---:|
| Simulation Runs | 10,000 |
| Minimum Runs | 1,000 |
| Time Step | Annual |
| Distribution | Lognormal preferred |
| Random Seed | Required for reproducible tests |
| Output Percentiles | P5, P10, P25, P50, P75, P90, P95 |

### 14.2 成功率定義

退休資產成功率：

```text
SuccessRate = SuccessfulSimulationCount / TotalSimulationCount
```

成功條件：

```text
FinalNetWorth >= MinimumRequiredTerminalWealth
AND NoYearWithNegativeLiquidAssets
```

### 14.3 決策門檻

| Success Rate | Interpretation | Decision Meaning |
|---|---|---|
| >= 90% | Strong | 可視為穩健，但仍需壓力測試 |
| 80% - 89% | Acceptable | 可接受，但需保留調整空間 |
| 70% - 79% | Weak | 應調整提領率、退休年齡或資產配置 |
| < 70% | Unsafe | 不建議執行該決策 |

---

## 15. 壓力測試假設

Project Atlas 預設支援以下市場壓力情境。

### 15.1 Equity Bear Market

```text
TW_EQUITY: -35%
US_EQUITY: -30%
GLOBAL_EQUITY: -30%
EM_EQUITY: -40%
REIT: -25%
FCN: -40%
```

### 15.2 Bond Rate Shock

```text
TW_BOND: -8%
US_BOND: -15%
GLOBAL_BOND: -12%
HIGH_YIELD_BOND: -20%
```

### 15.3 Inflation Shock

```text
CPI_GENERAL: 4.0%
LIVING_COST: 4.5%
MEDICAL_COST: 6.0%
HOUSING_PRICE: 5.0%
SALARY: 0.0%
```

### 15.4 FX Shock

```text
USD/TWD +12%
JPY/TWD +15%
EUR/TWD +10%
```

### 15.5 Liquidity Shock

```text
DividendIncome: -50%
FCNIncome: -100%
BonusIncome: -100%
RentalIncome: -30%
EmergencyExpense: 6 months living expense
```

### 15.6 Combined Family Stress Scenario

此情境用於家庭重大決策，如換屋、保留第一間房、買車、提前退休。

```text
Equity Portfolio: -30%
FCN Market Value: -40%
FCN Income: -100%
Bonus Income: -100%
Living Cost Inflation: 4.5%
Mortgage Rate: +1.5%
Emergency Expense: 6 months living expense
```

---

## 16. FCN 市場假設

FCN 不得被視為債券或固定收益。

### 16.1 FCN 預設假設

| Item | Conservative | Base | Optimistic |
|---|---:|---:|---:|
| Coupon Income | 0% | 8% | 12% |
| Total Return | -5% | 3% | 8% |
| Volatility | 30% | 25% | 20% |
| Income Continuity | Low | Medium | Medium |
| Principal Protection | No | No | No |

### 16.2 FCN 禁止規則

Codex 不得實作以下邏輯：

1. 不得把 FCN coupon 當作無風險收入。
2. 不得把 FCN 視為債券資產。
3. 不得假設 FCN 每月收入永久存在。
4. 不得忽略 knock-in、接股、提前出場與標的集中風險。
5. 不得用票息率直接作為總報酬率。
6. 不得將 FCN 收入納入必要生活費覆蓋率，除非同時通過 FCN income loss stress test。

---

## 17. 不動產市場假設

### 17.1 自住房

自住房的主要功能是居住，不是投資資產。

預設規則：

1. 自住房增值可計入 Net Worth。
2. 自住房不得計入 Liquid Net Worth。
3. 自住房不得計入退休可提領資產，除非 Scenario 明確設定出售、出租或增貸。
4. 自住房成長率預設低於股票。
5. 自住房需扣除交易成本、稅費、裝修成本與搬遷成本後才可計算可用資金。

### 17.2 投資型不動產

投資型不動產需拆分：

```text
TotalReturn = CapitalAppreciation + NetRentalYield - MaintenanceCost - VacancyCost - TaxCost
```

預設參數：

| Item | Default |
|---|---:|
| Capital Appreciation | 2.0% |
| Gross Rental Yield | 2.0% |
| Vacancy Rate | 5.0% |
| Maintenance Cost | 0.5% of property value per year |
| Net Rental Yield | 1.0% |
| Transaction Cost When Selling | 4.0% |

---

## 18. 現金與緊急預備金假設

現金的角色是保護決策彈性，不是追求報酬。

### 18.1 現金預備金最低標準

| Household Risk Level | Minimum Emergency Fund |
|---|---:|
| Low | 6 months living expense |
| Medium | 9 months living expense |
| High | 12 months living expense |
| High Debt + Dependents | 12-18 months living expense |

### 18.2 現金不得被高估

在 DecisionEngine 中，現金應以以下方式處理：

```text
CashReturnContribution = CashAmount × CashReturn
ProtectionValue = LiquidityCoverageMonths
```

現金的價值主要體現在流動性覆蓋月數，而不是投資報酬。

---

## 19. 使用者風險屬性與市場假設連動

不同風險屬性應影響可使用的資產配置，不應直接修改資產本身的長期報酬假設。

錯誤做法：

```text
Aggressive user => US_EQUITY return = 10%
```

正確做法：

```text
Aggressive user => Higher equity allocation allowed
US_EQUITY return remains unchanged
```

### 19.1 風險屬性對配置限制

| Risk Profile | Max Equity | Max FCN | Min Cash Reserve |
|---|---:|---:|---:|
| Conservative | 40% | 0% | 12 months |
| Balanced | 60% | 10% | 9 months |
| Growth | 80% | 15% | 6 months |
| Aggressive | 90% | 20% | 6 months |

---

## 20. 情境覆寫規則

Scenario 可以覆寫以下參數：

1. Asset expected return。
2. Asset volatility。
3. Correlation matrix。
4. Inflation rate。
5. FX rate。
6. Salary growth。
7. Housing price growth。
8. Interest rate。
9. Dividend income haircut。
10. FCN income continuity。

Scenario Override 必須記錄：

```text
AssumptionKey
OriginalValue
OverrideValue
OverrideReason
ScenarioId
CreatedAt
CreatedBy
```

---

## 21. 資料庫設計需求

Codex 應建立以下概念資料表或等價結構。

### 21.1 MarketAssumptionSet

| Column | Type | Required | Description |
|---|---|---:|---|
| Id | Guid | Yes | 假設集合 ID |
| Name | string | Yes | 假設名稱 |
| Version | string | Yes | 版本 |
| BaseCurrency | string | Yes | 預設 TWD |
| EffectiveFrom | date | Yes | 生效日 |
| EffectiveTo | date | No | 失效日 |
| IsDefault | bool | Yes | 是否為系統預設 |
| Description | string | No | 說明 |
| CreatedAt | datetime | Yes | 建立時間 |
| UpdatedAt | datetime | Yes | 更新時間 |

### 21.2 AssetClassAssumption

| Column | Type | Required | Description |
|---|---|---:|---|
| Id | Guid | Yes | ID |
| AssumptionSetId | Guid | Yes | MarketAssumptionSet ID |
| AssetClassCode | string | Yes | 資產類別 |
| ConservativeReturn | decimal | Yes | 保守報酬率 |
| BaseReturn | decimal | Yes | 基準報酬率 |
| OptimisticReturn | decimal | Yes | 樂觀報酬率 |
| Volatility | decimal | Yes | 年化波動率 |
| LiquidityLevel | string | Yes | High / Medium / Low |
| RiskLevel | string | Yes | Low / Medium / High / VeryHigh |
| Notes | string | No | 說明 |

### 21.3 AssetCorrelation

| Column | Type | Required | Description |
|---|---|---:|---|
| Id | Guid | Yes | ID |
| AssumptionSetId | Guid | Yes | 假設集合 ID |
| AssetClassA | string | Yes | 資產 A |
| AssetClassB | string | Yes | 資產 B |
| Correlation | decimal | Yes | 相關係數 |

### 21.4 InflationAssumption

| Column | Type | Required | Description |
|---|---|---:|---|
| Id | Guid | Yes | ID |
| AssumptionSetId | Guid | Yes | 假設集合 ID |
| InflationType | string | Yes | 通膨類型 |
| BaseRate | decimal | Yes | 基準 |
| ConservativeRate | decimal | Yes | 保守 |
| StressRate | decimal | Yes | 壓力 |

### 21.5 FxAssumption

| Column | Type | Required | Description |
|---|---|---:|---|
| Id | Guid | Yes | ID |
| AssumptionSetId | Guid | Yes | 假設集合 ID |
| CurrencyPair | string | Yes | 幣別對 |
| BaseRate | decimal | Yes | 基準匯率 |
| ConservativeRate | decimal | Yes | 保守匯率 |
| StressRate | decimal | Yes | 壓力匯率 |
| Volatility | decimal | Yes | 年化匯率波動 |

---

## 22. API 需求

Market Assumptions API 應支援：

```text
GET    /api/market-assumptions/current
GET    /api/market-assumptions/{id}
GET    /api/market-assumptions/{id}/asset-classes
GET    /api/market-assumptions/{id}/correlations
GET    /api/market-assumptions/{id}/inflation
GET    /api/market-assumptions/{id}/fx
POST   /api/market-assumptions
PUT    /api/market-assumptions/{id}
POST   /api/market-assumptions/{id}/activate
POST   /api/market-assumptions/{id}/clone
```

管理類 API 應保留權限控管。

---

## 23. 驗證規則

### 23.1 Return Validation

1. ConservativeReturn <= BaseReturn <= OptimisticReturn。
2. 報酬率不得小於 -100%。
3. 未分類資產 BaseReturn 不得高於 4%。
4. Cash 類資產 BaseReturn 不得高於 3%，除非 Scenario Override。
5. FCN 不得只有 coupon return，必須有 total return。

### 23.2 Volatility Validation

1. Volatility 必須大於等於 0。
2. Equity 類資產 volatility 不得小於 10%。
3. FCN volatility 不得小於其連結股票資產 volatility 的 80%。
4. Cash 類資產 volatility 不得高於 10%，除非包含外幣風險。

### 23.3 Correlation Validation

1. Correlation 必須介於 -1 到 1。
2. Matrix 必須對稱。
3. Diagonal 必須為 1。
4. Same asset category correlation 不得低於 0.60。

---

## 24. Dashboard 呈現需求

Dashboard 不應只顯示單一預期報酬率，至少應顯示：

1. Portfolio nominal expected return。
2. Portfolio real expected return。
3. Portfolio volatility。
4. Worst case stress loss。
5. Liquidity coverage months。
6. Retirement success rate。
7. Downside percentile。
8. Market assumption version。
9. Scenario overrides used。

Dashboard 文案應避免使用「保證」、「必然」、「穩賺」、「安全獲利」等字眼。

---

## 25. 決策引擎使用規則

DecisionEngine 應使用市場假設產生以下判斷：

1. 是否可承擔換屋後的投資資產下降。
2. 是否可在熊市下維持現金流。
3. 是否可承擔 FCN 收入中斷。
4. 是否可提前退休。
5. 是否應提前還貸。
6. 是否應降低股票曝險。
7. 是否應增加現金預備金。
8. 是否應延後買車或換屋。

### 25.1 決策不得只看平均報酬

錯誤做法：

```text
ExpectedReturn > MortgageRate => 不提前還貸
```

正確做法：

```text
Compare:
- Expected return
- Volatility
- Liquidity reserve
- Debt service ratio
- Stress test result
- Family safety margin
- Opportunity cost
```

---

## 26. 測試案例

### 26.1 Portfolio Return Test

Given:

```text
60% GLOBAL_EQUITY, return 6%
40% US_BOND, return 3.5%
```

Expected:

```text
PortfolioReturn = 0.6 × 6% + 0.4 × 3.5% = 5.0%
```

### 26.2 Real Return Test

Given:

```text
NominalReturn = 5.0%
Inflation = 2.5%
```

Expected:

```text
RealReturn = ((1.05 / 1.025) - 1) = 2.439%
```

### 26.3 Correlation Symmetry Test

Given:

```text
Correlation(TW_EQUITY, US_EQUITY) = 0.65
```

Expected:

```text
Correlation(US_EQUITY, TW_EQUITY) = 0.65
```

### 26.4 FCN Classification Test

Given:

```text
AssetClass = FCN
```

Expected:

```text
IsFixedIncome = false
RiskLevel = VeryHigh
CanCountAsStableIncome = false unless stress test passed
```

---

## 27. Codex 實作指令

Codex 在實作 market assumptions 時必須遵守：

1. 所有假設必須存放於資料庫或設定檔，不得散落於程式碼。
2. 所有計算必須可追溯使用哪一版 MarketAssumptionSet。
3. 所有 Scenario 必須記錄 override 過的假設值。
4. 所有 API 回傳結果必須包含 assumptionSetId 與 version。
5. 所有測試必須固定 random seed。
6. Monte Carlo 不得在單元測試中依賴不穩定隨機結果。
7. Decimal 用於金額與比例設定，double 可用於模擬運算但結果須轉回 decimal 顯示。
8. 不得把短期市場資料直接更新為長期假設。
9. 不得將 FCN、保單、不動產直接併入可自由再平衡投資組合。
10. 不得用單一平均值取代風險分析。

---

## 28. 尚未定義或待補文件

本文件完成後，仍建議補齊以下文件：

1. `knowledge/taiwan-financial-assumptions.md`：台灣預設通膨、房貸、ETF、退休、薪資等假設。
2. `knowledge/taiwan-etf-assumptions.md`：台股 ETF、債券 ETF、配息型 ETF 假設。
3. `knowledge/monte-carlo-assumptions.md`：Monte Carlo 分布、抽樣、seed、percentile 設計。
4. `docs/09A-InvestmentEngine-Formula.md`：投資引擎公式細節。
5. `docs/09B-InvestmentEngine-RiskModel.md`：投資風險模型。
6. `docs/13A-DecisionEngine-MarketRules.md`：市場假設如何影響重大決策。
7. `docs/18A-KPI-MarketRisk.md`：Dashboard 市場風險 KPI。

---

## 29. 尚未定義的 Business Rules

待後續文件補齊：

1. 使用者是否可自訂所有 asset class 的報酬率。
2. 是否允許針對單一股票設定獨立報酬率與波動率。
3. ETF 配息是否視為總報酬的一部分或現金流的一部分。
4. FCN 收入在何種條件下可列入 household recurring income。
5. 自住房是否可在退休計畫中啟用 reverse mortgage scenario。
6. 外幣資產是否依不同目的分為 investment FX exposure 與 travel FX reserve。
7. 是否允許不同人生目標使用不同 MarketAssumptionSet。

---

## 30. 尚未定義的 Formula

待後續文件補齊：

1. Monte Carlo lognormal return generation。
2. Rebalancing tax-aware formula。
3. FX-adjusted portfolio volatility。
4. Dividend haircut formula。
5. FCN knock-in stress formula。
6. Real estate net return formula。
7. Retirement glide path formula。
8. Portfolio drawdown formula。
9. Conditional value at risk formula。
10. Liquidity-adjusted net worth formula。

---

## 31. 尚未定義的 Decision Rules

待後續文件補齊：

1. 何時應降低股票比例。
2. 何時應停止增加 FCN 部位。
3. 何時應優先還貸而不是投資。
4. 何時應保留現金而不是投入市場。
5. 何時可將股息納入退休現金流。
6. 何時應延後換屋。
7. 何時應降低美元資產曝險。
8. 何時應將自住房納入退休變現策略。
9. 何時市場假設需要版本更新。
10. 何時 Scenario 應強制執行 stress test。

---

## 32. 文件狀態

| Item | Status |
|---|---|
| Document | knowledge/market-assumptions.md |
| Project | Project Atlas |
| Layer | Knowledge Base |
| Version | v1.0 |
| Purpose | 長期市場報酬率、波動率、Correlation 與情境假設 |
| Ready for Codex | Yes |
| Requires Review | Yes |

---

## 33. Phase 2 Executable Specification

### 33.1 Market Assumption Version Contract

| Field | Requirement |
|---|---|
| Aggregate | MarketAssumptionSet |
| Identity | assumptionSetId |
| Scope | tenantId optional, system default allowed |
| Required State | version, baseCurrency, effectiveFrom, status, assetClassAssumptions, inflationAssumptions, fxAssumptions |
| Versioning | Published versions are immutable. |
| Determinism | Scenario simulation must record the exact assumptionSetId and override set used. |

### 33.2 Required Commands

| Command | Purpose |
|---|---|
| CreateMarketAssumptionSet | Create draft assumptions. |
| ValidateMarketAssumptionSet | Validate returns, volatility, correlation, inflation, and FX rules. |
| PublishMarketAssumptionSet | Freeze a validated version. |
| ActivateMarketAssumptionSet | Set the default active version. |
| CloneMarketAssumptionSet | Create a new draft from an existing version. |
| ApplyScenarioAssumptionOverride | Attach overrides to a scenario. |
| ReplayAssumptionDrivenProjection | Rebuild projections using recorded assumptions. |

### 33.3 Domain Events

| Event | Trigger |
|---|---|
| MarketAssumptionSetCreated | Draft set is created. |
| MarketAssumptionSetValidated | Validation succeeds. |
| MarketAssumptionSetPublished | Version becomes immutable. |
| MarketAssumptionSetActivated | Version becomes default for new simulations. |
| ScenarioAssumptionOverrideApplied | Scenario-specific override is saved. |
| AssumptionDrivenProjectionReplayed | Historical projection is reproduced. |

### 33.4 Validation Rules

1. Published versions cannot be edited; changes require clone and publish.
2. Only one active default assumption set is allowed per base currency and tenant scope.
3. Correlation matrix must be symmetric before publish.
4. Scenario overrides must store originalValue, overrideValue, reason, scenarioId, and createdBy.
5. Projections must reject missing assumptionSetId or unversioned market input.

### 33.5 API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/market-assumptions | POST | Create draft assumption set. |
| /api/market-assumptions/{id}/validate | POST | Validate assumption set. |
| /api/market-assumptions/{id}/publish | POST | Publish immutable version. |
| /api/market-assumptions/{id}/activate | POST | Activate default version. |
| /api/scenarios/{scenarioId}/assumption-overrides | POST | Apply scenario overrides. |
| /api/projections/{projectionId}/assumption-replay | POST | Replay assumption-driven projection. |

### 33.6 Testing Matrix

| Scenario | Expected Result |
|---|---|
| Publish invalid correlation matrix | Validation fails. |
| Activate second default version | Previous default is deactivated or command is rejected by policy. |
| Edit published assumption | Mutation is rejected. |
| Scenario override without reason | Validation fails. |
| Replay with recorded assumptions | Projection output matches historical result. |

### 33.7 Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
