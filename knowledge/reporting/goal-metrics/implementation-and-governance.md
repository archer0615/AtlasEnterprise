# Goal Metrics Implementation and Governance

## Purpose

This split document isolates Goal Metrics commands, events, persistence, APIs, DTOs, storage mappings, cache, security, audit, performance, examples, diagrams, tests, edge cases, and executable addendum from the canonical `knowledge/reporting/goal-metrics.md` parent.

## Canonical Parent

- Parent: `knowledge/reporting/goal-metrics.md`
- Domain: Goal metrics
- Status: Enterprise Specification

## Covered Sections

- Commands and Domain Events
- Repository, Domain Service Interaction, Application Service Interaction, API, and DTO
- Database Mapping, PostgreSQL Schema, EF Core Mapping, and Cache Strategy
- Security, Audit, Performance, Example JSON, Mermaid, Testing, Edge Cases, Version History, and Phase 2 Executable Specification Addendum

## Boundary Rules

- Commands and APIs must preserve HouseholdId, TenantId when applicable, authorization, audit evidence, and calculation source versions.
- Repository and cache behavior must distinguish metric definitions, current metric values, historical values, projections, trends, and forecasts.
- Tests must cover deterministic calculation, validation, refresh behavior, concurrency, performance, and executable addendum command contracts.
