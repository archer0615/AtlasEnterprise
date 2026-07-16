# Goal Conflict Operations and Observability

## Purpose
This split document isolates goal conflict security, audit, explainability, observability, performance, concurrency, retention, edge cases, and operational testing from the parent Goal Conflict Resolution specification.

## Source
- Parent specification: [Goal Conflict Resolution](../goal-conflict-resolution.md)

## Security
Goal conflict views and actions are permission-aware. Users may only see conflicts, evidence, related goals, recommendation links, decision links, and scenario references they are authorized to access. Masking must not change conflict facts or audit history.

## Audit and Explainability
Every detection, reevaluation, proposal, selection, acceptance, rejection, override, deferral, escalation, resolution, reopen, archive, and restore action records operator, timestamp, reason, prior state, next state, correlation identifier, and evidence references. Explainability summarizes which goals conflict, why the conflict matters, which evidence was used, and why a candidate was recommended.

## Observability
Operational telemetry tracks detection counts, active conflicts, severity distribution, resolution latency, stale conflicts, override rates, retry counts, error counts, and projection freshness. Logs must preserve correlation identifiers without exposing unauthorized fields.

## Performance
Conflict detection and read-model projection should use stable filters, indexes, cache strategy, and incremental recalculation where available. Large related-goal sets must respect configured limits and avoid expanding unauthorized data.

## Concurrency and Idempotency
Commands must be idempotent by correlation identifier and source version. Concurrent updates must not produce duplicate active conflicts for the same household, primary goal, related goals, conflict type, and scenario context.

## Retention and Edge Cases
Resolved and archived conflicts remain auditable according to retention policy. Edge cases include deleted goals, restored goals, stale recommendations, scenario version drift, duplicate conflict sets, circular dependencies, and permission changes after detection.
