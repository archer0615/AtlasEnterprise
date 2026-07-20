# PWA Runtime Capability

Document Path: knowledge/product/pwa-runtime-capability.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.1
Status: Canonical Specification
Domain: Product Capability
Bounded Context: PWA
Owner: Project Atlas
Source of Truth: Atlas PWA Runtime Source of Truth
Last Updated: 2026-07-20

## Purpose

Defines the runtime capability expected from the Atlas static-first PWA shell.

## Runtime Scope

- Load the app shell from static assets.
- Register a service worker.
- Expose install metadata through the web manifest.
- Load generated knowledge indexes and documents.
- Load dashboard fixtures for offline-capable dashboard views.
- Recover to `/index.html` when a cached navigation route is unavailable.

## Required Assets

- `/index.html`
- `/manifest.webmanifest`
- `/sw.js`
- `/sw-version.js`
- `/src/main.js`
- `/src/indexeddb-runtime.js`
- `/src/dashboard-model.js`
- `/src/styles.css`
- `/fixtures/dashboard-snapshot.json`
- `/fixtures/dashboard-snapshots.json`
- `/fixtures/dashboard-runtime-snapshots.json`
- `/fixtures/scenario-results.json`
- `/fixtures/generated-fixture-cache-policy.json`
- `/knowledge/index.json`
- `/knowledge/search-index.json`
- `/knowledge/document-assets.json`
- `/icons/atlas-icon.svg`

## Runtime Rules

- The service worker cache name must come from `sw-version.js` when available.
- App shell assets must be precached during service worker install.
- Generated knowledge document assets must be precached from `/knowledge/document-assets.json`.
- GET requests should resolve from cache first, then network, then `/index.html` fallback.
- Non-GET requests must bypass service worker handling.
- Activation must remove older cache names.
- The service worker cache version must match the generated knowledge `buildId` through `sw-version.js`.
- Runtime dashboard fixtures, simulator results, and generated fixture cache policy must be cached with the app shell.
- PWA startup must not require backend services, authentication, cloud sync, or a server database.

## Upgrade Rules

- `npm run build:knowledge` must update generated knowledge assets before release validation.
- Any generated knowledge `buildId` change must be reflected in `frontend/sw-version.js`.
- A new service worker version must replace old caches during activation.
- Upgrade validation must fail when required app shell assets are missing from `frontend/sw.js`.
- Offline users must keep the old cache until the new service worker installs successfully.

## Failure Handling

- Missing static shell assets are release blockers.
- Missing generated knowledge documents are release blockers.
- Failed non-navigation GET requests may return a cached response if available.
- Failed navigation-like GET requests may fall back to `index.html`.
- Corrupt fixture JSON must fail validation before release.

## Validation

- `npm run validate:pwa` must confirm manifest, service worker, and generated knowledge availability.
- `npm run validate:offline` must confirm app shell and generated document cache coverage.
- Fixture-backed dashboard views must remain valid JSON and valid UTF-8.

## Related Specifications

- `knowledge/product/offline-cache-and-local-state.md`
- `knowledge/product/current-capability-matrix.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `frontend/sw.js`
- `frontend/manifest.webmanifest`
- `frontend/scripts/validate-pwa.mjs`
- `frontend/scripts/validate-offline-cache.mjs`
