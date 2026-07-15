# Asset Allocation Framework

## Split Navigation

- [Asset allocation targets and constraints](asset-allocation/targets-and-constraints.md)
- [Asset allocation drift and scenarios](asset-allocation/drift-and-scenarios.md)

Version: 1.0

## Purpose
Defines the strategic and tactical asset allocation framework for Project Atlas.

## Objectives
- Maximize long-term risk-adjusted returns.
- Maintain alignment with the Investment Policy Statement (IPS).
- Support explainable and repeatable allocation decisions.
- Integrate with Goal Prioritization, Financial Health Score, and Decision Engine.

## Allocation Layers
1. Strategic Asset Allocation (SAA)
2. Tactical Asset Allocation (TAA)
3. Cash Management Layer
4. Liquidity Reserve Layer

## Supported Asset Classes
- Cash & Cash Equivalents
- Domestic Equities
- International Equities
- Investment Grade Bonds
- Government Bonds
- REITs
- Alternative Assets
- Structured Products
- Other IPS-approved assets

## Allocation Inputs
- Life Stage
- Financial Health Score
- Risk Capacity
- Risk Tolerance
- Goal Timeline
- Liquidity Requirement
- Existing Portfolio
- Market Assumptions

## Allocation Constraints
- IPS minimum/maximum ranges
- Required emergency reserve
- Regulatory restrictions
- User-defined exclusions
- Concentration limits
- Currency exposure limits

## Allocation Process
1. Determine investor profile.
2. Estimate risk capacity.
3. Determine target allocation.
4. Validate constraints.
5. Compare current allocation.
6. Generate rebalance recommendation.
7. Produce explainable decision output.

## Business Rules
- Strategic allocation changes infrequently.
- Tactical adjustments must remain within IPS limits.
- Cash required within 12 months is excluded from growth allocation.
- High-priority goals may reserve assets before portfolio optimization.

## Decision Outputs
- Target allocation
- Current allocation
- Allocation drift
- Recommended actions
- Expected risk profile
- Supporting business rules

## KPIs
- Allocation Drift
- Portfolio Volatility
- Expected Return
- Diversification Score
- Liquidity Coverage
- Goal Funding Ratio

## Integration
Consumes:
- Life Stage Model
- Market Assumptions
- Risk Capacity Model

Produces:
- Rebalancing Framework
- Withdrawal Strategy
- Scenario Engine
- Decision Engine

## Testing
- New investor
- Near retirement
- Large cash inflow
- Market crash
- Multiple competing goals
- Constraint violations

## Future Enhancements
- Black-Litterman optimization
- Risk parity portfolios
- Tax-aware allocation
- Household optimization
- AI-assisted allocation recommendations
