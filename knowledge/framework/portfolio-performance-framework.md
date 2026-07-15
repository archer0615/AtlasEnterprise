# Portfolio Performance Framework

Version: 1.0

## Purpose
Defines the enterprise standard for measuring, comparing and explaining portfolio performance across Project Atlas.

## Objectives
- Standardize performance calculations.
- Separate investment skill from market movement.
- Enable benchmarking.
- Support Decision Engine and Dashboard.

## Performance Principles
- Time-weighted by default.
- Money-weighted when investor cash flows matter.
- Fully auditable.
- Versioned assumptions.

## Supported Metrics

### Return Metrics
- Time-Weighted Return (TWR)
- Money-Weighted Return (MWR)
- IRR
- XIRR
- CAGR
- Annualized Return

### Risk Metrics
- Volatility
- Downside Volatility
- Maximum Drawdown
- Recovery Time

### Risk-Adjusted Metrics
- Sharpe Ratio
- Sortino Ratio
- Information Ratio
- Treynor Ratio
- Alpha
- Beta

### Benchmark Metrics
- Active Return
- Tracking Error
- Benchmark Relative Return

### Income Metrics
- Dividend Yield
- Income Growth
- Yield on Cost

## Required Inputs
- Portfolio valuation history
- Transactions
- Cash flows
- Benchmark data
- Risk-free rate
- Market assumptions

## Calculation Frequency
- Daily
- Monthly
- Quarterly
- Annual
- Since Inception

## Business Rules
- TWR ignores external cash flows.
- XIRR is used for irregular cash flows.
- Benchmark must match portfolio policy.
- Historical performance is immutable.

## Outputs
- Performance summary
- Benchmark comparison
- Risk-adjusted metrics
- Attribution summary
- Performance trend

## Explainability
Include:
- Formula version
- Input period
- Cash-flow adjustments
- Benchmark used
- Key contributors

## Integration
Consumes:
- Asset Allocation Framework
- Rebalancing Framework
- Financial Ratio Framework
- Market Assumptions

Produces:
- Dashboard
- Investment Engine
- Decision Engine
- Financial Reporting Framework

## KPIs
- Annualized Return
- Sharpe Ratio
- Maximum Drawdown
- Alpha
- Beta
- Benchmark Outperformance

## Testing
- Buy-and-hold
- Monthly contributions
- Dividend portfolio
- Multi-currency portfolio
- Severe market downturn
- Benchmark changes

## Future Enhancements
- Brinson attribution
- Factor exposure analysis
- ESG performance
- AI performance diagnostics

## Phase 2 Executable Specification

### Portfolio Performance Calculation Contract

| Field | Requirement |
|---|---|
| Aggregate | PortfolioPerformanceRun |
| Identity | performanceRunId |
| Scope | tenantId, householdId, portfolioId, period |
| Inputs | valuationHistory, transactions, cashFlows, benchmarkData, riskFreeRate, formulaVersion |
| Outputs | returnMetrics, riskMetrics, benchmarkMetrics, attributionSummary, explainabilityReport |
| Determinism | Same inputs and formula versions must produce identical metrics. |

### Required Commands

| Command | Purpose |
|---|---|
| CalculatePortfolioPerformance | Calculate performance metrics for a portfolio and period. |
| ComparePortfolioBenchmark | Compare portfolio result against benchmark. |
| PublishPerformanceSnapshot | Freeze calculated result for reporting. |
| RecalculatePerformanceSnapshot | Recalculate after approved correction. |
| ReplayPerformanceCalculation | Rebuild historical performance result from stored inputs and formula versions. |

### Domain Events

| Event | Trigger |
|---|---|
| PortfolioPerformanceCalculated | Metrics are calculated. |
| PortfolioBenchmarkCompared | Benchmark comparison completes. |
| PortfolioPerformanceSnapshotPublished | Snapshot is frozen for reporting. |
| PortfolioPerformanceRecalculated | Corrected calculation is completed. |
| PortfolioPerformanceCalculationReplayed | Historical result is reproduced. |

### Validation Rules

1. Calculation period must have start date and end date.
2. Benchmark must match portfolio policy and base currency.
3. TWR, MWR, IRR, and XIRR must reference formulaVersion.
4. Published snapshots cannot be overwritten.
5. Replay must fail when valuation history, benchmark data, or formula version is missing.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/portfolios/{portfolioId}/performance/calculate | POST | Calculate performance. |
| /api/portfolios/{portfolioId}/performance/{performanceRunId} | GET | Retrieve performance result. |
| /api/portfolios/{portfolioId}/performance/{performanceRunId}/publish | POST | Publish snapshot. |
| /api/portfolios/{portfolioId}/performance/{performanceRunId}/benchmark | POST | Compare benchmark. |
| /api/portfolios/{portfolioId}/performance/{performanceRunId}/replay | POST | Replay calculation. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| Buy-and-hold portfolio | TWR matches valuation path. |
| Irregular contributions | XIRR is calculated with dated cash flows. |
| Benchmark mismatch | Validation fails. |
| Published snapshot correction | Recalculation creates auditable corrected result. |
| Replay performance | Metrics match original output. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
