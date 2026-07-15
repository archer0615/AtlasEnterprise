# Project Atlas Enterprise
# 03-Formula.md

Version: 1.0
Status: Foundation

# Purpose

This document defines the canonical financial formulas used throughout Project Atlas.
Every calculation engine must reference formulas defined here rather than implementing independent logic.

---

# Formula Standards

Each formula should define:

- Purpose
- Definition
- Variables
- Mathematical Formula
- Units
- Assumptions
- Edge Cases
- Validation Rules
- Example
- Engine Dependencies

---

# Net Worth

Purpose:
Measure total financial position.

Formula:

NetWorth = TotalAssets - TotalLiabilities

Used By:

- Dashboard
- Decision Engine
- Scenario Engine

---

# Monthly Free Cash Flow

Formula:

FreeCashFlow = MonthlyIncome - MonthlyExpenses - DebtPayments

---

# Savings Rate

Formula:

SavingsRate = AnnualSavings / AnnualIncome

---

# Debt-to-Income (DTI)

Formula:

DTI = MonthlyDebtPayments / GrossMonthlyIncome

---

# Loan-to-Value (LTV)

Formula:

LTV = OutstandingLoan / PropertyValue

---

# Emergency Fund Coverage

Formula:

EmergencyMonths = EmergencyFund / MonthlyEssentialExpenses

---

# Compound Annual Growth Rate (CAGR)

Formula:

CAGR = (EndingValue / BeginningValue)^(1 / Years) - 1

---

# Future Value (FV)

Formula:

FV = PV × (1 + r)^n

---

# Present Value (PV)

Formula:

PV = FV / (1 + r)^n

---

# Mortgage Payment

Formula:

PMT = P × r × (1+r)^n / ((1+r)^n - 1)

Variables:

- P = Principal
- r = Monthly Interest Rate
- n = Number of Payments

---

# Investment Return

Formula:

Return = (EndingValue - BeginningValue + CashDistributions) / BeginningValue

---

# Dividend Yield

Formula:

DividendYield = AnnualDividend / MarketValue

---

# Withdrawal Rate

Formula:

WithdrawalRate = AnnualWithdrawal / PortfolioValue

---

# Inflation Adjusted Value

Formula:

RealValue = NominalValue / (1 + InflationRate)^Years

---

# Decision Score

Conceptual Formula:

DecisionScore =
FinancialScore +
LiquidityScore +
RiskScore +
GoalAlignmentScore

Normalization and weighting are defined by the Decision Engine.

---

# Risk Score

Risk score is calculated from weighted dimensions:

- Liquidity
- Debt
- Concentration
- Income Stability
- Market Exposure

---

# Formula Governance

Rules:

1. Formula definitions are immutable within a released version.
2. Breaking changes require version increments.
3. Engines must reference formula identifiers.
4. Unit tests are mandatory for every implemented formula.
5. Formula assumptions must be documented.

---

# Planned Formula Library

Future additions include:

- XIRR
- IRR
- NPV
- Payback Period
- Sharpe Ratio
- Sortino Ratio
- Portfolio Volatility
- Rebalancing Drift
- Retirement Success Probability
- Home Upgrade Affordability Score
- Tax Estimation
- Insurance Coverage Ratio
- Scenario Confidence Score

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial formula specification|
