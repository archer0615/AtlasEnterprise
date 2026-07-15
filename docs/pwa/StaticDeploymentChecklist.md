# Static Deployment Checklist

## Pre-Deploy

- Run `npm run build`.
- Run `npm run validate:pwa`.
- Serve `frontend/` with a local static HTTP server.
- Verify the app shell loads at `/`.
- Verify `/knowledge/index.json` returns HTTP 200.
- Verify `/sw.js` returns HTTP 200.
- Verify `/manifest.webmanifest` returns HTTP 200.

## Artifact

- Publish the complete `frontend/` directory.
- Include generated `frontend/knowledge/`.
- Include `frontend/icons/`.
- Include `frontend/src/`.
- Include `frontend/sw.js`.
- Include `frontend/manifest.webmanifest`.

## Constraints

- Do not add runtime database requirements.
- Do not add backend API requirements for read-only knowledge browsing.
- Do not require IndexedDB for the current static shell.
