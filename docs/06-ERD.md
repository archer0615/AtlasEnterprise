# Project Atlas Enterprise
# docs/06-ERD.md

Version: 1.0
Status: Draft

# Entity Relationship Diagram (ERD)

## Purpose

This document defines the conceptual Entity Relationship Diagram (ERD) for Project Atlas.
It complements `05-DatabaseDesign.md` by describing the major entities and their relationships.

---

# ERD Design Principles

- One Aggregate Root owns its child entities.
- Foreign keys reflect business ownership.
- Historical records are preserved.
- Reference data is normalized.
- Business rules remain in the Domain layer.

---

# Core Entity Groups

## Identity

```text
Users
 ├── UserSettings
 ├── UserRoles
 └── RefreshTokens
```

## Financial Profile

```text
Users
 └── FinancialProfiles
      ├── IncomeSources
      ├── ExpenseCategories
      ├── MonthlyExpenses
      └── NetWorthSnapshots
```

## Portfolio

```text
Users
 └── Portfolios
      ├── PortfolioHoldings
      ├── PortfolioTransactions
      ├── DividendRecords
      ├── AllocationTargets
      └── RebalanceHistory
```

## Property

```text
Users
 └── Properties
      ├── PropertyValuations
      ├── Mortgages
      └── HomeUpgradePlans
```

## Loan

```text
Users
 └── Loans
      ├── LoanSchedules
      ├── LoanPayments
      └── LoanRateHistory
```

## Insurance

```text
Users
 └── InsurancePolicies
      ├── InsuranceCoverage
      └── InsurancePremiums
```

## Retirement

```text
Users
 └── RetirementPlans
      ├── RetirementAssumptions
      └── RetirementSnapshots
```

## Cash Flow

```text
Users
 └── CashFlowRecords
      ├── IncomeForecasts
      ├── ExpenseForecasts
      └── CashFlowForecasts
```

## Scenario

```text
Users
 └── Scenarios
      ├── ScenarioAssumptions
      ├── ScenarioOutputs
      └── ScenarioComparisons
```

## Decision

```text
Users
 └── Decisions
      ├── DecisionScores
      ├── DecisionRules
      └── RecommendationHistory
```

---

# High-Level Relationship Summary

| Parent | Child | Cardinality |
|---------|-------|-------------|
| User | FinancialProfile | 1 : 1 |
| User | Portfolio | 1 : N |
| User | Property | 1 : N |
| User | Loan | 1 : N |
| User | InsurancePolicy | 1 : N |
| User | RetirementPlan | 1 : N |
| User | Scenario | 1 : N |
| User | Decision | 1 : N |
| Portfolio | Holding | 1 : N |
| Property | Mortgage | 1 : N |
| Scenario | ScenarioOutput | 1 : N |

---

# Reference Data

Master tables include:

- AssetCategories
- Currency
- Country
- GoalTypes
- InsuranceTypes
- LoanTypes
- PropertyTypes

---

# Integrity Rules

- Every child references one valid parent.
- Aggregate children cannot exist independently.
- Cascade delete is avoided for business history.
- Historical snapshots are immutable.

---

# Future ERD Expansion

Future diagrams will include:

- Complete table attributes
- Primary and foreign keys
- Index annotations
- Domain-to-table mapping
- Bounded context diagrams
- Physical PostgreSQL model

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial conceptual ERD specification|
