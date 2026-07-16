# Application Service Command Orchestration

## Purpose
This split document isolates command orchestration responsibilities from the parent Application Service Catalog.

## Source
- Parent specification: [Application Service Catalog](../application-service-catalog.md)

## Command Scope
Application services orchestrate command validation, permission checks, idempotency, aggregate loading, domain service calls, transaction boundaries, event emission, audit requests, and response DTO mapping.

## Boundary Rules
Application services coordinate domain behavior but do not own domain invariants or bypass aggregate command ownership.

