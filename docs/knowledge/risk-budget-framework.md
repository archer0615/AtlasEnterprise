# Risk Budget Framework

Version: 1.0

## Purpose
Defines how Project Atlas allocates and manages financial risk across goals, portfolios, and life stages. A risk budget represents the maximum acceptable level of risk that may be consumed while pursuing financial objectives.

## Objectives
- Quantify acceptable financial risk.
- Allocate risk consistently across competing goals.
- Prevent excessive concentration.
- Support explainable investment decisions.

## Core Principles
- Risk is a limited resource.
- Risk allocation follows the Investment Policy Statement (IPS).
- Mandatory goals consume less risk budget than discretionary goals.
- Risk budget is reviewed after major financial events.

## Risk Budget Dimensions
### Market Risk
Exposure to equity, interest rate, and credit markets.

### Liquidity Risk
Risk of insufficient liquid assets to meet obligations.

### Concentration Risk
Exposure to a single asset, issuer, sector, geography, or currency.

### Leverage Risk
Risk introduced by borrowing and margin.

### Sequence Risk
Risk arising from withdrawals during adverse market periods.

### Goal Risk
Probability that a financial goal will not be achieved.

## Inputs
- Financial Health Score
- Risk Capacity Model
- Risk Tolerance
- Life Stage Model
- Goal Prioritization
- Liquidity Framework
- Asset Allocation Framework
- Market Assumptions

## Risk Budget Allocation
Priority order:
1. Essential goals
2. Retirement
3. Housing
4. Long-term investments
5. Opportunistic investments

Each goal receives:
- Maximum risk budget
- Current utilization
- Remaining capacity

## Budget Constraints
- Cannot exceed Risk Capacity.
- Must satisfy IPS allocation limits.
- Liquidity requirements always override return optimization.
- Concentration limits must be respected.

## Decision Process
1. Calculate total risk capacity.
2. Reserve mandatory risk.
3. Allocate remaining risk budget.
4. Validate constraints.
5. Produce recommendation.

## Outputs
- Total Risk Budget
- Consumed Risk Budget
- Remaining Risk Budget
- Risk Budget by Goal
- Constraint Evaluation
- Recommended Adjustments

## Business Rules
- Risk budget cannot become negative.
- Material life events trigger recalculation.
- Portfolio drift may consume additional risk budget.
- High-risk strategies require explicit approval.

## Explainability
Each recommendation includes:
- Total available risk budget
- Allocation by goal
- Utilization percentage
- Triggered rules
- Limiting constraints

## KPIs
- Risk Budget Utilization
- Diversification Score
- Concentration Ratio
- Goal Risk Coverage
- Portfolio Volatility
- Probability of Goal Success

## Integration
Consumes:
- Risk Capacity Model
- Asset Allocation Framework
- Liquidity Framework
- Goal Prioritization
- Financial Health Score

Produces:
- Rebalancing Framework
- Withdrawal Strategy
- Decision Engine
- Scenario Engine

## Testing
- Conservative investor
- Aggressive investor
- Retirement transition
- High leverage
- Market crash
- Multiple competing goals

## Future Enhancements
- Dynamic risk budgeting
- Household-level risk budgets
- AI optimization
- Monte Carlo risk allocation
