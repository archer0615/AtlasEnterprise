# Mortgage Error, Migration, and Consistency

## Purpose

This split document isolates Mortgage error handling, data migration, consistency verification, completion checklist, and final consistency matrix content from the larger Mortgage entity specification.

## Source

- Parent specification: [Mortgage Entity Specification](../Mortgage.md)

## Error Handling

- Mortgage validation errors must use catalog-aligned identity, ownership, monetary, interest, repayment, collateral, lifecycle, and authorization rules.
- Unsupported subtype, status, currency, interest model, repayment model, grace period, or collateral reference values must be rejected or mapped as implementation detail according to catalog policy.
- Repository errors must not hide aggregate ownership violations or cross-household access attempts.
- Calculation errors from amortization, refinance, affordability, projection, or cash flow logic must remain outside Mortgage repository ownership.
- API errors must preserve security boundaries and avoid leaking household, tenant, or collateral data.

## Data Migration

- Migration must preserve Mortgage identity, Loan ownership, household boundary, currency, principal values, interest model, repayment model, collateral reference, timestamps, and audit linkage.
- Existing loan-backed mortgage rows must remain aligned with Loan aggregate ownership and Mortgage child or subtype representation.
- Derived read models, dashboard values, amortization schedules, and projections may be rebuilt from source data and formulas.
- Migration scripts must not create a new Mortgage aggregate root unless the catalog is changed first.
- Historical inconsistencies should be documented as remediation items instead of silently inventing new states.

## Consistency Verification

- Verify Mortgage remains catalog-aligned with Entity Catalog, Aggregate Catalog, Command Catalog, Domain Event Catalog, Repository Catalog, Application Service Catalog, Service Catalog, API Governance, and database design.
- Verify commands such as `CreateLoan`, `RecordLoanPayment`, and `RefinanceLoan` remain Loan-owned where cataloged.
- Verify domain events such as `LoanCreated`, `LoanPaymentRecorded`, and `LoanRefinanced` remain catalog-aligned.
- Verify Mortgage persistence, DTO, API, and EF Core mappings do not change aggregate ownership.
- Verify scenario, affordability, refinance, and cash flow outputs remain derived or decision-support data.

## Completion Checklist

- Document Control, Catalog Alignment Summary, Entity Overview, Aggregate Boundary, Lifecycle, Ownership, Relationships, Navigation, Complete Properties, Mortgage Monetary Semantics, Mortgage Interest Model, Mortgage Repayment Model, Grace Period Model, Collateral Reference Model, Validation Rules, Business Rules, Aggregate Invariants, State Machine, Commands, Domain Events, Repository, Domain Service Interaction, Application Service Interaction, REST API, DTO, Database Mapping, PostgreSQL DDL, EF Core Fluent API, Cache Strategy, Security, Audit, Observability, Performance, Example JSON, Mermaid, Testing, Edge Cases, Error Catalog, Data Migration, Consistency Verification, Final Consistency Matrix, and Version History are complete in the parent specification.

## Related References

- [Mortgage Entity Specification](../Mortgage.md)
- [Mortgage persistence and API](persistence-and-api.md)
- [Mortgage governance and testing](governance-and-testing.md)
- [Loan persistence and verification](../loan/persistence-and-verification.md)
