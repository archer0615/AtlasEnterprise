# Simulator Runtime Scaffold Report

## Purpose

This report records the first simulator runtime scaffold.

## Current Behavior

- Reads simulator fixture JSON files from `simulator/fixtures/`.
- Produces deterministic summary output at `simulator/outputs/scenario-results.json`.
- Uses expected fixture recommendation data until executable simulation formulas exist.
- Emits `formulaEvaluation.contractVersion` for each result.
- Records formula input validation status, checked field count, violations, evaluated metric count, and formula version.
- Routes runtime fixture evaluation through `formula-runtime-service.mjs`.
- Uses `formula-contract.mjs` for shared input validation and formula ID mapping.
- Emits `scoreEvaluation` with `FORM-DECISION-SCORE` metadata.
- Calculates deterministic recommendation scores through the runtime service.
- Reads score thresholds from `score-policy.mjs`.
- Persists score policy in `simulator/config/score-policy.json`.
- Generates dashboard runtime bindings from simulator output.
- Records score policy migration metadata.
- Validates generated fixture cache policy and dashboard projection API contract.
- Exposes fixture-backed dashboard projections through a backend service scaffold.
- Validates cache invalidation and deployment readiness hooks.
- Tests projection service collection, default snapshot lookup, and missing snapshot behavior.
- Validates deployment artifact manifest existence.

## Command

- `npm run simulator:run`

## Guardrails

- Runtime scaffold must not invent financial advice.
- Output must preserve fixture IDs, assumption versions, and formula versions.
- Generated output should remain small and reviewable.
- Runtime formula evaluation must use `runtime-formula-evaluation.v1`.
- Input validation must pass before a result can be considered evaluated.
- Formula IDs emitted by runtime output must exist in the canonical formula catalog.
- Score evaluation output must equal the result score and remain traceable to `FORM-DECISION-SCORE`.
- Dashboard v2 fixture metric cards must carry persisted formula IDs.
- Score output must carry the active score policy version.
- Runtime dashboard bindings must preserve source fixture, score, status, formula IDs, and score policy version.
- Projection API contracts must preserve runtime binding fields.
- Deployment validation must remain part of the root validation pipeline.
- Cache policy version changes must remain synchronized with deployment validation.

## Follow-up

- Replace expected-output passthrough with formula-backed calculations.
- Add output tolerance comparison against fixture expectations.
- Replace fixture-backed status and score passthrough with production calculation service responses.
- Replace module-based score policy with persisted configuration when the calculation service is introduced.
- Replace runtime dashboard fixture generation with the production dashboard projection service.
- Move cache policy enforcement into deployment validation when hosting is introduced.
- Replace fixture-backed projection service with an application service when backend runtime is activated.
- Replace static artifact manifest with build-generated manifest when deployment packaging exists.
