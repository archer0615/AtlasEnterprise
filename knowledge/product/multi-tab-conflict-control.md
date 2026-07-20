# Multi-tab Conflict Control

Document Path: knowledge/product/multi-tab-conflict-control.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.2
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Data Safety
Owner: Project Atlas
Source of Truth: Atlas Multi-tab Conflict Control Source of Truth
Last Updated: 2026-07-20

## Purpose

Defines how Atlas prevents silent overwrite and unsafe migration behavior when multiple browser tabs use the local-first PWA.

## Conflict Sources

- Two tabs editing the same scenario.
- One tab importing backup data while another tab edits local data.
- One tab clearing local data while another tab renders stale records.
- A service worker update while a tab is using an older runtime.
- IndexedDB schema upgrade or migration while another tab is open.

## Required Controls

- Use a browser coordination channel such as `BroadcastChannel` when available.
- Maintain a single active migration lock.
- Use optimistic version checks for mutable user-owned records.
- Show a visible conflict message instead of silently overwriting newer data.
- Require user confirmation before applying backup restore when stale tabs may exist.
- Release locks after successful migration, failed migration, tab close, or timeout.

## Record Version Rules

- Mutable records must carry a version or updated timestamp suitable for conflict checks.
- Save operations must compare the caller's base version with the current persisted version.
- If the persisted version changed after the caller loaded the record, the save must be rejected or require merge confirmation.
- Immutable records, such as scenario versions or calculation results, must not be overwritten in place.

## Migration Lock Rules

- Migration lock metadata must include lock owner, acquired time, database version, and target version.
- A tab that cannot acquire the lock must not run migration.
- Expired locks may be reclaimed only after confirming no active owner responds.
- Lock state must be auditable when migration changes persisted data.

## Message Contract

Coordination messages should include:

| Field | Purpose |
| --- | --- |
| `messageType` | Identifies edit, import, reset, migration, or release event. |
| `tabId` | Identifies the browser context. |
| `recordType` | Identifies affected store or aggregate. |
| `recordId` | Identifies affected record when applicable. |
| `baseVersion` | Version read before mutation. |
| `targetVersion` | Version after mutation or migration. |
| `occurredAt` | ISO timestamp for ordering and audit. |

## Validation Matrix

| Case | Expected Result |
| --- | --- |
| Two tabs save same scenario from same base version | First save succeeds; second save sees conflict. |
| Backup restore starts while another tab is active | Other tab receives restore warning or restore requires confirmation. |
| Local reset starts while another tab is active | Other tab refreshes state or shows stale-data warning. |
| Migration lock is already held | New migration attempt is blocked. |
| Migration lock owner disappears | Lock can expire and be reclaimed safely. |

## Current Implementation Mapping

- Current IndexedDB runtime has metadata, scenario, recommendation decision, setting, and audit stores.
- Current runtime has a per-tab runtime ID and `BroadcastChannel` coordination when supported by the browser.
- Current runtime persists migration lock metadata in the IndexedDB metadata store.
- Current backup restore acquires and releases the local migration lock before replacing scenario records.
- Current scenario saves use optimistic `aggregateVersion` checks and reject stale writes.
- Merge UI for rejected scenario conflicts remains Phase 2 implementation work.

## Related Specifications

- `knowledge/product/offline-cache-and-local-state.md`
- `knowledge/product/import-version-migration.md`
- `knowledge/product/encrypted-backup-spec.md`
- `docs/database/05-DatabaseDesign.md`
- `frontend/src/indexeddb-runtime.js`
