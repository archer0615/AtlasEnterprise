# Offline Cache Validation Report - 2026-07-15

## Scope

This report records offline cache coverage for the knowledge PWA after dashboard fixtures were added.

## Cached App Shell

| Asset | Purpose |
| --- | --- |
| `/index.html` | Main PWA shell |
| `/src/main.js` | Search, document viewer, dashboard rendering |
| `/src/styles.css` | Responsive layout and dashboard styles |
| `/fixtures/dashboard-snapshot.json` | Single dashboard fallback fixture |
| `/fixtures/dashboard-snapshots.json` | Multi-scenario dashboard fixture collection |
| `/knowledge/index.json` | Generated document list |
| `/knowledge/search-index.json` | Generated search data |
| `/knowledge/document-assets.json` | Generated document asset manifest |

## Validation Result

- `npm run validate:pwa` verifies required app shell assets exist and are listed in the service worker.
- `npm run validate:frontend` verifies dashboard fixture collection wiring.
- `npm run validate:fixtures` verifies dashboard fixture source references.
- `npm run validate:offline` verifies service worker shell assets and generated document assets.
- `npm run validate` runs all validation layers together.

## Follow-up

- Add browser-level offline navigation checks after a local browser automation runner is available.
- Add cache manifest diff reporting when fixture or generated knowledge assets change.
