# Automation Recovery and Approvals

Document Path: knowledge/framework/automation/recovery-and-approvals.md

Parent Specification: knowledge/framework/automation-framework.md

# Purpose

This split document summarizes the Automation Framework sections for retry, compensation, escalation, approval, and failure recovery. It keeps operational recovery behavior readable without changing the parent framework.

# Retry Strategy

- Automation retry must be deterministic for the same trigger, input, rule version, and configuration.
- Retry execution must preserve catalog boundaries for Aggregate, Command, Repository, Service, Workflow, Scheduler, and Background Job.
- Retry behavior must remain visible, auditable, and recoverable.
- Retry-safe automation must be authorized and must not bypass service or security boundaries.

# Compensation Strategy

- Automation compensation is used when an action cannot complete successfully and requires a catalog-approved recovery path.
- Compensation must use approved workflows, commands, services, events, message contracts, projections, notifications, or integrations.
- Compensation must record audit history and keep failure state visible.

# Escalation Strategy

- Failed automation can be escalated according to catalog rules.
- High-impact automation requires an approval strategy before execution or recovery.
- Escalation must preserve audit, security, and performance requirements.

# Approval Strategy

- High-impact automation requires approval strategy.
- Automation can be suspended, resumed, cancelled, or escalated through catalog rules.
- Approval decisions must be auditable and aligned with automation conditions and actions.

# Failure Recovery Strategy

- Failed automation is visible, auditable, and recoverable.
- Recovery must not bypass Aggregate, Command, Repository, Service, Security, Workflow, Scheduler, or Background Job boundaries.
- Recovery paths must keep trigger, condition, action, retry, timeout, escalation, audit, and performance targets intact.
