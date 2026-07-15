# Asset Valuation and Reporting

## Purpose

This split document isolates Asset valuation, liquidity, projection, and reporting boundaries from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## Valuation Rules

- Asset market value is an input or snapshot, not real-time price discovery.
- Asset valuation results are produced by calculation or valuation flow.
- Valuation may be persisted as a snapshot or projection when needed for reporting.
- Money values must use `Money` and `Currency` concepts instead of database-specific money types.

## Reporting Rules

- Asset projection and reporting are read models.
- Read models are not Asset source of truth.
- Asset allocation is calculated by Portfolio or AllocationService.
- CashFlow consumption happens through catalog events and read models.

## Related References

- [Asset Entity Specification](../Asset.md)
- [Portfolio Supporting Document](../../supporting/portfolio.md)
- [Financial Formula Catalog](../../catalog/financial-formula-catalog.md)
- [Calculation Engine Framework](../../engine/calculation-engine-framework.md)
