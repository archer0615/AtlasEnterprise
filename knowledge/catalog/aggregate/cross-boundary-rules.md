# Aggregate Cross-Boundary Rules

## Purpose

This split document isolates cross-aggregate interaction, lifecycle, repository, command, event, persistence, API, security, audit, performance, and concurrency rules from the larger Aggregate Catalog.

## Source

- Parent specification: [Aggregate Catalog](../aggregate-catalog.md)

## Cross-Aggregate Interaction Rules

- Aggregates must not mutate another aggregate directly.
- Cross-aggregate workflows must use Application Services, Domain Events, or process orchestration.
- A transaction may modify only one aggregate unless an explicit documented exception exists.
- Read models may combine data from multiple aggregates but must not become mutation owners.
- Entity references across aggregates are identity references, not ownership transfers.
- Repository methods must load and persist the aggregate they own.

## Aggregate Lifecycle Rules

- Aggregate creation must be performed by the aggregate's command owner.
- Aggregate state transitions must preserve aggregate invariants before persistence.
- Archive and delete behavior must follow the owning aggregate, repository, and audit boundary.
- Child entities cannot outlive the aggregate that owns their lifecycle unless catalog ownership explicitly says otherwise.
- Scenario, recommendation, dashboard, and reporting views are projection concerns, not lifecycle owners.

## Repository, Command, and Event Ownership

- Each repository is aligned to one aggregate ownership boundary.
- Commands are routed to the aggregate that owns the lifecycle being changed.
- Domain Events are published by the aggregate responsible for the business fact.
- Command handlers must not invent new aggregate names, child aggregate roots, or repository ownership.
- Event handlers may update projections or trigger workflows but must not bypass aggregate consistency rules.

## Persistence, API, Security, and Audit Boundaries

- Persistence ownership follows the aggregate source of truth.
- API ownership follows the aggregate or application service boundary responsible for the command or query.
- Authorization checks must enforce the owning aggregate's household, tenant, and actor boundary.
- Audit records must identify aggregate identity, command or event cause, actor, timestamp, and relevant state transition.
- Read-side denormalization must remain traceable to aggregate sources.

## Performance and Concurrency

- Aggregates are the concurrency boundary for writes.
- Optimistic concurrency must protect aggregate version changes where concurrent writes are possible.
- Query optimization may use projections, cache, or read models without changing write ownership.
- Bulk operations must preserve aggregate-level validation and auditability.

## Related References

- [Aggregate Catalog](../aggregate-catalog.md)
- [Aggregate ownership mapping](../aggregate-catalog/ownership-mapping.md)
- [Aggregate governance and testing](../aggregate-catalog/governance-and-testing.md)
