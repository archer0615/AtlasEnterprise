# Background Job Maintenance Jobs

Document Path: knowledge/framework/background-job/maintenance-jobs.md

Parent Specification: knowledge/framework/background-job-framework.md

# Purpose

This split document isolates maintenance-oriented background jobs from the parent Background Job Framework. It covers CleanupJob and BackupJob because both run platform administration work with checkpointing, audit, retry, security, and recovery controls.

# CleanupJob

| Field | Value |
|---|---|
| Job Name | CleanupJob |
| Display Name | CleanupJob |
| Category | Cleanup Job |
| Purpose | Clean expired temporary operational records. |
| Business Meaning | CleanupJob performs asynchronous Atlas work without redefining domain concepts. |
| Trigger | Maintenance schedule |
| Schedule | Scheduled |
| Frequency | Daily |
| Input | CleanupInput |
| Output | CleanupResult |
| Execution Context | System actor or authorized actor context with CorrelationId and CausationId. |
| Execution Owner | AdministrationApplicationService |
| Application Service | AdministrationApplicationService |
| Domain Service | ExplainabilityService |
| Repositories | AuditRepository |
| Commands | Cleanup operation |
| Domain Events | Audit and operational events |
| Message Contract | CleanupMessage |
| Workflow | Administration workflow |
| Scheduler | Scheduler Framework |
| Automation | Maintenance automation |
| Dependencies | AdministrationApplicationService; ExplainabilityService; AuditRepository; CleanupMessage |

# BackupJob

| Field | Value |
|---|---|
| Job Name | BackupJob |
| Display Name | BackupJob |
| Category | Backup Job |
| Purpose | Create operational backup artifacts. |
| Business Meaning | BackupJob performs asynchronous Atlas work without redefining domain concepts. |
| Trigger | Backup schedule |
| Schedule | Scheduled |
| Frequency | Daily |
| Input | BackupInput |
| Output | BackupResult |
| Execution Context | System actor or authorized actor context with CorrelationId and CausationId. |
| Execution Owner | AdministrationApplicationService |
| Application Service | AdministrationApplicationService |
| Domain Service | ExplainabilityService |
| Repositories | AuditRepository |
| Commands | Backup operation |
| Domain Events | Audit and backup events |
| Message Contract | BackupCompletedMessage |
| Workflow | Administration workflow |
| Scheduler | Scheduler Framework |
| Automation | Backup automation |
| Dependencies | AdministrationApplicationService; ExplainabilityService; AuditRepository; BackupCompletedMessage |

# Shared Execution Controls

- Transaction Boundary: One checkpointed unit of work per batch item or aggregate operation.
- Consistency Boundary: Eventual consistency is expected for projections, notifications, imports, exports, and message processing.
- Retry Strategy: Exponential retry for transient failures with bounded attempts.
- Timeout Strategy: Bounded execution timeout with safe cancellation and checkpoint preservation.
- Compensation Strategy: Workflow or saga compensation only when cataloged.
- Concurrency Strategy: Job key and scope prevent duplicate concurrent execution.
- Lock Strategy: Distributed or scoped lock by job name, HouseholdId, aggregate id, message id, or batch id as needed.
- Failure Handling: Retry, checkpoint, dead letter, quarantine, cancel, or fail with catalog error.
- Idempotency: JobId plus execution scope plus input hash plus checkpoint key.
- Checkpoint: Persisted after each successful deterministic unit.
- Resume Strategy: Resume from last committed checkpoint and skip duplicate work.
- Cancellation: Cooperative cancellation with audit and no partial uncheckpointed commit.
- Audit: Execution history, CorrelationId, CausationId, retry history, checkpoint history, actor or system actor, and result.
- Logging: Structured logs with job name, attempt, checkpoint, dependency, result, and error code.
- Metrics: Duration, queue latency, throughput, retry count, failure rate, checkpoint lag, and resource use.
- Security: Authorization, permission, tenant isolation, Household isolation, and service boundary protection.
- Performance: Execution SLA, throughput, parallel execution, resource usage, and dependency latency are measured.

