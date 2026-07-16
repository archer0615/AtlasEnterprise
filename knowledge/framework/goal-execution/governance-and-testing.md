# Goal Execution Governance and Testing

## Purpose

This split document isolates Goal Execution repository, services, API, DTO, persistence, cache, security, audit, performance, examples, diagrams, testing, edge cases, version history, and Phase 2 addenda from the canonical `knowledge/framework/goal-execution-framework.md` parent.

## Covered Sections

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

- Execution persistence must preserve status, logs, result, retry, rollback, and recovery history.
- Security must enforce user, goal, and workflow permission boundaries.
- Audit must trace all execution commands, generated execution plans, progress synchronization, and notifications.
- Testing must include workflow, execution, recovery, stress, concurrency, and performance coverage.
