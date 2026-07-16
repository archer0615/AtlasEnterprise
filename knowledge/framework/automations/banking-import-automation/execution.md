# Banking Import Execution

## Purpose
This split document isolates banking import execution, normalization, reconciliation, persistence, and projection refresh from the parent BankingImportAutomation specification.

## Source
- Parent specification: [BankingImportAutomation](../banking-import-automation.md)

## Execution
Execution authenticates provider access, fetches banking data, normalizes records, validates ownership, reconciles transactions, persists import snapshots, updates cash flow projections, and records audit.

