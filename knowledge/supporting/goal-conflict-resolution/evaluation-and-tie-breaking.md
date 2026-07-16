# Goal Conflict Evaluation and Tie-Breaking

## Purpose
This split document isolates conflict severity, resolution evaluation, decision matrix behavior, deterministic tie-breaking, and validation rules from the parent Goal Conflict Resolution specification.

## Source
- Parent specification: [Goal Conflict Resolution](../goal-conflict-resolution.md)

## Evaluation Scope
Goal conflict evaluation compares impact on priority, deadline, funding, cash flow, dependency, risk, household preference, scenario result, decision outcome, and recommendation impact. Evaluation does not create a new Goal aggregate and does not mutate unrelated goal state.

## Severity
Severity is derived from business impact, reversibility, time sensitivity, funding pressure, dependency criticality, risk exposure, and household preference. Severity must be reproducible for identical inputs and source versions.

## Resolution Evaluation
Resolution candidates are evaluated by feasibility, policy compliance, projected goal impact, cash-flow impact, risk impact, dependency impact, scenario evidence, and audit completeness. Candidate evaluation preserves evidence and reason codes so downstream explainability can describe why one option outranked another.

## Decision Matrix
The decision matrix ranks candidates using priority preservation, target date preservation, funding feasibility, risk reduction, dependency unblock value, recommendation alignment, and user preference where authorized. Matrix output is advisory unless a command explicitly selects or accepts a resolution.

## Deterministic Tie-Breaking
Tie-breaking must be deterministic. Equal candidates are ordered by severity reduction, higher confidence, lower execution risk, earlier affected target date, stable goal identifier ordering, and creation time. The same input set must produce the same ranked order.

## Validation
Validation rejects empty related goal sets, missing household context, inconsistent conflict types, stale source versions, invalid scenario references, and candidates that cannot be traced to evidence. Validation errors must be auditable.
