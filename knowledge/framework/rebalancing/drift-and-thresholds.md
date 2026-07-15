# Rebalancing Drift and Thresholds

## Purpose

This split document isolates drift detection and threshold rules from the larger Rebalancing Framework.

## Source

- Parent specification: [Rebalancing Framework](../rebalancing-framework.md)

## Drift Rules

- Drift detection compares current allocation with target allocation.
- Drift should preserve asset class, portfolio, and household scope.
- Drift calculations must remain deterministic for the same holdings and prices.

## Threshold Rules

- Rebalancing thresholds should prevent unnecessary trading.
- Threshold breaches should identify asset class, target, current value, and deviation.
- Threshold policy must account for risk, tax, and transaction cost constraints.

## Related References

- [Asset Allocation Framework](../asset-allocation-framework.md)
- [Portfolio Performance Framework](../portfolio-performance-framework.md)
- [Risk Budget Framework](../risk-budget-framework.md)
