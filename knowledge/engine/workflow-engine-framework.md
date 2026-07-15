# Workflow Engine Framework

## Purpose

The workflow engine coordinates long-running decision and execution processes across the Atlas Enterprise knowledge model. It provides deterministic state transitions, retry handling, compensation behavior, timeout control, approval gates, and auditability for workflows that cannot be represented as a single synchronous command.

## Workflow States

| State | Meaning |
| --- | --- |
| Draft | Workflow definition or instance is being prepared and has not started. |
| Pending | Workflow is accepted and waiting for its start condition, schedule, dependency, or approval. |
| Running | Workflow is actively executing one or more steps. |
| Waiting | Workflow is paused for external input, manual approval, dependency completion, or scheduled delay. |
| Completed | Workflow finished successfully and produced its expected outcome. |
| Failed | Workflow stopped because a required step failed without a successful recovery path. |
| Cancelled | Workflow was intentionally stopped before completion. |

## Core Capabilities

- State machine: every workflow instance must move through explicit, auditable states.
- Retry: transient failures may be retried using bounded retry policies.
- Compensation: completed steps may define reversal or mitigation actions when later steps fail.
- Timeout: workflows and individual steps may define maximum waiting or execution duration.
- Manual approval: workflows may pause until an authorized actor approves or rejects continuation.
- Audit trail: state changes, commands, approvals, failures, and compensation actions must be recorded.

## Execution Rules

- Workflow state transitions must be deterministic and driven by commands, events, schedules, or approvals.
- A workflow instance must expose its current state, last transition reason, and next available actions.
- Failed steps must preserve enough context for diagnosis, retry, compensation, or manual resolution.
- Compensation must be idempotent where possible and must record whether it fully or partially succeeded.
- Manual approval steps must include approver identity, timestamp, decision, and decision rationale.

## Integration Points

- Commands initiate workflow instances or trigger explicit transitions.
- Domain events wake waiting workflows and carry state needed for continuation.
- Scheduler policies trigger delayed execution, timeout checks, and recurring workflow steps.
- Audit and reporting components consume workflow history for traceability and governance.
