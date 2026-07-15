# Asset API and Audit

## Purpose

This split document isolates Asset API, permission, cache, and audit boundaries from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## API Rules

- `/api/v1/assets` is the frontend-facing Asset resource.
- Asset DTOs are implementation details and are not entities.
- User-facing Asset use cases route through PortfolioApplicationService.
- API behavior must follow API governance and permission framework rules.

## Permission and Audit Rules

- Asset permissions include read, create, and update behavior.
- Asset audit is handled through AssetPortfolio ownership.
- Audit records must remain append-only.
- Asset cache keys must be scoped by asset and portfolio context.

## Related References

- [Asset Entity Specification](../Asset.md)
- [API Governance Framework](../../api/api-governance-framework.md)
- [Permission Framework](../../security/permission-framework.md)
- [Audit Framework](../../security/audit-framework.md)
