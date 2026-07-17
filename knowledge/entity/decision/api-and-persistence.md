> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision API and Persistence

## Purpose
This split document isolates Decision commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Decision Entity Specification.

## Source
- Parent specification: [Decision Entity Specification](../Decision.md)

## API
Decision APIs expose create, update, approve, reject, defer, execute, archive, restore, delete, detail, summary, and search behavior under user and permission boundaries.

## Persistence
Persistence covers decision table mapping, snapshots, option fields, score precision, indexes, constraints, optimistic concurrency, and cache invalidation.

