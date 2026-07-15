# Dashboard Persistence Migration

## Purpose

This document records the first migration rule for dashboard UI preference storage.

## Current Storage

| Key | Purpose |
| --- | --- |
| `atlas.dashboard.snapshotId` | Selected dashboard snapshot ID |

## Legacy Storage

| Key | Migration |
| --- | --- |
| `atlas.dashboard.selectedScenario` | Read once and rewrite to `atlas.dashboard.snapshotId` |

## Guardrails

- Persist only UI preference data.
- Do not store personal financial inputs in plain localStorage.
- Keep migration reads idempotent.
- Add a versioned migration document before renaming storage keys again.

## Validation

- `npm run validate:frontend`
- `npm run validate`
