# Domain Event Error, Security, Audit, and Performance

## Purpose
This split document isolates Domain Event error handling, payload exposure controls, audit requirements, and delivery performance constraints from the parent Domain Event Catalog.

## Source
- Parent specification: [Domain Event Catalog](../domain-event-catalog.md)

## Error Handling
- Poison Message handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Dead Letter Queue handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Retry handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Replay handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Duplicate Detection handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Outbox Failure handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.
- Inbox Failure handling must preserve EventId, CorrelationId, CausationId, consumer name, retry count, error code, and audit trail.

## Security
- Authorization is enforced before event payload is exposed to a consumer, read model, notification, automation, or external message.
- Tenant Isolation is enforced before event payload is exposed to a consumer, read model, notification, automation, or external message.
- Household Isolation is enforced before event payload is exposed to a consumer, read model, notification, automation, or external message.
- PII is enforced before event payload is exposed to a consumer, read model, notification, automation, or external message.
- Encryption is enforced before event payload is exposed to a consumer, read model, notification, automation, or external message.

## Audit
- CorrelationId is mandatory in event publishing and consumption audit records.
- CausationId is mandatory in event publishing and consumption audit records.
- Version is mandatory in event publishing and consumption audit records.
- Publisher is mandatory in event publishing and consumption audit records.
- Consumer is mandatory in event publishing and consumption audit records.
- History is mandatory in event publishing and consumption audit records.

## Performance
- Event Throughput uses batching, partitioning by AggregateId or HouseholdId, deterministic ordering, idempotent processing, and observable lag metrics.
- Ordering uses batching, partitioning by AggregateId or HouseholdId, deterministic ordering, idempotent processing, and observable lag metrics.
- Latency uses batching, partitioning by AggregateId or HouseholdId, deterministic ordering, idempotent processing, and observable lag metrics.
- Projection Delay uses batching, partitioning by AggregateId or HouseholdId, deterministic ordering, idempotent processing, and observable lag metrics.
- Cache Update uses batching, partitioning by AggregateId or HouseholdId, deterministic ordering, idempotent processing, and observable lag metrics.
