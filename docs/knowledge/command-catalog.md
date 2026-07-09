# knowledge/command-catalog.md

# Atlas Command Catalog
Version: 1.0
Status: Canonical Specification

## Purpose

This document defines every command that can mutate business state in Project Atlas.
Commands express intent. They are validated before execution and may produce one or more Domain Events.

---

# Command Lifecycle

Client Request
→ Authorization
→ Validation
→ Command Handler
→ Domain Logic
→ Domain Events
→ Persistence
→ Read Model Update
→ Decision Engine (if applicable)

---

# Command Metadata

Every command defines:

- Command ID
- Command Name
- Aggregate Root
- Business Purpose
- Payload Schema
- Preconditions
- Validation Rules
- Authorization Rules
- Expected Domain Events
- Idempotency Policy
- Failure Modes
- Version
- Effective Date

---

# Naming Convention

Command ID:
CMD-<CATEGORY>-NNNN

Command Name:
Verb + Noun

Examples:
- CreatePortfolio
- RecordExpense
- PurchaseHome
- EvaluateScenario

---

# Cash Flow Commands

## CMD-CF-0001 RecordIncome

Aggregate:
CashFlow

Expected Events:
- SalaryReceived
- BonusReceived
- PassiveIncomeReceived

Validation:
- Amount > 0
- Currency supported
- Date required

---

## CMD-CF-0002 RecordExpense

Expected Events:
- ExpenseRecorded

Validation:
- Positive amount
- Expense category required

---

# Investment Commands

## CMD-INV-0001 CreatePortfolio

Expected Events:
- PortfolioCreated

---

## CMD-INV-0002 BuySecurity

Expected Events:
- SecurityPurchased

Validation:
- Security exists
- Quantity > 0
- Trade date valid

---

## CMD-INV-0003 SellSecurity

Expected Events:
- SecuritySold

---

## CMD-INV-0004 RebalancePortfolio

Expected Events:
- PortfolioRebalanced

---

# Loan Commands

## CMD-LOAN-0001 CreateLoan

Expected Events:
- LoanCreated

---

## CMD-LOAN-0002 RecordLoanPayment

Expected Events:
- LoanPaymentMade

---

## CMD-LOAN-0003 RefinanceLoan

Expected Events:
- LoanRefinanced

---

# Housing Commands

## CMD-HOME-0001 PurchaseHome

Expected Events:
- HomePurchased
- LoanCreated (optional)
- PolicyIssued (optional)

---

## CMD-HOME-0002 SellHome

Expected Events:
- HomeSold

---

## CMD-HOME-0003 UpdatePropertyValue

Expected Events:
- HomeValueUpdated

---

# Insurance Commands

## CMD-INS-0001 IssuePolicy

Expected Events:
- PolicyIssued

## CMD-INS-0002 PayPremium

Expected Events:
- PremiumPaid

---

# Retirement Commands

## CMD-RET-0001 UpdateRetirementPlan

Expected Events:
- RetirementPlanUpdated

---

# Decision Commands

## CMD-DEC-0001 EvaluateScenario

Expected Events:
- ScenarioEvaluated
- RecommendationGenerated

Preconditions:
- Scenario complete
- Assumptions available

---

## CMD-DEC-0002 AcceptRecommendation

Expected Events:
- DecisionAccepted

---

## CMD-DEC-0003 RejectRecommendation

Expected Events:
- DecisionRejected

---

# System Commands

## CMD-SYS-0001 ReplayScenario

Expected Events:
- ReplayCompleted

---

# Validation Principles

- Commands validate intent before state mutation.
- Invalid commands produce no domain events.
- Validation failures are deterministic and structured.

---

# Idempotency

Commands that may be retried shall include an Idempotency Key.

Repeated execution with the same key must not create duplicate events.

---

# Failure Modes

- Validation Failure
- Authorization Failure
- Business Rule Violation
- Version Conflict
- Duplicate Command
- Infrastructure Failure

---

# Governance

- Command IDs are immutable.
- Command payloads are backward compatible where possible.
- Breaking changes require a new command version.
- Every command must map to at least one aggregate root.
