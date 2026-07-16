# Repository Specification Patterns and Executable Addendum

## Purpose
This split document isolates repository specification patterns and the Phase 2 executable specification addendum from the parent Repository Catalog.

## Source
- Parent specification: [Repository Catalog](../repository-catalog.md)

## Specification Pattern Catalog
Repository specifications keep query behavior bounded, indexed, authorized, deterministic, and aligned with Aggregate ownership.

## Search Specification
- Search specifications must keep repository queries bounded, indexed, authorized, deterministic, and aligned with Aggregate ownership.
- Search specifications belong to query behavior and must not own business decision logic.

## Filter Specification
- Filter specifications must preserve authorized tenant and household scope where applicable.
- Filter specifications must remain aligned with Aggregate ownership and repository query boundaries.

## Sorting Specification
- Sorting specifications must keep query order deterministic.
- Sorting specifications must remain bounded by indexed repository query paths.

## Paging Specification
- Paging specifications must keep result windows bounded and deterministic.
- Paging specifications must preserve authorization and Aggregate ownership boundaries.

## Composite Specification
- Composite specifications combine approved query predicates without bypassing repository ownership.
- Composite specifications must remain deterministic and authorized.

## Business Specification
- Business specifications may shape query eligibility but must not move domain decision ownership into repositories.
- Business specifications must preserve Aggregate ownership, authorization, indexing, and determinism.

## Repository Operation Contract
| Field | Requirement |
|---|---|
| Aggregate | RepositoryOperation |
| Identity | operationId |
| Scope | repositoryName, tenantId optional, householdId optional |
| Inputs | repositoryContext, specification, unitOfWork, transactionPolicy, authorizationContext |
| Outputs | persistedState, queryResult, concurrencyResult, auditReference, cacheInvalidation |
| Boundary | Repositories persist and query data but do not own business decision logic. |

## Required Commands
| Command | Purpose |
|---|---|
| ValidateRepositoryContract | Validate repository catalog entry completeness. |
| ExecuteRepositoryQuery | Execute authorized specification-based query. |
| PersistAggregateChanges | Save aggregate changes within unit of work. |
| ArchiveRepositoryRecord | Archive record through catalog policy. |
| RestoreRepositoryRecord | Restore archived record through catalog policy. |
| InvalidateRepositoryCache | Invalidate cache keys after write or projection change. |
| ReplayRepositoryOperation | Rebuild operation behavior from audit and unit-of-work evidence. |

## Addendum Validation Rules
1. Repository entry must define aggregate, persistence owner, unit of work, transaction boundary, authorization, audit, and performance target.
2. Write repositories must enforce optimistic concurrency unless stricter locking is catalog-approved.
3. Query operations must use specifications with tenant and household filters where applicable.
4. Cache keys must include repository, aggregate identity, projection version, and scope.
5. Replay must preserve original authorization context, correlation id, causation id, and transaction evidence.

## Addendum Testing Matrix
| Scenario | Expected Result |
|---|---|
| Missing tenant filter on tenant-scoped query | Validation fails. |
| Optimistic concurrency conflict | Controlled conflict result is returned. |
| Archive record | Archive audit and cache invalidation are recorded. |
| Unauthorized repository query | Access is denied before query execution. |
| Replay operation | Persisted state or query result evidence matches original operation. |
