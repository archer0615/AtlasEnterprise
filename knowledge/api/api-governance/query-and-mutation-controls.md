# API Query and Mutation Controls

## Purpose
This split document groups query controls and mutation safety controls from the parent API Governance Framework. It covers query API standard, pagination, sorting, filtering, search, bulk operation, idempotency, concurrency, caching, rate limiting, and command endpoint behavior.

## Source
- Parent specification: [API Governance Framework](../api-governance-framework.md)

## Query Controls
- Query API Standard uses GET with deterministic pagination, filtering, sorting, and search semantics.
- Pagination, Sorting, Filtering, and Search standards must preserve authorization, permission mapping, tenant isolation, household isolation, audit, observability, and OpenAPI documentation.
- Caching must not bypass authentication, authorization, permission checks, tenant isolation, household isolation, or protected data boundaries.

## Mutation Controls
- Command API Standard uses POST action endpoints only when resource state transition cannot be expressed as a standard resource mutation.
- Bulk Operation Standard must preserve validation, authorization, error contract, audit, observability, compatibility, and OpenAPI documentation.
- Idempotency Standard protects command replay, retry safety, and duplicate request handling.
- Concurrency Standard protects optimistic locking and stale mutation rejection.

## Operational Controls
- Rate Limiting, Performance, CorrelationId, CausationId, and Tracing provide predictable operation behavior across query and mutation APIs.
- Every mutation maps to Command Catalog, idempotency, concurrency, and Domain Event ownership.

