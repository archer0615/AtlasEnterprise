> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Liability API and Persistence

## Purpose
This split document isolates Liability commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping schema, Future Cloud Mapping, and cache strategy from the parent Liability Entity Specification.

## Source
- Parent specification: [Liability Entity Specification](../Liability.md)

## Commands and Events
Liability commands cover create, update, record payment, adjust balance, close, archive, restore, and delete. Events preserve previous balance, payment amount, new balance, payment date, and actor.

## API
Liability APIs expose create, update, detail, summary, search, payment, close, archive, restore, and delete behavior under household and permission boundaries.

## Persistence
Persistence covers liabilities table mapping, constraints, indexes, Future Cloud Mapping precision mapping, cache keys, and invalidation after payment, balance adjustment, payoff, archive, restore, or delete.

