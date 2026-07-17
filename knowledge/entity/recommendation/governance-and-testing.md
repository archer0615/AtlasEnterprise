> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Governance and Testing

## Purpose

This split document isolates Recommendation API, persistence, cache, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/Recommendation.md` parent.

## Covered Sections

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

- Recommendation security must enforce Household/User scope and decision access boundaries.
- Audit must preserve scoring, rationale, explainability reference, assignment, acceptance, rejection, expiration, archive, and deletion.
- Testing must cover stale recommendation prevention, explainability presence, score ordering, and execution handoff.
