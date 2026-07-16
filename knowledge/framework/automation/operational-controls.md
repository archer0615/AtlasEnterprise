# Automation Operational Controls

## Purpose
This split document preserves automation validation, business rule, security, audit, and performance controls from the parent Automation Framework.

## Source
- Parent specification: [Automation Framework](../automation-framework.md)
- Related split: [Automation matrices and controls](matrices-and-controls.md)

# Validation Rules

1. Every automation must define trigger, source, condition, rule engine, decision engine, input, output, execution context, application service, domain service, workflow, scheduler, background job, command, domain event, repository, message contract, notification, projection, integration, retry, timeout, compensation, escalation, approval, concurrency, idempotency, checkpoint, resume, audit, logging, metrics, security, and performance mapping.
2. Automation mappings must remain complete and non-conflicting across trigger, condition, action, workflow, scheduler, job, command, event, message, notification, projection, integration, service, and repository boundaries.
3. Automation must not bypass Aggregate, Command, Repository, Service, Security, Workflow, Scheduler, or Background Job boundaries.
4. Automation must remain deterministic for the same trigger, input, rule version, and configuration.
5. High-impact automation must have approval policy.
6. Invalid trigger, invalid condition, unauthorized action, missing approval, duplicate execution, stale checkpoint, timeout, and dependency failure must be blocked or routed to cataloged recovery handling.

# Business Rules

Automation business rules AUTO-BR-001 through AUTO-BR-100 apply to automation definition, trigger detection, condition evaluation, action execution, approval, retry, timeout, compensation, escalation, cancellation, suspension, resume, completion, failure, workflow step, scheduler fire, background job execution, command dispatch, event consumption, message consumption, notification, projection, and integration.

Each rule uses the same canonical control shape:

| Rule Area | Canonical Requirement |
|---|---|
| Input | Automation name, trigger, source, condition, rule version, decision context, action, execution context, HouseholdId, TenantId, CorrelationId, CausationId, idempotency key, checkpoint, retry count, approval state, and audit context |
| Logic | Enforce catalog-approved automation, no hidden business concept, trigger mapping, condition mapping, action mapping, service boundary, command boundary, event boundary, message boundary, integration boundary, approval policy, retry policy, timeout policy, compensation policy, escalation policy, concurrency policy, idempotency, checkpoint, resume safety, authorization, tenant isolation, Household isolation, logging, metrics, audit, and performance consistency |
| Result | Automation executes, waits for approval, retries, compensates, escalates, suspends, resumes, cancels, completes, or fails with catalog error |
| Exception | Invalid trigger, invalid condition, unauthorized action, missing approval, duplicate execution, stale checkpoint, timeout, or dependency failure is blocked |
| Audit | Automation history is recorded |

# Security

- Authorization is enforced before automation trigger processing, condition evaluation, action execution, approval, notification, projection, integration, scheduler, job, command, event, or message processing.
- Permission is enforced before automation trigger processing, condition evaluation, action execution, approval, notification, projection, integration, scheduler, job, command, event, or message processing.
- Tenant Isolation is enforced before automation trigger processing, condition evaluation, action execution, approval, notification, projection, integration, scheduler, job, command, event, or message processing.
- Household Isolation is enforced before automation trigger processing, condition evaluation, action execution, approval, notification, projection, integration, scheduler, job, command, event, or message processing.
- Automation Boundary is enforced before automation trigger processing, condition evaluation, action execution, approval, notification, projection, integration, scheduler, job, command, event, or message processing.

# Audit

- Execution History is recorded with automation name, trigger, condition, action, approval state, checkpoint, retry count, escalation state, dependency result, and error code.
- CorrelationId is recorded with automation name, trigger, condition, action, approval state, checkpoint, retry count, escalation state, dependency result, and error code.
- CausationId is recorded with automation name, trigger, condition, action, approval state, checkpoint, retry count, escalation state, dependency result, and error code.
- Automation History is recorded with automation name, trigger, condition, action, approval state, checkpoint, retry count, escalation state, dependency result, and error code.

# Performance

- Execution SLA is measured per automation with queue delay, execution duration, approval wait, retry count, escalation count, dependency timing, and failure rate.
- Latency is measured per automation with queue delay, execution duration, approval wait, retry count, escalation count, dependency timing, and failure rate.
- Throughput is measured per automation with queue delay, execution duration, approval wait, retry count, escalation count, dependency timing, and failure rate.
- Parallel Execution is measured per automation with queue delay, execution duration, approval wait, retry count, escalation count, dependency timing, and failure rate.
- Queue Depth is measured per automation with queue delay, execution duration, approval wait, retry count, escalation count, dependency timing, and failure rate.

