# Cash Flow Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Cash Flow 是 Project Atlas 最重要的核心。

Project Atlas 不以資產大小作為人生是否安全的判斷，而是以：

> Cash Flow 是否可以持續支撐人生目標

作為所有 Decision Engine 的最高優先依據。

所有重大決策：

-   買房
-   換屋
-   保留第一間房
-   買車
-   投資
-   提前還款
-   提前退休

全部都建立於 Cash Flow。

------------------------------------------------------------------------

# Core Philosophy

Atlas 對 Cash Flow 的定義：

> 持續、可預測、可管理的資金流動。

重點不是收入很多，而是任何月份都能持續支付所有必要支出。

------------------------------------------------------------------------

# Cash Flow Hierarchy

## Level 1 -- Employment Income

-   Salary
-   Bonus
-   Allowance

## Level 2 -- Passive Income

-   ETF Dividend
-   Bond Coupon
-   FCN Coupon
-   Rental Income

## Level 3 -- Investment Cash Flow

-   Periodic Asset Selling
-   Portfolio Withdrawal

## Level 4 -- Credit Cash Flow

-   Mortgage Refinance
-   HELOC
-   Margin Loan

## Level 5 -- Emergency Cash Flow

-   Emergency Fund
-   Money Market
-   Cash Deposit

------------------------------------------------------------------------

# Cash Flow Classification

-   Income
-   Expense
-   Transfer
-   Investment
-   Loan
-   Tax
-   Insurance
-   Adjustment
-   Unknown

------------------------------------------------------------------------

# Key Metrics

-   Free Cash Flow
-   Disposable Cash Flow
-   Monthly Surplus
-   Annual Surplus
-   Passive Income Ratio
-   Savings Rate
-   Expense Ratio
-   Emergency Fund Months

------------------------------------------------------------------------

# Cash Flow KPI

-   Monthly Free Cash Flow
-   Annual Free Cash Flow
-   Passive Income Ratio
-   Savings Rate
-   Debt Service Ratio
-   Housing Cost Ratio
-   Investment Ratio
-   Insurance Ratio
-   Cash Burn Rate

------------------------------------------------------------------------

# Decision Rules

-   CF-001：Free Cash Flow \< 0，不可新增投資。
-   CF-002：Emergency Fund \< 6 個月，不可新增高風險投資。
-   CF-003：優先提高 Passive Income，而非提高生活支出。
-   CF-004：必要支出增加時，重新評估退休年齡。
-   CF-005：房貸不得使 Monthly Free Cash Flow 低於安全值。
-   CF-006：所有重大決策需模擬至少未來 30 年 Cash Flow。
-   CF-007：任一月份 Cash Flow \< 0，標示 Warning。
-   CF-008：連續六個月 Cash Flow \< 0，標示 High Risk。

------------------------------------------------------------------------

# Domain Events

-   CashFlowAdded
-   CashFlowUpdated
-   IncomeChanged
-   ExpenseChanged
-   PassiveIncomeChanged
-   EmergencyFundChanged
-   MortgageChanged
-   LoanCreated
-   LoanClosed
-   InvestmentWithdrawn
-   ScenarioCalculated
-   DecisionEvaluated

------------------------------------------------------------------------

# Related Documents

-   docs/08-CashFlowEngine.md
-   docs/08B-CashFlowEngine-Formula.md
-   docs/13-DecisionEngine.md
-   docs/14-Scenario.md
-   knowledge/investment-policy.md
-   knowledge/loan.md
-   knowledge/retirement.md
