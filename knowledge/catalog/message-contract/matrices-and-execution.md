# Message Contract Matrices and Execution

## Purpose
This split document isolates message classification, producer consumer, command message, event message, workflow message, saga message, automation message, scheduler message, notification message, and Phase 2 Executable Specification Addendum content from the parent Message Contract Catalog.

## Source
- Parent specification: [Message Contract Catalog](../message-contract-catalog.md)

## Message Matrices
- Message Classification Matrix preserves message name, category, producer, consumers, trigger, source command, source event, ordering key, idempotency key, retry policy, dead letter, schema version, payload, audit, security, and compatibility.
- Producer Consumer Matrix preserves producer ownership, consumer ownership, message routing, delivery behavior, and compatibility.
- Command Message Matrix preserves command-to-message derivation and approved source command relationships.
- Event Message Matrix preserves domain event and integration event mapping to message contracts.
- Workflow Message Matrix preserves workflow-related message contracts and routing.
- Saga Message Matrix preserves saga-related message contracts, compensation, and correlation.
- Automation Message Matrix preserves automation-related message contracts and triggers.
- Scheduler Message Matrix preserves scheduler-related message contracts and cadence.
- Notification Message Matrix preserves notification message contracts, channels, and consumers.

## Schema and Compatibility Execution
- Schema Versioning Strategy preserves versioned schemas, compatibility evidence, deprecation windows, and consumer migration.
- Backward Compatibility preserves additive field changes and consumer-safe evolution.
- Forward Compatibility preserves consumer tolerance for unknown or future fields.
- Evolution Rules preserve explicit breaking change handling, versioning, and audit.
- Serialization Rules preserve envelope, payload, metadata, correlation, causation, ordering, idempotency, security, audit, and delivery controls.

## Phase 2 Executable Specification Addendum
- Message Contract Execution Contract preserves executable validation for producer, consumer, schema, version, payload, correlation, causation, validation, audit, retry, delivery behavior, and compatibility.
- Required Commands preserve executable checks for message contract generation, schema validation, compatibility validation, replay validation, idempotency validation, and performance validation.
- Addendum Validation Rules preserve versioned message schemas, required metadata, producer consumer mapping, dead letter behavior, and replay safety.
- Addendum Testing Matrix preserves Schema Test, Compatibility Test, Serialization Test, Replay Test, Idempotency Test, and Performance Test.
- Addendum Version History preserves Phase 2 executable specification tracking.
