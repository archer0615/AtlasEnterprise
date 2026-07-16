# Aggregate Catalog Governance and Testing

## Purpose
This split document isolates aggregate governance, lifecycle, repository rules, command/event rules, validation, edge cases, testing, and consistency checks from the parent Aggregate Catalog.

## Source
- Parent specification: [Aggregate Catalog](../aggregate-catalog.md)

## Governance
Governance covers aggregate invariants, aggregate lifecycle, repository rules, command ownership rules, domain event ownership rules, persistence ownership rules, API ownership rules, security boundary, audit boundary, performance, and concurrency.

## Validation
Validation rules enforce aggregate ownership, transaction scope, idempotency, terminal state protection, consistency boundaries, and command/event alignment.

## Testing
Testing covers ownership mapping, aggregate invariants, lifecycle transitions, repository behavior, command routing, event routing, concurrency, performance, edge cases, and final consistency matrix checks.

