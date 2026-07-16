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

## Follow-up

- Replace expected-output passthrough with formula-backed calculations.
- Add output tolerance comparison against fixture expectations.
- Replace fixture-backed status and score passthrough with production calculation service responses.
- Externalize score weights and thresholds from the runtime scaffold.
