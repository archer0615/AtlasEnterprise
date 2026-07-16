# Message Contract Operational Controls

## Purpose
This split document isolates operational controls for message contract delivery, compatibility, validation, security, audit, performance, replay, and idempotency.

## Source
- Parent specification: [Message Contract Catalog](../message-contract-catalog.md)

## Operational Scope
Operational controls apply to command, event, workflow, saga, automation, scheduler, notification, replay, and report-generation messages documented in the parent catalog.

## Delivery and Compatibility Controls
| Control Area | Parent Catalog Rule |
|---|---|
| Schema Versioning | Contracts use explicit schema versions and retain compatibility evidence. |
| Backward Compatibility | Compatible field additions must preserve existing consumers. |
| Forward Compatibility | Consumers must tolerate fields introduced after their deployed schema version. |
| Evolution Rules | Breaking changes require explicit versioning, migration, and deprecation handling. |
| Serialization Rules | Serialization must preserve stable field names, types, and documented envelopes. |
| Validation Rules | Messages must pass schema, required-field, enum, identifier, and business validation. |

## Runtime Controls
| Control Area | Parent Catalog Coverage |
|---|---|
| Outbox | Message flow includes outbox publication for reliable delivery. |
| Inbox | Consumer processing includes inbox tracking for duplicate detection. |
| Replay | Replay messages must remain deterministic and safe to reprocess. |
| Idempotency | Consumers must handle duplicate deliveries without duplicate side effects. |
| Saga Messaging | Saga messages coordinate multi-step workflows through documented contracts. |
| Workflow Messaging | Workflow messages preserve orchestration state and handoff semantics. |

## Security, Audit, and Performance
| Control Area | Requirement |
|---|---|
| Security | Message payloads must respect catalog security classification and avoid leaking unauthorized data across consumers. |
| Audit | Message production and consumption must leave traceable audit evidence for regulated workflows. |
| Performance | High-volume contracts must preserve serialization and delivery performance expectations from the parent catalog. |
| Notification | NotificationRequestedMessage remains separated from decision and report workflows through its documented contract. |
| Reporting | ReportGenerationRequestedMessage coordinates report work without adding undeclared domain behavior. |

## Testing Focus
| Test Type | Purpose |
|---|---|
| Schema Test | Verify message shape, required fields, enums, and version metadata. |
| Compatibility Test | Verify backward and forward compatibility across schema versions. |
| Serialization Test | Verify stable serialization and deserialization behavior. |
| Replay Test | Verify deterministic replay and snapshot/replay contract safety. |
| Idempotency Test | Verify duplicate message handling. |
| Performance Test | Verify throughput and processing expectations. |

## Usage Rules
- Use the parent Message Contract Catalog as the source of truth for complete message entries and matrices.
- Use this split document to review operational controls that cut across delivery, compatibility, testing, and runtime processing.
- Do not introduce new message behavior here; only summarize controls already present in the parent catalog.
