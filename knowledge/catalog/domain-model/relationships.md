# Domain Model Relationships

## Purpose
This split document isolates domain model relationship, dependency, and ownership mapping rules from the parent Domain Model Catalog.

## Source
- Parent specification: [Domain Model Catalog](../domain-model-catalog.md)

## Relationship Scope
Relationships cover aggregate references, entity dependencies, command routing, event publication, repository access, service orchestration, read projections, and reporting dependencies.

## Mapping Rules
Mappings must preserve canonical ownership, avoid cross-aggregate mutation, and keep dashboard or report projections separate from source-of-truth domain state.

