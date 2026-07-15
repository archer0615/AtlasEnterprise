# Simulator Runtime Scaffold Report

## Purpose

This report records the first simulator runtime scaffold.

## Current Behavior

- Reads simulator fixture JSON files from `simulator/fixtures/`.
- Produces deterministic summary output at `simulator/outputs/scenario-results.json`.
- Uses expected fixture recommendation data until executable simulation formulas exist.

## Command

- `npm run simulator:run`

## Guardrails

- Runtime scaffold must not invent financial advice.
- Output must preserve fixture IDs, assumption versions, and formula versions.
- Generated output should remain small and reviewable.

## Follow-up

- Replace expected-output passthrough with formula-backed calculations.
- Add output tolerance comparison against fixture expectations.
