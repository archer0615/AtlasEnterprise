# Loan Identity and Repayment

## Purpose

This split document prepares the Loan entity for focused review by isolating identity and repayment behavior.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## Identity Rules

- Loan identity must remain stable across repayment, refinancing, and reporting workflows.
- Loan ownership must remain scoped to Household context.
- Mortgage-specific behavior should link to Mortgage where it is separately modeled.

## Repayment Rules

- Scheduled repayment, prepayment, and payoff scenarios must remain deterministic.
- Repayment decisions should reference loan decision rules and cash-flow formulas.
- Early repayment analysis must preserve emergency reserve constraints.

## Related References

- [Loan Entity Specification](../Loan.md)
- [Mortgage Entity](../Mortgage.md)
- [Loan Supporting Document](../../supporting/loan.md)
- [Loan Decision Rule Catalog](../../rule/loan-decision-rule-catalog.md)
