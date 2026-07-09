# Emergency Fund Framework

Version: 1.0

## Purpose
Defines the emergency fund policy for Project Atlas. The framework ensures sufficient liquid assets are maintained to absorb unexpected financial shocks without disrupting long-term goals.

## Objectives
- Protect household financial stability.
- Prevent forced liquidation of investments.
- Support resilience during income interruption.
- Integrate with Financial Health Score and Decision Engine.

## Scope
Applies to:
- Individuals
- Couples
- Families
- Retirees
- Self-employed households

## Emergency Event Types
- Job loss
- Income reduction
- Medical emergency
- Major home repair
- Vehicle replacement
- Family emergency
- Natural disaster

## Fund Structure

### Tier 1 – Immediate Cash
Purpose:
- Available within 24 hours.

Target:
- 1 month of essential expenses.

### Tier 2 – Emergency Reserve
Purpose:
- Income replacement.

Target:
- 3–12 months of essential expenses.

### Tier 3 – Contingency Reserve
Purpose:
- Low-probability, high-impact events.

Target:
- User-defined based on risk profile.

## Inputs
- Essential monthly expenses
- Household income
- Income stability
- Number of dependents
- Debt obligations
- Insurance coverage
- Life Stage
- Risk Capacity
- Financial Health Score

## Calculation
Emergency Fund Target =
Essential Monthly Expenses × Recommended Coverage Months

Coverage months increase when:
- Income is volatile.
- Household has dependents.
- Debt burden is high.
- Employment risk is elevated.

## Coverage Levels
- Critical: <1 month
- Weak: 1–2 months
- Adequate: 3–5 months
- Strong: 6–12 months
- Exceptional: >12 months

## Business Rules
- Emergency fund takes priority over discretionary investing.
- Emergency assets must remain highly liquid.
- Major life events trigger recalculation.
- Emergency fund usage generates domain events and replenishment recommendations.

## Decision Engine Integration
Consumed by:
- Cash Flow Engine
- Cash Reserve Framework
- Liquidity Framework
- Financial Health Score
- Withdrawal Strategy
- House Decision Framework

## Outputs
- Target emergency fund
- Current coverage
- Coverage ratio
- Funding gap
- Recommended monthly contribution
- Priority level

## Explainability
Each recommendation includes:
- Calculation inputs
- Coverage months
- Triggering assumptions
- Constraint evaluation
- Improvement actions

## KPIs
- Emergency Coverage Ratio
- Months of Protection
- Funding Progress
- Liquidity Readiness
- Emergency Preparedness Score

## Testing
- Stable employment
- Self-employed income
- High debt household
- New child
- Retirement transition
- Major emergency withdrawal

## Future Enhancements
- Inflation-adjusted targets
- Household optimization
- Country-specific guidance
- AI forecasting of emergency needs
