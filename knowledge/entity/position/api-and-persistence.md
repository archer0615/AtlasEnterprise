# Position API and Persistence

## Purpose
This split document isolates Position commands, events, repository, services, REST API, DTOs, database mapping, PostgreSQL DDL, EF Core mapping, and cache strategy from the parent Position Entity Specification.

## Source
- Parent specification: [Position Entity Specification](../Position.md)

## API
Position APIs expose create, update, detail, search, valuation, archive, restore, and delete behavior under portfolio and permission boundaries.

## Persistence
Persistence covers position table mapping, indexes, constraints, EF Core precision, optimistic concurrency, cache invalidation, and portfolio projection refresh.

