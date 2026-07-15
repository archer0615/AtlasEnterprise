# Dashboard Widget Catalog

Version: 1.0

## Purpose
Defines the standard catalog of dashboard widgets used throughout Project Atlas. This catalog provides a reusable specification for all UI dashboard components and ensures consistency across Web, Mobile, and Reporting interfaces.

## Objectives
- Standardize dashboard widgets.
- Promote reusable UI components.
- Define data contracts for each widget.
- Enable configurable dashboards.

## Widget Categories

### Executive Summary
- Financial Health Score Card
- Net Worth Card
- Monthly Cash Flow Card
- Goal Progress Summary

### Assets & Liabilities
- Asset Allocation Pie Chart
- Net Worth Trend
- Asset Category Breakdown
- Liability Breakdown
- Housing Equity Card

### Cash Flow
- Monthly Income Trend
- Expense Breakdown
- Free Cash Flow Trend
- Savings Rate Gauge

### Liquidity
- Liquidity Score
- Emergency Fund Coverage
- Cash Reserve Status
- Liquidity Coverage Ratio

### Investment
- Portfolio Value
- Portfolio Performance
- Benchmark Comparison
- Allocation Drift
- Risk Budget Usage
- Dividend Income Trend

### Goals
- Goal Funding Progress
- Milestone Timeline
- Goal Priority Matrix
- Funding Gap Chart

### Housing
- Home Upgrade Readiness
- Mortgage Summary
- Housing Affordability
- Property Portfolio

### Retirement
- Retirement Readiness
- Withdrawal Forecast
- Retirement Timeline
- Income Replacement

### Scenarios
- Scenario Comparison Table
- Scenario Ranking
- Financial Projection
- Decision Score Comparison

### Alerts
- Financial Alerts
- Rule Violations
- Upcoming Actions
- Recommendation Feed

## Widget Metadata
Every widget defines:
- Widget ID
- Name
- Category
- Description
- Required permissions
- Data source
- Refresh interval
- Supported devices
- Visualization type

## Visualization Types
- KPI Card
- Table
- Line Chart
- Area Chart
- Bar Chart
- Pie Chart
- Gauge
- Timeline
- Heatmap
- Tree Map

## Business Rules
- Widgets are read-only.
- All widgets consume canonical data.
- Widgets never execute business calculations.
- Widgets respect user permissions.

## API Contract
Each widget exposes:
- Widget ID
- Title
- Data payload
- Metadata
- Last updated
- Drill-down endpoint

## Explainability
Each widget links to:
- Source framework
- Formula references
- KPI definitions
- Recommendation details

## Integration
Consumes:
- Financial Dashboard Metrics
- Financial Reporting Framework
- Decision Metrics Framework
- Financial Projection Framework

Produces:
- Web Dashboard
- Mobile Dashboard
- Executive Dashboard
- Printable Reports

## Testing
- Empty state
- Large datasets
- Permission filtering
- Mobile responsiveness
- Widget refresh
- Multi-currency display

## Future Enhancements
- Drag-and-drop layout
- User-customized widgets
- AI insight widgets
- Real-time streaming widgets
