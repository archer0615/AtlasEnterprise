> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Catalog Entries

## Purpose
This split document isolates value object definitions from the parent Value Object Catalog.

## Source
- Parent specification: [Value Object Catalog](../value-object-catalog.md)

## Catalog Scope
Value objects define immutable domain values, equality behavior, validation rules, serialization behavior, persistence mapping, and API representation.

## Entry Contract
Each value object entry preserves name, purpose, fields, constraints, examples, owning aggregates, services, PWA Runtime Mapping / Future Cloud Mapping, DTO mapping, and error behavior.

