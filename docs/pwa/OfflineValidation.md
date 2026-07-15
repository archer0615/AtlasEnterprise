# Offline PWA Validation

Atlas Enterprise validates the static PWA shell with `npm run validate:pwa`. Validation confirms that the installable shell, generated knowledge artifacts, manifest metadata, and service worker cache list are internally consistent.

## Checks

- Required static files exist under `frontend/`.
- `manifest.webmanifest` uses standalone display mode.
- The manifest includes a start URL and at least one icon.
- `sw.js` includes the static app shell files in its cache list.
- `knowledge/index.json` exists and contains generated documents.

## Expected Result

The static PWA shell is valid when `npm run build` and `npm run validate:pwa` both pass.

## Failure Handling

- Missing generated knowledge requires rerunning the knowledge build.
- Missing manifest fields require correcting `frontend/manifest.webmanifest`.
- Missing service worker cache entries require updating the static shell cache list.
- Validation failures should block deployment until the static runtime can start offline.
