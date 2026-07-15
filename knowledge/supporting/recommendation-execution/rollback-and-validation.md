# Recommendation Execution Rollback and Validation

## Purpose

This split document isolates rollback and validation behavior from the larger Recommendation Execution overview.

## Source

- Parent specification: [Recommendation Execution Overview](../recommendation-execution.md)

## Validation Rules

- Validate recommendation status before execution.
- Validate household scope and permissions before mutation.
- Validate linked warnings and constraints before action.
- Validate resulting state after execution.

## Rollback Rules

- Rollback behavior must be explicit for each executable action.
- Irreversible actions must be marked before execution.
- Failed execution must preserve error evidence and audit context.
- Rollback must not erase original recommendation evidence.

## Related References

- [Recommendation Entity](../../entity/Recommendation.md)
- [Decision Audit Framework](../../security/decision-audit-framework.md)
- [Execution Plan Framework](../../framework/execution-plan-framework.md)
