# Risk Capacity Model

Version: 1.0

## Purpose
Defines how Project Atlas measures a user's objective ability to take financial risk. Unlike Risk Tolerance (behavioral preference), Risk Capacity is derived from measurable financial facts.

## Principles
- Objective and data-driven.
- Independent from market sentiment.
- Recalculated whenever material financial data changes.
- Used by the Decision Engine, Asset Allocation Framework, and Financial Health Score.

## Inputs
### Income
- Stable monthly income
- Income diversification
- Employment stability

### Cash Flow
- Savings rate
- Free cash flow
- Cash flow volatility

### Assets
- Liquid assets
- Investment assets
- Real estate equity

### Liabilities
- Mortgage balance
- Consumer debt
- Debt-to-income ratio

### Time Horizon
- Goal horizon
- Retirement horizon
- Expected investment duration

### Emergency Preparedness
- Emergency reserve months
- Insurance coverage
- Contingency planning

## Capacity Dimensions
1. Liquidity Capacity
2. Income Capacity
3. Debt Capacity
4. Investment Capacity
5. Time Capacity
6. Recovery Capacity

Each dimension is scored from 0–100.

## Overall Score
Weighted aggregate of all dimensions.

Suggested bands:
- 0–20 Very Low
- 21–40 Low
- 41–60 Moderate
- 61–80 High
- 81–100 Very High

## Business Rules
- Risk Capacity cannot exceed hard financial constraints.
- Low liquidity caps portfolio risk regardless of tolerance.
- High leverage reduces capacity.
- Longer investment horizons increase capacity.
- Capacity changes only after validated financial events.

## Decision Engine Usage
Risk Capacity influences:
- Asset Allocation
- Rebalancing
- Goal Prioritization
- Withdrawal Strategy
- Scenario Analysis

## Explainability
Recommendations must report:
- Overall score
- Dimension scores
- Key positive factors
- Limiting factors
- Resulting portfolio constraints

## KPIs
- Risk Capacity Score
- Liquidity Ratio
- Debt Burden
- Savings Rate
- Recovery Time Estimate

## Testing
- Young investor
- High-income / high-debt
- Low-income / high-assets
- Early retirement
- Market downturn
- Income interruption

## Future Enhancements
- Household risk capacity
- Bayesian score updates
- AI-assisted capacity estimation
- Country-specific calibration
