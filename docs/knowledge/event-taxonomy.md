# knowledge/event-taxonomy.md

# Atlas Financial Event Taxonomy
Version: 1.0
Status: Canonical Specification

## 1. Purpose

This document defines the canonical event taxonomy used throughout Project Atlas.
Every business event emitted by the platform shall conform to this taxonomy to
ensure consistency across Timeline, Scenario, Decision Engine, Audit Trail,
Dashboard and future Event Sourcing capabilities.

---

## 2. Design Principles

- Events represent facts that have occurred.
- Events are immutable.
- Every event has a globally unique identifier.
- Events are timestamped.
- Events are versioned independently from business rules.
- Historical events are never modified.

---

## 3. Event Categories

| Prefix | Category | Description |
|---------|----------|-------------|
| LIFE | Life Event | Personal or family milestones |
| CF | Cash Flow | Income and expense changes |
| ASSET | Asset | Asset acquisition, disposal, valuation |
| LOAN | Loan | Mortgage and personal loan changes |
| INV | Investment | Portfolio transactions and valuation |
| INS | Insurance | Policy lifecycle |
| TAX | Tax | Tax obligations and refunds |
| HOME | Housing | Property purchase, sale, upgrade |
| RET | Retirement | Retirement planning milestones |
| DEC | Decision | Decision Engine outputs |
| RULE | Rule | Rule execution events |
| SYS | System | Internal platform events |

---

## 4. Event Metadata

Every event shall include:

- EventId
- EventType
- EventCategory
- AggregateId
- AggregateType
- OccurredAt
- RecordedAt
- EventVersion
- SourceEngine
- CorrelationId
- CausationId
- UserId (if applicable)

---

## 5. Core Financial Events

### Cash Flow
- SalaryReceived
- BonusReceived
- DividendReceived
- InterestReceived
- ExpenseRecorded
- PassiveIncomeReceived

### Assets
- AssetPurchased
- AssetDisposed
- AssetRevalued

### Loans
- LoanCreated
- LoanRefinanced
- LoanPaymentMade
- LoanClosed

### Investments
- PortfolioCreated
- SecurityPurchased
- SecuritySold
- DividendDistributed
- PortfolioRebalanced

### Housing
- HomePurchased
- HomeSold
- HomeValueUpdated
- HomeUpgradeStarted
- HomeUpgradeCompleted

### Insurance
- PolicyIssued
- PremiumPaid
- CoverageUpdated
- ClaimSubmitted
- ClaimPaid
- PolicyExpired

### Retirement
- RetirementPlanUpdated
- RetirementGoalReached
- WithdrawalStarted

### Tax
- TaxEstimated
- TaxFiled
- TaxRefundReceived

### Decision
- ScenarioEvaluated
- RecommendationGenerated
- DecisionAccepted
- DecisionRejected

---

## 6. Event Lifecycle

Business Action
→ Domain Event
→ Validation
→ Persistence
→ Timeline
→ Decision Engine
→ Explainability
→ Dashboard

---

## 7. Correlation

Related events shall share a CorrelationId.

Example:
- HomePurchased
- LoanCreated
- InsuranceIssued

These belong to one purchasing journey.

---

## 8. Event Replay

Replay must reconstruct historical state using:

- Event sequence
- Event version
- Assumption version
- Formula version

Replay must never mutate original events.

---

## 9. Naming Convention

<EventCategory><PastTenseVerb>

Examples:
- SalaryReceived
- PortfolioRebalanced
- RecommendationGenerated

Avoid ambiguous names.

---

## 10. Governance

- Event names are immutable.
- Breaking changes require a new event version.
- Deprecated events remain replayable.
- Consumers should tolerate unknown future event types.
