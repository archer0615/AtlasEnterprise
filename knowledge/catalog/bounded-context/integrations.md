# Bounded Context Integrations

## Purpose
This split document isolates bounded context integration, command, event, repository, API, and message relationships from the parent Bounded Context Catalog.

## Source
- Parent specification: [Bounded Context Catalog](../bounded-context-catalog.md)

## Integration Scope
Integration covers context-to-context messages, domain events, application service orchestration, query projections, reporting feeds, workflow interactions, automation triggers, and external dependencies.

## Boundary Rules
Contexts must integrate through explicit APIs, commands, events, messages, or projections without bypassing aggregate ownership boundaries.

