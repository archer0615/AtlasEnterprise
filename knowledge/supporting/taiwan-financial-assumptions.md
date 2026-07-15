# knowledge/taiwan-financial-assumptions.md

# Project Atlas 台灣財務預設假設

> 文件狀態：Specification Draft  
> 適用範圍：Project Atlas / Life Financial Decision Operating System  
> 目錄位置：knowledge/taiwan-financial-assumptions.md  
> 最後更新基準日：2026-07-09  
> 主要用途：提供台灣市場情境下的預設假設、Scenario 初始化參數、財務引擎 fallback value、Codex 實作判斷依據。

---

## 1. 文件目的

本文件定義 Project Atlas 在台灣個人與家庭財務決策場景中使用的「預設財務假設」。

這些假設不是即時市場報價，也不是投資建議，而是系統在缺乏使用者明確輸入時，用來建立 baseline scenario、壓力測試、敏感度分析與決策比較的預設值。

Project Atlas 的定位不是預測市場，而是協助使用者做人生重大財務決策。因此，本文件的核心精神是：

1. 使用保守、可解釋、可覆寫的假設。
2. 不以單一預測值做決策，而以區間、情境與壓力測試做判斷。
3. 預設值應反映台灣家庭財務環境，包括房貸、薪資、通膨、退休、ETF、稅制與醫療支出。
4. 所有假設必須可版本化、可追蹤、可由資料庫或設定檔覆寫。
5. 所有引擎不得硬編碼本文件數值，必須透過 FinancialAssumption、ScenarioAssumption 或 Configuration Provider 讀取。

---

## 2. 文件與系統關係

本文件屬於 knowledge layer，不直接描述程式碼實作，但會影響以下文件與模組：

| 模組 / 文件 | 使用方式 |
|---|---|
| docs/specification/03-Formula.md | 公式預設參數來源 |
| docs/08-CashFlowEngine.md | 收入、支出、通膨、家庭現金流推估 |
| docs/09-InvestmentEngine.md | 投資報酬率、股息率、波動率、再投入假設 |
| docs/10-LoanEngine.md | 房貸、信貸、提前還款、寬限期假設 |
| docs/11-HomeUpgradeEngine.md | 換屋房價、貸款成數、交易成本假設 |
| docs/12-RetirementEngine.md | 退休支出、提領率、年金、長壽風險假設 |
| docs/13-DecisionEngine.md | 決策門檻、保守情境、壓力測試 |
| docs/14-Scenario.md | Base / Optimistic / Conservative / Stress scenario 初始化 |
| knowledge/taiwan-mortgage.md | 房貸假設細節來源 |
| knowledge/taiwan-tax.md | 台灣稅制與交易稅費來源 |
| knowledge/portfolio.md | 投資組合假設來源 |
| knowledge/retirement.md | 退休策略假設來源 |
| .codex/financial-rules.md | Codex 實作時的財務規則依據 |
| .codex/decision-rules.md | Codex 實作時的決策規則依據 |

---

## 3. 假設設計原則

### 3.1 預設值不是預測值

系統中的 default assumption 不是對未來的精準預測，而是為了讓系統在沒有完整輸入時，仍能產生合理、保守且可比較的結果。

例如：

- 通膨率預設 2.0% 不代表未來每年一定是 2.0%。
- ETF 長期報酬預設 5.0% 不代表任何 ETF 保證報酬。
- 房貸利率預設 2.5% 不代表使用者實際可借到此利率。

所有結果都必須標示為 projection，而不是 guarantee。

### 3.2 採用區間優先於單點

任何假設若具不確定性，必須同時提供：

- Base value
- Conservative value
- Optimistic value
- Stress value

若 UI 僅呈現單點，該單點只能代表 base case。

### 3.3 台灣情境優先

本系統預設台灣使用者，因此預設假設需符合台灣家庭財務環境：

- 房貸利率多為浮動利率或分段式機動利率。
- 房貸期限常見 20 至 30 年，新青安與部分銀行產品可至 40 年。
- 薪資成長長期不宜過度樂觀。
- ETF 配息不等於總報酬。
- 退休支出需考慮健保、長照、醫療與房屋持有成本。
- 房屋交易成本、稅負與貸款成數對換屋決策高度關鍵。

### 3.4 可覆寫性

所有假設都應支援以下覆寫層級：

1. System Default：系統內建預設。
2. Market Preset：依年度或市場環境調整的預設。
3. User Profile Override：使用者個人設定。
4. Scenario Override：單一情境設定。
5. Calculation Override：特定計算任務臨時覆寫。

優先順序：

```text
Calculation Override
> Scenario Override
> User Profile Override
> Market Preset
> System Default
```

---

## 4. 假設分類總覽

Project Atlas 的台灣財務假設分為以下類別：

| 類別 | 說明 |
|---|---|
| Macro Assumptions | 通膨、薪資成長、利率環境、匯率假設 |
| Income Assumptions | 薪資、獎金、兼職收入、股息收入、FCN 收入 |
| Expense Assumptions | 生活費、家庭支出、子女支出、醫療、保險 |
| Housing Assumptions | 房價成長、房屋維護費、交易成本、租金收益 |
| Mortgage Assumptions | 房貸利率、貸款成數、期限、寬限期、提前還款 |
| Investment Assumptions | ETF 報酬、股息率、波動、再投入、匯率 |
| Retirement Assumptions | 退休年齡、退休支出、提領率、壽命、安全邊際 |
| Insurance Assumptions | 壽險需求、保費成長、保障缺口 |
| Tax Assumptions | 所得稅、房屋交易稅費、股利課稅 |
| Scenario Assumptions | Base / Conservative / Optimistic / Stress |

---

## 5. 主要預設假設表

以下為 Project Atlas 初始版本使用的建議預設值。

### 5.1 總體經濟假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 台灣長期通膨率 | 2.0% | 2.5% | 1.5% | 3.5% | 用於生活費、退休支出、醫療費推估 |
| 核心生活費通膨 | 2.2% | 3.0% | 1.8% | 4.0% | 食品、交通、家庭支出較敏感 |
| 醫療與長照通膨 | 3.5% | 5.0% | 2.5% | 6.5% | 長期退休模型需高於一般 CPI |
| 教育支出通膨 | 3.0% | 4.5% | 2.0% | 6.0% | 若有子女目標時啟用 |
| 長期薪資成長率 | 2.5% | 1.5% | 4.0% | 0.0% | 台灣薪資模型預設 |
| 實質薪資成長率 | 0.5% | -1.0% | 2.0% | -2.0% | 薪資成長扣除通膨後 |
| 台幣短期存款利率 | 1.0% | 0.5% | 1.5% | 0.3% | 現金資產預設報酬 |
| 台幣定存 / 高利活存 | 1.5% | 1.0% | 2.0% | 0.5% | 緊急預備金收益假設 |
| 美元兌台幣匯率 | 32.0 | 34.0 | 30.0 | 36.0 | 僅作長期轉換假設，不作短期預測 |

### 5.2 房貸與貸款假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 一般自住房貸利率 | 2.5% | 3.0% | 2.2% | 3.8% | 以台灣近年房貸環境作 baseline |
| 第二戶 / 投資型房貸利率 | 2.8% | 3.3% | 2.5% | 4.2% | 保留第一間房時使用 |
| 房貸期限 | 30 年 | 25 年 | 40 年 | 20 年 | 預設用 30 年，青安或特例可 40 年 |
| 房貸寬限期 | 0 年 | 0 年 | 3 年 | 0 年 | 預設不使用寬限期 |
| 自住房貸成數 | 75% | 70% | 80% | 60% | 換屋模型預設 |
| 第二戶貸款成數 | 60% | 50% | 65% | 40% | 保留第一間房時更保守 |
| 信貸利率 | 5.0% | 7.0% | 3.5% | 9.0% | 個人信用貸款假設 |
| 信貸期限 | 7 年 | 5 年 | 7 年 | 3 年 | 台灣常見信貸年限 |
| 提前還款違約金 | 0.5% | 1.0% | 0.0% | 1.5% | 視貸款契約覆寫 |

### 5.3 房地產假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 自住房長期房價成長 | 2.0% | 0.0% | 4.0% | -2.0% | 自住不應過度依賴增值 |
| 雙北 / 核心區房價成長 | 2.5% | 0.5% | 4.5% | -1.5% | 區域參數可覆寫 |
| 非核心區房價成長 | 1.5% | -0.5% | 3.0% | -3.0% | 區域風險較高 |
| 房屋維護費率 | 房價 0.5% / 年 | 0.8% | 0.3% | 1.2% | 包含修繕、家電、裝潢折舊 |
| 管理費成長率 | 2.0% | 3.0% | 1.5% | 4.0% | 若有社區管理費則啟用 |
| 出租空置率 | 1 個月 / 年 | 2 個月 / 年 | 0.5 個月 / 年 | 3 個月 / 年 | 保留第一間房出租時使用 |
| 租金年成長率 | 1.5% | 0.5% | 3.0% | -1.0% | 租金收入預設 |
| 租屋維護成本 | 租金 10% | 15% | 5% | 20% | 包含修繕與租客更替成本 |

### 5.4 投資與 ETF 假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 台股市值型 ETF 長期總報酬 | 6.0% | 3.0% | 8.0% | -15.0% | 年化總報酬，壓力值為單年衝擊 |
| 台股高股息 ETF 長期總報酬 | 5.0% | 2.5% | 7.0% | -18.0% | 配息不等於報酬 |
| 台股高股息 ETF 現金殖利率 | 5.0% | 3.5% | 7.0% | 2.0% | 用於現金流模型，需可調整 |
| 美股市值型 ETF 長期總報酬 | 6.5% | 3.5% | 8.5% | -20.0% | 以台幣計價時需加匯率風險 |
| 全球債券 ETF 長期總報酬 | 3.0% | 1.0% | 4.5% | -8.0% | 匯率與利率敏感 |
| 現金 / 貨幣型工具報酬 | 1.2% | 0.5% | 2.0% | 0.0% | 預備金與閒置資金 |
| 股票型資產年度波動率 | 18.0% | 22.0% | 15.0% | 30.0% | Monte Carlo 或風險模型使用 |
| 債券型資產年度波動率 | 7.0% | 10.0% | 5.0% | 14.0% | 債券價格風險 |
| 高股息配息衰減壓力 | -30% | -40% | -10% | -60% | 用於股息現金流壓力測試 |

### 5.5 FCN 與結構型商品假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| FCN 年化票息 | 10.0% | 6.0% | 12.0% | 0.0% | 票息不等於總報酬 |
| FCN 月現金流穩定性 | 80% | 60% | 90% | 0% | 代表預期可持續收息比例 |
| FCN 本金折損壓力 | -15% | -25% | -5% | -50% | 壓力測試本金風險 |
| FCN 匯率壓力 | -5% | -8% | 3% | -15% | 美元資產轉台幣時使用 |
| FCN 再投資可得性 | 70% | 50% | 90% | 0% | 到期後不保證有同條件商品 |

### 5.6 退休假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 預設退休年齡 | 65 | 60 | 67 | 58 | 使用者可覆寫 |
| 退休規劃壽命 | 90 | 95 | 88 | 100 | 長壽風險壓力測試 |
| 退休後生活費替代率 | 75% | 90% | 65% | 100% | 以退休前生活費為基準 |
| 安全提領率 | 3.5% | 3.0% | 4.0% | 2.5% | 台灣家庭保守預設 |
| 退休後投資報酬 | 4.0% | 2.0% | 5.5% | -10.0% | 退休組合應低於累積期 |
| 退休後通膨 | 2.2% | 3.0% | 1.8% | 4.0% | 退休生活費調整 |
| 長照與醫療額外準備 | 300 萬 | 500 萬 | 200 萬 | 800 萬 | 以家庭層級設定 |
| 退休現金緩衝 | 24 個月 | 36 個月 | 12 個月 | 48 個月 | 避免序列報酬風險 |

### 5.7 家庭現金流假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 緊急預備金月數 | 12 個月 | 18 個月 | 6 個月 | 24 個月 | 依家庭責任與負債調整 |
| 房貸支出上限 / 月收入 | 35% | 30% | 40% | 25% | DecisionEngine 門檻 |
| 總負債支出上限 / 月收入 | 45% | 40% | 50% | 35% | 含信貸、車貸、房貸 |
| 長期儲蓄率目標 | 20% | 25% | 15% | 30% | 稅後收入基準 |
| 年終獎金保守折扣 | 70% | 50% | 90% | 0% | 不應將年終全額視為穩定收入 |
| 股息收入保守折扣 | 70% | 50% | 85% | 30% | 配息不穩定需折扣 |
| 額外現金流安全折扣 | 60% | 40% | 80% | 0% | FCN、兼職、租金等 |

### 5.8 車輛與大型消費假設

| 參數 | Base | Conservative | Optimistic | Stress | 說明 |
|---|---:|---:|---:|---:|---|
| 車輛折舊率第 1 年 | 15% | 20% | 10% | 25% | 買車決策使用 |
| 車輛後續年折舊率 | 8% | 12% | 5% | 15% | 第 2 年後 |
| 車貸利率 | 4.0% | 6.0% | 2.5% | 8.0% | 若使用車貸 |
| 年度車輛持有成本 | 車價 8% | 12% | 6% | 15% | 保險、稅金、保養、停車 |
| 大型消費安全係數 | 1.2x | 1.5x | 1.1x | 2.0x | 裝潢、車、家電等超支風險 |

---

## 6. Scenario 預設組合

Project Atlas 應至少提供以下情境：

### 6.1 Base Scenario

Base Scenario 代表合理中性假設，不過度樂觀，也不極端保守。

```yaml
scenario: Base
inflation_rate: 0.020
salary_growth_rate: 0.025
mortgage_rate: 0.025
housing_price_growth_rate: 0.020
investment_return_rate: 0.050
retirement_withdrawal_rate: 0.035
emergency_fund_months: 12
bonus_income_recognition_rate: 0.70
dividend_income_recognition_rate: 0.70
fcn_income_recognition_rate: 0.60
```

### 6.2 Conservative Scenario

Conservative Scenario 用於判斷決策是否在不利但非災難環境下仍可承受。

```yaml
scenario: Conservative
inflation_rate: 0.025
salary_growth_rate: 0.015
mortgage_rate: 0.030
housing_price_growth_rate: 0.000
investment_return_rate: 0.025
retirement_withdrawal_rate: 0.030
emergency_fund_months: 18
bonus_income_recognition_rate: 0.50
dividend_income_recognition_rate: 0.50
fcn_income_recognition_rate: 0.40
```

### 6.3 Optimistic Scenario

Optimistic Scenario 僅作 upside 參考，不得單獨作為重大財務決策依據。

```yaml
scenario: Optimistic
inflation_rate: 0.015
salary_growth_rate: 0.040
mortgage_rate: 0.022
housing_price_growth_rate: 0.040
investment_return_rate: 0.070
retirement_withdrawal_rate: 0.040
emergency_fund_months: 6
bonus_income_recognition_rate: 0.90
dividend_income_recognition_rate: 0.85
fcn_income_recognition_rate: 0.80
```

### 6.4 Stress Scenario

Stress Scenario 用於檢查重大財務決策是否可能導致家庭財務韌性斷裂。

```yaml
scenario: Stress
inflation_rate: 0.035
salary_growth_rate: 0.000
mortgage_rate: 0.038
housing_price_growth_rate: -0.020
investment_return_rate: -0.150
retirement_withdrawal_rate: 0.025
emergency_fund_months: 24
bonus_income_recognition_rate: 0.00
dividend_income_recognition_rate: 0.30
fcn_income_recognition_rate: 0.00
```

Stress Scenario 不代表長期每年都發生，而是用來模擬以下事件：

- 失業或收入中斷。
- 利率快速上升。
- ETF 配息大幅下降。
- FCN 無法續作或本金受損。
- 房價下跌且流動性下降。
- 醫療或家庭支出突然增加。
- 年終獎金消失。

---

## 7. 各引擎使用規則

### 7.1 CashFlowEngine

CashFlowEngine 使用本文件假設時，必須遵守：

1. 固定薪資可使用 100% recognition rate。
2. 年終獎金不得預設全額納入固定現金流。
3. 股息、FCN、租金、兼職收入必須套用折扣率。
4. 支出需依類別套用不同通膨率。
5. 醫療、保險、長照不得只用一般 CPI。
6. 每年 cashflow projection 必須保留 nominal 與 real value。

收入分類 recognition rate：

| 收入類型 | Base Recognition | 說明 |
|---|---:|---|
| 固定薪資 | 100% | 穩定薪資收入 |
| 年終獎金 | 70% | 受公司獲利影響 |
| 股息收入 | 70% | 配息可能降低 |
| FCN 票息 | 60% | 商品可得性與本金風險高 |
| 租金收入 | 75% | 扣除空置與修繕 |
| 兼職收入 | 50% | 不穩定收入 |
| 資產出售收入 | 0% | 不得列為常態收入 |

### 7.2 LoanEngine

LoanEngine 使用假設時：

1. 房貸利率不得硬編碼，須從 scenario 讀取。
2. 機動利率貸款需支援未來升息模擬。
3. 提前還款需比較：
   - 節省利息
   - 現金流安全性下降
   - 投資機會成本
   - 流動性損失
4. 寬限期不得被視為成本降低，只能視為現金流延後。
5. 第二戶貸款成數與利率應比自住房更保守。

### 7.3 InvestmentEngine

InvestmentEngine 使用假設時：

1. 配息與總報酬必須分開。
2. 股息現金流不得視為保證。
3. ETF 應分為：
   - 市值型
   - 高股息型
   - 債券型
   - 貨幣型
   - 海外型
4. 投資報酬需支援 volatility 與 sequence risk。
5. 退休階段投資報酬不得沿用累積期高風險假設。

### 7.4 HomeUpgradeEngine

HomeUpgradeEngine 使用假設時：

1. 換屋不得只比較房價，必須納入：
   - 仲介費
   - 契稅
   - 代書費
   - 登記規費
   - 搬家費
   - 裝潢費
   - 家電家具
   - 雙房貸重疊期
   - 原屋出售時間
2. 保留第一間房時，租金收入需折扣。
3. 第二戶貸款成數、利率與壓力測試需更保守。
4. 若保留第一間房導致緊急預備金不足，DecisionEngine 應標示風險。

### 7.5 RetirementEngine

RetirementEngine 使用假設時：

1. 退休生活費需依通膨逐年調整。
2. 醫療與長照需獨立拉高通膨。
3. 提領率不得只用單一 4% rule。
4. 必須支援長壽風險至 95 或 100 歲。
5. 退休前 5 年與退休後 5 年需檢查 sequence of returns risk。
6. 退休模型應輸出資產耗盡年齡，而非只輸出是否足夠。

---

## 8. Decision Rules

### 8.1 假設使用決策原則

DecisionEngine 使用本文件假設時，應遵守以下規則：

| 規則 ID | 規則 |
|---|---|
| TFA-DR-001 | 重大財務決策不得只使用 Optimistic Scenario。 |
| TFA-DR-002 | 若 Base 可行但 Conservative 不可行，應標示為「可行但韌性不足」。 |
| TFA-DR-003 | 若 Stress Scenario 下 24 個月內現金流斷裂，應標示為高風險。 |
| TFA-DR-004 | 若總負債支出超過稅後月收入 45%，應標示負債壓力偏高。 |
| TFA-DR-005 | 若房貸支出超過稅後月收入 35%，換屋決策需提示風險。 |
| TFA-DR-006 | 若緊急預備金低於 12 個月，不建議同時增加房貸與信貸。 |
| TFA-DR-007 | 若年終、股息、FCN 合計占家庭現金流安全邊際過高，需折扣後再判斷。 |
| TFA-DR-008 | 若退休模型需依賴高風險商品配息維持生活費，應標示收入品質風險。 |
| TFA-DR-009 | 若換屋後 3 年內自由現金流為負，需列為高壓力情境。 |
| TFA-DR-010 | 若投資資產流動性不足以支撐 18 個月支出，不應視為完整安全墊。 |

### 8.2 可行性分級

| 等級 | 條件 | 系統說明 |
|---|---|---|
| Green | Base 與 Conservative 均可行，Stress 不致破產 | 財務韌性良好 |
| Yellow | Base 可行，Conservative 邊界可行 | 可執行但需保守控管 |
| Orange | Base 可行，Conservative 不可行 | 不建議直接執行，需調整條件 |
| Red | Base 即不可行 | 不建議執行 |
| Black | Stress 下短期現金流斷裂且無補救方案 | 重大財務風險 |

---

## 9. 資料模型建議

本文件假設應可落地為資料表或設定檔。

### 9.1 FinancialAssumptionGroup

```csharp
public sealed class FinancialAssumptionGroup
{
    public Guid Id { get; private set; }
    public string Code { get; private set; }
    public string Name { get; private set; }
    public string CountryCode { get; private set; } // TW
    public string Version { get; private set; }
    public DateOnly EffectiveFrom { get; private set; }
    public DateOnly? EffectiveTo { get; private set; }
    public bool IsDefault { get; private set; }
}
```

### 9.2 FinancialAssumption

```csharp
public sealed class FinancialAssumption
{
    public Guid Id { get; private set; }
    public Guid GroupId { get; private set; }
    public string Key { get; private set; }
    public string Category { get; private set; }
    public decimal BaseValue { get; private set; }
    public decimal ConservativeValue { get; private set; }
    public decimal OptimisticValue { get; private set; }
    public decimal StressValue { get; private set; }
    public string Unit { get; private set; } // Percent, TWD, Months, Years, Ratio
    public string Description { get; private set; }
    public bool IsUserOverridable { get; private set; }
}
```

### 9.3 ScenarioAssumptionOverride

```csharp
public sealed class ScenarioAssumptionOverride
{
    public Guid Id { get; private set; }
    public Guid ScenarioId { get; private set; }
    public string AssumptionKey { get; private set; }
    public decimal OverrideValue { get; private set; }
    public string Reason { get; private set; }
}
```

---

## 10. 預設 Assumption Key 命名

所有假設 key 必須穩定，不得因 UI 文案變更而改變。

建議格式：

```text
{domain}.{category}.{name}
```

範例：

```text
macro.inflation.general
macro.inflation.medical
macro.salary.growth
loan.mortgage.primary_rate
loan.mortgage.second_home_rate
loan.credit.personal_rate
housing.price_growth.primary_home
housing.maintenance.annual_rate
investment.etf.taiwan_market_return
investment.etf.high_dividend_yield
retirement.withdrawal.safe_rate
retirement.life_expectancy.planning_age
cashflow.emergency_fund.months
cashflow.income_recognition.bonus
cashflow.income_recognition.dividend
cashflow.income_recognition.fcn
```

---

## 11. API 回傳建議

API 不應只回傳單一數值，而應回傳假設來源、版本與情境。

```json
{
  "assumptionKey": "loan.mortgage.primary_rate",
  "countryCode": "TW",
  "version": "2026.07",
  "unit": "Percent",
  "values": {
    "base": 0.025,
    "conservative": 0.030,
    "optimistic": 0.022,
    "stress": 0.038
  },
  "sourceType": "SystemDefault",
  "isUserOverridable": true,
  "description": "Default Taiwan primary residence mortgage rate assumption."
}
```

---

## 12. Validation Rules

| Rule ID | Validation |
|---|---|
| TFA-VAL-001 | Percent 類型數值必須以 decimal 儲存，例如 2.5% = 0.025。 |
| TFA-VAL-002 | 所有 assumption key 必須唯一。 |
| TFA-VAL-003 | Base / Conservative / Optimistic / Stress 不得為 null。 |
| TFA-VAL-004 | 使用者覆寫值必須保留 reason 或 note。 |
| TFA-VAL-005 | 壓力情境不一定是長期年化值，需標示 interpretation。 |
| TFA-VAL-006 | 投資報酬率不得與配息率混用。 |
| TFA-VAL-007 | 現金流收入 recognition rate 必須介於 0 到 1。 |
| TFA-VAL-008 | 貸款利率不得為負。 |
| TFA-VAL-009 | 通膨率可為 0，但不得低於 -5%，除非明確設定為 deflation scenario。 |
| TFA-VAL-010 | 退休壽命必須大於退休年齡。 |

---

## 13. Testing Requirements

Codex 實作時應建立以下測試：

### 13.1 Unit Tests

1. 讀取 base assumption 應回傳正確值。
2. scenario override 應覆蓋 system default。
3. user override 應覆蓋 market preset。
4. invalid percentage value 應被拒絕。
5. investment dividend yield 不得被誤用為 total return。
6. mortgage stress rate 應正確套用至 LoanEngine。
7. retirement life expectancy 小於 retirement age 時應 validation failed。
8. recognition rate 超過 1 時應 validation failed。

### 13.2 Integration Tests

1. HomeUpgradeEngine 使用 Conservative Scenario 後，月現金流應重新計算。
2. CashFlowEngine 使用 inflation assumption 後，未來支出應逐年增加。
3. RetirementEngine 使用 medical inflation 後，醫療支出應高於一般生活費成長。
4. DecisionEngine 在 Base 可行但 Conservative 不可行時，應回傳 Yellow 或 Orange。
5. API 回傳 assumption 時應包含 version、sourceType、unit。

### 13.3 Regression Tests

每次假設版本更新時，需保留舊版本測試，避免歷史 scenario 計算結果被不可追蹤地改變。

---

## 14. Codex Implementation Notes

Codex 在實作本文件時需遵守：

1. 不得將 assumption 數值寫死在 engine class 中。
2. 應建立 AssumptionProvider 或 equivalent service。
3. 應支援 scenario-specific assumption resolution。
4. 應支援 versioned assumptions。
5. API 回傳需顯示使用哪一組假設。
6. 所有金額計算使用 decimal。
7. 所有比率使用 decimal，不使用 double。
8. 所有日期使用 DateOnly 或清楚定義 timezone 的 DateTimeOffset。
9. 所有 projection 結果需保留 calculation metadata。
10. 若假設缺漏，系統不得默默使用 0，必須回傳 validation error 或 fallback source。

---

## 15. Open Business Rules

以下規則尚需在後續文件或 appendix 中補齊：

| 類別 | 尚缺規則 |
|---|---|
| 房貸 | 青安、新青安、第二戶限貸、寬限期策略的細部規則 |
| 稅務 | 房地合一稅、重購退稅、股利所得稅最佳化規則 |
| ETF | 台股 ETF 分類、配息穩定性評分、收益品質規則 |
| FCN | FCN 本金風險、轉換風險、提前出場規則 |
| 退休 | 勞保、勞退、國民年金納入方式 |
| 保險 | 壽險缺口、醫療險、長照險與家庭責任模型 |
| 匯率 | USD/TWD 匯率壓力測試與美元資產配置規則 |
| 家庭事件 | 生子、換車、父母照護、失業、疾病等事件模型 |

---

## 16. Open Formula Requirements

以下公式需於 docs/specification/03-Formula.md 或個別 Engine Formula 文件中定義：

1. Inflation-adjusted expense projection。
2. Real income growth projection。
3. Mortgage payment under variable interest rate path。
4. Debt service ratio。
5. Free cash flow after housing upgrade。
6. Dividend income haircut formula。
7. FCN income recognition formula。
8. Retirement withdrawal sustainability formula。
9. Sequence of returns stress formula。
10. Emergency fund adequacy formula。
11. Property carrying cost formula。
12. Rent net income formula。
13. Housing affordability score。
14. Financial resilience score。
15. Scenario feasibility score。

---

## 17. Data Source Notes

本文件的數值是 Project Atlas 初始建模假設，並參考台灣公開資料與金融市場常見區間。實際系統不可將外部資料視為永久不變。

建議後續可建立 MarketDataRefresh 流程，週期性更新：

1. 台灣 CPI 與通膨預測。
2. 五大銀行新承作房貸利率。
3. 中央銀行政策利率。
4. 平均薪資與經常性薪資成長。
5. ETF 配息與總報酬資料。
6. 房價指數與區域實價登錄資料。
7. 勞保、勞退、基本工資與稅制規則。

參考資料快照：

- Reuters reported in 2025 that Taiwan's central bank held its benchmark rate at 2%, with CPI forecast near 1.81% for 2025.
- Reuters reported in 2026 that Taiwan's CPI projection remained below 2%, around 1.93%, while growth was strongly affected by AI demand.
- Taiwan Ministry of the Interior public housing loan data tracks average mortgage rates of the top five banks.
- E.SUN Bank and HSBC Taiwan public mortgage pages show current floating mortgage products around the mid-2% range depending on borrower and product terms.
- Taiwan DGBAS-related reports indicated regular wage growth around 3% in 2025.

> 實作注意：以上來源僅用於建立 2026.07 版 baseline，不可取代正式 market data module。

---

## 18. Versioning Policy

Assumption version 建議使用：

```text
YYYY.MM
```

例如：

```text
2026.07
```

每次調整預設值時需記錄：

1. 版本號。
2. 調整日期。
3. 調整原因。
4. 影響的 assumption key。
5. 是否需要重算既有 scenario。
6. 是否保留舊版計算結果。

歷史計算結果必須記錄當時使用的 assumption version，避免日後使用新假設覆蓋舊決策脈絡。

---

## 19. Definition of Done

本文件完成後，Codex 應能理解：

1. Project Atlas 在台灣情境下需要哪些預設財務假設。
2. 各假設的 base、conservative、optimistic、stress 值。
3. 哪些假設會影響 CashFlow、Loan、Investment、HomeUpgrade、Retirement 與 DecisionEngine。
4. 為什麼不能把假設硬編碼在引擎中。
5. 如何設計 assumption provider、資料表與 API response。
6. 如何驗證使用者覆寫與 scenario override。
7. 哪些 business rules、formula 與 decision rules 仍需補齊。

---

## 20. Next Recommended Documents

完成本文件後，建議下一步補齊：

1. `knowledge/taiwan-market-data-sources.md`  
   定義 CPI、房貸利率、薪資、ETF、房價等資料來源與更新策略。

2. `docs/03A-AssumptionFormula.md`  
   將本文件假設轉成可實作公式。

3. `docs/14A-ScenarioAssumptionMatrix.md`  
   定義每種情境如何套用 assumption。

4. `.codex/assumption-rules.md`  
   給 Codex 的假設讀取、覆寫、驗證與版本化規則。

5. `docs/18A-FinancialResilienceScore.md`  
   定義財務韌性分數與決策門檻。

