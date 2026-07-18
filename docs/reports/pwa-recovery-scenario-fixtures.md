# PWA Recovery Scenario Fixtures

Date: 2026-07-18

## Valid Backup Restore

- Fixture intent: restore a backup with valid schema, unique scenario IDs, and complete scenario names, scores, and statuses.
- Expected result: import preview shows add and overwrite counts before restore.
- Validation boundary: `npm run validate:offline` and browser workflow validation.

## Duplicate Scenario Guard

- Fixture intent: reject a backup where two records share the same scenario ID.
- Expected result: restore is blocked before IndexedDB replacement.
- Validation boundary: IndexedDB backup validation rejects duplicates.

## Migration Failure Recovery

- Fixture intent: simulate a migration failure before activating a new local schema version.
- Expected result: source data remains readable and recovery guidance is available.
- Validation boundary: data migration and update strategy documentation remain aligned.

## Offline Cache Repair

- Fixture intent: detect stale generated knowledge assets or shell cache drift.
- Expected result: cache invalidation and offline validation fail visibly until artifacts are rebuilt.
- Validation boundary: cache policy, cache invalidation, PWA, and offline validation commands.
