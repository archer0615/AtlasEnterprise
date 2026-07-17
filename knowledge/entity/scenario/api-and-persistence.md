> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Scenario API and Persistence

## Purpose
This split document isolates Scenario commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Scenario Entity Specification.

## Source
- Parent specification: [Scenario Entity Specification](../Scenario.md)

## API
Scenario APIs expose create, update, evaluate, compare, archive, restore, detail, summary, and search behavior under household and permission boundaries.

