# Recommendation Evaluation Scoring and Ranking

## Purpose

This split document isolates scoring and ranking behavior from the larger Recommendation Evaluation overview.

## Source

- Parent specification: [Recommendation Evaluation Overview](../recommendation-evaluation.md)

## Scoring Rules

- Scores must be deterministic for the same Recommendation inputs.
- Score components must remain traceable to Decision, Goal, Scenario, Portfolio, CashFlow, Risk, Optimization, and Simulation data.
- Score reductions must preserve explanation and warning references.
- Score display must not replace the canonical Recommendation lifecycle state.

## Ranking Rules

- Ranking must preserve household scope and permission boundaries.
- Ranking must account for priority, urgency, risk, and feasibility.
- Ranking changes must be auditable when used for execution or dashboard display.

## Related References

- [Recommendation Entity](../../entity/Recommendation.md)
- [Decision Evaluation](../decision-evaluation.md)
- [Recommendation Priority Framework](../../framework/recommendation-priority-framework.md)
