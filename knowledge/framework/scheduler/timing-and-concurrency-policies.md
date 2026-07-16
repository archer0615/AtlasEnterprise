# Scheduler Timing and Concurrency Policies

Document Path: knowledge/framework/scheduler/timing-and-concurrency-policies.md

Parent Specification: knowledge/framework/scheduler-framework.md

# Purpose

This split document summarizes Scheduler Framework policies for cron, calendar, retry, misfire, catch-up, and concurrency behavior.

# Cron Strategy

- Every scheduler has a trigger and schedule rule.
- Scheduler rules must define timezone, retry, timeout, audit, and metrics behavior.
- Cron-based scheduling must create deterministic execution opportunities and must start catalog-approved jobs or service operations only.

# Calendar Strategy

- Calendar scheduling follows explicit schedule rules and timezone behavior.
- Calendar-triggered execution ownership remains with the scheduled job or service.
- Calendar rules must preserve auditability and deterministic catch-up behavior.

# Retry Strategy

- Retry behavior is part of the scheduler contract.
- Scheduled retries must remain deterministic, locked, audited, and retry-safe.
- Retry execution must not bypass Application Service, Domain Service, Command, Repository, or Message Contract boundaries.

# Misfire Strategy

- Misfire behavior must be deterministic and auditable.
- Misfire handling must follow the scheduler and job lock strategy.
- Missed execution opportunities must not create uncontrolled duplicate work.

# Catch-up Strategy

- Catch-up behavior must be deterministic and auditable.
- Catch-up execution must preserve the same ownership boundaries as the scheduled job or service.
- Catch-up processing must remain consistent with retry, timeout, concurrency, lock, audit, and metrics behavior.

# Concurrency Strategy

- Concurrent runs are controlled by scheduler and job lock strategy.
- Scheduler execution must define concurrency and lock behavior.
- Concurrent execution must not bypass catalog-approved Background Jobs or service operations.
