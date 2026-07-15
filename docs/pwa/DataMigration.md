# Data Migration Specification

Local data migrations protect user-owned financial data as application schemas, formulas, and stored scenario formats evolve.

## Requirements

- Sequential schema versions.
- Deterministic upgrade functions.
- Migration journal.
- Preflight validation.
- Roll-forward only for released versions.
- No silent destructive migration.
- Import migration independent from live database migration.
- Automated fixtures for every historical version.

## Failure Handling

Migration failure must abort the active transaction, preserve source data, log a local diagnostic record, and offer export or recovery instructions. The application should enter recovery mode instead of continuing with partially migrated data.

## Governance

- Released schema versions must not be rewritten.
- Destructive changes require explicit export or backup guidance before execution.
- Migration tests must cover empty stores, partial data, historical fixtures, and malformed records.
- Calculation snapshots must preserve the formula and rule versions that produced them.
