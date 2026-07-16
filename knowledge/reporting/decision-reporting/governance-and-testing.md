# Decision Reporting Governance and Testing

## Purpose

This split document isolates Decision Reporting validation, business rules, repository, services, API, persistence, cache, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/reporting/decision-reporting.md` parent.

## Covered Sections

- Validation Rules
- Business Rules
- Repository
- Domain Service Interaction
- Application Service Interaction
- API
- DTO
- Database Mapping
- PostgreSQL Schema
- EF Core Mapping
- Cache Strategy
- Security
- Audit
- Performance
- Example JSON
- Mermaid
- Testing
- Edge Cases
- Version History

## Governance Rules

- Decision report access must enforce permission and audit controls before rendering, exporting, sharing, or scheduling.
- Report cache invalidation must preserve decision evidence freshness.
- Retention and versioning must keep historical reports reproducible.
- Testing must include export, schedule, concurrency, permission, performance, and stress coverage.
