# Command Catalog Entries

## Purpose
This split document isolates command definitions from the parent Command Catalog.

## Source
- Parent specification: [Command Catalog](../command-catalog.md)

## Catalog Scope
Commands define intent to mutate aggregate state through application services and domain services while preserving ownership and transaction boundaries.

## Entry Contract
Each command entry preserves command name, aggregate owner, application service, domain service, payload, validation rules, idempotency, events emitted, permissions, audit, and error behavior.

