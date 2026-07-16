# Goal Execution Workflow and Policies

## Purpose

This split document isolates Goal Execution phases, modes, policies, monitoring, state machine, commands, and domain events from the canonical `knowledge/framework/goal-execution-framework.md` parent.

## Covered Sections

- Execution Phases
- Execution Modes
- Execution Policies
- Execution Monitoring
- Validation Rules
- Business Rules
- State Machine
- Commands
- Domain Events

## Workflow Rules

- Execution phases must preserve preparation, validation, scheduling, execution, monitoring, verification, completion, rollback, retry, and archive evidence.
- Manual, automatic, scheduled, event-driven, workflow-driven, simulation, dry-run, batch, parallel, and incremental modes must enforce the same authorization and audit boundaries.
- Retry, timeout, cancellation, rollback, compensation, and approval policies must be explicit in execution events.
