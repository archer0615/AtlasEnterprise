# Loan API and Audit

## Purpose

This split document isolates Loan API, permission, and audit concerns from the larger Loan entity specification.

## Source

- Parent specification: [Loan Entity Specification](../Loan.md)

## API Rules

- Loan API behavior must preserve Loan aggregate ownership.
- Loan request and response DTOs are implementation details and are not entities.
- Cash-flow engine endpoints must remain governed by the cash-flow API specification.
- Loan commands should route through LoanApplicationService.

## Permission and Audit Rules

- Loan read and mutation operations must enforce household scope.
- Loan repayment and refinancing decisions must produce auditable explanations.
- Audit records must preserve command, actor, timestamp, and decision context.
- Unsupported API fields must be rejected rather than silently ignored.

## Related References

- [Loan Entity Specification](../Loan.md)
- [API Governance Framework](../../api/api-governance-framework.md)
- [Permission Framework](../../security/permission-framework.md)
- [Audit Framework](../../security/audit-framework.md)
