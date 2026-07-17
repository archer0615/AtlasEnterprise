# Static PWA Implementation

Atlas Enterprise currently uses a static-first PWA implementation.

## Runtime

- `frontend/index.html` provides the application shell.
- `frontend/src/main.js` loads generated static JSON from `/knowledge/`.
- `frontend/sw.js` provides offline caching for the shell and generated indexes.
- `frontend/manifest.webmanifest` provides standalone PWA metadata.

## Data Strategy

- Source documents remain in `knowledge/**/*.md`.
- `frontend/scripts/build-knowledge-index.mjs` converts Markdown into static JSON.
- Generated files are written to `frontend/knowledge/`.
- No Future Architecture service, hosted API, or server database is required for the PWA v1 Runtime.
- IndexedDB Runtime is the browser-local persistence target for scenarios and user-owned runtime state.

## Build Commands

```bash
npm run build:knowledge
npm run build
```

## Deployment

The `frontend/` directory can be deployed as static files. The generated `frontend/knowledge/` directory must be included in the deployed artifact.

## Required Static Routes

- `/`
- `/manifest.webmanifest`
- `/sw.js`
- `/src/main.js`
- `/src/styles.css`
- `/knowledge/index.json`
- `/knowledge/search-index.json`
- `/icons/atlas-icon.svg`

## Deployment Artifact

The deployment artifact is the complete `frontend/` directory after running `npm run build`.

## Future Architecture

Future Cloud Architecture may add hosted APIs, cloud persistence, or sync later, but those extensions must not be required for Static PWA startup, Browser Runtime calculation, Offline First dashboards, IndexedDB scenarios, or Knowledge JSON loading.
