# ADR-v1.2-002: Backup Schema Versioning

## Status

Accepted for payload changes.

## Context

Atlas backup payloads must remain compatible with static-first, local-first, offline-first operation. Position persistence and future policy records would require backup payload evolution, restore dry-run behavior, and future-version rejection.

## Decision

Any backup payload change must introduce an explicit backup schema version and compatibility matrix before runtime stores are added.

Required versioning behavior:

- `atlas-pwa-runtime-backup.v1` payloads remain readable.
- `atlas-pwa-runtime-backup.v2` is the current export schema and includes `positions`.
- New payload versions require dry-run compatibility output.
- Future unknown versions must be rejected safely.
- Encrypted backup compatibility must be validated.
- Restore must report unsupported stores without partial mutation.

## Compatibility Matrix

| Source Version | Target Runtime | Behavior |
| --- | --- | --- |
| Current | Current | Restore allowed after dry-run. |
| Current | Future | Restore allowed if future runtime preserves current schema. |
| Future | Current | Reject with dry-run report. |
| Unknown | Any | Reject with validation error. |
| v1 | v2 | Restore allowed after migration to database v8 with empty positions and insurance policies. |
| v2 | v2 | Restore allowed after dry-run, including positions. |

## Constraints

- Backup schema changes require migration notes.
- Restore must remain all-or-nothing unless a future ADR accepts partial restore.
- Backup payloads must not include secrets, remote tokens, or raw external documents.
- Service worker cache must not store user backup payloads.

## Required Validation Before Payload Changes

- `npm run test:backup-restore-e2e`
- `npm run validate:backup-security`
- `npm run validate:offline`
- `npm run validate:feature`

## Update 2026-07-27

Backup schema v2 is implemented for the Position persistence batch. v1 remains accepted for restore, v2 is the current export format, and unknown or unsupported schemas are rejected before mutation.
