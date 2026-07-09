# Cash Reserve Framework

Version: 1.0

## Purpose
Defines the cash reserve policy used by Project Atlas to ensure liquidity, financial resilience, and support for long-term decision making.

## Objectives
- Maintain adequate liquidity.
- Prevent forced liquidation of investments.
- Support planned and unexpected expenses.
- Integrate with Financial Health Score, Cash Flow Engine, and Decision Engine.

## Reserve Layers

### Layer 1 – Operating Cash
Purpose:
- Daily spending
- Monthly bills
- Automatic payments

Target:
- 1–2 months of recurring expenses.

### Layer 2 – Emergency Reserve
Purpose:
- Job loss
- Medical emergencies
- Unexpected repairs

Target:
- 3–12 months of essential expenses.
- Default recommendation determined by Risk Capacity.

### Layer 3 – Strategic Opportunity Reserve
Purpose:
- Market opportunities
- Planned investments
- Large discretionary purchases

Target:
- User-defined based on IPS.

## Reserve Categories
- Essential Cash
- Emergency Cash
- Opportunity Cash
- Restricted Cash

## Inputs
- Monthly essential expenses
- Monthly discretionary expenses
- Income stability
- Emergency fund balance
- Debt obligations
- Insurance coverage
- Life stage
- Risk Capacity

## Calculation Model
Emergency Reserve Target =
Essential Monthly Expenses × Recommended Reserve Months

Recommended months vary by:
- Employment stability
- Income diversity
- Dependents
- Debt burden
- Health risk

## Reserve Health Bands
- Critical: <25%
- Weak: 25–59%
- Adequate: 60–99%
- Healthy: 100–149%
- Strong: ≥150%

## Business Rules
- Emergency reserve is funded before discretionary investing.
- Essential cash is excluded from investment allocation.
- Opportunity reserve may be invested only if liquidity constraints remain satisfied.
- Major life events trigger reserve recalculation.

## Decision Engine Integration
Used by:
- Financial Health Score
- Goal Prioritization
- Asset Allocation Framework
- Withdrawal Strategy
- Scenario Engine

## Explainability
Every recommendation includes:
- Current reserve
- Target reserve
- Coverage ratio
- Shortfall or surplus
- Contributing factors

## KPIs
- Reserve Coverage Ratio
- Months of Essential Expenses
- Liquidity Ratio
- Cash Utilization Rate
- Emergency Readiness Score

## Testing
- Stable employment
- Variable income
- High debt
- New homeowner
- Retirement
- Major medical expense

## Future Enhancements
- Household reserve optimization
- Inflation-adjusted targets
- AI reserve forecasting
- Country-specific reserve guidance
