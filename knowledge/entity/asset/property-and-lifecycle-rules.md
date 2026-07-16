# Asset Property and Lifecycle Rules

## Purpose

This split document isolates Asset property semantics, validation rules, business rules, aggregate invariants, and state machine behavior from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## Property Semantics

- `AssetId` is the stable identifier and must not be replaced by external references, display labels, or account references.
- `TenantId`, `HouseholdId`, and `OwnerUserId` preserve tenant, household, and user authorization boundaries.
- `PortfolioId` is optional and links Asset usage to Portfolio behavior without turning Asset into Position or Holding.
- `AssetName`, `DisplayName`, and `Description` are descriptive fields and must not carry classification or authorization meaning.
- `AssetType`, `AssetClass`, `Currency`, `LiquidityLevel`, and `Status` preserve catalog-aligned classification and implementation metadata boundaries.
- Monetary values such as `AcquisitionCost`, `CostBasis`, `BookValue`, `CurrentValue`, and `EstimatedValue` must use Money and Currency semantics and must not use PostgreSQL money type.

## Lifecycle Rules

- Asset lifecycle terms include active, inactive, archived, deleted, and valuation-related implementation states where supported.
- `IsActive` and `IsDeleted` are implementation flags and must remain consistent with status and soft-delete rules.
- Archive and restore flows must preserve auditability, household isolation, and original identity.
- Illegal transitions must not bypass aggregate invariants, authorization checks, or audit recording.

## Validation and Invariants

- Asset requires stable identity, household scope, valid currency, and catalog-aligned asset type.
- Money amounts must be non-negative unless a rule explicitly allows another value.
- Valuation dates must not imply real-time price discovery responsibility.
- AssetPortfolio ownership remains the aggregate boundary; Asset-specific rules must not create a standalone aggregate root.

## Related References

- [Asset Entity Specification](../Asset.md)
- [Asset identity and ownership](identity-and-ownership.md)
- [Asset classification and risk](classification-and-risk.md)
- [Asset valuation and reporting](valuation-and-reporting.md)
