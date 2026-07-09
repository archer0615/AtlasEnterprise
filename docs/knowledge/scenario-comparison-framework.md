# Scenario Comparison Framework

Version: 1.0

## Purpose
Defines the enterprise framework for comparing financial scenarios within Project Atlas. The framework provides a consistent, explainable method for evaluating alternative decisions and ranking them using standardized metrics.

## Objectives
- Compare multiple financial strategies consistently.
- Quantify trade-offs between alternatives.
- Produce deterministic rankings.
- Support explainable recommendations.

## Supported Scenario Types
- Keep Home vs Sell Home
- Buy Before Sell vs Sell Before Buy
- Invest vs Early Loan Repayment
- Retirement Age Comparison
- Asset Allocation Comparison
- Loan Structure Comparison
- Goal Funding Strategies
- Major Life Event Planning

## Scenario Components
Each scenario contains:
- Scenario ID
- Name
- Description
- Assumption Version
- Time Horizon
- Trigger Events
- Decision Context

## Standard Evaluation Dimensions
1. Net Worth Growth
2. Free Cash Flow
3. Liquidity Impact
4. Goal Funding Success
5. Risk Budget Utilization
6. Retirement Readiness
7. Housing Affordability
8. Tax Efficiency
9. Financial Health Score
10. Decision Confidence

## Scenario Workflow
1. Load baseline.
2. Apply scenario assumptions.
3. Execute all engines.
4. Calculate KPIs.
5. Score scenario.
6. Rank alternatives.
7. Generate explainability report.

## Composite Scenario Score
Weighted combination of:
- Financial Impact
- Goal Alignment
- Liquidity
- Risk
- Cash Flow
- Long-term Sustainability

Normalized to 0–100.

## Recommendation Levels
- Strongly Recommended
- Recommended
- Neutral
- Caution
- Not Recommended

## Business Rules
- All scenarios use identical baseline data.
- Assumption versions are immutable.
- Hard constraints override scores.
- Historical comparisons remain reproducible.

## Outputs
- Scenario ranking
- Composite score
- KPI comparison
- Financial projections
- Constraint summary
- Recommendation

## Explainability
Every comparison includes:
- Assumptions changed
- KPI deltas
- Rule evaluation
- Benefits
- Risks
- Trade-offs

## Integration
Consumes:
- Financial Projection Framework
- Decision Metrics Framework
- Net Worth Framework
- Goal Funding Framework
- Liquidity Framework
- Market Assumptions
- Scenario Framework

Produces:
- Decision Engine
- Dashboard
- Executive Reports
- Recommendation Engine

## KPIs
- Scenario Score
- Net Worth Difference
- Cash Flow Difference
- Goal Success Probability
- Risk Difference
- Liquidity Difference

## Testing
- Two-scenario comparison
- Five-scenario ranking
- Market crash
- High inflation
- Home upgrade
- Early retirement

## Future Enhancements
- Monte Carlo scenario ranking
- AI scenario generation
- Household scenario comparison
- Real-time sensitivity analysis
