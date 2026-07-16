# Portfolio Drawdown Attribution

Document Path: knowledge/product/portfolio-drawdown-attribution.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Portfolio
Owner: Project Atlas
Source of Truth: Atlas Portfolio Drawdown Attribution Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines `FORM-DRAWDOWN-ATTRIBUTION`, the formula contract for explaining which holdings, asset classes, accounts, sectors, or risk factors contributed to a portfolio drawdown.

## Inputs

| Input | Required | Unit | Rule |
| --- | --- | --- | --- |
| PortfolioValueSeries | Yes | Money time series | Must include ordered valuation dates. |
| HoldingValueSeries | Yes | Money time series | Must reconcile to portfolio value by date. |
| ClassificationMap | Yes | Mapping | Maps holdings to asset class, sector, account, or factor. |
| BenchmarkSeries | No | Money or index series | Required for benchmark-relative attribution. |
| Currency | Yes | Currency | Must match valuation currency or include FX conversion. |
| Period | Yes | Date range | Defines drawdown window. |

## Formula

- PeakValue = maximum portfolio value before the trough within Period.
- TroughValue = minimum portfolio value after PeakValue within Period.
- MaxDrawdown = (TroughValue - PeakValue) / PeakValue.
- HoldingContribution = holding value change over drawdown window adjusted for cash flows.
- ClassificationContribution = sum HoldingContribution by classification bucket.
- ContributionShare = ClassificationContribution / total portfolio drawdown amount.

## Outputs

- Maximum drawdown percentage.
- Peak date and trough date.
- Drawdown amount.
- Contribution by holding.
- Contribution by asset class, account, sector, or factor.
- Recovery date when available.
- Formula version and source data references.

## Validation

- Reject unordered valuation dates.
- Reject missing holding reconciliation unless marked estimated.
- Reject zero or negative PeakValue.
- Contributions must reconcile to total drawdown within rounding tolerance.
- Replay must use the original classification map and formula version.

## Related Specifications

- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/framework/portfolio-performance-framework.md`
- `knowledge/framework/portfolio-performance/attribution-and-reporting.md`
- `knowledge/product/simulator-formula-coverage.md`
