# Simulator Formula Implementation Report

## Purpose

This report records the first formula-backed simulator runtime behavior.

## Implemented Calculations

| Fixture | Runtime Metric |
| --- | --- |
| `mortgage-prepayment-baseline-2026` | Post-prepayment reserve months |
| `home-upgrade-2031-baseline` | Transaction cost estimate |
| `investment-drawdown-stress` | Stressed portfolio value and reserve months |

## Validation

- `npm run simulator:run`
- `npm run validate:simulator`
- `npm run validate`

## Follow-up

- Add amortization and refinancing calculations for loan fixtures.
- Move formulas into reusable simulator modules when calculation breadth increases.
