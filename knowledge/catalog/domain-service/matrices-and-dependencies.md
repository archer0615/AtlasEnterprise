# Domain Service Matrices and Dependencies

## Purpose
This split document isolates domain service matrices and dependency mapping from the parent Domain Service Catalog.

## Source
- Parent specification: [Domain Service Catalog](../domain-service-catalog.md)

## Matrices
Matrices include service ownership, aggregate, entity, repository, rule, engine, dependency, value object, enumeration, calculation engine, rule engine, projection engine, simulation engine, optimization engine, business capability, calculation, validation, decision, projection, optimization, and simulation mapping.

## Dependency Rules
Domain service dependencies must preserve aggregate ownership, avoid persistence orchestration, and keep calculation/rule behavior deterministic.

