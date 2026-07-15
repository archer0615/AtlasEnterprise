# Offline PWA Validation

Atlas Enterprise validates the static PWA shell with `npm run validate:pwa`.

## Checks

- Required static files exist under `frontend/`.
- `manifest.webmanifest` uses standalone display mode.
- The manifest includes a start URL and at least one icon.
- `sw.js` includes the static app shell files in its cache list.
- `knowledge/index.json` exists and contains generated documents.

## Current Result

The static PWA shell is valid when `npm run build` and `npm run validate:pwa` both pass.
