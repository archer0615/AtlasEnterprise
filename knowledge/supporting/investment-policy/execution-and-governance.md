# Investment Policy Execution and Governance

## Purpose
This split document isolates executable Investment Policy commands, validation, API, testing, and governance from the parent Investment Policy Knowledge Base.

## Source
- Parent specification: [Investment Policy Knowledge Base](../investment-policy.md)

## Investment Policy Contract
Investment Policy owns household policy constraints, target allocation rules, review cadence, exception handling, and policy evidence.

## Commands
- CreateInvestmentPolicy
- UpdateInvestmentPolicy
- ApproveInvestmentPolicy
- ReviewInvestmentPolicy
- ArchiveInvestmentPolicy

## Validation Rules
- Policy must define approved asset classes.
- Target allocation must remain inside policy constraints.
- Portfolio changes must validate against policy before execution.
- Policy review must preserve previous policy evidence.

## API Contract
Investment Policy APIs expose create, read, update, approve, review, archive, and search behavior under permission control.

## Testing Matrix
Testing covers policy creation, invalid allocation, policy exception, review cadence, archive protection, and replay from audit history.

