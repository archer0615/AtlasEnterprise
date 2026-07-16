# Integration Architecture Overview

This split document summarizes the architecture overview from the parent Integration Framework specification. The parent document remains the canonical source of truth.

## Scope

- External integration.
- Internal integration.
- REST, webhook, message, file, ETL, import, export, and synchronization patterns.
- Adapter, gateway, facade, and anti corruption layer boundaries.

## Integration Architecture

External or internal systems interact with Atlas only through API Governance, Message Contract Catalog, Event Driven Architecture, Integration Framework adapters, or catalog-approved file exchange. Domain Services and Aggregates do not call external systems directly.

## Integration Principles

- Integrations use catalog-approved source and target systems.
- External payloads are translated through adapter or anti corruption layer before domain use.
- All integration calls require authentication, authorization, retry, timeout, audit, monitoring, and versioning.
- Integration failures must not corrupt Aggregate state.
- Secrets are managed outside payloads and rotated according to security rules.
- Integration contracts are versioned and observable.

## Boundary Rules

- REST and external API traffic must follow API Governance.
- Event-driven integrations must use Message Contract Catalog and Event Driven Architecture rules.
- File exchange must be catalog-approved.
- Adapter and anti corruption layer behavior must protect domain models from external payload shape.
- Gateways and facades may coordinate integration access, but Domain Services and Aggregates must not call external systems directly.

## Related References

- [Parent specification](../integration-framework.md)
- [Integration catalog](catalog.md)
- [Integration resilience and security](resilience-and-security.md)
- [Integration exchange strategies](exchange-strategies.md)
