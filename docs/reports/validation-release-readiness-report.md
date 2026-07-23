# Validation Release Readiness Report

Version: v1.0.0 candidate
Date: 2026-07-23

## Profiles

| Profile | Scope | Required For Release |
| --- | --- | --- |
| quick | Critical local feedback and runtime slices | Yes |
| feature | Repository, migration, projection, browser, PWA, offline | Yes |
| full | Full repository validation excluding release-only gates | Yes |
| release | Clean working tree and release governance gates | Yes |

## Runtime Slice Coverage

- Asset / Liability
- Income / Expense / CashFlow
- Goal / Financial Health
- Scenario / Decision
- Recommendation / Execution Planning / Action Planning
- Notification / Automation / Scheduler / Business Calendar

## Release Command Set

```powershell
npm run validate:quick
npm run validate:feature
npm run validate:full
npm run validate:visual-regression
npm run validate:release
```

## Result

The repository is release ready after all release command set items pass on a clean local working tree.
