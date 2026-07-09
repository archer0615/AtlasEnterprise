# knowledge/scoring-model.md

# Atlas Decision Scoring Model
Version: 1.0

## Purpose
Defines the canonical 0–100 scoring methodology used by the Decision Engine. The model is deterministic, explainable, versioned, and independent from UI presentation.

## Design Principles
- Deterministic
- Explainable
- Version controlled
- Extensible
- Comparable across scenarios

## Overall Formula

Final Score =
Σ(Category Score × Category Weight)
+ Bonus Score
− Penalty Score

The final score is clamped to the range [0,100].

## Default Category Weights

| Category | Weight |
|---|---:|
| Cash Flow | 20% |
| Liquidity | 15% |
| Debt | 15% |
| Investment | 15% |
| Retirement | 15% |
| Housing | 10% |
| Risk | 5% |
| Goal Alignment | 5% |

Total = 100%.

## Category Score Model

Each category score is computed from one or more KPIs.

Category Score =
Σ(KPI Normalized Score × KPI Weight)

Every KPI is normalized to 0–100 before weighting.

## KPI Normalization

Supported methods:
- Linear
- Piecewise linear
- Threshold
- Target range
- Logistic (advanced)

Each KPI definition declares its normalization strategy.

## Bonus Rules

Examples:
- Emergency fund > 12 months: +2
- Passive income covers 100% of expenses: +3
- IPS compliance within tolerance: +2

Default maximum cumulative bonus: +5.

## Penalty Rules

Examples:
- DTI exceeds policy: −5
- Negative monthly cash flow: −8
- Retirement funding ratio below policy: −5

Default maximum cumulative penalty: −20.

## Hard Rules

Certain conditions override numeric score.

Examples:
- Insolvent cash flow
- Invalid scenario
- Missing mandatory assumptions
- Regulatory constraint

Result:
Recommendation = Reject regardless of score.

## Recommendation Bands

| Score | Recommendation |
|---:|---|
| 90–100 | Strongly Recommend |
| 75–89 | Recommend |
| 60–74 | Acceptable |
| 40–59 | Weak |
| 0–39 | Reject |

## Explainability

For every score provide:
- Category breakdown
- KPI contributions
- Bonus applied
- Penalties applied
- Hard rule triggers
- Assumption version
- Formula version

## Sensitivity Analysis

Optionally recompute score after varying:
- Interest rate
- Inflation
- Salary growth
- Investment return
- Property appreciation

Report the score delta for each variable.

## Versioning

Each calculation references:
- Scoring Model Version
- Formula Version
- Assumption Version
- Decision Matrix Version

Historical results remain reproducible.

## Output Schema

- DecisionId
- ScenarioId
- TotalScore
- CategoryScores[]
- BonusItems[]
- PenaltyItems[]
- Recommendation
- HardRuleTriggered
- AssumptionVersion
- FormulaVersion
- ScoringModelVersion
- CalculatedAt
