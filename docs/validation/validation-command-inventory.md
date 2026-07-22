# Validation Command Inventory

| Command | Script | Scope | Runtime | Side Effect | Required Environment | Profile | Failure Severity |
| ------- | ------ | ----- | ------- | ----------- | -------------------- | ------- | ---------------- |
| `validate:quick` | `node scripts/run-validation-profile.mjs quick` | Critical fast checks | Fast, deterministic | Writes `.tmp/validation` | Node, Git | Development | Critical |
| `validate:feature` | `node scripts/run-validation-profile.mjs feature` | Feature integration | Medium, environment-sensitive | Writes temp only | Node, Playwright | Feature | Critical |
| `validate:full` | `node scripts/run-validation-profile.mjs full` | Full repository validation | Slow, environment-sensitive | Writes temp only | Node, Playwright | Full | Critical |
| `validate:release` | `node scripts/run-validation-profile.mjs release` | Release gate | Slow, environment-sensitive | Writes temp only | Node, Playwright, Git | Release | Critical |
| `validate:release:dry-run` | `node scripts/run-validation-profile.mjs release --dry-run` | Release gate preflight | Slow, environment-sensitive | Writes temp only | Node, Playwright, Git | Release | Critical |
| `validate:frontend` | `node frontend/scripts/validate-frontend.mjs` | Frontend contracts | Fast, deterministic | Read-only | Node | Quick/Feature/Full/Release | Critical |
| `validate:runtime-boundaries` | `node frontend/scripts/validate-runtime-boundaries.mjs` | Import boundaries | Fast, deterministic | Read-only | Node | Quick/Feature/Full/Release | Critical |
| `test:runtime-projection` | `node frontend/scripts/test-runtime-projection.mjs` | Runtime projection | Fast, deterministic | Read-only | Node | Quick/Feature/Full/Release | Critical |
| `test:decision-workbench` | `node frontend/scripts/test-decision-workbench.mjs` | Decision runtime | Fast, deterministic | Read-only | Node | Quick/Feature/Full/Release | Critical |
| `test:knowledge-pwa-ux` | `node frontend/scripts/test-knowledge-pwa-ux.mjs` | Knowledge and PWA UX | Fast, deterministic | Read-only | Node | Quick/Feature/Full/Release | Critical |
| `validate:browser-workflow` | `node frontend/scripts/validate-browser-workflow.mjs` | Browser workflow | Medium, browser-required | Writes OS temp | Playwright | Feature/Full/Release | Critical |
| `validate:visual-regression` | `node frontend/scripts/validate-visual-regression.mjs` | Visual baseline | Slow, browser-required | Writes OS temp | Playwright | Full/Release | Critical |
| `validate:dashboard-drift` | `node frontend/scripts/validate-dashboard-fixture-drift.mjs` | Fixture drift | Fast, deterministic | Read-only | Node | Feature/Full/Release | Critical |

All profile steps are declared in `scripts/validation-profiles.json` with ID, command, category, criticality, timeout, environment, side effect, and platform.
