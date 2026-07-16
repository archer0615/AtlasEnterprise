# API Governance Standards and Contracts

## Purpose
This split document isolates API standards, contracts, naming, versioning, request/response rules, DTOs, errors, pagination, sorting, filtering, search, bulk operations, idempotency, and concurrency from the parent API Governance Framework.

## Source
- Parent specification: [API Governance Framework](../api-governance-framework.md)

## Standards
API standards cover resource naming, URI shape, HTTP method usage, response contract, request contract, media type, content negotiation, API version strategy, REST endpoint standard, command API standard, query API standard, DTO standard, and error contract standard.

## Query Controls
Pagination, sorting, filtering, search, and bulk operation standards must be consistent across APIs and preserve tenant and permission constraints.

## Consistency Controls
Idempotency and concurrency standards must protect command replay, retry safety, optimistic locking, and duplicate request handling.

