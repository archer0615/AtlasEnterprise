# Decision Insights Security and Performance

## Purpose
This split document isolates Decision Insight authorization, field-level security, masking, audit, cache strategy, performance, edge cases, and operational testing from the parent Decision Insights specification.

## Source
- Parent specification: [Decision Insights Overview](../decision-insights.md)

## Authorization and Permissions
Decision Insights are tenant-safe and permission-aware. Authorization controls creation, refresh, generation, dismissal, resolution, archive, restore, delete, report generation, evidence access, and dashboard visibility.

## Field-Level Security and Masking
Field-level security and masking apply to evidence, financial fields, user fields, recommendation details, portfolio values, cash-flow details, and restricted governance or audit records. Masking must not change insight state, score, or audit facts.

## Audit
Insight history, evidence history, resolution history, recommendation history, and access history record operator, timestamp, source, reason, prior state, next state, and correlation identifier. Audit records must preserve lifecycle changes even when notifications are suppressed.

## Cache Strategy
Cache entries cover insight lists, evidence, trend data, summaries, and dashboard projections. Cache keys must include tenant or household context and authorization-relevant scope. Refresh and invalidation follow source data changes, lifecycle changes, permission changes, and configured TTL.

## Performance
Batch generation, incremental detection, parallel processing, caching, materialized views, and read optimization support large insight volumes. Performance controls must not bypass validation, authorization, evidence recording, or audit.

## Edge Cases and Testing
Edge cases include stale decisions, missing evidence, deleted source records, restored source records, permission changes, duplicate insights, conflicting recommendations, forecast drift, and concurrent lifecycle commands. Tests cover unit, integration, detection, evidence, performance, concurrency, stress, and forecast behavior.
