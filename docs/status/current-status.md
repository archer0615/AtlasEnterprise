# Current Status

Atlas v1 is a Static-first, Local-first, Offline-first GitHub Pages PWA.

## Runtime Boundary

- Implemented runtime: static PWA, browser runtime, generated knowledge JSON, IndexedDB persistence, local calculation and simulator fixtures.
- Canonical knowledge source: `knowledge/**/*.md`.
- Generated knowledge output: `frontend/knowledge/**`.
- Future optional architecture: `backend/`, `database/`, and `ai/`.
- Not a v1 runtime dependency: ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync.

## Implemented Surfaces

- Knowledge index generation from canonical Markdown into frontend JSON.
- PWA shell with manifest, service worker, offline cache validation, and GitHub Pages workflow.
- Dashboard snapshot rendering, scenario switching, local scenario comparison, recommendation decisions, loan calculation panel, export report preview, and validation export.
- Domain contracts and command services for Scenario and Decision local runtime, including lifecycle/state-machine validation and recommendation disposition audit evidence.
- IndexedDB repositories for scenarios, recommendation decisions, settings, audit entries, backup export, encrypted backup export, dry-run restore, staged restore, merge restore, and migration metadata.
- Simulator fixtures, formula registry validation, score policy validation, dashboard runtime snapshots, dashboard fixture drift validation, and runtime fixture drift validation.

## Evidence

- README runtime boundary: `README.md`.
- Frontend runtime boundary: `frontend/README.md`.
- PWA shell: `frontend/index.html`, `frontend/src/main.js`, `frontend/src/indexeddb-runtime.js`, `frontend/sw.js`, `frontend/manifest.webmanifest`.
- Knowledge generation: `frontend/scripts/build-knowledge-index.mjs`.
- Simulator: `simulator/scripts/`, `simulator/fixtures/`, `frontend/fixtures/`.
- GitHub Pages workflow: `.github/workflows/pages.yml`.
