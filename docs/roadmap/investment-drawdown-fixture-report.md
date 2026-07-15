# Investment Drawdown Fixture Report

## Purpose

This report records the investment drawdown stress fixture added for scenario and dashboard coverage.

## Fixture

| Fixture | Source |
| --- | --- |
| `investment-drawdown-stress` | `simulator/fixtures/investment-drawdown-stress.json` |

## Dashboard Snapshot

| Snapshot | Label |
| --- | --- |
| `investment-drawdown-stress` | 投資下跌壓力 |

## Validation

- `npm run validate:fixtures`
- `npm run validate:frontend`
- `npm run validate`

## Follow-up

- Add executable drawdown calculation logic when the simulator runtime exists.
- Add portfolio performance split documents before building detailed attribution output.
