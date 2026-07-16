# Background Job Operational Controls

## Purpose
This split document preserves the background job validation, business rule, security, audit, and performance controls from the parent Background Job Framework.

## Source
- Parent specification: [Background Job Framework](../background-job-framework.md)
- Related split: [Background job matrices and controls](matrices-and-controls.md)

# Validation Rules

1. Every background job must define trigger, schedule, frequency, input, output, execution owner, application service, domain service, repository, command, domain event, message contract, workflow, scheduler, automation, dependency, transaction, consistency, retry, timeout, checkpoint, resume, cancellation, idempotency, lock, audit, logging, metrics, security, and performance mapping.
2. Background job mappings must remain complete and non-conflicting across workflow, scheduler, automation, service, repository, command, event, and message boundaries.
3. Background jobs must not bypass repository, service, security, or transaction boundaries.
4. Retries must be bounded, auditable, and safe for idempotent execution.
5. Checkpoints must be persisted after each successful deterministic unit and must support safe resume.
6. Duplicate execution, stale checkpoint, missing owner, unauthorized context, poison payload, timeout, and dependency failure must be blocked or routed to cataloged failure handling.

# Business Rules

Background job business rules JOB-BR-001 through JOB-BR-100 apply to job queue, execution, retry, checkpoint, resume, cancellation, failure recovery, scheduler run, automation run, workflow step, message processing, import, export, projection, notification, cleanup, and backup.

Each rule uses the same canonical control shape:

| Rule Area | Canonical Requirement |
|---|---|
| Input | Job name, trigger, schedule, execution context, input hash, checkpoint key, retry count, lock key, CorrelationId, CausationId, service dependencies, command, event, message, and audit context |
| Logic | Enforce catalog-approved job, no hidden domain mutation, service boundary, repository boundary, transaction boundary, idempotency, concurrency lock, retry limit, timeout, checkpoint integrity, resume safety, cancellation safety, failure handling, security, observability, performance, and audit consistency |
| Result | Job succeeds, retries, resumes, cancels, dead-letters, quarantines, or fails with catalog error |
| Exception | Duplicate execution, stale checkpoint, missing owner, unauthorized context, poison payload, timeout, or dependency failure is blocked |
| Audit | Job execution history is recorded |

# Security

- Authorization is enforced before job execution, repository access, service invocation, message processing, projection update, notification dispatch, import, export, cleanup, or backup.
- Permission is enforced before job execution, repository access, service invocation, message processing, projection update, notification dispatch, import, export, cleanup, or backup.
- Tenant Isolation is enforced before job execution, repository access, service invocation, message processing, projection update, notification dispatch, import, export, cleanup, or backup.
- Household Isolation is enforced before job execution, repository access, service invocation, message processing, projection update, notification dispatch, import, export, cleanup, or backup.

# Audit

- Execution History is recorded with job name, attempt, checkpoint, input hash, output hash, dependency result, duration, and error code.
- CorrelationId is recorded with job name, attempt, checkpoint, input hash, output hash, dependency result, duration, and error code.
- CausationId is recorded with job name, attempt, checkpoint, input hash, output hash, dependency result, duration, and error code.
- Retry History is recorded with job name, attempt, checkpoint, input hash, output hash, dependency result, duration, and error code.

# Performance

- Execution SLA is measured per job with queue latency, execution duration, batch size, retry count, lock wait, checkpoint lag, and dependency timing.
- Throughput is measured per job with queue latency, execution duration, batch size, retry count, lock wait, checkpoint lag, and dependency timing.
- Parallel Execution is measured per job with queue latency, execution duration, batch size, retry count, lock wait, checkpoint lag, and dependency timing.
- Resource Usage is measured per job with queue latency, execution duration, batch size, retry count, lock wait, checkpoint lag, and dependency timing.

