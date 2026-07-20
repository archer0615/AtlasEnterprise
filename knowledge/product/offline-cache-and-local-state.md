# Offline Cache And Local State

Document Path: knowledge/product/offline-cache-and-local-state.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.4
Status: Canonical Specification
Domain: Product Capability
Bounded Context: PWA
Owner: Project Atlas
Source of Truth: Atlas Offline Cache Source of Truth
Last Updated: 2026-07-20

## Purpose

Defines offline cache behavior, local dashboard state, cache invalidation, and recovery expectations.

## Cache Groups

| Group | Source | Strategy |
| --- | --- | --- |
| App shell | Static frontend assets | Precache on install. |
| Dashboard fixtures | `frontend/fixtures/*.json` | Precache with app shell. |
| Knowledge indexes | `frontend/knowledge/*.json` | Precache with app shell. |
| Knowledge documents | `/knowledge/document-assets.json` | Precache listed document assets. |
| Runtime fetches | Any GET request | Cache after successful network response. |
| IndexedDB state | `frontend/src/indexeddb-runtime.js` | Persist user-owned runtime state outside the service worker cache. |

## Local State

- Dashboard scenario preference may be stored in local browser state.
- Local state must not be the source of truth for financial facts.
- Clearing local state must not break app shell loading, knowledge browsing, or default dashboard snapshot selection.
- Runtime financial decisions must use versioned snapshots or fixtures, not unversioned local state.
- Scenario records, recommendation decisions, backup records, audit entries, migration metadata, and user profile state belong in IndexedDB-backed repositories.
- IndexedDB repository adapters must preserve technology-neutral repository interfaces.
- Backup restore must validate schema and references before applying data.
- Local reset must clear user-owned runtime state without deleting app shell assets or generated knowledge assets.
- Offline repair must record an audit entry when it mutates persisted state.
- Multi-store backup restore must produce a restore audit report with conflict policy, source version, staging result, and restored record counts.

## Invalidation

- Cache invalidation is versioned by `sw-version.js`.
- A new cache name must replace prior cache contents on service worker activation.
- Generated knowledge changes must update document assets and service worker version metadata.
- Stale caches must be deleted during activation.
- Cache invalidation must not delete IndexedDB financial state.
- Fixture cache policy changes must remain synchronized with `frontend/fixtures/generated-fixture-cache-policy.json`.
- Dashboard runtime bindings must be regenerated when simulator output or score policy changes.

## Recovery

- Missing cached GET requests should attempt network fetch.
- Failed navigation-like fetches may fall back to `/index.html`.
- Missing generated knowledge assets must fail validation before commit.
- Corrupt dashboard fixture JSON must fail frontend or fixture validation before release.
- Failed backup import must leave current IndexedDB state unchanged.
- Recovery workflows must expose enough preview and dry-run information to identify invalid records before applying changes.
- Default dashboard snapshot selection must still work after local scenario preference is cleared.

## Phase 2 Completion Criteria

- Encrypted JSON backup is available for user-owned IndexedDB state.
- Import validation supports schema version checks and migration planning.
- Backup checksum validation detects modified export payloads.
- Restore dry run reports records to create, update, skip, or reject.
- Multi-tab conflict control prevents stale writes from silently overwriting newer state.
- Local reset and offline repair actions are auditable.
- Multi-store backup restore reports are visible in the maintenance panel and included in validation exports.

## Testing

- `npm run build:knowledge`
- `npm run validate:pwa`
- `npm run validate:offline`
- `npm run validate:frontend`
- `npm run test:backup-restore-e2e`

## Related Specifications

- `knowledge/product/pwa-runtime-capability.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/governance/knowledge-source-of-truth.md`
- `frontend/sw.js`
- `frontend/sw-version.js`
- `frontend/src/indexeddb-runtime.js`
- `docs/architecture/pwa-repository-interface.md`
- `knowledge/product/encrypted-backup-spec.md`
- `knowledge/product/import-version-migration.md`
- `knowledge/product/multi-tab-conflict-control.md`
