> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Household API and Persistence

## Purpose
This split document isolates Household commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Household Entity Specification.

## Source
- Parent specification: [Household Entity Specification](../Household.md)

## API
Household APIs expose create, update, detail, members, preferences, summary, search, archive, restore, and delete behavior under tenant and permission boundaries.

## Persistence
Persistence covers household table mapping, member associations, indexes, constraints, optimistic concurrency, cache invalidation, and projection refresh.

