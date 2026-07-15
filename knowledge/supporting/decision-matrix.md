# knowledge/decision-matrix.md

# Atlas Decision Matrix
Version: 1.0

## Purpose
The Decision Matrix standardizes how the Decision Engine evaluates competing financial scenarios. It converts outputs from domain engines into comparable scores while preserving transparency and explainability.

---

# Evaluation Flow

Inputs
→ Domain Engines
→ KPI Calculation
→ Financial Ratios
→ Risk Framework
→ Weighted Scoring
→ Decision Ranking
→ Recommendation

---

# Scoring Scale

| Score | Meaning |
|------:|---------|
| 90–100 | Strongly Recommend |
| 75–89 | Recommend |
| 60–74 | Acceptable |
| 40–59 | Weak |
| 0–39 | Reject |

---

# Evaluation Categories

| Category | Default Weight |
|----------|---------------:|
| Cash Flow | 20% |
| Liquidity | 15% |
| Debt & Leverage | 15% |
| Investment | 15% |
| Retirement | 15% |
| Housing | 10% |
| Risk | 5% |
| Goal Alignment | 5% |

Total = 100%

---

# Category Examples

## Cash Flow
Measures:
- Monthly surplus
- Savings rate
- Passive income coverage

## Liquidity
Measures:
- Emergency fund ratio
- Cash reserve ratio

## Debt
Measures:
- DTI
- LTV
- DSCR

## Investment
Measures:
- Portfolio return
- Allocation drift
- Diversification

## Retirement
Measures:
- Funding ratio
- Success probability

## Housing
Measures:
- Housing affordability
- Home equity

## Risk
Measures:
- Overall risk score
- Concentration
- Interest-rate sensitivity

## Goal Alignment
Measures:
- Progress toward life goals
- IPS compliance
- Blueprint consistency

---

# Decision Rules

The Decision Engine shall:
- Use normalized KPIs only.
- Evaluate every scenario independently.
- Produce ranked results.
- Explain score contributions.
- Record assumption version.

---

# Tie-breaking

If total scores are equal:

1. Lower overall risk.
2. Higher liquidity.
3. Better retirement sustainability.
4. Better goal alignment.
5. Lower leverage.

---

# Output Schema

- ScenarioId
- TotalScore
- Rank
- CategoryScores
- KeyStrengths
- KeyWeaknesses
- Recommendation
- AssumptionVersion
- FormulaVersion
- DecisionTimestamp

---

# Explainability

Every recommendation must include:
- Why the score was assigned.
- Largest positive contributors.
- Largest negative contributors.
- Recommended improvement actions.

---

# Governance

- Weight changes are version-controlled.
- Historical decisions remain reproducible.
- Business rules, formulas and assumptions are independently versioned.
