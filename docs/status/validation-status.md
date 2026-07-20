# Validation Status

## Primary Commands

| Command | Coverage |
| --- | --- |
| `npm run build:knowledge` | Regenerates `frontend/knowledge/**` from canonical Markdown. |
| `npm run validate:frontend` | Frontend knowledge, PWA, IndexedDB, dashboard, export, and workflow contracts. |
| `npm run validate:pwa` | Static shell, manifest, service worker, and generated knowledge index. |
| `npm run validate:offline` | Offline cache contract. |
| `npm run validate:fixtures` | Simulator fixture contract. |
| `npm run validate:simulator` | Simulator deterministic output. |
| `npm run validate` | Full repository validation suite. |

## Current Coverage

- Canonical/generated knowledge boundary is covered by build and frontend validation scripts.
- IndexedDB stores, backup security, local repositories, and browser workflows are covered by frontend validation scripts.
- Simulator formulas, score policies, fixtures, dashboard drift, runtime drift, and visual regression have dedicated scripts.
- Deployment, preview smoke, release governance, archive, monitoring, and maintenance readiness have dedicated scripts under `scripts/`.

## Known Limits

- Server API, database, authentication, and multi-device synchronization are intentionally outside v1 runtime validation.
- Backend scripts are prototype validation only and must not become required for static PWA startup.
