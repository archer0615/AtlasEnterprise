# Home Upgrade Rule Catalog

Version: 1.0

## Purpose
Defines the business rules governing home upgrade decisions within Project Atlas.

## Scope
Supported scenarios:
- Keep existing home and buy another
- Sell then buy
- Buy then sell
- Mortgage refinancing
- Equity release
- Investment property conversion

## Rule Categories

### HUR-001 Liquidity Protection (Critical)
Do not approve a home upgrade if post-transaction liquidity falls below the minimum required threshold.

### HUR-002 Emergency Fund Preservation (Critical)
Emergency fund must remain compliant with the Emergency Fund Framework.

### HUR-003 Affordability Validation (Critical)
Projected housing payments must satisfy IPS affordability limits.

### HUR-004 Debt Capacity
New borrowing must remain within approved debt and risk capacity.

### HUR-005 Goal Protection
Funding reserved for mandatory goals cannot be redirected to discretionary housing upgrades.

### HUR-006 Retirement Protection
Retirement funding minimums must not be violated.

### HUR-007 Cash Flow Sustainability
Monthly free cash flow must remain positive under baseline assumptions.

### HUR-008 Stress Test
Evaluate affordability under:
- Interest rate increase
- Income reduction
- Unexpected expenses

### HUR-009 Existing Property Evaluation
Compare:
- Retain and rent
- Retain vacant
- Sell immediately
using long-term net worth and cash-flow projections.

### HUR-010 Scenario Comparison
Rank all feasible upgrade scenarios using Decision Engine scoring.

## Inputs
- Property valuations
- Mortgage balances
- Loan terms
- Household income
- Cash flow
- Liquidity
- Net worth
- Market assumptions
- Financial Health Score

## Outputs
- Recommended strategy
- Required down payment
- Mortgage recommendation
- Cash-flow projection
- Net-worth projection
- Risk summary
- Decision explanation

## Decision Sequence
1. Validate hard constraints.
2. Preserve liquidity.
3. Validate affordability.
4. Compare scenarios.
5. Rank recommendations.
6. Generate explainability report.

## Explainability
Include:
- Triggered rules
- Failed rules
- Scenario ranking
- Constraint summary
- Financial impact

## KPIs
- Housing Affordability Ratio
- Mortgage Burden Ratio
- Liquidity Coverage Ratio
- Net Worth Growth
- Cash Flow Stability
- Goal Funding Impact

## Integration
Consumes:
- House Decision Framework
- Loan Engine
- Cash Flow Engine
- Net Worth Framework
- Liquidity Framework
- Goal Funding Framework

Produces:
- Decision Engine
- Home Upgrade Engine
- Dashboard

## Testing
- Upgrade with property retention
- Sell then buy
- Buy then sell
- High interest rates
- Income reduction
- Multi-property household

## Future Enhancements
- Tax-aware optimization
- AI scenario ranking
- Regional property rules
- Rental yield optimization
