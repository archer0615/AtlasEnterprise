# Goal Dashboard Implementation and Governance

## Purpose

This split document isolates Goal Dashboard commands, events, persistence, APIs, DTOs, storage mappings, cache, security, audit, performance, examples, diagrams, tests, edge cases, and executable addendum from the canonical `knowledge/reporting/goal-dashboard.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-dashboard.md`
- Domain: Goal dashboard
- Status: Enterprise Specification

## Covered Sections

- Commands and Domain Events
- Repository, Domain Service Interaction, Application Service Interaction, API, and DTO
- Database Mapping, PostgreSQL Schema, EF Core Mapping, and Cache Strategy
- Security, Audit, Performance, Example JSON, Mermaid, Testing, Edge Cases, Version History, and Phase 2 Executable Specification Addendum

## Boundary Rules

- Commands and APIs must preserve dashboard ownership, widget configuration, permission filtering, export safety, and audit evidence.
- Repository and cache behavior must distinguish dashboard definitions, widget configuration, snapshots, projections, exports, and sharing records.
- Tests must cover rendering contract, widget configuration, refresh behavior, cache invalidation, permission filtering, export behavior, and executable addendum command contracts.
