# Message Contract Schema Evolution and Validation

## Purpose
This split document isolates schema evolution, serialization, and validation requirements from the parent Message Contract Catalog while preserving the parent as the canonical full specification.

## Source
- Parent specification: [Message Contract Catalog](../message-contract-catalog.md)

## Split Scope
- Schema Versioning Strategy
- Backward Compatibility
- Forward Compatibility
- Evolution Rules
- Serialization Rules
- Validation Rules

## Schema Versioning Strategy
The parent catalog defines ten schema versioning strategy rules. Each rule preserves stable schema versioning, compatible payload evolution, required envelope metadata, JSON UTF-8 serialization, enum stability, decimal precision, DateTime convention, and consumer safety.

## Compatibility Rules
Backward compatibility and forward compatibility each contain ten catalog rules. The rules keep payload evolution compatible for producers and consumers and require source command, source event, schema, version, payload, headers, metadata, correlation, causation, tenant, Household, ordering, idempotency, validation, audit, and security concerns to remain checkable.

## Evolution Rules
The parent catalog defines ten evolution rules for stable message change management. These rules preserve schema versioning, compatible payload evolution, required envelope metadata, JSON UTF-8 serialization, enum stability, decimal precision, DateTime convention, and consumer safety.

## Serialization Rules
The parent catalog defines ten serialization rules. Serialization is constrained around JSON UTF-8 payloads, stable envelope metadata, enum stability, decimal precision, DateTime convention, and consumer safety.

## Validation Rules
The validation catalog contains `MSG-VR-001` through `MSG-VR-040`.

| Rule Range | Condition | Validation | Blocking | Error Range |
|---|---|---|---|---|
| MSG-VR-001 - MSG-VR-040 | Message is produced, serialized, published, consumed, retried, replayed, or dead-lettered. | Producer, consumer, source command, source event, schema, version, payload, headers, metadata, correlation, causation, tenant, Household, ordering, idempotency, validation, audit, and security are checked. | Yes | MSG-ERR-001 - MSG-ERR-040 |

## Extraction Rationale
This split keeps message contract transport and workflow material separate from schema lifecycle material. Readers reviewing compatibility, serialization, and validation can use this child file without scanning the complete message catalog body.

## Preservation Rule
Do not remove or rewrite the parent Message Contract Catalog body from this split. This child document is a navigation and ownership slice for the existing canonical content.
