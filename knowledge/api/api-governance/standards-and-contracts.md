> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# API Governance Standards and Contracts

## Purpose
This split document isolates API standards, contracts, naming, versioning, request/response rules, DTOs, errors, pagination, sorting, filtering, search, bulk operations, idempotency, and concurrency from the parent API Governance Framework.

## Source
- Parent specification: [API Governance Framework](../api-governance-framework.md)

## Standards
API standards cover resource naming, URI shape, HTTP method usage, response contract, request contract, media type, content negotiation, API version strategy, Future Cloud Architecture Endpoint Standard, command API standard, query API standard, DTO standard, and error contract standard.

## Query Controls
Pagination, sorting, filtering, search, and bulk operation standards must be consistent across APIs and preserve tenant and permission constraints.

## Consistency Controls
Idempotency and concurrency standards must protect command replay, retry safety, optimistic locking, and duplicate request handling.

