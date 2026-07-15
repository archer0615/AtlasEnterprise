# Simulator Output Validation Report

## Purpose

This report records the first simulator output validation pass.

## Current Checks

- Output result count must match fixture count.
- Output fixture IDs must reference existing fixtures.
- Assumption and formula versions must match fixture sources.
- Recommendation status and score must match expected fixture recommendation values.

## Commands

- `npm run simulator:run`
- `npm run validate:simulator`
- `npm run validate`

## Follow-up

- Replace passthrough score comparison with formula-backed output tolerance checks.
- Add per-metric tolerance comparisons after simulator calculations exist.
