# Repository Method Catalog

## Purpose
This split document isolates the Complete Repository Methods section from the parent Repository Catalog while preserving the parent document as the canonical full specification.

## Source
- Parent specification: [Repository Catalog](../repository-catalog.md)

## Split Scope
- UserRepository methods
- HouseholdRepository methods
- AssetRepository methods
- LiabilityRepository methods
- GoalRepository methods
- PortfolioRepository methods
- LoanRepository methods
- PropertyRepository methods
- ScenarioRepository methods
- DecisionRepository methods
- NotificationRepository methods
- AuditRepository methods

## Method Families
Each repository method family preserves the parent catalog terminology for GetById, GetByHouseholdId, FindBySpecification, ListPaged, Exists, Add, Update, Archive, Restore, SaveChanges, GetProjection, and StreamBySpecification.

## Contract Coverage
The method catalog keeps method ownership distinct from repository definition metadata. It covers aggregate persistence access, query methods, specifications, projections, concurrency handling, transaction participation, and storage mapping.

## Extraction Rationale
The parent Repository Catalog is large because repository definitions and repeated method contracts are both present. This split gives method readers a focused entry point without deleting or altering the original Complete Repository Methods content.

## Preservation Rule
Do not remove or rewrite the parent Repository Catalog body from this split. This child document is a navigation and ownership slice for the existing canonical content.
