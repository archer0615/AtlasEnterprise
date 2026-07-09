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
