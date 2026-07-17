> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Mortgage Persistence and API

## Purpose
This split document isolates Mortgage commands, events, repository, services, Future Cloud Architecture API, DTO, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache strategy from the parent Mortgage Entity Specification.

## Source
- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Commands and Events
Mortgage commands and events must align with Loan aggregate ownership and preserve payment, refinance, close, archive, restore, and replay behavior.

## API
Mortgage API behavior is exposed through loan-aligned routes and must preserve permissions, idempotency, error handling, and audit evidence.

## Persistence
Persistence includes mortgage or loan-backed tables, repository query methods, Future Cloud Mapping, amortization cache invalidation, and consistency verification.

