> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# User API and Persistence

## Purpose
This split document isolates User commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent User Entity Specification.

## Source
- Parent specification: [User Entity Specification](../User.md)

## API
User APIs expose create, update, profile, preference, membership, archive, restore, detail, summary, and search behavior under permission boundaries.

