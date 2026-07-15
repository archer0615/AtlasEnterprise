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
- No runtime database, IndexedDB, or backend API is required for the current shell.

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
