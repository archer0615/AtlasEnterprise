# Brokerage Import Execution

## Purpose
This split document isolates brokerage import execution, mapping, reconciliation, persistence, and projection refresh from the parent BrokerageImportAutomation specification.

## Source
- Parent specification: [BrokerageImportAutomation](../brokerage-import-automation.md)

## Execution
Execution authenticates provider access, fetches brokerage data, normalizes records, validates ownership, reconciles positions, persists import snapshots, updates portfolio projections, and records audit.

