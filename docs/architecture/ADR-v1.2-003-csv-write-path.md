# ADR-v1.2-003: CSV Write Path

## Status

Proposed.

## Context

CSV dry-run parsing is implemented without writes. A future write path would mutate local IndexedDB stores and therefore creates data loss, duplicate, owner-isolation, and audit risks.

## Decision

CSV write-path import may only proceed in a dedicated implementation batch after dry-run UI, error reporting, fixtures, owner isolation, audit, and rollback evidence are accepted.

## Required Controls

- Dry-run must run before write.
- Write path must be all-or-nothing per import.
- Duplicate IDs must reject before mutation.
- Cross-owner rows must reject before mutation.
- Import audit must record importId, operator, row counts, accepted/rejected counts, checksum, result, and correlationId.
- Browser-visible error report must render escaped text only.

## Not Allowed

- Partial silent writes.
- Raw HTML error rendering.
- Importing Position rows before Position persistence batch.
- Importing unknown entity types.
- Repository writes from view modules.

## Validation

- `npm run test:csv-import-dry-run`
- `npm run test:csv-import-fixtures`
- `npm run test:csv-import-security`
- `npm run validate:csv-import-browser-smoke`
- `npm run validate:release`
