# Event-driven Recovery and Projections

## Purpose
This split document groups retry, dead letter, replay, projection, read model, cache invalidation, and search index update behavior from the parent Event Driven Architecture.

## Source
- Parent specification: [Event Driven Architecture](../event-driven-architecture.md)

## Recovery Controls
- Retry Strategy preserves catalog event mapping, message contract mapping, subscriber ownership, inbox idempotency, ordering, replay, projection, audit, security, and observability.
- Dead Letter Strategy preserves failed-message evidence, retry exhaustion state, correlation, causation, payload version, consumer ownership, and audit history.
- Replay Strategy must be versioned, audited, and side-effect controlled.
- Failure Recovery must remain compatible with outbox, inbox, ordering, idempotency, retry, dead letter, replay, projection, and read model behavior.

## Projection and Read Models
- Projection Strategy maps accepted event facts into read model updates without changing the domain event history.
- Read Model Strategy keeps query models eventually consistent and observable.
- Cache Invalidation Strategy and Search Index Update Strategy must follow event ownership and avoid exposing stale protected data beyond governed consistency boundaries.

## Coordination
- Saga, Workflow, Automation, Background Job, Scheduler, and Notification coordination consume events through the same delivery, idempotency, correlation, causation, audit, security, and observability rules.
- Recovery handling must avoid duplicate side effects when replaying events or resuming failed workflows.

