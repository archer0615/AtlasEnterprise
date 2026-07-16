# Liability API and Persistence

## Purpose
This split document isolates Liability commands, events, repository, services, API, DTOs, database mapping, PostgreSQL schema, EF Core mapping, and cache strategy from the parent Liability Entity Specification.

## Source
- Parent specification: [Liability Entity Specification](../Liability.md)

## Commands and Events
Liability commands cover create, update, record payment, adjust balance, close, archive, restore, and delete. Events preserve previous balance, payment amount, new balance, payment date, and actor.

## API
Liability APIs expose create, update, detail, summary, search, payment, close, archive, restore, and delete behavior under household and permission boundaries.

## Persistence
Persistence covers liabilities table mapping, constraints, indexes, EF Core precision mapping, cache keys, and invalidation after payment, balance adjustment, payoff, archive, restore, or delete.

