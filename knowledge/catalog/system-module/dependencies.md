# System Module Dependencies

## Purpose
This split document isolates system module dependency mapping from the parent System Module Catalog.

## Source
- Parent specification: [System Module Catalog](../system-module-catalog.md)

## Dependency Scope
Dependencies include module-to-module calls, event subscriptions, external integrations, background jobs, schedulers, automations, repositories, shared value objects, and reporting projections.

## Boundary Rules
Modules must preserve explicit ownership, avoid hidden cross-module writes, and expose integrations through approved APIs, events, or message contracts.

