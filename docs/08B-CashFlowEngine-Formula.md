
# Project Atlas Enterprise
# docs/08B-CashFlowEngine-Formula.md

Version: 1.0
Status: Draft

# Purpose

This document defines the canonical formulas used by the Cash Flow Engine.
All calculations performed by the engine SHALL reference the formula IDs defined here.

---

# Formula Standards

Each formula contains:

- Formula ID
- Purpose
- Variables
- Formula
- Units
- Assumptions
- Output
- Validation Rules

---

# F-CF-001 Monthly Gross Income

Purpose:
Calculate total monthly gross income.

Formula:

MonthlyGrossIncome =
EmploymentIncome
+ BonusMonthlyEquivalent
+ RentalIncome
+ DividendIncome
+ InterestIncome
+ FCNIncome
+ OtherIncome

Output:
Currency

---

# F-CF-002 Monthly Fixed Expenses

Formula:

Housing
+ Utilities
+ Insurance
+ Transportation
+ Education
+ Healthcare
+ OtherFixedExpenses

---

# F-CF-003 Monthly Variable Expenses

Formula:

Food
+ Entertainment
+ Shopping
+ Travel
+ Miscellaneous

---

# F-CF-004 Total Monthly Expenses

Formula:

FixedExpenses + VariableExpenses + OneTimeExpenses

---

# F-CF-005 Monthly Debt Payment

Formula:

MortgagePayment
+ PersonalLoanPayment
+ CreditCardPayment
+ OtherDebtPayment

---

# F-CF-006 Free Cash Flow

Formula:

MonthlyGrossIncome
- TotalMonthlyExpenses
- MonthlyDebtPayment

Interpretation:

Positive:
Available capital.

Negative:
Cash-flow deficit.

---

# F-CF-007 Emergency Fund Coverage

Formula:

EmergencyReserve /
MonthlyEssentialExpenses

Output:
Months

---

# F-CF-008 Savings Rate

Formula:

MonthlySavings /
MonthlyGrossIncome

Output:
Percentage

---

# F-CF-009 Cash Reserve Ratio

Formula:

LiquidCash /
MonthlyEssentialExpenses

---

# F-CF-010 Annual Cash Flow

Formula:

Σ MonthlyFreeCashFlow

---

# F-CF-011 Inflation Adjusted Expense

Formula:

Expense × (1 + InflationRate)^Years

---

# F-CF-012 Forecast Ending Cash

Formula:

BeginningCash
+ TotalIncome
- TotalExpense
- DebtPayments

---

# F-CF-013 Cash Flow Health Score

Concept:

Weighted score based on:

- Free cash flow
- Reserve months
- Savings rate
- Debt burden
- Income stability

Range:

0 - 100

---

# Validation Rules

CF-V-001
Income >= 0

CF-V-002
Expenses >= 0

CF-V-003
Debt payments >= 0

CF-V-004
Forecast period > 0

CF-V-005
Currency must be consistent.

---

# Formula Dependencies

Depends on:

- 03-Formula.md
- Financial Profile
- Loan Engine
- Scenario Engine

Used by:

- Investment Engine
- Home Upgrade Engine
- Retirement Engine
- Decision Engine

---

# Future Formulas

Planned additions:

- Income Stability Index
- Cash Burn Rate
- Financial Runway
- Lifestyle Flexibility Index
- Passive Income Ratio
- Household Dependency Ratio
- Cash Flow Volatility Index
- Goal Funding Ratio

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial Cash Flow formula specification|
