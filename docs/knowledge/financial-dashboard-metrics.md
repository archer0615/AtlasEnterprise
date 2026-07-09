# Financial Dashboard Metrics

Version: 1.0

## Purpose
Defines the canonical metrics displayed on the Project Atlas dashboard. This framework standardizes KPI presentation across all user interfaces and ensures every visual metric is traceable to a business definition.

## Objectives
- Present financial status at a glance.
- Surface actionable insights.
- Maintain consistency across Dashboard, Decision Engine and Reports.
- Provide explainable KPIs.

## Dashboard Principles
- Show only actionable metrics.
- Prefer trends over point-in-time values.
- Every metric links to its source framework.
- Support drill-down and historical analysis.

## Dashboard Sections

### Financial Health
- Financial Health Score
- Net Worth
- Net Worth Growth
- Financial Independence Ratio

### Cash Flow
- Monthly Income
- Monthly Expenses
- Free Cash Flow
- Savings Rate
- Passive Income Coverage

### Liquidity
- Liquidity Score
- Liquidity Coverage Ratio (LCR)
- Emergency Fund Coverage
- Months of Liquidity

### Assets & Liabilities
- Total Assets
- Total Liabilities
- Investable Assets
- Housing Equity
- Debt-to-Income Ratio

### Investment
- Portfolio Value
- Portfolio Return
- Allocation Drift
- Diversification Score
- Risk Budget Utilization

### Goals
- Goal Completion Rate
- Goal Funding Ratio
- Funding Gap
- Upcoming Milestones

### Housing
- Housing Affordability Score
- Mortgage Burden Ratio
- Home Equity Ratio
- Upgrade Readiness

### Retirement
- Retirement Readiness
- Sustainable Withdrawal Rate
- Income Replacement Ratio
- Portfolio Longevity

## Metric Metadata
Each metric includes:
- Metric ID
- Name
- Business definition
- Formula reference
- Unit
- Display format
- Refresh frequency
- Source framework
- Owner engine

## Alert Levels
- Normal
- Watch
- Warning
- Critical

Each level is driven by configurable thresholds.

## Business Rules
- Metrics are read-only.
- Historical values are immutable.
- Calculations use canonical ratio definitions.
- Dashboard never recalculates business logic independently.

## Explainability
Every metric supports:
- Formula reference
- Input values
- Historical trend
- Threshold evaluation
- Recommendation link

## Integration
Consumes:
- Financial Ratio Framework
- Net Worth Framework
- Financial Health Score
- Goal Funding Framework
- Liquidity Framework
- Risk Budget Framework

Produces:
- Dashboard UI
- Executive Reports
- Decision Engine insights

## KPIs
- Dashboard freshness
- Metric completeness
- Alert accuracy
- User interaction rate

## Future Enhancements
- Personalized dashboards
- AI-generated insights
- Benchmark comparison
- Household dashboards
