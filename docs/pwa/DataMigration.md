# Data Migration Specification

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

Abort transaction, preserve source data, log a local diagnostic record, and offer export/recovery instructions.
