# Decision Insight Warnings and Dashboard Use

## Purpose

This split document isolates warning and dashboard display behavior from the larger Decision Insights overview.

## Source

- Parent specification: [Decision Insights Overview](../decision-insights.md)

## Warning Rules

- Warnings must reference evidence and explain why attention is needed.
- Warning severity must remain traceable to risk, cash-flow, goal, or execution signals.
- Dashboard warnings must not become canonical decision state.
- Warning display should preserve permission and tenant boundaries.

## Dashboard Use

- Dashboard metrics may summarize insight severity and priority.
- Scenario fixtures may include warning IDs to explain recommendation status.
- Insight display should help compare baseline, alternative, and stress scenarios.
- Dashboard labels must remain separate from canonical insight definitions.

## Related References

- [Decision Insights Overview](../decision-insights.md)
- [Dashboard Scenario Switching Report](../../../docs/roadmap/dashboard-scenario-switching-report.md)
- [Fixture Output Tolerance Report](../../../docs/roadmap/fixture-output-tolerance-report.md)
