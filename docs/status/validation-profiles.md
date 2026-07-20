# Validation Profiles

Atlas validation is split into explicit profiles so day-to-day work can stay fast while release and archive gates remain available.

| Profile | Command | Purpose | Gate Level |
| --- | --- | --- | --- |
| Quick | `npm run validate:quick` | Fast local validation for knowledge, traceability, formulas, scoring, and fixtures. | Local development |
| Feature | `npm run validate:feature` | Feature-level validation for frontend, PWA, offline, simulator, repository, cache, and browser workflows. | Feature readiness |
| Full | `npm run validate:full` | Broad repository validation without release/archive retirement closure gates. | Integration readiness |
| Release | `npm run validate:release` | Full release gate including release governance, archive, closure, monitoring, and retirement validations. | Release readiness |

## Default Command

`npm run validate` intentionally maps to `npm run validate:quick`.

This keeps the default command convenient for local work. Release readiness must use `npm run validate:release`.

## Runner Output

All profiles use `scripts/run-validation-profile.mjs`.

Each profile run records:

- Step script name.
- Duration in milliseconds.
- Exit code.
- Log path under `docs/reports/validation-profiles/`.

## GitHub Pages

The GitHub Pages workflow builds static PWA artifacts and runs `npm run validate:release` before upload and deployment.

The release profile includes frontend, knowledge, PWA, offline, deployment, release closure, archive closure, and retirement evidence checks.
