# Goal Conflict Lifecycle and State

## Purpose
This split document isolates Goal Conflict lifecycle, status, state machine, deterministic transition rules, and resolution state from the parent Goal Conflict Resolution specification.

## Source
- Parent specification: [Goal Conflict Resolution](../goal-conflict-resolution.md)

## Conflict Status and Lifecycle
Goal Conflict lifecycle covers detection, reevaluation, proposal, selection, acceptance, rejection, override, deferral, escalation, resolution, reopen, archive, and restore behavior.

## State Machine
The state machine preserves GoalPlan-owned conflict state and supports auditable transitions across open, proposed, selected, accepted, rejected, overridden, deferred, escalated, resolved, reopened, archived, and restored states.

## Resolution State
Resolution state records selected strategy, resolution candidate, decision evidence, operator, reason, prior state, next state, timestamp, and correlation identifier.

## Deterministic Transition Rules
Transitions must remain deterministic, idempotent, permission-aware, tenant-safe, and compatible with historical replay and audit compatibility.
