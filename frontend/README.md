# Frontend

Static-first PWA shell for Atlas Enterprise Knowledge.

## Scripts

- `npm run build:knowledge` generates static JSON content from `knowledge/**/*.md`.
- `npm run build` refreshes the static knowledge artifact.
- Serve the `frontend/` directory with any static HTTP server for local testing or deployment.

## Runtime Data

The app does not require a backend database. Knowledge content is generated at build time into `frontend/knowledge/` and served as static assets.
