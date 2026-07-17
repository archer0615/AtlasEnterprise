> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Formula Runtime Validation Audit Report

## Purpose

Records completion of runtime formula evaluation contract, formula input validation rules, and dashboard fixture binding audit.

## Completed Items

- Runtime simulator output now includes `formulaEvaluation.contractVersion`.
- Runtime simulator output now records formula input validation results.
- Simulator output validation now requires contract version, formula version match, input validation success, checked field count, and evaluated metric count.
- Fixture validation now enforces formula input type, non-negative numeric values, rate and weight bounds, month count integrity, version suffixes, and warning reference consistency.
- Dashboard fixture validation now confirms each snapshot binds to a simulator fixture and has complete metric, scenario, and action fields.
- Shared formula contract logic now lives in `simulator/scripts/formula-contract.mjs`.
- Runtime evaluation now flows through `simulator/scripts/formula-runtime-service.mjs`.
- Fixture and dashboard mappings now resolve to named formula IDs and are checked against the formula catalog.
- Dashboard metric-card formula mappings now exist per snapshot metric.
- Runtime output now includes `scoreEvaluation` using `FORM-DECISION-SCORE`.
- Fixture validation now uses the in-repo JSON schema validator in `simulator/scripts/schema-validator.mjs`.
- Dashboard fixtures now persist `schemaVersion` and metric-level `formulaIds`.
- Score evaluation now uses deterministic engine-calculated score rules instead of direct score passthrough.
- Schema validation now supports `const`, `enum`, `uniqueItems`, and `additionalProperties: false`.
- Score weights and overrides now live in `simulator/scripts/score-policy.mjs`.
- Dashboard fixture formula bindings can be regenerated with `npm run generate:dashboard-fixtures`.
- Schema validation now also supports `minimum`, `maximum`, `oneOf`, and `anyOf`.
- Score policy is persisted in `simulator/config/score-policy.json` and validated against runtime policy.
- Dashboard fixture drift is checked by `npm run validate:dashboard-drift`.
- Runtime dashboard bindings are generated into `frontend/fixtures/dashboard-runtime-snapshots.json`.
- Score policy migration is recorded in `simulator/config/score-policy-migration.json`.
- Generated fixture cache policy is recorded in `frontend/fixtures/generated-fixture-cache-policy.json`.
- Reserved dashboard projection API contract is documented in `backend/dashboard-projection-api.md`.
- Dashboard projection service scaffold is implemented in `backend/dashboard-projection-service.mjs`.
- Cache invalidation validation is covered by `npm run validate:cache-invalidation`.
- Deployment validation hook is covered by `npm run validate:deployment`.
- Dashboard projection service tests are covered by `npm run test:dashboard-projection`.
- Generated fixture cache policy is now versioned as `generated-fixture-cache-policy.v2`.
- Deployment artifact manifest is recorded in `deployment/artifact-manifest.json`.

## Validation

- `npm run simulator:run`
- `npm run validate:fixtures`
- `npm run validate:simulator`
- `npm run validate`

## Remaining Gaps

- Runtime formula implementations are still fixture-scaffolded for recommendation status and score.
- Dashboard metrics are mapped at fixture/snapshot level; individual metric-card formula IDs remain a later field-level enhancement.
- Score evaluation remains deterministic until production scoring policy is backed by persisted configuration.
- Runtime dashboard binding is fixture-backed until a service endpoint owns dashboard projection generation.
- Projection API remains contract-only until backend services are activated.
- Projection service remains fixture-backed until Future Cloud Architecture activation.
- Deployment artifact manifest remains static until hosting output paths are generated.
