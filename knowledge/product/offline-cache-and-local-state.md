# Offline Cache And Local State

Document Path: knowledge/product/offline-cache-and-local-state.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: PWA
Owner: Project Atlas
Source of Truth: Atlas Offline Cache Source of Truth
Last Updated: 2026-07-16

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

## Local State

- Dashboard scenario preference may be stored in local browser state.
- Local state must not be the source of truth for financial facts.
- Clearing local state must not break app shell loading, knowledge browsing, or default dashboard snapshot selection.
- Runtime financial decisions must use versioned snapshots or fixtures, not unversioned local state.

## Invalidation

- Cache invalidation is versioned by `sw-version.js`.
- A new cache name must replace prior cache contents on service worker activation.
- Generated knowledge changes must update document assets and service worker version metadata.
- Stale caches must be deleted during activation.

## Recovery

- Missing cached GET requests should attempt network fetch.
- Failed navigation-like fetches may fall back to `/index.html`.
- Missing generated knowledge assets must fail validation before commit.
- Corrupt dashboard fixture JSON must fail frontend or fixture validation before release.

## Testing

- `npm run build:knowledge`
- `npm run validate:pwa`
- `npm run validate:offline`
- `npm run validate:frontend`

## Related Specifications

- `knowledge/product/pwa-runtime-capability.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/governance/knowledge-source-of-truth.md`
- `frontend/sw.js`
- `frontend/sw-version.js`
