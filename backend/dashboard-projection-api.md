# Dashboard Projection API

## Purpose

Defines the reserved service contract for dashboard projection generation while preserving the current static-first PWA runtime.

## Endpoint

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/dashboard/projections/{snapshotId}` | Return one generated dashboard projection by snapshot ID. |
| `GET` | `/api/v1/dashboard/projections` | Return the generated dashboard projection collection. |

## Response Contract

Each projection response must include:

- `schemaVersion`: `dashboard-runtime-projection.v1`.
- `snapshotId`: stable dashboard snapshot ID.
- `sourceFixtureId`: source simulator fixture ID.
- `score`: normalized decision score.
- `status`: recommendation status.
- `formulaIds`: formula IDs used for runtime binding.
- `scorePolicyVersion`: score policy version used to calculate the score.
- `generatedAt`: projection generation timestamp.

## Rules

- Service output must be reproducible from `frontend/fixtures/dashboard-runtime-snapshots.json` until the production projection service exists.
- Service output must preserve formula IDs and score policy version.
- Service output must not replace static fixture loading for PWA startup.
- API behavior must remain deterministic and auditable.
