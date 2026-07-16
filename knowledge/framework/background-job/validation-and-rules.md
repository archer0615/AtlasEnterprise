# Background Job Validation and Rules

## Purpose
This split document isolates Background Job Framework validation rules, business rules, security, audit, and performance expectations into an independently readable reference.

## Source
- Parent specification: [Background Job Framework](../background-job-framework.md)

## Validation Scope
Validation applies when a job is queued, started, retried, resumed, checkpointed, cancelled, failed, or completed. Each validation rule checks the job trigger, owner, schedule, input, output, service dependency, repository dependency, command, domain event, message contract, workflow, scheduler, automation, retry, timeout, checkpoint, resume, idempotency, lock, audit, security, and performance mapping.

Blocking validation failures use cataloged job errors. A job must not proceed when the catalog-approved job definition is missing, the owner is incomplete, the execution context is unauthorized, the checkpoint is stale, a duplicate execution is unsafe, or a dependency failure would corrupt job state.

## Business Rule Contract
Background job business rules enforce catalog-approved execution. Jobs must not perform hidden domain mutation, bypass application service boundaries, skip repository boundaries, or commit work outside the declared transaction boundary.

Each job run records:
- Job name, trigger, schedule, execution context, input hash, checkpoint key, retry count, lock key, CorrelationId, and CausationId.
- Service dependencies, command mapping, event mapping, message mapping, and audit context.
- Final result: success, retry, resume, cancellation, dead letter, quarantine, or failure with catalog error.

## Security Rules
Background jobs run under a system actor or authorized actor context. Authorization, permission checks, tenant isolation, Household isolation, and service boundary protection are required before job execution mutates state or invokes cataloged services.

Jobs must preserve sensitive data handling and must not embed secrets in payloads, logs, audit records, checkpoints, or failure records.

## Audit Rules
Every job records execution history, CorrelationId, CausationId, retry history, checkpoint history, actor or system actor, dependency result, cancellation result, and final outcome. Audit entries must distinguish retry, resume, cancellation, dead letter, quarantine, and completed states.

## Performance Rules
Background jobs measure duration, queue latency, throughput, retry count, failure rate, checkpoint lag, dependency latency, resource usage, and execution SLA. Long-running jobs checkpoint deterministic progress so recovery does not repeat unsafe work.

