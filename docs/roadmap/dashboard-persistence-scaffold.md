# Dashboard Persistence Scaffold

## Purpose

This scaffold records the first local-only persistence behavior for the decision dashboard prototype.

## Current Behavior

- Dashboard scenarios are loaded from `frontend/fixtures/dashboard-snapshots.json`.
- Selected dashboard scenario is stored in `localStorage` under `atlas.dashboard.snapshotId`.
- If storage is unavailable, the dashboard falls back to the default fixture scenario.
- No personal financial inputs are persisted yet.

## Guardrails

- Persist UI preference only until encrypted local financial storage exists.
- Do not store scenario outputs that contain personal user data in plain localStorage.
- Keep fixture-backed dashboard data deterministic.
- Add migration rules before changing persisted key names.

## Validation

- `npm run validate:frontend`
- `npm run validate:fixtures`
- `npm run validate`
