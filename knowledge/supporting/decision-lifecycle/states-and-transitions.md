# Decision Lifecycle States and Transitions

## Purpose
This split document isolates decision lifecycle states, transition rules, triggers, invariants, and rollback behavior from the parent Decision Lifecycle specification.

## Source
- Parent specification: [Decision Lifecycle](../decision-lifecycle.md)

## States
Decision lifecycle states include draft, generated, presented, reviewed, accepted, rejected, deferred, executing, executed, measured, archived, restored, and deleted.

## Transitions
Transitions must preserve trigger evidence, previous state, next state, operator, timestamp, correlation identifier, and business reason.

