# Import Version Migration

Document Path: knowledge/product/import-version-migration.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.5
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Data Safety
Owner: Project Atlas
Source of Truth: Atlas Import Version Migration Source of Truth
Last Updated: 2026-07-20

## Purpose

Defines how Atlas imports backups across backup format versions and IndexedDB schema versions.

## Version Inputs

Import validation must read:

- Backup format version.
- Application version.
- IndexedDB database schema version.
- Store-level schema version when present.
- Aggregate version when present.
- Export timestamp.
- Migration history metadata when present.

## Migration Rules

- Migration functions must be deterministic and idempotent.
- Historical migration functions must not be rewritten after release.
- Unsupported future backup versions must be rejected.
- Unsupported old backup versions must be rejected unless a migration path exists.
- Destructive migration must require backup preview and explicit restore confirmation.
- Migration failure must leave the current IndexedDB database readable and unchanged.
- Imported records must be validated after migration and before commit.

## Import Pipeline

1. Parse backup envelope.
2. Validate backup format version.
3. Validate checksum and decrypt payload when encrypted backup is used.
4. Build migration plan from source schema to current schema.
5. Run migration in memory or staging records.
6. Validate migrated records against current repository rules.
7. Produce dry-run result.
8. Apply only after explicit confirmation.
9. Record import audit entry.

## Dry-run Contract

Dry run must report:

| Field | Purpose |
| --- | --- |
| `sourceBackupFormatVersion` | Backup format being imported. |
| `sourceDatabaseSchemaVersion` | Source IndexedDB schema. |
| `targetDatabaseSchemaVersion` | Current IndexedDB schema. |
| `migrationSteps` | Ordered migration identifiers. |
| `creates` | Records that would be inserted. |
| `updates` | Records that would replace existing records. |
| `skips` | Records that would be ignored. |
| `rejects` | Records that fail validation. |
| `conflicts` | Records requiring conflict policy. |

## Validation Matrix

| Case | Expected Result |
| --- | --- |
| Current backup version | Import validates without migration. |
| Older supported backup version | Migration plan is shown before apply. |
| Older unsupported backup version | Import is rejected. |
| Future backup version | Import is rejected. |
| Missing schema metadata | Import is rejected unless legacy fallback is explicitly defined. |
| Migrated invalid record | Import is rejected before mutation. |

## Current Implementation Mapping

- Current runtime stores `databaseVersion` and `backupSchemaVersion` in metadata.
- Current backup import accepts only `atlas-pwa-runtime-backup.v1`.
- Current import applies scenario records through a staged same-transaction restore path after validation.
- Current import dry-run reports create, update, skip, reject, conflict, schema version, migration step, and checksum fields.
- Current UI renders dry-run create, update, skip, reject, version, migration, and checksum fields before restore confirmation.
- Current UI exposes conflict policy selection with replace-all and skip-existing modes before restore.
- Current dry-run includes a migration plan object with status, support flag, step list, and user-facing message.
- Current UI renders migration status and support messaging before restore confirmation.
- Current runtime executes supported backup migration from database version 2 to the current database version before staged restore.
- Current runtime records migration history entries on migrated backup payloads.
- Unsupported backup database versions are rejected before restore.

## Related Specifications

- `knowledge/product/encrypted-backup-spec.md`
- `knowledge/product/offline-cache-and-local-state.md`
- `knowledge/product/current-capability-matrix.md`
- `docs/database/05-DatabaseDesign.md`
- `frontend/src/indexeddb-runtime.js`
