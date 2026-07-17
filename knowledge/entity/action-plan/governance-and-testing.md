> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ActionPlan Governance and Testing

## Purpose

This split document isolates ActionPlan repository, API, persistence, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/ActionPlan.md` parent.

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

- ActionPlanRepository loads ActionPlan records and history without cascading cross-aggregate changes.
- Security must enforce User scope inherited through ExecutionPlan ownership.
- Audit must include assignment, start, pause, resume, completion, cancellation, archive, restore, deletion, and history.
- Performance checks must cover ordered task lists, dashboard summaries, and history retrieval.
