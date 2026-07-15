# Asset Allocation Drift and Scenarios

## Purpose

This split document isolates drift and scenario behavior from the larger Asset Allocation Framework.

## Source

- Parent specification: [Asset Allocation Framework](../asset-allocation-framework.md)

## Drift Rules

- Drift is measured against target allocation.
- Drift must identify asset class, current allocation, target allocation, and threshold status.
- Drift outputs may feed rebalancing and recommendation workflows.

## Scenario Rules

- Allocation scenarios should compare baseline, stressed, and proposed alternatives.
- Scenario outputs must preserve assumption and formula versions.
- Dashboard summaries must not replace allocation source policy.

## Related References

- [Rebalancing Drift and Thresholds](../rebalancing/drift-and-thresholds.md)
- [Portfolio Stress and Dashboard](../../supporting/portfolio/stress-and-dashboard.md)
- [Simulator Formula Implementation Report](../../../docs/roadmap/simulator-formula-implementation-report.md)
