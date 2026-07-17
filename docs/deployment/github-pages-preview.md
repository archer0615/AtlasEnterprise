# GitHub Pages Preview Deployment

## Status

Ready for internal preview deployment.

## Runtime

Atlas v1 deploys as a Static-first, Local-first GitHub Pages PWA:

- Static assets from `frontend/`
- Browser Runtime
- Offline-first Service Worker
- IndexedDB Persistence
- Generated Knowledge JSON

## Deployment Commands

Run before triggering GitHub Pages deployment:

```powershell
npm run build
npm run validate
```

Optional project-path smoke validation:

```powershell
npm run validate:preview-smoke
```

## GitHub Workflow

Deployment is handled by `.github/workflows/pages.yml`.

The workflow:

- Installs dependencies with `npm ci`
- Builds static Knowledge JSON
- Runs repository validation
- Uploads `frontend/` as the Pages artifact
- Deploys through GitHub Pages

## Preview Smoke Checks

The preview smoke validation checks project-path asset loading for:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `src/main.js`
- `src/indexeddb-runtime.js`
- `knowledge/index.json`
- `knowledge/search-index.json`

## Backend Independence

Preview deployment must not require ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, or Authentication Server. Those remain Future Optional Architecture.
