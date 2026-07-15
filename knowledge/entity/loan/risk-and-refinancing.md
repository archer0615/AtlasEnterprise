# Loan Risk and Refinancing

## Purpose

This split document isolates Loan risk, refinancing, and scenario integration concerns.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## Risk Rules

- Debt pressure should be evaluated with cash-flow, liquidity, and debt-to-income constraints.
- Loan risk must be traceable to supporting assumptions and rule catalogs.
- Stress testing should include interest-rate changes and repayment shocks.

## Refinancing Rules

- Refinancing scenarios must include fees, rate changes, tenor changes, and cash-flow effects.
- Refinancing recommendations must include explanation and warning references.
- Scenario simulator fixtures should preserve deterministic expected results.

## Related References

- [Loan Entity Specification](../Loan.md)
- [Risk Framework](../../framework/risk-framework.md)
- [Cash Reserve Framework](../../framework/cash-reserve-framework.md)
- [Scenario Framework](../../framework/scenario-framework.md)
