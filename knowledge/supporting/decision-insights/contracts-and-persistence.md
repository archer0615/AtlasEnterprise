> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Insight Contracts and Persistence

## Purpose
This split document isolates Decision Insight commands, domain events, repository, API, DTO, PWA Runtime Mapping / Future Cloud Mapping, cache, security, audit, performance, examples, diagrams, testing, and edge cases from the parent Decision Insights specification.

## Source
- Parent specification: [Decision Insights](../decision-insights.md)

## Commands
Insight commands include CreateInsight, UpdateInsight, RefreshInsight, GenerateInsight, DismissInsight, ResolveInsight, ArchiveInsight, RestoreInsight, DeleteInsight, GenerateInsightReport, and related existing domain commands.

## Domain Events
Domain events preserve insight lifecycle, evidence, recommendation mapping, reporting, resolution, dismissal, archive, restore, delete, audit, and cross-domain references without overriding source domain ownership.

## API and DTO
Future Cloud Architecture Endpoints, HTTP Methods, Request, Response, Errors, Pagination, Filtering, Sorting, Projection, Insight API, Report API, and Bulk API use Create DTO, Update DTO, Insight DTO, Evidence DTO, Recommendation DTO, Risk DTO, Summary DTO, Detail DTO, Search DTO, and Report DTO contracts.

## Persistence
Repository interface, methods, queries, filtering, sorting, aggregation, projection, specification, database table, columns, indexes, constraints, FK, unique, check constraint, partition strategy, Future Cloud Mapping schema, Future Cloud Mapping, and cache strategy preserve independent lifecycle, evidence collection, resolution state, audit trail, and repository identity.

## Operations
Security, authorization, permissions, field level security, data masking, audit history, batch generation, incremental detection, parallel processing, caching, materialized views, read optimization, example JSON, Mermaid diagrams, and tests support governed Decision Insight execution.
