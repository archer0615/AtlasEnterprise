# Event-Driven Delivery Patterns

## Purpose
This split document isolates event delivery architecture and messaging patterns from the parent Event Driven Architecture specification.

## Source
- Parent specification: [Event Driven Architecture](../event-driven-architecture.md)

## Delivery Patterns
Delivery patterns cover publishing, subscription, delivery guarantee, ordering, outbox, inbox, retry, dead letter, replay, projection, read model, saga coordination, workflow coordination, automation coordination, background job coordination, scheduler coordination, notifications, cache invalidation, and search index updates.

## Boundaries
Event delivery must preserve transaction boundaries, consistency boundaries, idempotency, replay safety, and failure recovery semantics.

