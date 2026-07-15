# knowledge/decision-workflow.md

# Atlas Decision Workflow
Version: 1.0

## Purpose
Defines the end-to-end workflow executed by the Atlas Decision Engine. The workflow is deterministic, versioned and auditable, ensuring identical inputs always produce identical outputs under the same assumption set.

---

# High-Level Workflow

1. Receive Decision Request
2. Validate Input
3. Load Assumptions
4. Build Scenario Context
5. Execute Domain Engines
6. Calculate KPIs
7. Calculate Financial Ratios
8. Execute Risk Framework
9. Score Decision Matrix
10. Rank Scenarios
11. Generate Recommendations
12. Produce Explainability
13. Persist Decision Snapshot
14. Return Result

---

# Phase Details

## Phase 1 – Input Validation
Validate:
- Required entities
- Timeline
- Currency
- Asset completeness
- Liability completeness
- Goal consistency

Failure:
- Return validation errors.
- Do not execute downstream calculations.

---

## Phase 2 – Assumption Loading

Load:
- Financial assumptions
- Market assumptions
- Tax assumptions
- Mortgage assumptions
- Inflation assumptions

Every assumption must include:
- Version
- Effective date

---

## Phase 3 – Scenario Construction

Create immutable scenario snapshot containing:
- Household profile
- Assets
- Liabilities
- Cash flow
- Goals
- Insurance
- Portfolio
- Timeline

---

## Phase 4 – Domain Engine Execution

Execution order:

1. Cash Flow Engine
2. Loan Engine
3. Investment Engine
4. Home Upgrade Engine
5. Retirement Engine

Each engine returns:
- Metrics
- KPIs
- Warnings
- Assumptions used

---

## Phase 5 – KPI Calculation

Generate standardized KPIs using canonical definitions.

Output:
- KPI ID
- Value
- Unit
- Status

---

## Phase 6 – Financial Ratio Calculation

Generate all required financial ratios.

Examples:
- DTI
- LTV
- Savings Rate
- Emergency Fund Ratio
- Financial Independence Ratio

---

## Phase 7 – Risk Assessment

Evaluate:
- Liquidity
- Cash Flow
- Leverage
- Investment
- Inflation
- Interest Rate
- Retirement
- Insurance
- Concentration
- Behavioral risk

Produce:
- Risk scores
- Risk level
- Mitigation actions

---

## Phase 8 – Decision Matrix

Aggregate category scores.

Apply configured weights.

Produce:
- Total score
- Category scores
- Ranking

---

## Phase 9 – Recommendation Engine

Possible outcomes:
- Recommend
- Recommend with Conditions
- Neutral
- Not Recommended

Include:
- Benefits
- Trade-offs
- Constraints
- Next actions

---

## Phase 10 – Explainability Layer

For every recommendation provide:
- Inputs used
- Formula references
- Major positive factors
- Major negative factors
- Dominant assumptions
- Sensitivity summary

---

## Phase 11 – Persistence

Persist immutable snapshot including:
- Decision ID
- Scenario ID
- Formula version
- Assumption version
- Risk version
- Timestamp
- User inputs
- Engine outputs

---

## Phase 12 – Response

Return:
- Ranked scenarios
- Recommendation
- KPI summary
- Ratio summary
- Risk summary
- Explanation
- Audit identifiers

---

# Error Handling

Recoverable:
- Missing optional data
- Temporary market data unavailable

Non-recoverable:
- Invalid financial model
- Missing required assumptions
- Circular dependency
- Corrupted scenario snapshot

---

# Audit Requirements

Every execution shall record:
- Workflow version
- Engine versions
- Assumption versions
- Formula versions
- Execution duration
- Trace ID

Historical decision results must remain reproducible.

---

# Extension Points

Future workflow stages may include:
- Monte Carlo simulation
- AI scenario optimization
- Behavioral coaching
- Automatic strategy comparison
- Policy rule engine
