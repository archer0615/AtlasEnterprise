> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Notification API and Persistence

## Purpose
This split document isolates Notification commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Notification Entity Specification.

## Source
- Parent specification: [Notification Entity Specification](../Notification.md)

## API
Notification APIs expose create, schedule, send, mark read, acknowledge, archive, restore, delete, detail, summary, and search behavior under user and permission boundaries.

## Persistence
Persistence covers notification table mapping, status timestamps, provider identifiers, retry metadata, indexes, constraints, optimistic concurrency, and cache invalidation.

