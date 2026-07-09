# Project Atlas Enterprise
# docs/05-DatabaseDesign.md

Version: 1.0
Status: Draft

# Database Design Specification

## Purpose

This document defines the logical database architecture for Project Atlas.

The database is designed to persist financial facts rather than business logic.
Business rules belong to the Domain Layer. The database stores validated state.

---

# Design Principles

- PostgreSQL
- EF Core
- Code First with controlled migrations
- UUID primary keys
- UTC timestamps
- Soft delete where business history must be preserved
- Optimistic concurrency
- Auditability

---

# Architectural Layers

Presentation
↓
Application
↓
Domain
↓
Infrastructure
↓
PostgreSQL

Only Infrastructure accesses the database directly.

---

# Database Modules

## Identity

Tables

- Users
- UserSettings
- Roles
- UserRole
- RefreshTokens

---

## Financial Profile

Tables

- FinancialProfiles
- IncomeSources
- ExpenseCategories
- MonthlyExpenses
- NetWorthSnapshots

---

## Assets

Tables

- Assets
- AssetCategories
- AssetValuations
- AssetTransactions

---

## Investment

Tables

- Portfolios
- PortfolioHoldings
- PortfolioTransactions
- AllocationTargets
- DividendRecords
- RebalanceHistory

---

## Property

Tables

- Properties
- PropertyValuations
- Mortgages
- HomeUpgradePlans

---

## Loan

Tables

- Loans
- LoanPayments
- LoanSchedules
- LoanRateHistory

---

## Insurance

Tables

- InsurancePolicies
- InsurancePremiums
- InsuranceCoverage

---

## Retirement

Tables

- RetirementPlans
- RetirementAssumptions
- RetirementSnapshots

---

## Cash Flow

Tables

- CashFlowRecords
- CashFlowForecasts
- IncomeForecasts
- ExpenseForecasts

---

## Decision

Tables

- Decisions
- DecisionScores
- DecisionRules
- RecommendationHistory

---

## Scenario

Tables

- Scenarios
- ScenarioAssumptions
- ScenarioOutputs
- ScenarioComparisons

---

# Common Columns

Every transactional table should include:

- Id
- CreatedAtUtc
- UpdatedAtUtc
- CreatedBy
- UpdatedBy
- Version
- IsDeleted (when applicable)

---

# Naming Standards

Tables:
Plural PascalCase

Columns:
PascalCase

Foreign Keys:
<EntityName>Id

Indexes:
IX_Table_Column

Unique Constraints:
UX_Table_Columns

---

# Relationships

User
 ├─ FinancialProfile
 ├─ Portfolio
 ├─ Property
 ├─ Loan
 ├─ Insurance
 ├─ RetirementPlan
 ├─ Scenario
 └─ Decision

---

# Audit Strategy

Audit tables capture:

- Before values
- After values
- User
- Timestamp
- Action

---

# Performance Guidelines

- Use indexes on foreign keys
- Avoid N+1 queries
- Archive historical snapshots
- Partition large history tables when necessary

---

# Migration Strategy

- One migration per business feature
- Never modify historical migrations
- Seed only reference data
- All schema changes reviewed

---

# Future Extensions

- Multi-currency ledger
- Open Banking integration
- Tax engine
- Estate planning
- AI decision cache

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial database design specification|
