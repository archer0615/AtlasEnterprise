# Service Catalog Governance

## Purpose
This split document isolates service ownership, orchestration rules, validation rules, security, audit, testing, and consistency checks from the parent Service Catalog.

## Source
- Parent specification: [Service Catalog](../service-catalog.md)

## Governance
Service governance ensures application services do not own domain invariants, domain services do not perform persistence orchestration, permissions are checked at application boundaries, and audit records preserve command intent.

## Testing
Testing covers service routing, command orchestration, query projection, permission checks, domain validation, audit emission, transaction boundaries, and catalog consistency.

