# Net Worth Framework

Version: 1.0

## Purpose
Defines the enterprise standard for calculating, tracking and analyzing net worth within Project Atlas. This framework is the single source of truth for all asset, liability and equity calculations.

## Objectives
- Standardize net worth calculations.
- Provide historical trend analysis.
- Support decision simulations.
- Supply consistent metrics to all engines.

## Formula

Net Worth =
Total Assets
- Total Liabilities

## Asset Categories
### Liquid Assets
- Cash
- Checking accounts
- Savings
- Money market funds

### Investment Assets
- Stocks
- ETFs
- Mutual funds
- Bonds
- Structured products

### Real Assets
- Primary residence
- Investment property
- Vehicles
- Precious metals

### Retirement Assets
- Pension
- Retirement accounts

### Other Assets
- Business equity
- Collectibles
- Other IPS-approved assets

## Liability Categories
- Mortgage
- Personal loans
- Margin loans
- Credit card balances
- Tax liabilities
- Other obligations

## Valuation Rules
- Market-traded assets use latest market value.
- Property uses configurable valuation model.
- Liabilities use outstanding principal plus accrued obligations.
- Unsupported assets require manual valuation.

## Inputs
- Asset inventory
- Liability inventory
- Market prices
- Exchange rates
- Property valuations
- Loan balances

## Derived Metrics
- Net Worth
- Investable Net Worth
- Liquid Net Worth
- Housing Equity
- Debt Ratio
- Asset Growth Rate
- Net Worth CAGR

## Snapshot Model
Each snapshot stores:
- Date
- Total Assets
- Total Liabilities
- Net Worth
- Category breakdown
- Valuation source

## Business Rules
- Every asset belongs to exactly one category.
- Every liability belongs to exactly one category.
- Historical snapshots are immutable.
- Valuation changes are fully auditable.

## Decision Engine Integration
Consumed by:
- Financial Health Score
- House Decision Framework
- Retirement Engine
- Scenario Engine
- Dashboard
- Capital Allocation Framework

## Explainability
Each calculation reports:
- Asset totals
- Liability totals
- Category contributions
- Valuation assumptions
- Historical comparison

## KPIs
- Net Worth
- Net Worth Growth
- Liquid Net Worth
- Investable Assets
- Debt-to-Net-Worth Ratio
- Asset Allocation by Category

## Testing
- Single asset household
- Multi-property household
- Negative net worth
- Multi-currency portfolio
- Rapid market movement
- Historical restatement protection

## Future Enhancements
- Real-time valuation feeds
- Household consolidation
- Predictive net worth forecasting
- AI anomaly detection
