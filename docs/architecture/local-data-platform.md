# Local Data Platform

## Current Registry

| Field | Value |
| --- | --- |
| Database name | `atlas-pwa-runtime` |
| Database version | `6` |
| Backup schema | `atlas-pwa-runtime-backup.v1` |
| Encrypted backup schema | `atlas-pwa-runtime-encrypted-backup.v1` |
| Coordination channel | `atlas-pwa-runtime-coordination` |
| Migration lock key | `migration-lock` |

## Store Registry

| Store | Key | Purpose |
| --- | --- | --- |
| `metadata` | `key` | Schema metadata, migration lock, migration history, and coordination records. |
| `scenarios` | `scenarioId` | Local scenario records and imported scenario records. |
| `recommendationDecisions` | `decisionId` | Local accept/reject/defer recommendation decisions. |
| `settings` | `key` | User profile and runtime preferences. |
| `auditEntries` | `auditId` | Persistent local audit trail. |
| `assets` | `id` | Local asset portfolio records. |
| `liabilities` | `id` | Local liability portfolio records. |
| `incomes` | `id` | Local recurring and one-time income records. |
| `expenses` | `id` | Local recurring and one-time expense records. |
| `goals` | `id` | Local goal records and lifecycle state. |

Financial stores declare owner, status, type, currency, frequency where applicable, effective date, and update-time indexes. No secondary indexes are currently declared for non-financial stores, and their query behavior remains full-store read plus in-memory projection.

## Migration Registry

| Source Version | Target Version | Status |
| --- | --- | --- |
| `2` | `6` | Supported backup import path. |
| `3` | `6` | Supported asset and liability store migration path. |
| `4` | `6` | Supported income, expense, and cashflow store migration path. |
| `5` | `6` | Supported goal and financial health store migration path. |
| `6` | `6` | Current idempotent path. |

Migration must be idempotent. A failed import must leave the current stores intact unless the staged restore completes.

## Write Validation

- Scenario writes require `scenarioId`.
- Recommendation decision writes require `decisionId`.
- Settings writes require `key`.
- Audit writes require `auditId`.
- Backup export is minimized and sensitive fields are masked before download.
- Backup restore uses dry-run planning before replacement or merge.

## Integrity and Corruption Handling

- Unsupported backup versions are rejected by migration planning.
- Backup records are reduced to allowlisted fields.
- Restore dry run reports store counts, conflicts, and migration compatibility.
- Merge restore preserves existing records when keys conflict.
- Replace restore is staged through explicit restore options.

## Lifecycle

- Local data is user-owned and browser-local.
- Archive/export is handled through plain or encrypted backup envelope.
- Restore supports conflict policy and audit report generation.
- Concurrent updates use BroadcastChannel coordination where available.
- IndexedDB unavailable handling must surface a runtime error and keep static knowledge browsing available where possible.
- Storage quota checks should remain a validation target before larger local datasets are introduced.

## Backup Compatibility

| Envelope | Version | Import |
| --- | --- | --- |
| Plain backup | `atlas-pwa-runtime-backup.v1` | Supported |
| Encrypted backup | `atlas-pwa-runtime-encrypted-backup.v1` | Supported after passphrase decrypt |
| Database version `2` | Legacy compatible | Migrated to current |
| Database version `3` | Legacy compatible | Migrated to current |
| Database version `4` | Legacy compatible | Migrated to current |
| Database version `5` | Legacy compatible | Migrated to current |
| Database version `6` | Current | Direct import |

Rollback policy: if migration or import validation fails, keep existing local stores and report the failure through dry-run or restore feedback.
