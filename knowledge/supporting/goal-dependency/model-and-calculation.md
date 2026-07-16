# Goal dependency model and calculation
# Domain Model

## Entity

GoalDependency is the entity that links one Goal to another Goal.

Required fields:

| Field | Required | Description |
|---|---:|---|
| GoalDependencyId | Yes | Stable dependency identifier. |
| HouseholdId | Yes | Owner Household. |
| ParentGoalId | Yes | Upstream or prerequisite Goal. |
| ChildGoalId | Yes | Downstream or dependent Goal. |
| DependencyType | Yes | Type from Dependency Types. |
| DependencyStatus | Yes | Status from Dependency Status. |
| DependencyDirection | Yes | Direction semantics. |
| DependencyWeight | Yes | Strength from 0 to 100. |
| DependencyReadinessScore | Yes | Readiness from 0 to 100. |
| ReasonCode | Yes | Cataloged explanation code. |
| Version | Yes | Entity version. |
| CreatedAt | Yes | Creation timestamp. |
| UpdatedAt | Yes | Last update timestamp. |

## Value Object

GoalDependencyEdge:

```text
GoalDependencyEdge =
ParentGoalId
+ ChildGoalId
+ DependencyType
+ DependencyWeight
+ DependencyStatus
```

DependencyScoreBreakdown:

```text
DependencyScoreBreakdown =
DependencyWeight
+ DependencyReadinessScore
+ DependencyImpact
+ DependencyRisk
+ DependencyConfidence
```


# Dependency Types

| Type | Definition |
|---|---|
| Hard Dependency | Child Goal cannot proceed until Parent Goal is satisfied. |
| Soft Dependency | Child Goal may proceed with warning, penalty, or lower readiness. |
| Financial Dependency | Child Goal depends on funding, savings, income, asset, or liability condition. |
| Execution Dependency | Child ExecutionPlan or action depends on parent completion. |
| Temporal Dependency | Child Goal depends on dates, windows, sequence, or lead time. |
| Scenario Dependency | Child Goal depends on Scenario output, simulation result, or risk timeline. |
| Recommendation Dependency | Recommendation requires another Goal or recommendation result first. |
| Decision Dependency | Decision Score or decision feasibility depends on Goal state. |
| Resource Dependency | Child Goal depends on shared scarce resources. |
| Budget Dependency | Child Goal depends on available Budget. |
| CashFlow Dependency | Child Goal depends on Monthly Net Cashflow or cashflow stability. |
| Risk Dependency | Child Goal depends on risk reduction or risk threshold. |
| Portfolio Dependency | Child Goal depends on Portfolio allocation, concentration, or liquidity. |
| Insurance Dependency | Child Goal depends on Insurance coverage sufficiency. |
| Loan Dependency | Child Goal depends on debt, Loan Interest, DTI, or repayment state. |
| Housing Dependency | Child Goal depends on Housing affordability, sale, purchase, or rental state. |
| Education Dependency | Child Goal depends on Education funding, date, or Family requirement. |
| Retirement Dependency | Child Goal depends on Retirement readiness or retirement capital. |
| Family Dependency | Child Goal depends on Family obligation, dependents, or Parent Support. |
| Tax Dependency | Child Goal depends on tax deadline, tax saving, or compliance. |
| Estate Dependency | Child Goal depends on Estate planning readiness. |
| Lifestyle Dependency | Child Goal depends on discretionary capacity after mandatory Goals. |


# Dependency Status

| Status | Meaning |
|---|---|
| Pending | Dependency exists but has not been evaluated for current snapshot. |
| Satisfied | Parent requirement is met. |
| Unsatisfied | Parent requirement is not met. |
| Blocked | Child Goal cannot proceed because dependency is unsatisfied. |
| Deferred | Child Goal is intentionally postponed due to dependency state. |
| Expired | Dependency is no longer valid because time window or source condition expired. |
| Cancelled | Dependency was cancelled and is excluded from active graph. |
| Completed | Dependency reached final successful state and is retained for audit. |


# Dependency Direction

| Direction | Meaning |
|---|---|
| Parent | Upstream Goal that must be considered first. |
| Child | Downstream Goal affected by parent state. |
| Prerequisite | Parent must be satisfied before child can proceed. |
| Downstream | Goals affected by a parent Goal. |
| Upstream | Goals that affect a child Goal. |
| Bidirectional | Two Goals influence each other and must be represented as two directed dependencies with explicit reason codes. |

Bidirectional dependencies are not stored as a single graph edge. They must be modeled as two directed edges and validated for cycle safety.


# Dependency Weight

Dependency Weight is a normalized 0 to 100 measure of how strongly the Parent Goal affects the Child Goal.

```text
Dependency Weight = clamp(
    0.30 * Constraint Strength
  + 0.25 * Financial Coupling
  + 0.20 * Execution Coupling
  + 0.15 * Risk Coupling
  + 0.10 * Time Coupling,
  0,
  100
)
```

Weight definitions:

1. Constraint Strength measures Hard, Soft, Advisory, Regulatory, and Data Integrity pressure.
2. Financial Coupling measures shared funding, Budget, CashFlow, Loan, Portfolio, or Insurance dependency.
3. Execution Coupling measures whether ExecutionPlan sequence is blocked.
4. Risk Coupling measures risk introduced when the child proceeds too early.
5. Time Coupling measures deadline, lead time, or sequencing dependency.


# Dependency Readiness

Dependency Readiness Score is a normalized 0 to 100 measure of whether the Child Goal can proceed.

```text
Dependency Readiness Score = clamp(
    0.35 * Parent Satisfaction
  + 0.20 * Resource Availability
  + 0.15 * Constraint Clearance
  + 0.15 * Scenario Readiness
  + 0.10 * Execution Readiness
  + 0.05 * Dependency Confidence,
  0,
  100
)
```

Readiness interpretation:

| Score | Meaning |
|---:|---|
| 90 to 100 | Ready; dependency should not block child. |
| 75 to 89 | Mostly ready; proceed with monitoring. |
| 60 to 74 | Conditionally ready; warning required. |
| 40 to 59 | Weak readiness; child should normally be deferred. |
| 0 to 39 | Not ready; child is blocked unless allowed override exists. |


# Dependency Priority

Dependency Priority determines how dependencies affect ranking and downstream scores.

Goal Priority:

```text
Goal Priority Adjustment = Dependency Weight * (100 - Dependency Readiness Score) / 100
```

Recommendation Score:

```text
Recommendation Dependency Penalty = clamp(
    BlockingDependencyCount * 8
  + CriticalUnsatisfiedDependencyCount * 15
  + AverageDependencyPriorityPenalty,
  0,
  40
)
```

Decision Score:

```text
Decision Dependency Adjustment = clamp(
    SatisfiedCriticalDependencies * 5
  - UnsatisfiedCriticalDependencies * 12
  - CircularDependencyPenalty,
  -40,
  20
)
```

Scenario Score:

```text
Scenario Dependency Score = clamp(
    0.60 * GoalAchievementRatioOfPrerequisites
  + 0.25 * ScenarioReadiness
  + 0.15 * DependencyConfidence,
  0,
  100
)
```

Execution Score:

```text
Execution Dependency Score = clamp(
    0.50 * CompletedPrerequisiteActions
  + 0.30 * DependencyReadinessScore
  + 0.20 * ExecutionPlanReadiness,
  0,
  100
)
```


# Dependency Formula

Dependency Score:

```text
Dependency Score = clamp(
    0.30 * Dependency Weight
  + 0.25 * Dependency Impact
  + 0.20 * Dependency Risk
  + 0.15 * (100 - Dependency Readiness Score)
  + 0.10 * Dependency Confidence,
  0,
  100
)
```

Dependency Impact:

```text
Dependency Impact = max(
    FinancialImpact,
    CashFlowImpact,
    RiskReductionImpact,
    GoalPriorityImpact,
    ExecutionImpact
)
```

Dependency Risk:

```text
Dependency Risk = max(
    ConstraintRisk,
    LiquidityRisk,
    DebtRisk,
    InsuranceGapRisk,
    RetirementRisk,
    HousingRisk,
    ScenarioRisk
)
```

Dependency Confidence:

```text
Dependency Confidence = clamp(
    0.40 * DataCompleteness
  + 0.25 * ScenarioFreshness
  + 0.20 * RuleVersionValidity
  + 0.15 * AuditTraceability,
  0,
  100
)
```

