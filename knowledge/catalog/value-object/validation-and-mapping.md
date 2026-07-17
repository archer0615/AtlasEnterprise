> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Validation and Mapping

## Purpose
This split document isolates value object validation, persistence mapping, DTO mapping, and conversion rules from the parent Value Object Catalog.

## Source
- Parent specification: [Value Object Catalog](../value-object-catalog.md)

## Validation
Validation covers required fields, formats, range constraints, currency precision, date/time constraints, enum alignment, and cross-field invariants.

## Mapping
Mapping covers Future Cloud Mapping owned types, scalar conversions, JSON serialization, API DTO representation, database column precision, and migration compatibility.

