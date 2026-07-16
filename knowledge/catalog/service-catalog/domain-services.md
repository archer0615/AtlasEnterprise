# Service Catalog Domain Services

## Purpose
This split document isolates domain service entries from the parent Service Catalog.

## Source
- Parent specification: [Service Catalog](../service-catalog.md)

## Domain Service Scope
Domain services own domain calculation, validation, scoring, lifecycle rule evaluation, policy enforcement, and cross-entity domain logic that does not belong inside a single entity.

## Catalog Usage
Each domain service entry must preserve ownership, inputs, outputs, invariants, dependencies, side-effect boundaries, and related aggregate ownership.

