# Project Atlas Enterprise
# docs/04A-DomainInventory.md

Version: 1.0
Status: Foundation

# Purpose

This document is the master inventory of all business domains in Project Atlas.
It identifies every major domain object and its ownership, responsibilities, dependencies, and future implementation scope.

---

# Domain Classification

## User & Family

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Person | Primary user profile | Person |
| Family | Household members | Person |
| Household | Family financial unit | Person |
| Income Source | Employment and passive income | Person |
| Expense Category | Spending classification | Person |

---

## Financial Assets

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Asset | Generic financial asset | Portfolio |
| Cash | Cash holdings | Portfolio |
| Deposit | Bank deposits | Portfolio |
| ETF | Exchange traded funds | Portfolio |
| Stock | Individual equities | Portfolio |
| Bond | Fixed income | Portfolio |
| FCN | Structured products | Portfolio |
| Alternative Asset | Other investments | Portfolio |

---

## Liabilities

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Liability | Generic debt | Loan |
| Mortgage | Housing loan | Property |
| Personal Loan | Consumer loan | Loan |
| Credit Card | Revolving credit | Loan |

---

## Property

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Property | Real estate | Property |
| Ownership | Ownership record | Property |
| Valuation | Market valuation | Property |
| Home Upgrade Plan | Replacement property planning | Property |

---

## Investment

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Portfolio | Investment portfolio | Portfolio |
| Holding | Current positions | Portfolio |
| Allocation | Asset allocation | Portfolio |
| Transaction | Investment activity | Portfolio |
| Rebalancing | Allocation adjustment | Portfolio |

---

## Cash Flow

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Income | Cash inflow | Cash Flow |
| Expense | Cash outflow | Cash Flow |
| Budget | Planned spending | Cash Flow |
| Cash Flow Forecast | Future projection | Cash Flow |

---

## Insurance

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Insurance Policy | Insurance contract | Insurance |
| Coverage | Protection amount | Insurance |
| Premium | Periodic payment | Insurance |

---

## Retirement

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Retirement Plan | Retirement strategy | Retirement |
| Withdrawal Rule | Income withdrawal | Retirement |
| Retirement Income | Retirement cash flow | Retirement |

---

## Goals

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Financial Goal | Long-term target | Goal |
| Home Goal | Housing objective | Goal |
| Investment Goal | Portfolio objective | Goal |
| Retirement Goal | Retirement objective | Goal |

---

## Decision

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Decision | Recommendation | Decision |
| Decision Rule | Rule evaluation | Decision |
| Decision Score | Ranking | Decision |
| Recommendation | Final output | Decision |

---

## Scenario

| Domain | Purpose | Aggregate |
|---------|---------|-----------|
| Scenario | Simulation | Scenario |
| Assumption | Input assumptions | Scenario |
| Timeline | Projection timeline | Scenario |
| Result | Scenario output | Scenario |

---

# Shared Value Objects

- Money
- Currency
- Percentage
- Date Range
- Interest Rate
- Risk Score
- Decision Score
- Allocation Ratio

---

# Domain Ownership Rules

- Every entity belongs to one Aggregate Root.
- Cross-domain communication occurs through services or domain events.
- Shared value objects remain immutable.
- Aggregate boundaries must enforce business invariants.

---

# Planned Domains

Future expansion:

- Tax
- Estate Planning
- Business Ownership
- Trust
- Education Planning
- Healthcare Planning
- Charity Planning

---

# Dependency Summary

Decision Engine depends on:

- User
- Assets
- Liabilities
- Cash Flow
- Property
- Investment
- Retirement
- Insurance
- Scenario

Database, API, and UI must reference this inventory before introducing new business objects.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial domain inventory|
