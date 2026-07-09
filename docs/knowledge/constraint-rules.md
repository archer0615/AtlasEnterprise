# knowledge/constraint-rules.md

# Atlas Constraint Rules
Version: 1.0

## Purpose
Defines mandatory constraints enforced by the Decision Engine. Constraint rules are evaluated independently from scoring rules. A scenario may receive a high numerical score yet still be rejected if a hard constraint is violated.

---

# Rule Categories

- Financial Constraint
- Cash Flow Constraint
- Loan Constraint
- Investment Constraint
- Housing Constraint
- Retirement Constraint
- Insurance Constraint
- Regulatory Constraint
- Data Integrity Constraint
- System Constraint

---

# Rule Severity

| Severity | Effect |
|----------|--------|
| Hard | Immediate rejection |
| Soft | Score penalty |
| Advisory | Recommendation only |

---

# Rule Metadata

Every rule includes:

- Rule ID
- Name
- Description
- Severity
- Trigger Condition
- Evaluation Logic
- Resolution Guidance
- Version
- Effective Date

---

# Hard Constraints

## HC-001 Negative Sustainable Cash Flow
Trigger:
Persistent negative monthly cash flow beyond configured tolerance.

Action:
Reject scenario.

---

## HC-002 Missing Mandatory Financial Data

Examples:
- Income
- Debt balance
- Required assumptions

Action:
Reject calculation.

---

## HC-003 Invalid Assumption Version

Trigger:
Unsupported or missing assumption package.

Action:
Reject execution.

---

## HC-004 Circular Dependency

Trigger:
Scenario contains recursive financial dependency.

Action:
Terminate calculation.

---

## HC-005 Regulatory Restriction

Trigger:
Scenario violates applicable legal or regulatory rules.

Action:
Reject recommendation.

---

# Soft Constraints

## SC-001 High Debt-to-Income

Condition:
DTI exceeds policy threshold.

Default:
Penalty.

---

## SC-002 Insufficient Emergency Fund

Condition:
Emergency fund below policy target.

Default:
Penalty.

---

## SC-003 Low Retirement Funding

Condition:
Funding ratio below target.

Default:
Penalty.

---

## SC-004 Portfolio Concentration

Condition:
Allocation exceeds IPS tolerance.

Default:
Penalty.

---

## SC-005 Housing Affordability

Condition:
Housing cost ratio exceeds policy.

Default:
Penalty.

---

# Advisory Constraints

Examples:

- Increase insurance coverage.
- Improve diversification.
- Build emergency fund.
- Delay home upgrade.
- Increase savings rate.

These never block execution.

---

# Evaluation Order

1. Data Integrity
2. Regulatory
3. Hard Constraints
4. Soft Constraints
5. Advisory Rules
6. Score Calculation
7. Recommendation Generation

Hard constraints stop downstream decision scoring unless explicitly configured otherwise.

---

# Conflict Resolution

Priority:

1. Regulatory
2. Data Integrity
3. Hard Constraints
4. Soft Constraints
5. Advisory

Higher-priority rules always prevail.

---

# Output Model

Return:

- Rule ID
- Severity
- Triggered (Yes/No)
- Message
- Suggested Resolution
- Related KPI
- Related Ratio
- Timestamp

---

# Governance

- Rule IDs are immutable.
- Rule logic is version controlled.
- Historical evaluations remain reproducible.
- Rule changes require documentation and regression testing.
