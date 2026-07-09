# Liquidity Framework

Version: 1.0

## Purpose
Defines the liquidity management framework for Project Atlas. The framework standardizes how assets, liabilities, and cash flows are evaluated to ensure sufficient liquidity for both expected and unexpected financial needs.

## Objectives
- Maintain adequate short-term liquidity.
- Prevent forced asset liquidation.
- Support major financial decisions.
- Integrate liquidity into all recommendation engines.

## Liquidity Principles
- Liquidity precedes optimization.
- Essential obligations always have highest priority.
- Liquidity decisions must be explainable.
- Liquidity is evaluated continuously.

## Liquidity Layers

### L1 – Immediate Liquidity
Available within 24 hours.
Examples:
- Cash
- Checking accounts

### L2 – Short-Term Liquidity
Available within 7 days.
Examples:
- High-yield savings
- Money market funds
- Time deposits nearing maturity

### L3 – Medium-Term Liquidity
Available within 30 days.
Examples:
- ETFs
- Listed stocks
- Investment-grade bond funds

### L4 – Long-Term / Illiquid Assets
Liquidation exceeds 30 days or incurs significant cost.
Examples:
- Real estate
- Private equity
- Restricted assets
- Business ownership

## Liquidity Inputs
- Operating cash
- Emergency fund
- Monthly expenses
- Debt obligations
- Expected income
- Planned expenditures
- Investment portfolio
- Credit facilities

## Core Metrics

### Liquidity Score
Normalized score (0–100) representing overall financial liquidity.

### Liquidity Coverage Ratio (LCR)
Available Liquid Assets / Required Short-Term Cash Outflows

### Months of Liquidity
Available Liquid Assets / Monthly Essential Expenses

### Liquid Asset Ratio
Liquid Assets / Total Assets

## Liquidity Health Bands
- Critical: 0–20
- Weak: 21–40
- Moderate: 41–60
- Good: 61–80
- Excellent: 81–100

## Decision Rules
- Preserve operating cash before investing.
- Never reduce emergency reserve below minimum.
- Avoid selling illiquid assets unless required.
- Prefer funding from higher-liquidity layers first.
- Major purchases require post-decision liquidity validation.

## Funding Priority
1. Operating Cash
2. Emergency Reserve (qualified emergencies only)
3. Scheduled Income
4. Highly Liquid Investments
5. Medium-Term Investments
6. Long-Term Assets
7. Secured Borrowing (if allowed by IPS)

## Decision Engine Integration
Consumed by:
- Financial Health Score
- Cash Flow Engine
- Cash Reserve Framework
- Emergency Fund Framework
- Withdrawal Strategy
- House Decision Framework
- Asset Allocation Framework
- Goal Prioritization
- Scenario Engine

## Explainability
Every recommendation reports:
- Liquidity Score
- LCR
- Months of Liquidity
- Funding source order
- Constraint evaluation
- Recommended improvements

## KPIs
- Liquidity Score
- Liquidity Coverage Ratio
- Months of Liquidity
- Liquid Asset Ratio
- Cash Buffer Utilization
- Funding Readiness

## Testing
- Income interruption
- Large home purchase
- Market crash
- Major medical expense
- Retirement transition
- Multiple simultaneous cash demands

## Future Enhancements
- Multi-currency liquidity analysis
- Household liquidity optimization
- Real-time banking integration
- AI liquidity forecasting
