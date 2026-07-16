# Goal Reporting Governance and Testing

## Purpose

This split document isolates Goal Reporting validation, business rules, repository, services, API, persistence, cache, security, audit, performance, examples, diagrams, testing, edge cases, version history, and Phase 2 addenda from the canonical `knowledge/reporting/goal-reporting.md` parent.

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
- Phase 2 Executable Specification Addendum

## Governance Rules

- Goal report access must enforce user and goal ownership scope.
- Export and schedule APIs must preserve audit and retention rules.
- Cache refresh must not make stale progress, milestone, or forecast values appear current.
- Testing must include progress, export, schedule, load, concurrency, and permission coverage.
