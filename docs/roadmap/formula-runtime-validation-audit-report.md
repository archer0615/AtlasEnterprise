# Formula Runtime Validation Audit Report

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

## Validation

- `npm run simulator:run`
- `npm run validate:fixtures`
- `npm run validate:simulator`
- `npm run validate`

## Remaining Gaps

- Runtime formula implementations are still fixture-scaffolded for recommendation status and score.
- Dashboard metrics are mapped at fixture/snapshot level; individual metric-card formula IDs remain a later field-level enhancement.
- Score evaluation still preserves fixture-approved expected score while the production scoring engine is pending.
