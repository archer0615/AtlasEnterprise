> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Portfolio API and Persistence

## Purpose
This split document isolates Portfolio commands, events, repository, services, Future Cloud Architecture API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache strategy from the parent Portfolio Entity Specification.

## Source
- Parent specification: [Portfolio Entity Specification](../Portfolio.md)

## API
Portfolio APIs expose create, update, detail, search, allocation, valuation, archive, restore, and delete behavior under household and permission boundaries.

## Persistence
Persistence covers portfolio table mapping, indexes, constraints, Future Cloud Mapping, optimistic concurrency, cache invalidation, and projection refresh.

