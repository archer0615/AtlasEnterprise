# Asset Classification and Risk

## Purpose

This split document isolates Asset classification and risk rules from the larger Asset entity specification.

## Source

- Parent specification: [Asset Entity Specification](../Asset.md)

## Classification Rules

- AssetType must come from the catalog-approved `AssetType` enumeration.
- Currency must use `CurrencyCode`.
- Unknown AssetType and CurrencyCode values must be rejected.
- Asset class is an implementation detail unless a catalog formalizes it.

## Risk Rules

- RiskLevel is catalog-approved when used.
- Liquidity classification is metadata or projection output and must not create a new enumeration here.
- Risk scoring should be computed by PortfolioService, AllocationService, or RiskService.
- Asset risk signals can feed Scenario, Decision, and Recommendation flows.

## Related References

- [Asset Entity Specification](../Asset.md)
- [Risk Framework](../../framework/risk-framework.md)
- [Enumeration Catalog](../../catalog/enumeration-catalog.md)
- [Value Object Catalog](../../catalog/value-object-catalog.md)
