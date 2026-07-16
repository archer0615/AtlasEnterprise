# Portfolio API and Persistence

## Purpose
This split document isolates Portfolio commands, events, repository, services, REST API, DTOs, database mapping, PostgreSQL DDL, EF Core mapping, and cache strategy from the parent Portfolio Entity Specification.

## Source
- Parent specification: [Portfolio Entity Specification](../Portfolio.md)

## API
Portfolio APIs expose create, update, detail, search, allocation, valuation, archive, restore, and delete behavior under household and permission boundaries.

## Persistence
Persistence covers portfolio table mapping, indexes, constraints, EF Core mapping, optimistic concurrency, cache invalidation, and projection refresh.

