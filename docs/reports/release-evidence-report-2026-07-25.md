# Release Evidence Report 2026-07-25

## Scope

- Release dry-run validation side-effect hardening.
- Visual regression baseline check.
- Local release readiness evidence.

## Evidence

| Check | Result | Notes |
|---|---|---|
| `npm run validate:feature` | Passed | 50/50 steps passed before side-effect fix. |
| `npm run validate:visual-regression` | Passed | Desktop drift 0.00%; mobile drift 0.01%. |
| `npm run validate:release:dry-run` | Passed | 85/85 steps passed after report writes were disabled by default. |

## Validation Side-Effect Fix

- `scripts/validate-test-quality-governance.mjs` no longer updates `docs/reports/testing-architecture-quality-report.json` during validation unless `--update-report` is passed.
- `scripts/benchmark-quality-baseline.mjs` no longer updates `docs/reports/testing-performance-baseline.json` during validation unless `--update-report` is passed.
- Release dry-run validation now preserves a clean working tree.

## Remaining Release Notes

- Report refresh is now explicit: run the underlying report script with `--update-report` when the stored evidence files must be refreshed.
- npm reports a newer major version is available; this is informational and not a release blocker.
