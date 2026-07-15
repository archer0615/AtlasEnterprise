# knowledge/decision-rule-catalog.md

# Atlas Decision Rule Catalog
Version: 1.0
Status: Canonical Specification

## Purpose

This catalog defines every business rule executed by the Atlas Decision Engine.
Each rule is uniquely identified, versioned, testable, and independently governed.

---

# Rule Metadata

Every rule shall include:

- Rule ID
- Rule Name
- Business Purpose
- Category
- Priority
- Inputs
- Preconditions
- Evaluation Logic
- Outputs
- Dependencies
- Related KPIs
- Related Financial Ratios
- Related Constraints
- Recommendation Impact
- Version
- Effective Date
- Owner

---

# Rule Categories

| Prefix | Category |
|---------|----------|
| DR-CF | Cash Flow |
| DR-LQ | Liquidity |
| DR-DT | Debt |
| DR-IV | Investment |
| DR-HM | Housing |
| DR-RT | Retirement |
| DR-RK | Risk |
| DR-GL | Goal Alignment |
| DR-SC | Scenario |
| DR-SY | System |

---

# Rule Priority

1. Regulatory
2. Data Integrity
3. Hard Constraints
4. Financial Rules
5. Optimization Rules
6. Advisory Rules

---

# Sample Rules

## DR-CF-001 Positive Cash Flow

Purpose:
Ensure sustainable monthly cash flow.

Inputs:
- Monthly Income
- Monthly Expenses

Condition:
Income > Expenses

Result:
Increase Cash Flow category score.

---

## DR-LQ-001 Emergency Fund

Purpose:
Maintain sufficient liquidity.

Condition:
Emergency Fund Ratio >= Policy Target

Failure:
Penalty applied.

---

## DR-DT-001 Debt Burden

Purpose:
Prevent excessive leverage.

Condition:
DTI <= Configured Threshold

Failure:
Penalty or Hard Constraint depending on policy.

---

## DR-IV-001 Allocation Drift

Purpose:
Ensure IPS compliance.

Condition:
Allocation Drift <= Allowed Tolerance

Result:
No penalty.

---

## DR-HM-001 Housing Affordability

Condition:
Housing Cost Ratio <= Policy Target

Recommendation:
Suitable for home purchase.

---

## DR-RT-001 Retirement Sustainability

Condition:
Retirement Funding Ratio >= Target

Recommendation:
Supports long-term retirement objectives.

---

## DR-RK-001 Overall Risk

Condition:
Overall Risk Score below configured limit.

Failure:
Recommendation downgraded.

---

## DR-GL-001 Goal Alignment

Purpose:
Measure consistency with Blueprint and IPS.

Condition:
Scenario supports declared life goals.

---

# Evaluation Lifecycle

Input
→ Preconditions
→ Rule Evaluation
→ Rule Result
→ Score Adjustment
→ Recommendation Update
→ Explanation Generation
→ Audit Record

---

# Rule Outcomes

Possible outcomes:

- Pass
- Fail
- Warning
- Skip
- Not Applicable

---

# Rule Dependencies

Rules may depend on:

- KPI Definitions
- Financial Ratios
- Risk Framework
- Constraint Rules
- Financial Assumptions
- Formula Library

Circular dependencies are prohibited.

---

# Versioning

Each execution records:

- Rule Version
- Assumption Version
- Formula Version
- Decision Workflow Version
- Scoring Model Version

---

# Testing Requirements

Every rule shall have:

- Positive test
- Negative test
- Boundary test
- Regression test
- Version compatibility test

---

# Governance

- Rule IDs are immutable.
- Rules are additive where possible.
- Deprecated rules remain available for historical replay.
- Every rule change requires documentation, approval and regression validation.
