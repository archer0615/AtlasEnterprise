# Recommendation Governance and Testing

## Purpose

This split document isolates Recommendation API, persistence, cache, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/Recommendation.md` parent.

## Covered Sections

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

- Recommendation security must enforce Household/User scope and decision access boundaries.
- Audit must preserve scoring, rationale, explainability reference, assignment, acceptance, rejection, expiration, archive, and deletion.
- Testing must cover stale recommendation prevention, explainability presence, score ordering, and execution handoff.
