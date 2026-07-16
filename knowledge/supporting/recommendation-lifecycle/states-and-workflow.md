# Recommendation Lifecycle States and Workflow

## Purpose
This split document isolates recommendation lifecycle state semantics, transition matrix, validation categories, and workflow stages from the parent Recommendation Lifecycle specification.

## Source
- Parent specification: [Recommendation Lifecycle](../recommendation-lifecycle.md)

## Recommendation States
Recommendation states include Draft, Generated, Pending Review, Ranked, Prioritized, Waiting Approval, Approved, Rejected, Published, Accepted, Declined, Implemented, Expired, Archived, Deleted, Restored, Historical, and Template.

## Transition Matrix
Legal transitions must preserve lifecycle invariant, trigger evidence, pre-condition, post-condition, rollback strategy, and recovery strategy.

## Recommendation Validation
Validation covers business, financial, goal, scenario, portfolio, cashflow, priority, dependency, permission, and consistency checks.

## Recommendation Workflow
Workflow stages include generation, evaluation, ranking, prioritization, approval, publication, acceptance, implementation, verification, and archive.

