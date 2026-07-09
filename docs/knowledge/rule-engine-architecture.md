# knowledge/rule-engine-architecture.md

# Atlas Rule Engine Architecture
Version: 1.0
Status: Canonical Specification

## 1. Purpose

This document specifies the execution architecture for the Atlas Rule Engine. The engine executes AREL rules deterministically, supports versioned rule sets, and integrates with the Decision Engine without embedding business logic in application code.

---

## 2. Design Goals

- Deterministic execution
- High performance
- Explainable outcomes
- Hot-swappable rule sets
- Version isolation
- Testability
- Horizontal scalability

---

## 3. High-Level Architecture

```
Rule Repository
      │
      ▼
 Rule Loader
      │
      ▼
 Rule Parser
      │
      ▼
 AST Builder
      │
      ▼
 Rule Validator
      │
      ▼
 Dependency Resolver
      │
      ▼
 Rule Compiler
      │
      ▼
 Runtime Cache
      │
      ▼
 Rule Runtime
      │
      ▼
 Execution Trace
      │
      ▼
 Explainability Layer
```

---

## 4. Components

### Rule Repository
Stores immutable AREL rule definitions grouped by version.

### Rule Loader
Loads the requested rule package by version.

### Rule Parser
Converts AREL text into tokens.

### AST Builder
Builds an abstract syntax tree (AST) from parsed rules.

### Rule Validator
Validates:
- Syntax
- Types
- References
- Duplicate IDs
- Circular dependencies

### Dependency Resolver
Resolves references to:
- KPIs
- Financial Ratios
- Risk Metrics
- Assumptions
- Formula Library

### Rule Compiler
Produces optimized executable rule plans.

### Runtime Cache
Caches compiled rule plans by version.

### Rule Runtime
Executes compiled rules against a scenario context.

### Execution Trace
Captures every evaluation step for audit and explainability.

---

## 5. Execution Context

Each execution context contains:

- DecisionId
- ScenarioId
- Household Snapshot
- KPI Values
- Ratio Values
- Risk Scores
- Assumption Version
- Formula Version
- Rule Version

The context is immutable during execution.

---

## 6. Execution Pipeline

1. Load rule package
2. Validate package
3. Compile if needed
4. Resolve execution context
5. Evaluate rules
6. Collect actions
7. Apply score changes
8. Persist trace
9. Publish explainability artifacts

---

## 7. Rule Actions

Supported runtime actions:

- Add Score
- Apply Penalty
- Reject Scenario
- Raise Warning
- Emit Reason Code
- Emit Audit Event
- Emit Explainability Evidence

---

## 8. Rule Ordering

Execution order:

1. Regulatory
2. Data Integrity
3. Hard Constraints
4. Financial Rules
5. Optimization Rules
6. Advisory Rules

Rules of equal priority may execute in parallel when no dependencies exist.

---

## 9. Caching Strategy

Cache Keys:

- Rule Version
- AREL Version
- Compiler Version

Compiled artifacts are invalidated only when version identifiers change.

---

## 10. Error Handling

Compile Errors:
- Invalid syntax
- Unknown identifiers
- Type mismatch

Runtime Errors:
- Missing context value
- Invalid assumption package
- Unsupported function

All errors generate structured diagnostics.

---

## 11. Explainability Integration

Every executed rule emits:

- RuleId
- Evaluation Result
- Inputs Used
- Output Produced
- Reason Codes
- Timestamp

These records feed the Explainability Framework.

---

## 12. Governance

- Rule packages are immutable.
- Runtime behavior is deterministic.
- Every release requires regression testing.
- Historical executions must be replayable using archived rule versions.
