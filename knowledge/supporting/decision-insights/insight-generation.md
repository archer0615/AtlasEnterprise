# Decision Insight Generation

## Purpose

This split document isolates insight generation rules from the larger Decision Insights overview.

## Source

- Parent specification: [Decision Insights Overview](../decision-insights.md)

## Generation Rules

- Insights must derive from existing Atlas records.
- Insights must preserve evidence, confidence, severity, priority, and lifecycle state.
- Insight generation must be reproducible for the same input data and assumption versions.
- Insights must not introduce new financial products, goal types, or decision categories.

## Evidence Sources

- Decision records
- Recommendation records
- Goal and Scenario outputs
- Portfolio and CashFlow signals
- Risk, Simulation, Workflow, Automation, and Notification signals

## Related References

- [Decision Entity](../../entity/Decision.md)
- [Recommendation Entity](../../entity/Recommendation.md)
- [Scenario Entity](../../entity/Scenario.md)
- [Decision Dashboard](../../reporting/decision-dashboard.md)
