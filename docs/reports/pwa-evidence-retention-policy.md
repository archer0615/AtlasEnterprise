# PWA Evidence Retention Policy

Date: 2026-07-18

## Retention Scope

- Keep local commits that represent release checkpoints.
- Keep generated release notes, validation history, visual baselines, and knowledge indexes with the matching checkpoint.
- Keep recovery readiness and evidence archive reports for every local release candidate.

## Retention Rules

- Retain the latest successful long task checkpoint indefinitely unless the project owner explicitly retires it.
- Retain validation history entries as append-only release evidence.
- Retain visual baselines only when they were produced by a passing visual regression run.

## Rotation Rules

- Rotate generated report snapshots by creating a new local commit instead of overwriting evidence without history.
- Rotate visual baselines only after `npm run validate:visual-regression` passes.
- Rotate knowledge indexes only after `npm run build:knowledge` and `npm run validate:pwa` pass.

## Disposal Rules

- Do not delete release evidence from Git history during normal maintenance.
- Temporary local files may be removed after their contents are represented by tracked reports or generated artifacts.
- Failed run output should be converted into a diagnostic report before disposal when it affects release readiness.
