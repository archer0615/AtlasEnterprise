# Repository Catalog Entries

## Purpose
This split document isolates repository definitions from the parent Repository Catalog.

## Source
- Parent specification: [Repository Catalog](../repository-catalog.md)

## Repository Scope
Repositories own aggregate persistence access, query methods, specifications, projections, concurrency handling, transaction participation, and storage mapping.

## Entry Contract
Each repository entry preserves aggregate owner, entity owner, table mapping, query behavior, command behavior, transaction boundary, cache interaction, and audit expectations.

