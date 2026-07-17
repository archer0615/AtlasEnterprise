> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Loan Persistence and Verification

## Purpose

This split document isolates Loan PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping Fluent API, cache strategy, security, audit, observability, performance, examples, diagrams, testing, edge cases, error catalog, data migration, and consistency verification from the larger Loan entity specification.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## Persistence

- Loan persistence maps through LoanRepository and database tables such as `loans` and `mortgages` when Mortgage is mapped separately.
- Future Cloud Mapping DDL and Future Cloud Mapping Fluent API must preserve aggregate ownership, concurrency, soft-delete behavior, tenant filtering where tenancy exists, and household filtering.
- Cache strategy is limited to computed outputs such as Loan amortization cache and must not become source of truth.
- Read models and projections are read-only and must not replace aggregate state.

## Governance

- Security covers authentication, authorization, Liability permission mapping, tenant isolation, household isolation, masking, audit, and over-posting protection.
- Audit must capture loan creation, payment, refinance, close, archive, restore, replay, and failed authorization or validation behavior where applicable.
- Observability and performance rules must preserve deterministic calculation outputs and avoid repository-owned business calculations.

## Verification

- Testing covers create, update, payment, refinance, close, archive, restore, replay, concurrency, stale amortization, invalid term, invalid rate, invalid currency, and permission denial behavior.
- Consistency verification checks catalog alignment, command/event mapping, repository ownership, calculation boundaries, API DTO behavior, PWA Runtime Mapping / Future Cloud Mapping, cache boundaries, audit completeness, and final consistency matrix status.

## Visual and Example Coverage

- Example JSON covers create, update, payment, refinance, detail, search, errors, and relevant lifecycle responses.
- Mermaid coverage includes class, ER, state, sequence, and aggregate diagrams.

## Related References

- [Loan Entity Specification](../Loan.md)
- [Loan API and audit](api-and-audit.md)
- [Loan scenario integration](scenario-integration.md)
