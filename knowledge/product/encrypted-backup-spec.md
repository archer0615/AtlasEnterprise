# Encrypted Backup Spec

Document Path: knowledge/product/encrypted-backup-spec.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.3
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Data Safety
Owner: Project Atlas
Source of Truth: Atlas Encrypted Backup Source of Truth
Last Updated: 2026-07-20

## Purpose

Defines the encrypted backup capability required for Atlas local-first PWA data safety.

## Scope

- User-owned IndexedDB records.
- Backup format versioning.
- Export checksum.
- Passphrase-derived encryption key.
- Restore preview, dry run, validation, and audit.

Static frontend assets, generated knowledge files, service worker caches, and fixture data are not user backup payloads.

## Backup Envelope

Encrypted backup files must include:

| Field | Required | Purpose |
| --- | --- | --- |
| `backupFormatVersion` | Yes | Identifies the backup envelope contract. |
| `applicationVersion` | Yes | Records exporting application version. |
| `databaseSchemaVersion` | Yes | Records IndexedDB schema version. |
| `exportTimestamp` | Yes | Records export time in ISO format. |
| `payloadEncoding` | Yes | Identifies encrypted payload encoding. |
| `kdf` | Yes | Records key derivation algorithm and parameters. |
| `encryption` | Yes | Records encryption algorithm, IV, and authentication metadata. |
| `checksum` | Yes | Detects modified exported payloads before restore. |
| `encryptedPayload` | Yes | Contains encrypted user-owned data. |

## Encryption Rules

- Plaintext export must be disabled by default for production backup flows.
- The encryption key must be derived from a user-provided passphrase.
- The passphrase must not be persisted in IndexedDB, localStorage, sessionStorage, generated assets, or exported metadata.
- The encrypted payload must be authenticated so modified backup content fails restore validation.
- Encryption metadata may be stored in the backup envelope only when it does not reveal plaintext user data.

## Payload Rules

- Payload records must preserve source store name, record key, schema version, aggregate version when available, and updated timestamp when available.
- Payload records must not include static fixtures or generated knowledge documents.
- Backup data minimization must export only approved user-owned stores and envelope metadata required for restore validation.
- Backup sensitive field masking must replace credential, token, contact, identity, and authorization fields before plaintext backup serialization.
- Backup retention policy validation must remove audit entries older than the configured retention window unless the action is explicitly retained for recovery evidence.
- Payload serialization must be deterministic before checksum generation.
- Deleted records may be included only when they are needed for audit or soft-delete recovery.

## Restore Rules

- Restore must validate envelope, checksum, encryption metadata, schema version, and decrypted payload before mutating IndexedDB.
- Failed decryption must not mutate current local data.
- Failed checksum validation must not mutate current local data.
- Restore preview must report target stores and record counts.
- Restore dry run must report create, update, skip, reject, and conflict counts.
- Applying restore must run inside a bounded transaction plan and record an audit entry.

## Validation Matrix

| Case | Expected Result |
| --- | --- |
| Valid encrypted backup | Preview, dry run, and restore can complete. |
| Wrong passphrase | Decryption fails without mutation. |
| Modified encrypted payload | Checksum or authentication validation fails without mutation. |
| Unsupported backup format version | Restore is rejected before decryption. |
| Unsupported database schema version | Migration plan is required before restore. |
| Duplicate record keys in payload | Restore is rejected or requires explicit conflict policy. |

## Current Implementation Mapping

- Current runtime exports plaintext `atlas-pwa-runtime-backup.v1` scenario backups for local workflow validation.
- Current runtime adds deterministic SHA-256 checksum metadata to exported backup payloads.
- Current runtime can create encrypted backup envelopes with PBKDF2-derived AES-GCM keys.
- Current runtime can decrypt encrypted backup envelopes and validate decrypted payload checksums.
- Current UI exposes passphrase entry, encrypted backup export, encrypted backup import preview, and dry-run restore preview.
- Current backup payload covers scenarios, recommendation decisions, settings, and audit entries.
- Current runtime applies backup data minimization, sensitive field masking, and audit retention validation before checksum generation.
- Current runtime validates scenario IDs, names, scores, and status before restore.
- Current runtime verifies checksum when checksum metadata is present.
- Plaintext export remains available for local validation and fixture compatibility.

## Related Specifications

- `knowledge/product/offline-cache-and-local-state.md`
- `knowledge/product/import-version-migration.md`
- `knowledge/product/multi-tab-conflict-control.md`
- `docs/database/05-DatabaseDesign.md`
- `frontend/src/indexeddb-runtime.js`
