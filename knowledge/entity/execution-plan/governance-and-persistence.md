> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ExecutionPlan Governance and Persistence

## Purpose

This split document isolates ExecutionPlan persistence, API, service interaction, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/ExecutionPlan.md` parent.

## Covered Sections

- Repository
- Domain Service Interaction
- Application Service Interaction
- API
- DTO
- PWA Runtime Mapping / Future Cloud Mapping
- Future Cloud Mapping Schema
- Future Cloud Mapping
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

- ExecutionPlan persistence must preserve Version and ConcurrencyToken boundaries.
- Security must enforce User scope and decision/recommendation execution authorization.
- Audit must trace planning, approval, start, pause, completion, failure, cancellation, archive, restore, and deletion.
- Performance checks must cover dashboard execution status, history, and action summary queries.
