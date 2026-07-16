# Goal Lifecycle States and Transitions

## Purpose
This split document isolates Goal lifecycle stages, legal transitions, illegal transitions, triggers, preconditions, postconditions, invariants, rollback, and recovery strategy from the parent Goal Lifecycle Management specification.

## Source
- Parent specification: [Goal Lifecycle Management](../goal-lifecycle-management.md)

## Stages
Goal lifecycle stages include Draft, Planning, Ready, Active, Paused, Blocked, Waiting, Reviewing, Completed, Succeeded, Failed, Cancelled, Archived, Deleted, Restored, Expired, Merged, Split, Template, Snapshot, and Historical.

## Transition Rules
Transitions must preserve source state, target state, trigger, validation result, operator, timestamp, and audit reference.

