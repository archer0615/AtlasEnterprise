# Fixture Validation Hardening Report

## Purpose

This report records the stricter fixture checks added for simulator fixtures and dashboard snapshot bridges.

## Added Checks

- Simulator fixture IDs must be unique.
- Dashboard snapshot IDs must be unique.
- `defaultSnapshotId` must match an existing dashboard snapshot.
- Dashboard snapshots must still reference existing simulator fixture files.

## Validation

- `npm run validate:fixtures`
- `npm run validate`

## Follow-up

- Add full JSON Schema validation when a schema validator dependency is available.
- Add fixture output tolerance checks after executable simulator logic exists.
