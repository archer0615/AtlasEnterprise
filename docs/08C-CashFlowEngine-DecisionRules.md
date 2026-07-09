
# Project Atlas Enterprise
# docs/08C-CashFlowEngine-DecisionRules.md

Version: 1.0
Status: Draft

# Purpose

This specification defines the business and decision rules governing the Cash Flow Engine.
These rules determine how cash-flow health is evaluated before downstream engines
(Home Upgrade, Investment, Loan, Retirement, Decision) execute.

---

# Rule Categories

- Validation Rules (VR)
- Business Rules (BR)
- Decision Rules (DR)
- Warning Rules (WR)

---

# Validation Rules

## VR-CF-001
Income values SHALL be greater than or equal to zero.

## VR-CF-002
Expense values SHALL be greater than or equal to zero.

## VR-CF-003
Every recurring cash-flow item SHALL have:
- Effective Date
- Frequency
- Currency

## VR-CF-004
Scenario assumptions SHALL specify a planning horizon.

## VR-CF-005
Historical records SHALL NOT be modified.

---

# Business Rules

## BR-CF-001
Recurring income is projected until its configured end date.

## BR-CF-002
One-time income affects only the target period.

## BR-CF-003
Recurring expenses continue unless explicitly terminated.

## BR-CF-004
Debt repayments have higher priority than discretionary spending.

## BR-CF-005
Insurance premiums are treated as mandatory expenses.

## BR-CF-006
Life events may add, remove, or modify income and expenses.

## BR-CF-007
Inflation adjustments apply only to configured expense categories.

## BR-CF-008
Scenario assumptions override baseline data only within that scenario.

## BR-CF-009
Forecast calculations are deterministic.

## BR-CF-010
Completed forecasts are immutable.

---

# Decision Rules

## DR-CF-001
IF Free Cash Flow < 0
THEN Decision Status = Critical

## DR-CF-002
IF Emergency Reserve < Configured Threshold
THEN Raise Liquidity Warning

## DR-CF-003
IF Savings Rate decreases for multiple consecutive periods
THEN Recommend Cash Flow Review

## DR-CF-004
IF Debt Payment Ratio exceeds configured limit
THEN Block aggressive investment recommendations

## DR-CF-005
IF Cash Flow remains positive throughout the planning horizon
THEN Scenario is eligible for downstream evaluation

## DR-CF-006
IF Funding Gap exists
THEN Record Funding Gap before Decision Engine execution

---

# Warning Rules

## WR-CF-001
Missing recurring income.

## WR-CF-002
Large one-time expense detected.

## WR-CF-003
Rapid decline in free cash flow.

## WR-CF-004
Emergency reserve approaching threshold.

## WR-CF-005
Planning horizon shorter than recommended.

Warnings do not terminate execution.

---

# Decision Outputs

The engine produces:

- Cash Flow Health
- Liquidity Status
- Reserve Status
- Funding Status
- Validation Result
- Warning Collection

---

# Rule Priority

1. Validation Rules
2. Business Rules
3. Formula Execution
4. Decision Rules
5. Warning Rules
6. Output Generation

---

# Traceability

Depends on:
- 01-Blueprint.md
- 02-IPS.md
- 03-Formula.md
- 08A-CashFlowEngine-Architecture.md
- 08B-CashFlowEngine-Formula.md

Consumed by:
- 09-InvestmentEngine
- 10-LoanEngine
- 11-HomeUpgradeEngine
- 12-RetirementEngine
- 13-DecisionEngine

---

# Future Rule Library

Planned additions:

- Household Cash Allocation Rules
- Passive Income Rules
- Dividend Utilization Rules
- FCN Cash Flow Rules
- Retirement Transition Rules
- Home Upgrade Funding Rules
- Inflation Stress Rules
- Multi-Currency Rules

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial Cash Flow decision rules specification|
