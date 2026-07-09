# knowledge/risk-framework.md

# Atlas Unified Risk Framework
Version: 1.0

## Purpose
This document defines the unified risk framework used throughout Project Atlas. Every engine (Cash Flow, Loan, Investment, Home Upgrade, Retirement and Decision Engine) evaluates risk using the same vocabulary, scoring model and governance rules.

---

# Objectives

- Standardize risk evaluation.
- Compare scenarios using a common risk model.
- Support explainable financial decisions.
- Separate risk measurement from decision rules.

---

# Core Risk Dimensions

1. Liquidity Risk
2. Cash Flow Risk
3. Leverage Risk
4. Investment Risk
5. Interest Rate Risk
6. Inflation Risk
7. Employment / Income Risk
8. Concentration Risk
9. Longevity Risk
10. Insurance Protection Risk
11. Sequence of Return Risk
12. Behavioral Risk

---

# Risk Levels

| Score | Level | Interpretation |
|------:|-------|----------------|
| 0-20 | Very Low | Comfortable margin |
| 21-40 | Low | Acceptable |
| 41-60 | Moderate | Monitor closely |
| 61-80 | High | Action recommended |
| 81-100 | Critical | Immediate mitigation |

---

# Risk Scoring Principles

Overall Risk Score is a weighted aggregation of individual dimensions.

Example default weights:

| Dimension | Weight |
|-----------|-------:|
| Liquidity | 20% |
| Cash Flow | 20% |
| Leverage | 15% |
| Investment | 15% |
| Interest Rate | 10% |
| Inflation | 5% |
| Employment | 5% |
| Concentration | 5% |
| Longevity | 3% |
| Insurance | 2% |

Weights are configurable through assumptions.

---

# Mitigation Strategy

For every detected risk the system should provide:

- Cause
- Impact
- Severity
- Recommended actions
- Expected improvement
- Assumptions used

---

# Engine Responsibilities

Cash Flow Engine
- Liquidity
- Monthly surplus
- Emergency reserve

Loan Engine
- Debt ratio
- Refinance sensitivity
- Rate shock

Investment Engine
- Allocation
- Volatility
- Diversification

Retirement Engine
- Sustainability
- Withdrawal risk
- Longevity

Decision Engine
- Aggregate all engine outputs
- Produce overall household risk profile

---

# Output Model

Each assessment returns:

- RiskId
- Category
- Score
- Level
- Explanation
- Recommendation
- CalculatedAt
- AssumptionVersion

---

# Governance

- Risk formulas are version controlled.
- Historical scores are immutable.
- Business rules and assumptions evolve independently.
- Decisions must reference the assumption version used.

---

# Future Extensions

- Monte Carlo integration
- Stress testing
- AI explanation layer
- Country-specific calibration
- User-defined risk tolerance profiles
