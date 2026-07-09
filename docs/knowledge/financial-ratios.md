# knowledge/financial-ratios.md

# Atlas Financial Ratios
Version: 1.0

## Purpose
Defines the canonical financial ratios used across all Atlas engines. Every ratio has a stable identifier, business definition, formula, unit, interpretation, thresholds and owner.

---

## Metadata

Each ratio shall define:
- Ratio ID
- Name
- Purpose
- Formula
- Inputs
- Unit
- Interpretation
- Target
- Warning Threshold
- Critical Threshold
- Source Engine

---

# Liquidity

## FR-LIQ-001 Emergency Fund Ratio
Formula:
Liquid Assets / Average Monthly Expenses

Unit:
Months

Target:
6–12 months

Interpretation:
Higher indicates stronger short-term resilience.

---

## FR-LIQ-002 Cash Reserve Ratio
Formula:
Cash / Total Monthly Obligations

Target:
>= 3

Owner:
Cash Flow Engine

---

# Cash Flow

## FR-CF-001 Savings Rate
Formula:
(Net Savings / Gross Income) × 100%

Target:
>= 20%

---

## FR-CF-002 Passive Income Coverage
Formula:
Passive Income / Living Expenses

Target:
>= 100%

---

## FR-CF-003 Cash Burn Rate
Formula:
(Net Cash Outflow / Month)

Target:
<= 0

---

# Debt

## FR-DEBT-001 Debt-to-Income (DTI)
Formula:
Monthly Debt Payments / Monthly Gross Income

Target:
< 40%

---

## FR-DEBT-002 Debt Service Coverage Ratio (DSCR)
Formula:
Disposable Income / Monthly Debt Payment

Target:
> 1.5

---

## FR-DEBT-003 Loan-to-Value (LTV)
Formula:
Outstanding Loan / Property Value

Interpretation:
Lower generally indicates lower leverage risk.

---

# Investment

## FR-INV-001 Portfolio Return
Formula:
(Current Value − Invested Capital) / Invested Capital

---

## FR-INV-002 Dividend Yield
Formula:
Annual Dividend / Portfolio Market Value

---

## FR-INV-003 Allocation Drift
Formula:
Current Allocation − Target Allocation

Target:
Within IPS tolerance.

---

## FR-INV-004 Portfolio Turnover
Formula:
Trading Amount / Average Portfolio Value

---

# Housing

## FR-HOUSE-001 Housing Cost Ratio
Formula:
Monthly Housing Cost / Household Income

Target:
<= 30%

---

## FR-HOUSE-002 Home Equity Ratio
Formula:
(Property Value − Loan Balance) / Property Value

---

# Retirement

## FR-RET-001 Retirement Funding Ratio
Formula:
Retirement Assets / Required Retirement Capital

Target:
>= 100%

---

## FR-RET-002 Safe Withdrawal Rate
Formula:
Annual Withdrawal / Retirement Assets

Reference:
Policy dependent (e.g. 4% guideline).

---

# Insurance

## FR-INS-001 Insurance Coverage Ratio
Formula:
Life Insurance Coverage / Estimated Protection Need

Target:
>= 100%

---

# Wealth

## FR-WEALTH-001 Net Worth Growth Rate
Formula:
(Current Net Worth − Previous Net Worth) / Previous Net Worth

---

## FR-WEALTH-002 Financial Independence Ratio
Formula:
Passive Income / Required Living Expenses

Target:
>= 100%

---

# Composite

## FR-COMP-001 Financial Health Index

A weighted composite derived from:
- Liquidity
- Cash Flow
- Debt
- Investment
- Housing
- Retirement
- Insurance

Range:
0–100

---

# Governance

- Ratio IDs are immutable.
- Formula changes require version updates.
- Ratios consume normalized data only.
- Historical calculations remain reproducible by referencing the applicable assumption version.
- Dashboard, Decision Engine and Scenario Engine must use these canonical definitions exclusively.
