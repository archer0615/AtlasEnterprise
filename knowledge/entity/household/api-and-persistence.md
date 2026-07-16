# Household API and Persistence

## Purpose
This split document isolates Household commands, events, repository, services, API, DTOs, database mapping, EF Core mapping, and cache strategy from the parent Household Entity Specification.

## Source
- Parent specification: [Household Entity Specification](../Household.md)

## API
Household APIs expose create, update, detail, members, preferences, summary, search, archive, restore, and delete behavior under tenant and permission boundaries.

## Persistence
Persistence covers household table mapping, member associations, indexes, constraints, optimistic concurrency, cache invalidation, and projection refresh.

