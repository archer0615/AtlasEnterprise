# Automation Workflow

Document Path: knowledge/workflow/automation-workflow.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Automation
Bounded Context: Automation
Owner: Project Atlas
Source of Truth: Atlas Automation Workflow Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the end-to-end workflow for automation trigger evaluation, scheduling, execution, recovery, approval, and audit.

## Scope

- Scheduled, event-driven, and manual automations.
- Trigger evaluation and concurrency control.
- Approval-gated execution.
- Retry, recovery, rollback, and completion.
- Audit, observability, and generated recommendations.

## Inputs

- Automation definition and trigger policy.
- Scheduler event, domain event, or manual command.
- Permission, approval, feature flag, and tenant context.
- Target service contract and idempotency key.
- Runtime state, retry history, and recovery policy.

## Workflow Stages

1. Validate automation definition, owner, trigger type, and target scope.
2. Evaluate feature flag, permission, tenant boundary, and approval requirement.
3. Acquire idempotency key and concurrency lock.
4. Build execution context with versioned assumptions and target contract.
5. Execute task or enqueue work according to scheduling policy.
6. Capture output, warnings, errors, and downstream events.
7. Retry recoverable failures within configured limits.
8. Route non-recoverable failures to recovery, approval, or manual review.
9. Persist execution record, audit events, and observability metrics.
10. Mark completion, rollback, suppression, or escalation state.

## Outputs

- Automation execution state.
- Task result, generated events, and recommendations.
- Retry and recovery record.
- Approval and exception audit trail.
- Observability metrics and trace identifiers.

## Governance And Testing

- Automations must be idempotent and tenant-isolated.
- Approval-gated operations must not execute before approval is recorded.
- Retry policy must distinguish recoverable and non-recoverable failures.
- Tests must cover trigger suppression, duplicate execution, permission denial, retry success, retry exhaustion, rollback, and audit persistence.

## Related Specifications

- `knowledge/framework/automation-framework.md`
- `knowledge/framework/scheduler-framework.md`
- `knowledge/framework/background-job-framework.md`
- `knowledge/framework/automations/decision-review-automation.md`
- `knowledge/framework/automations/recommendation-refresh-automation.md`
- `knowledge/security/permission-framework.md`
