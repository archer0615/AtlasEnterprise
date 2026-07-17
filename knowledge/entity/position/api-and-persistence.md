> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Position API and Persistence

## Purpose
This split document isolates Position commands, events, repository, services, Future Cloud Architecture API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache strategy from the parent Position Entity Specification.

## Source
- Parent specification: [Position Entity Specification](../Position.md)

## API
Position APIs expose create, update, detail, search, valuation, archive, restore, and delete behavior under portfolio and permission boundaries.

## Persistence
Persistence covers position table mapping, indexes, constraints, Future Cloud Mapping precision, optimistic concurrency, cache invalidation, and portfolio projection refresh.

