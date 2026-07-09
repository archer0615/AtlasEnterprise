# Decision Metrics Framework

Version: 1.0

## Purpose
Defines the standard metrics used by Project Atlas to evaluate, compare, rank, and explain financial decisions across all engines.

## Objectives
- Establish a common decision measurement standard.
- Ensure deterministic and explainable recommendations.
- Enable consistent comparison across scenarios.
- Supply metrics to Dashboard, Scenario Engine, and Decision Engine.

## Metric Categories

### Financial Metrics
- Net Worth
- Net Worth Growth
- Free Cash Flow
- Savings Rate
- Debt-to-Income Ratio
- Liquidity Coverage Ratio
- Emergency Fund Coverage
- Goal Funding Ratio

### Investment Metrics
- Expected Return
- Portfolio Volatility
- Sharpe Ratio
- Allocation Drift
- Diversification Score
- Risk Budget Utilization

### Housing Metrics
- Housing Affordability Score
- Mortgage Burden Ratio
- Home Equity Ratio
- Upgrade Feasibility Score

### Retirement Metrics
- Retirement Readiness
- Sustainable Withdrawal Rate
- Portfolio Longevity
- Income Replacement Ratio

### Decision Quality Metrics
- Financial Health Score
- Decision Confidence
- Goal Alignment Score
- Scenario Robustness
- Constraint Compliance
- Explainability Completeness

## Composite Decision Score

Decision Score =
Weighted combination of:
- Financial Impact
- Goal Alignment
- Risk Impact
- Liquidity Impact
- Cash Flow Impact
- Long-term Sustainability

Normalized to 0–100.

## Decision Bands
- 90–100 Excellent
- 75–89 Strong
- 60–74 Acceptable
- 40–59 Weak
- 0–39 Reject

## Inputs
- Financial Health Score
- Goal Prioritization
- Net Worth Framework
- Liquidity Framework
- Risk Budget Framework
- Scenario Framework
- Market Assumptions

## Outputs
- Decision Score
- Metric breakdown
- Ranking
- Recommendation
- Confidence
- Constraint summary

## Business Rules
- Hard constraints override scores.
- Mandatory goals receive higher weighting.
- Scores are reproducible from identical inputs.
- Every score must include explainability metadata.

## Explainability
Each evaluation includes:
- Metric values
- Weighting
- Triggered rules
- Assumptions
- Sensitivity summary

## Integration
Consumes:
- All core frameworks
Produces:
- Decision Engine
- Dashboard
- Recommendation Engine
- Scenario Engine

## KPIs
- Decision Score
- Recommendation Accuracy
- Constraint Pass Rate
- Goal Success Probability
- User Acceptance Rate

## Testing
- Competing financial goals
- Multiple scenarios
- Market stress
- Housing decisions
- Retirement planning
- Low liquidity

## Future Enhancements
- AI confidence calibration
- Personalized weighting
- Adaptive scoring
- Multi-household comparison
