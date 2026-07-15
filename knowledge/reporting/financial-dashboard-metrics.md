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

## Phase 2 Executable Specification

### Metric Object Contract

| Field | Required | Description |
|-------|----------|-------------|
| MetricId | Yes | Canonical metric identifier |
| HouseholdId | Yes | Owning household |
| MetricCategory | Yes | Financial Health, Cash Flow, Liquidity, Assets, Investment, Goals, Housing, Retirement |
| Value | Yes | Calculated metric value |
| Unit | Yes | Currency, Ratio, Percentage, Count, Score |
| AsOfDate | Yes | Effective date |
| FormulaVersion | Yes | Formula version used |
| SourceSnapshotId | Yes | Source data snapshot |
| AlertLevel | Yes | Normal, Watch, Warning, Critical |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| GenerateDashboardMetrics | DashboardApplicationService | DashboardMetricsGenerated |
| RefreshMetricSnapshot | DashboardApplicationService | MetricSnapshotRefreshed |
| PublishMetricDefinition | GovernanceApplicationService | MetricDefinitionPublished |
| ValidateMetricCompleteness | DashboardApplicationService | MetricCompletenessValidated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| DashboardMetricsGenerated | Metric set created | Dashboard, Reporting |
| MetricSnapshotRefreshed | New snapshot available | Dashboard, Alert Engine |
| MetricThresholdBreached | Metric alert level changes | Alert, Notification |
| MetricDefinitionPublished | New or updated metric definition | Formula Engine, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FDM-VR-001 | Every metric must reference a canonical formula or source framework. | Reject metric |
| FDM-VR-002 | Dashboard must not calculate business logic independently. | Reject implementation |
| FDM-VR-003 | Historical metric snapshots are immutable. | Reject update |
| FDM-VR-004 | Alert level must be derived from configured thresholds. | Reject metric |
| FDM-VR-005 | Metric refresh must record source snapshot and formula version. | Reject publish |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/dashboard/metrics | GET | Retrieve dashboard metrics | Dashboard:Read |
| /api/v1/dashboard/metrics/refresh | POST | Refresh metric snapshot | Dashboard:Refresh |
| /api/v1/dashboard/metrics/{metricId}/history | GET | Retrieve metric history | Dashboard:Read |
| /api/v1/dashboard/metrics/{metricId}/explanation | GET | Retrieve metric explanation | Dashboard:Read |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing formula reference | Metric is rejected |
| Stale source snapshot | Dashboard freshness KPI is degraded |
| Threshold breach | MetricThresholdBreached event is emitted |
| Historical metric read | Original value and version metadata are returned |
| Drill-down request | Formula, inputs, trend, and threshold are returned |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
