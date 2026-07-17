# PWA New Task Planning and Regression Validation

Date: 2026-07-17

## New Task Planning

1. Add an export preview panel so users can inspect localized report JSON before download.
2. Add a scenario comparison view that highlights metric deltas between the selected dashboard fixture and saved local scenarios.
3. Add a backup import dry-run mode with clearer overwrite warnings and scenario counts.
4. Add a recommendation history filter by fixture, decision, and date.
5. Add a loan input reset action and validation state styling for faster correction.
6. Add a compact mobile toolbar for dashboard, recommendation, loan, and report sections.
7. Add visual assertions for exported report feedback and backup preview text.
8. Add regression coverage for failed knowledge-index and dashboard-fixture loads.
9. Add a release-note generator that summarizes latest local commits and validation status.
10. Add a scheduled regression checklist document for local-only release cadence.

## Regression Validation Scope

1. Frontend readable copy and runtime contract.
2. Formula registry and simulator fixture compatibility.
3. Score policy rules.
4. Generated fixture cache policy.
5. Dashboard and runtime fixture drift.
6. Dashboard projection API and service tests.
7. Portfolio reporting contract.
8. Cache invalidation and local repository adapters.
9. Browser workflow and visual regression screenshots.
10. PWA, offline cache, simulator output, deployment, and preview smoke checks.

## Cadence

- Before feature work: run `npm run validate:frontend` and `npm run validate:browser-workflow`.
- Before commit: run `git diff --check` and `npm run validate`.
- Before release archive: run `npm run build:knowledge`, `npm run validate`, then verify `git status --short`.
