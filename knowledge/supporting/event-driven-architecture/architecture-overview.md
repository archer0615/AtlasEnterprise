# Event-driven Architecture Overview

This split document summarizes the architecture overview and event flow architecture sections from the parent Event Driven Architecture specification. The parent document remains the canonical source of truth.

## Scope

- Event-driven architecture structure.
- Catalog event mapping.
- Message contract mapping.
- Publisher and subscriber ownership.
- Outbox, Inbox, ordering, idempotency, retry, replay, projection, read model, notification, audit, security, and observability.

## Architecture Overview

- Domain Events represent immutable business facts.
- Message Contracts transport catalog-approved event facts and application messages.
- Outbox is required for committed event publication.
- Inbox is required for idempotent consumer processing.
- At least once delivery requires idempotent consumers.
- Ordering is guaranteed only within declared ordering keys.
- Replay must be versioned, audited, and side-effect controlled.
- Eventual consistency is explicit and observable.

## Architecture Rules

- Architecture overview rules preserve catalog event mapping, message contract mapping, publisher ownership, subscriber ownership, outbox, inbox, ordering, idempotency, retry, replay, projection, read model, notification, audit, security, and observability.
- Event processing must not bypass catalog-approved events or message contracts.
- Publisher ownership and subscriber ownership must be explicit.
- Outbox and Inbox boundaries must be preserved across committed publication and idempotent consumption.
- Replay, projection, read model update, notification, audit, security, and observability concerns must remain visible in the architecture.

## Event Flow Architecture

- Event Flow Architecture rules preserve catalog event mapping, message contract mapping, publisher ownership, subscriber ownership, outbox, inbox, ordering, idempotency, retry, replay, projection, read model, notification, audit, security, and observability.
- Event flow starts from a catalog-approved domain fact or application message.
- Publication uses the declared publisher, message contract, outbox, ordering key, and correlation metadata.
- Consumption uses declared subscribers, Inbox idempotency, retry handling, projection or read model updates, and audited side effects.
- Eventual consistency boundaries must be explicit and observable.

## Related References

- [Parent specification](../event-driven-architecture.md)
- [Event-driven publishing and subscription](publishing-and-subscription.md)
- [Event-driven delivery patterns](delivery-patterns.md)
- [Event-driven recovery and projections](recovery-and-projections.md)
