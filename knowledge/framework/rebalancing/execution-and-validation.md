# Rebalancing Execution and Validation

## Purpose

This split document isolates rebalancing execution and validation behavior from the larger Rebalancing Framework.

## Source

- Parent specification: [Rebalancing Framework](../rebalancing-framework.md)

## Execution Rules

- Rebalancing proposals must be explainable before execution.
- Execution must consider transaction costs, tax impact, liquidity, and risk budget.
- Rebalancing must not bypass portfolio permissions or audit requirements.

## Validation Rules

- Validate target allocation and current holdings before proposal generation.
- Validate drift thresholds before recommending trades.
- Validate post-trade allocation after execution.

## Related References

- [Execution Plan Framework](../execution-plan-framework.md)
- [Recommendation Execution Planning](../../supporting/recommendation-execution/execution-planning.md)
- [Audit Framework](../../security/audit-framework.md)
