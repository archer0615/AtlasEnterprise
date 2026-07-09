
# Project Atlas Enterprise
# docs/08A-CashFlowEngine-Architecture.md

Version: 1.0
Status: Draft
Owner: Financial Engine Team

# 1. Purpose

This document defines the architecture of the Cash Flow Engine used by Project Atlas.
The engine is responsible for producing deterministic cash-flow projections that become
the financial foundation for all higher-level decision engines.

The Cash Flow Engine is the source of truth for:
- Current cash flow
- Future cash flow
- Liquidity analysis
- Cash reserve analysis
- Funding feasibility

---

# 2. Scope

## In Scope

- Income aggregation
- Expense aggregation
- Monthly cash-flow projection
- Annual cash-flow projection
- Life-event adjustments
- Inflation adjustments
- Cash reserve calculation
- Free cash-flow calculation
- Forecast snapshots
- Scenario comparison support

## Out of Scope

- Portfolio optimization
- Mortgage optimization
- Retirement withdrawal optimization
- Tax optimization
- Investment recommendations

Those are handled by dedicated engines.

---

# 3. Architecture Position

Life Goals
    ↓
Blueprint / IPS
    ↓
Cash Flow Engine
    ↓
Loan Engine
Investment Engine
Retirement Engine
Home Upgrade Engine
    ↓
Decision Engine

Cash Flow Engine executes before every major financial decision.

---

# 4. Responsibilities

The engine SHALL:

- Build the user's baseline cash flow
- Project future monthly balances
- Detect negative cash-flow periods
- Evaluate liquidity
- Provide normalized outputs to downstream engines

The engine SHALL NOT modify business data.

---

# 5. Inputs

Required inputs:

- User profile
- Household members
- Income sources
- Expense records
- Loan payments
- Insurance premiums
- Asset income
- Scenario assumptions
- Inflation assumptions
- Planning horizon

---

# 6. Outputs

Primary outputs:

- Monthly cash flow
- Annual cash flow
- Free cash flow
- Cash reserve status
- Liquidity status
- Forecast timeline
- Engine warnings
- Cash-flow health score

Outputs are immutable once a scenario completes.

---

# 7. Processing Pipeline

1. Load financial profile
2. Validate input data
3. Normalize recurring cash flows
4. Apply one-time events
5. Apply inflation assumptions
6. Calculate monthly projections
7. Aggregate annual projections
8. Evaluate business rules
9. Produce engine output
10. Publish domain events

---

# 8. Domain Events

Examples:

- CashFlowForecastGenerated
- NegativeCashFlowDetected
- EmergencyReserveBelowThreshold
- ScenarioCashFlowCompleted

---

# 9. Business Rules

BR-CF-001:
Every income record shall have an effective date.

BR-CF-002:
Negative recurring income is invalid.

BR-CF-003:
Expenses may be recurring or one-time.

BR-CF-004:
Historical records are immutable.

BR-CF-005:
Forecast calculations are deterministic.

BR-CF-006:
Scenario assumptions override baseline values only within the scenario.

---

# 10. Dependencies

Consumes:

- Financial Profile
- Property
- Loan
- Insurance
- Scenario

Provides data to:

- Investment Engine
- Loan Engine
- Retirement Engine
- Home Upgrade Engine
- Decision Engine

---

# 11. Quality Attributes

- Deterministic
- Explainable
- Auditable
- Versioned
- Testable
- Stateless execution
- High precision

---

# 12. Error Handling

Validation failures stop execution.

Warnings include:

- Missing income
- Missing expense categories
- Insufficient reserve
- Unrealistic assumptions

Errors are never silently ignored.

---

# 13. Traceability

Related specifications:

- 01-Blueprint.md
- 02-IPS.md
- 03-Formula.md
- 04-DomainModel.md
- 05-DatabaseDesign.md
- 07-API.md

Future companion documents:

- 08B-CashFlowEngine-Formula.md
- 08C-CashFlowEngine-DecisionRules.md
- 08D-CashFlowEngine-API.md
- 08E-CashFlowEngine-Testing.md

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial Cash Flow Engine architecture specification|
