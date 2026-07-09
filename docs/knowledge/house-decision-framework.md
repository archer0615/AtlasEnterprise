# House Decision Framework

Version: 1.0

## Purpose
Defines the decision framework used by Project Atlas to evaluate housing-related decisions, including purchasing, upgrading, retaining, or selling residential property.

## Objectives
- Support objective housing decisions.
- Balance lifestyle, cash flow, and long-term wealth.
- Produce explainable recommendations.
- Integrate housing decisions with the overall financial plan.

## Supported Decision Types
- First Home Purchase
- Home Upgrade
- Retain Existing Home
- Sell Existing Home
- Buy Before Selling
- Sell Before Buying
- Investment Property Purchase
- Mortgage Refinancing

## Decision Inputs

### Financial
- Household income
- Free cash flow
- Existing mortgage
- Down payment
- Emergency reserve
- Debt-to-income ratio
- Financial Health Score

### Property
- Current market value
- Purchase price
- Estimated appreciation
- Transaction costs
- Maintenance costs
- Rental potential

### Personal
- Family size
- Commute requirements
- Life Stage
- Future housing plans
- Target retirement age

### Market
- Mortgage rates
- Housing price trends
- Inflation assumptions
- Market liquidity

## Evaluation Dimensions
1. Affordability
2. Cash Flow Impact
3. Net Worth Impact
4. Liquidity Impact
5. Risk Exposure
6. Goal Alignment
7. Lifestyle Benefit

Each dimension is normalized to a 0–100 score.

## Decision Process
1. Validate financial constraints.
2. Evaluate affordability.
3. Simulate cash flow.
4. Estimate long-term net worth.
5. Compare scenarios.
6. Rank alternatives.
7. Generate explainable recommendation.

## Recommendation Types
- Strongly Recommended
- Recommended
- Neutral
- Caution
- Not Recommended

## Business Rules
- Emergency reserve cannot be compromised.
- Housing costs must remain within IPS limits.
- Mandatory goals take precedence over discretionary upgrades.
- Mortgage sustainability must pass stress testing.
- Large housing decisions trigger scenario analysis.

## Outputs
- Recommended option
- Financial impact summary
- Cash flow projection
- Net worth projection
- Mortgage analysis
- Risk summary
- Explanation report

## Integration
Consumes:
- Cash Flow Engine
- Loan Engine
- Financial Health Score
- Goal Prioritization
- Life Stage Model
- Scenario Framework

Produces:
- Home Upgrade Engine
- Decision Engine
- Dashboard Insights

## KPIs
- Housing Cost Ratio
- Mortgage Burden Ratio
- Net Worth Growth
- Liquidity Coverage
- Goal Achievement Impact
- Housing Affordability Score

## Testing
- First-time buyer
- Home upgrade
- Buy vs. rent
- Keep vs. sell existing home
- High interest rate environment
- Income reduction scenario

## Future Enhancements
- Regional housing models
- AI-assisted recommendation
- Property valuation integration
- Tax-aware housing optimization
