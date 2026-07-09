# Goal Funding Framework

Version: 1.0

## Purpose
Defines the enterprise framework used by Project Atlas to calculate, monitor, prioritize, and optimize funding for financial goals throughout a user's lifetime.

## Objectives
- Standardize funding calculations.
- Measure funding progress consistently.
- Prioritize capital allocation across competing goals.
- Provide explainable recommendations.

## Supported Goal Types
- Emergency Fund
- Home Purchase
- Home Upgrade
- Retirement
- Education
- Vehicle Purchase
- Major Lifestyle Goals
- Legacy / Estate
- Custom Goals

## Goal Attributes
Each goal contains:
- GoalId
- Name
- Category
- Priority
- Target Amount
- Target Date
- Minimum Funding Requirement
- Current Funding
- Funding Source(s)
- Funding Status

## Funding Sources
- Salary
- Bonus
- Investment Contributions
- Investment Withdrawals
- Rental Income
- Business Income
- Asset Sales
- Windfalls
- Financing (where permitted)

## Core Calculations

Funding Gap =
Target Amount - Current Funding

Funding Ratio =
Current Funding / Target Amount

Required Monthly Contribution =
Funding Gap / Remaining Months

Goal Success Probability =
Scenario Engine output using market assumptions and cash flow projections.

## Funding Status
- Not Started
- Behind Schedule
- On Track
- Fully Funded
- Overfunded

## Funding Priority Rules
1. Mandatory obligations
2. Emergency Fund
3. Insurance
4. Retirement minimum
5. Housing
6. Education
7. Other long-term goals
8. Lifestyle goals

## Decision Process
1. Validate goal inputs.
2. Calculate funding gap.
3. Evaluate available capital.
4. Allocate funding by priority.
5. Validate constraints.
6. Generate recommendation.

## Business Rules
- Mandatory goals cannot lose allocated funding.
- Reserved capital cannot be double allocated.
- Funding plans are recalculated after major financial events.
- Goal priorities follow Goal Prioritization Framework.

## Outputs
- Funding Ratio
- Funding Gap
- Monthly Contribution Target
- Recommended Funding Order
- Funding Forecast
- Goal Risk Assessment

## Integration
Consumes:
- Capital Allocation Framework
- Goal Prioritization
- Net Worth Framework
- Liquidity Framework
- Financial Health Score
- Risk Budget Framework

Produces:
- Decision Engine
- Scenario Engine
- Dashboard
- Retirement Engine

## Explainability
Each recommendation reports:
- Current funding status
- Funding gap
- Allocation decisions
- Blocking constraints
- Alternative scenarios

## KPIs
- Goal Funding Ratio
- Goal Completion Rate
- Funding Gap
- Monthly Funding Progress
- Goal Success Probability

## Testing
- Single goal
- Multiple competing goals
- Windfall allocation
- Income reduction
- Delayed target date
- Retirement funding stress test

## Future Enhancements
- Dynamic funding optimization
- Household goal pooling
- Tax-aware funding
- AI funding recommendations
