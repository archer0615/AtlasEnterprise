# Dashboard Scenario Switching Report

## Purpose

This report records the fixture-backed scenario switching behavior in the dashboard prototype.

## Current Scenarios

| Snapshot | Source Fixture |
| --- | --- |
| 房貸提前還款 | `simulator/fixtures/mortgage-prepayment-baseline-2026.json` |
| 2031 換屋 | `simulator/fixtures/home-upgrade-2031-baseline.json` |
| 退休壓力測試 | `simulator/fixtures/retirement-readiness-stress.json` |
| 貸款轉貸壓力 | `simulator/fixtures/loan-refinancing-rate-shock.json` |

## Persistence

- Selected scenario is persisted as a UI preference.
- Storage key: `atlas.dashboard.snapshotId`.
- Fixture data remains static and deterministic.

## Validation

- `npm run validate:frontend`
- `npm run validate:fixtures`
- `npm run validate`
