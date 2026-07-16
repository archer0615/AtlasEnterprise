# Entity Security, Audit, and Performance

## Purpose

This split document isolates Entity Catalog rules for security, audit, performance, validation, business rules, testing, and edge cases.

## Source

- Parent specification: [Entity Catalog](../entity-catalog.md)

## Security Rules

- Entity access must respect aggregate ownership and the household or tenant boundary defined by the owning aggregate.
- Navigation properties do not grant authorization and do not change ownership.
- Cross-entity reads must be mediated by the appropriate repository, application service, projection, or API boundary.
- Entity mutation commands must validate actor permissions before state changes are persisted.
- Sensitive financial, identity, policy, and configuration entities require traceable authorization decisions.

## Audit Rules

- Auditable entity changes must capture the owning aggregate, entity identity, actor, timestamp, command or service cause, and material state transition.
- Audit ownership follows the aggregate boundary, not UI workflow convenience.
- Projection refresh, scenario simulation, and recommendation generation may be recorded as derived activity but must not replace aggregate event history.
- Delete, archive, restore, and policy/configuration changes require explicit audit records.

## Performance and Concurrency

- Entity writes use the owning aggregate as the concurrency boundary.
- Read models may denormalize entity data for dashboards, reports, projections, and scenario analysis.
- Denormalized reads must not become the source of truth for entity mutation.
- Navigation loading must avoid implicit ownership assumptions and uncontrolled aggregate traversal.
- Cache entries must be invalidated or refreshed from aggregate-owned changes.

## Validation and Business Rules

- Entity validation must enforce identity, lifecycle state, ownership, persistence mapping, API mapping, and command/event alignment.
- Business rules must not create entities, aggregate roots, commands, events, repositories, or bounded contexts not present in the catalogs.
- Entity relationships are catalog-controlled and must not be inferred from DTO shape, table joins, or navigation convenience.
- Implementation gaps should be marked as catalog gaps instead of adding product behavior.

## Testing and Edge Cases

- Tests must cover ownership boundaries, command routing, event mapping, persistence mapping, authorization, audit, and concurrency behavior.
- Edge cases include stale projections, invalid cross-aggregate navigation, deleted owners, archived entities, duplicate identity, unsupported status values, and missing catalog mappings.
- Consistency tests should verify that Entity Catalog, Aggregate Catalog, Repository Catalog, Command Catalog, Domain Event Catalog, API mapping, and database mapping remain aligned.

## Related References

- [Entity Catalog](../entity-catalog.md)
- [Entity relationships and ownership](../entity-catalog/relationships-and-ownership.md)
- [Entity governance and testing](../entity-catalog/governance-and-testing.md)
