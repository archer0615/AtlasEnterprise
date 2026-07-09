# knowledge/domain-event-catalog.md

# Atlas Domain Event Catalog
Version: 1.0
Status: Canonical Specification

## Purpose

This catalog defines the canonical domain events used by Project Atlas.
Each event represents an immutable business fact and is identified by a stable Event ID.

---

# Event Metadata Standard

Every event defines:

- Event ID
- Event Name
- Aggregate Root
- Category
- Business Meaning
- Trigger
- Required Payload
- Producer
- Consumers
- Ordering Requirements
- Idempotency Rule
- Related Commands
- Related Decision Rules
- Version
- Effective Date

---

# Naming Convention

Event ID Format:

EVT-<CATEGORY>-NNNN

Examples:

- EVT-CF-0001
- EVT-INV-0005
- EVT-HOME-0010

Event Name Format:

<Category><PastTenseVerb>

Example:

SalaryReceived

---

# Cash Flow Events

## EVT-CF-0001 SalaryReceived

Aggregate:
CashFlow

Meaning:
Salary has been received.

Producer:
Cash Flow Engine

Consumers:
Timeline
Decision Engine
Dashboard

Required Payload:
- Amount
- Currency
- Date
- Employer

---

## EVT-CF-0002 BonusReceived

Trigger:
Bonus payment completed.

---

## EVT-CF-0003 ExpenseRecorded

Trigger:
Expense posted.

---

## EVT-CF-0004 PassiveIncomeReceived

Trigger:
Passive income recognized.

---

# Investment Events

## EVT-INV-0001 PortfolioCreated

Aggregate:
Portfolio

Trigger:
Portfolio initialized.

---

## EVT-INV-0002 SecurityPurchased

Payload:
- SecurityId
- Quantity
- Price
- TradeDate

---

## EVT-INV-0003 SecuritySold

---

## EVT-INV-0004 PortfolioRebalanced

---

## EVT-INV-0005 DividendDistributed

---

# Loan Events

## EVT-LOAN-0001 LoanCreated

---

## EVT-LOAN-0002 LoanPaymentMade

---

## EVT-LOAN-0003 LoanRefinanced

---

## EVT-LOAN-0004 LoanClosed

---

# Housing Events

## EVT-HOME-0001 HomePurchased

---

## EVT-HOME-0002 HomeSold

---

## EVT-HOME-0003 HomeValueUpdated

---

## EVT-HOME-0004 HomeUpgradeStarted

---

## EVT-HOME-0005 HomeUpgradeCompleted

---

# Insurance Events

## EVT-INS-0001 PolicyIssued

## EVT-INS-0002 PremiumPaid

## EVT-INS-0003 CoverageUpdated

## EVT-INS-0004 ClaimSubmitted

## EVT-INS-0005 ClaimPaid

---

# Retirement Events

## EVT-RET-0001 RetirementPlanUpdated

## EVT-RET-0002 RetirementGoalReached

## EVT-RET-0003 RetirementWithdrawalStarted

---

# Decision Events

## EVT-DEC-0001 ScenarioEvaluated

## EVT-DEC-0002 RecommendationGenerated

## EVT-DEC-0003 DecisionAccepted

## EVT-DEC-0004 DecisionRejected

---

# Rule Events

## EVT-RULE-0001 RuleEvaluated

## EVT-RULE-0002 HardConstraintTriggered

## EVT-RULE-0003 ScoreAdjusted

---

# System Events

## EVT-SYS-0001 SnapshotCreated

## EVT-SYS-0002 AssumptionVersionLoaded

## EVT-SYS-0003 FormulaVersionLoaded

## EVT-SYS-0004 ReplayCompleted

---

# Ordering Rules

Typical purchase workflow:

1. HomePurchased
2. LoanCreated
3. PolicyIssued
4. ScenarioEvaluated
5. RecommendationGenerated

Events sharing a CorrelationId represent the same business journey.

---

# Idempotency

Consumers shall ignore duplicate EventIds.

Publishers shall never reuse EventIds.

---

# Governance

- Event IDs are immutable.
- Payload additions must be backward compatible.
- Breaking changes require a new Event Version.
- Historical events remain replayable indefinitely.
