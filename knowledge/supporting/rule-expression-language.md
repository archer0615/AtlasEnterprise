# knowledge/rule-expression-language.md

# Atlas Rule Expression Language (AREL)
Version: 1.0
Status: Canonical Specification

## 1. Purpose

AREL (Atlas Rule Expression Language) is the domain-specific language used to define Decision Engine rules without embedding business logic in application code.

Goals:
- Human-readable
- Machine-readable
- Deterministic
- Versioned
- Testable

---

## 2. Design Principles

- Declarative over imperative
- Immutable rule definitions
- No side effects
- Strong typing
- Explainable evaluation

---

## 3. Rule Structure

Every rule contains:

- RuleId
- Name
- Category
- Priority
- Condition
- Action
- Message
- Version

Example:

RULE DR-CF-001
WHEN KPI.MonthlyCashFlow > 0
THEN SCORE +5
MESSAGE "Positive monthly cash flow."

---

## 4. Supported Data Sources

- KPI.*
- Ratio.*
- Risk.*
- Goal.*
- Portfolio.*
- Loan.*
- CashFlow.*
- Assumption.*
- Scenario.*

---

## 5. Operators

Comparison:
- ==
- !=
- >
- >=
- <
- <=

Logical:
- AND
- OR
- NOT

Membership:
- IN
- NOT IN

Range:
- BETWEEN

Null:
- IS NULL
- IS NOT NULL

---

## 6. Functions

Numeric:
- MIN()
- MAX()
- ABS()
- ROUND()

Collection:
- COUNT()
- SUM()
- AVG()

Utility:
- EXISTS()
- ANY()
- ALL()

Domain:
- IPS_COMPLIANT()
- GOAL_COMPLETED()
- WITHIN_TOLERANCE()

---

## 7. Actions

Supported actions:

- SCORE +n
- SCORE -n
- REJECT
- WARNING
- ADVISORY
- ADD_REASON(code)
- ADD_TAG(tag)

Multiple actions may be executed.

---

## 8. Rule Evaluation

Order:

1. Validate syntax
2. Resolve references
3. Evaluate condition
4. Execute actions
5. Record evidence
6. Persist audit trail

---

## 9. Example Rules

RULE DR-DT-001
WHEN Ratio.DTI > Assumption.MaxDTI
THEN SCORE -5
ADD_REASON("DEBT001")

RULE DR-LQ-001
WHEN Ratio.EmergencyFundMonths < 6
THEN WARNING
ADD_REASON("LIQ001")

RULE DR-RK-001
WHEN Risk.OverallScore >= 80
THEN REJECT
ADD_REASON("RISK001")

---

## 10. Validation Rules

- Unknown identifiers are invalid.
- Circular references prohibited.
- Every rule requires a unique RuleId.
- Type mismatches are compile-time errors.

---

## 11. Versioning

Each execution records:

- AREL Version
- Rule Version
- Formula Version
- Assumption Version

---

## 12. Governance

- Rules are stored outside application code.
- Changes require regression testing.
- Deprecated rules remain available for historical replay.
