# Goal Workflow

Document Path: knowledge/workflow/goal-workflow.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Goal Management
Bounded Context: Goal
Owner: Project Atlas
Source of Truth: Atlas Goal Workflow Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the end-to-end workflow for creating, prioritizing, funding, monitoring, reviewing, and retiring financial goals.

## Scope

- Goal creation and validation.
- Goal priority and dependency assessment.
- Funding plan generation.
- Progress tracking and variance detection.
- Review, adjustment, completion, cancellation, and archival.

## Inputs

- Household profile.
- Goal definition, target amount, deadline, priority, and owner.
- Asset, liability, cash-flow, and portfolio snapshots.
- Assumption, inflation, return, tax, and risk versions.
- Existing goals and dependency graph.

## Workflow Stages

1. Validate goal identity, ownership, target, deadline, and currency.
2. Classify goal type, urgency, flexibility, and dependency constraints.
3. Evaluate affordability, funding gap, risk capacity, and conflict with existing goals.
4. Generate contribution schedule and funding source options.
5. Score priority and resolve conflicts against other goals.
6. Persist the approved goal plan and versioned assumptions.
7. Track progress, milestone variance, and funding drift.
8. Trigger review when deadline, contribution, assumption, or household state changes.
9. Produce next actions, recommendations, and audit events.
10. Complete, cancel, defer, or archive the goal with outcome evidence.

## Outputs

- Goal status and lifecycle state.
- Funding plan and contribution schedule.
- Progress percentage, milestone status, and variance reason.
- Conflict and dependency resolution result.
- Recommended next actions.
- Audit trail with assumption and formula versions.

## Governance And Testing

- Every state transition must be deterministic and auditable.
- Funding calculations must reference versioned assumptions and formulas.
- Conflict resolution must record priority inputs and tie-breakers.
- Tests must cover creation, funding, missed milestones, priority conflicts, completion, cancellation, and assumption changes.

## Related Specifications

- `knowledge/entity/Goal.md`
- `knowledge/entity/goal/identity-and-ownership.md`
- `knowledge/entity/goal/funding-progress-and-review.md`
- `knowledge/supporting/goal-lifecycle.md`
- `knowledge/supporting/goal-progress-tracking.md`
- `knowledge/framework/goal-funding-framework.md`
- `knowledge/framework/goal-review-framework.md`
