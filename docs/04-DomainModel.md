# Project Atlas Enterprise
# docs/04-DomainModel.md

Version: 1.0
Status: Foundation

# Domain Model

## Purpose

This document defines the core Domain-Driven Design (DDD) model for Project Atlas.

The domain model is the canonical business representation of the financial decision platform. It is independent of database schemas, APIs, UI, and infrastructure.

---

# Design Principles

- Domain Driven Design (DDD)
- Clean Architecture
- Rich Domain Model
- Explicit Business Rules
- Immutable Value Objects where possible
- Event-driven business history
- Explainable decision making

---

# Bounded Contexts

| Context | Responsibility |
|----------|----------------|
| User Profile | User, family, income and demographic information |
| Financial Profile | Assets, liabilities, income and expenses |
| Cash Flow | Cash inflow, outflow and forecasting |
| Investment | Portfolio, allocation and investment policy |
| Property | Real estate, mortgage and home upgrade |
| Loan | Mortgage, personal loan and repayment strategy |
| Insurance | Protection planning and coverage analysis |
| Retirement | Retirement planning and withdrawal strategy |
| Scenario | What-if simulation |
| Decision | Cross-domain decision orchestration |

---

# Aggregate Roots

## Person

Owns:

- Financial Profile
- Goals
- Family
- Decision History

---

## Portfolio

Owns:

- Holdings
- Asset Allocation
- Performance
- Transactions

---

## Property

Owns:

- Mortgage
- Valuation
- Ownership
- Upgrade Plan

---

## Loan

Owns:

- Repayment Schedule
- Interest Terms
- Outstanding Balance

---

## Retirement Plan

Owns:

- Retirement Goals
- Withdrawal Rules
- Income Projection

---

## Scenario

Owns:

- Assumptions
- Timeline
- Outputs
- Decision Result

---

# Core Entities

- Person
- Family
- Asset
- Liability
- Property
- Mortgage
- Loan
- Portfolio
- Holding
- Transaction
- Goal
- Insurance Policy
- Cash Flow Record
- Scenario
- Decision
- Life Event
- Timeline

---

# Value Objects

Examples:

- Money
- Currency
- Percentage
- Interest Rate
- Date Range
- Risk Score
- Decision Score
- Allocation
- Address

Value Objects are immutable.

---

# Domain Services

- Cash Flow Analysis Service
- Investment Analysis Service
- Loan Analysis Service
- Retirement Analysis Service
- Insurance Analysis Service
- Decision Evaluation Service
- Scenario Simulation Service

---

# Domain Events

Examples:

- AssetAdded
- AssetRemoved
- PropertyPurchased
- MortgageCreated
- LoanRepaid
- GoalCompleted
- RetirementStarted
- ScenarioGenerated
- DecisionApproved

---

# Repository Contracts

Repositories exist only for Aggregate Roots.

Examples:

- IUserRepository
- IPortfolioRepository
- IPropertyRepository
- ILoanRepository
- IScenarioRepository
- IDecisionRepository

---

# Business Invariants

Examples:

- Asset value cannot be negative.
- Outstanding loan balance cannot be below zero.
- Scenario assumptions are immutable after execution.
- Historical decisions cannot be modified.
- Every recommendation must reference its assumptions.

---

# Relationships

Person
├── Family
├── Goals
├── Assets
├── Liabilities
├── Insurance
├── Properties
├── Portfolio
├── Cash Flow
├── Retirement Plan
└── Decision History

---

# Cross-Domain Dependencies

Decision Engine depends on:

- Cash Flow
- Investment
- Loan
- Property
- Retirement
- Insurance

Scenario Engine depends on every financial bounded context.

---

# Future Expansion

Planned bounded contexts:

- Tax
- Estate Planning
- Business Ownership
- Trust Management
- Education Planning
- Healthcare Cost Planning

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial domain model specification|
