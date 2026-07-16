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
- Dashboard snapshots must use `dashboard-snapshot.v2`.
- Dashboard metric cards must persist formula IDs that match the canonical mapping.
- Dashboard fixture collections must carry `generatedBy: dashboard-fixture-generator.v1`.
- Dashboard runtime fixture collections must carry `generatedBy: dashboard-runtime-generator.v1`.
- Runtime bindings must include source fixture ID, score, status, formula IDs, and score policy version.
- Generated fixture cache policy must reference existing generated artifacts.
- Dashboard projection API validation must confirm runtime projection fields.
- Offline cache validation must include generated runtime dashboard artifacts.
- Cache invalidation validation must confirm stale cache deletion behavior.

## Validation

- `npm run validate:fixtures`
- `npm run validate`

## Follow-up

- Add support for additional JSON Schema keywords only when repository schemas require them.
- Move dashboard metric formula ID mapping from helper constants to generated fixture metadata when runtime dashboard generation exists.
- Add generator drift checks if dashboard fixtures become edited by multiple tooling paths.
- Replace runtime fixture file generation with service-backed projection generation when available.
- Add cache invalidation tests when generated artifacts are consumed by a service worker runtime cache.
- Extend deployment validation when hosting configuration is introduced.
