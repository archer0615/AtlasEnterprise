# Event-driven Operations and Observability

## Purpose
This split document isolates operational controls from the parent Event Driven Architecture. It covers transaction boundaries, consistency boundaries, failure recovery, observability, security, audit, performance, validation rules, business rules, testing, edge cases, and final consistency checks.

## Source
- Parent specification: [Event Driven Architecture](../event-driven-architecture.md)

## Operational Scope
- Event publishers and subscribers must preserve catalog event mapping, message contract mapping, publisher ownership, subscriber ownership, outbox, inbox, ordering, idempotency, retry, replay, projection, read model, notification, audit, security, and observability.
- Transaction boundaries must keep committed state and outbox publication aligned.
- Consistency boundaries must make eventual consistency explicit and observable.
- Failure recovery must be retryable, auditable, and compatible with replay and dead letter handling.

## Observability
- Every event flow requires correlation, causation, event identity, message identity, publisher ownership, subscriber ownership, retry state, replay state, projection state, and audit visibility.
- Observability must cover outbox dispatch, inbox processing, message broker delivery, projection refresh, read model update, notification side effects, and integration handoff.
- Performance tracking must preserve event throughput, consumer latency, projection lag, replay duration, and retry/dead letter counts.

## Security and Audit
- Event-driven execution must respect Security Framework, Permission Framework, API Governance Framework, Audit Framework, and related catalog ownership.
- Audit must capture event publication, subscription processing, replay execution, failed delivery, dead letter movement, projection rebuild, and side-effect suppression.

## Testing and Edge Cases
- Unit, integration, replay, ordering, outbox, inbox, projection, saga, and performance tests validate event-driven behavior.
- Edge cases include duplicate delivery, missing ordering key, stale projection, replay with side effects, subscriber failure, publisher rollback, and inconsistent read model state.

