# Fixture Output Tolerance Report

## Purpose

This report records the first tolerance checks for simulator fixture expected outputs.

## Current Checks

- `tolerances.currency` must be numeric.
- `tolerances.ratio` must be numeric.
- Currency and ratio tolerances must be non-negative.
- Recommendation score must remain numeric.

## Validation

- `npm run validate:fixtures`
- `npm run validate`

## Follow-up

- Compare computed simulator outputs against expected values after executable simulation logic exists.
- Add field-level tolerance maps for scenario metrics that require different precision.
