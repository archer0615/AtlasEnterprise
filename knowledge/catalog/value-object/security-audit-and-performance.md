> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Security, Audit, and Performance

## Purpose
This split document isolates Value Object security, audit, and performance guidance from the parent Value Object Catalog.

## Source
- Parent specification: [Value Object Catalog](../value-object-catalog.md)

## Security
- Encryption is applied through owner Entity, DTO, API, repository, and PWA Runtime Mapping / Future Cloud Mapping when the Value Object contains sensitive data.
- Masking is applied through owner Entity, DTO, API, repository, and PWA Runtime Mapping / Future Cloud Mapping when the Value Object contains sensitive data.
- PII is applied through owner Entity, DTO, API, repository, and PWA Runtime Mapping / Future Cloud Mapping when the Value Object contains sensitive data.

## Audit
- Creation is tracked through the owning Aggregate or Entity; Value Objects do not own independent audit lifecycle.
- Usage is tracked through the owning Aggregate or Entity; Value Objects do not own independent audit lifecycle.
- History is tracked through the owning Aggregate or Entity; Value Objects do not own independent audit lifecycle.

## Performance
- Memory uses immutable compact representation, deterministic JSON, bounded payload size, cache-safe equality, and no independent repository lookup.
- Allocation uses immutable compact representation, deterministic JSON, bounded payload size, cache-safe equality, and no independent repository lookup.
- Serialization uses immutable compact representation, deterministic JSON, bounded payload size, cache-safe equality, and no independent repository lookup.
- Caching uses immutable compact representation, deterministic JSON, bounded payload size, cache-safe equality, and no independent repository lookup.
