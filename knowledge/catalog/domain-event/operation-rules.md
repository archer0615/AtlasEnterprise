# Domain Event Operation Rules

## Purpose
This split document isolates operational Domain Event rules from the parent Domain Event Catalog.

## Source
- Parent specification: [Domain Event Catalog](../domain-event-catalog.md)

## Rule Scope
- Ordering Rules
- Idempotency Rules
- Replay Rules
- Retry Rules
- Versioning Rules
- Event Evolution Rules
- Backward Compatibility Rules
- Validation Rules

## Ordering Rules
- Ordering Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Ordering Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Ordering Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Idempotency Rules
- Idempotency Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Idempotency Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Idempotency Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Replay Rules
- Replay Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Replay Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Replay Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Retry Rules
- Retry Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Retry Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Retry Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Versioning Rules
- Versioning Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Versioning Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Versioning Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Event Evolution Rules
- Event Evolution Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Event Evolution Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Event Evolution Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Backward Compatibility Rules
- Backward Compatibility Rules rule 1 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Backward Compatibility Rules rule 2 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.
- Backward Compatibility Rules rule 3 applies per EventId, AggregateId, HouseholdId, schema version, producer, consumer, and projection boundary.

## Validation Rules
| Rule ID | Description | Condition | Validation | Blocking | Error |
|---|---|---|---|---|---|
| EVT-VR-001 | Validate domain event catalog requirement 1. | Event is published or consumed. | Name, aggregate, command, payload, metadata, ordering, idempotency, replay, outbox, inbox, projection, and audit are checked. | Yes | EVT-ERR-001 |
| EVT-VR-002 | Validate domain event catalog requirement 2. | Event is published or consumed. | Name, aggregate, command, payload, metadata, ordering, idempotency, replay, outbox, inbox, projection, and audit are checked. | Yes | EVT-ERR-002 |
| EVT-VR-003 | Validate domain event catalog requirement 3. | Event is published or consumed. | Name, aggregate, command, payload, metadata, ordering, idempotency, replay, outbox, inbox, projection, and audit are checked. | Yes | EVT-ERR-003 |
