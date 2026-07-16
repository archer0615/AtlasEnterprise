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
- Formula mappings must resolve to known catalog formula IDs.

## Validation

- `npm run validate:fixtures`
- `npm run validate`

## Follow-up

- Add full JSON Schema validation when a schema validator dependency is available.
- Expand dashboard field-level traceability to named formula IDs.
- Add metric-card-level formula IDs after dashboard snapshot schema versioning is introduced.
