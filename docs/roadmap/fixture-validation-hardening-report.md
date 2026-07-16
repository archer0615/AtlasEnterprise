# Fixture Validation Hardening Report

## Purpose

This report records the stricter fixture checks added for simulator fixtures and dashboard snapshot bridges.

## Added Checks

- Simulator fixture IDs must be unique.
- Dashboard snapshot IDs must be unique.
- `defaultSnapshotId` must match an existing dashboard snapshot.
- Dashboard snapshots must still reference existing simulator fixture files.
- Formula input values must be numeric except `currency`.
- Formula rates and weights must be between 0 and 1.
- Formula month counts must be positive integers.
- Assumption and formula versions must end with `.vN`.
- Recommendation warning references must be declared in fixture warnings.
- Dashboard snapshots must bind to a simulator fixture ID and expose complete metric, scenario, and action fields.
- Fixture formula mappings must exist for every simulator fixture.
- Dashboard formula mappings must exist for every dashboard snapshot.
- Dashboard metric-card formula mappings must exist for every dashboard metric.
- Formula mappings must resolve to known catalog formula IDs.
- Fixture and dashboard JSON now run through the in-repo schema validator.

## Validation

- `npm run validate:fixtures`
- `npm run validate`

## Follow-up

- Expand schema validator support if schemas begin using advanced JSON Schema keywords.
- Add persisted metric-card formula IDs to dashboard fixture schema after schema versioning is introduced.
