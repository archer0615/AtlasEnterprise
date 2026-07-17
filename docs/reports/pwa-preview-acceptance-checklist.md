# PWA Preview Acceptance Checklist

## Status

Prepared.

## Deployment Gate

| Item | Status | Evidence |
| --- | --- | --- |
| Build static knowledge artifacts | Passed | `npm run build` generated 628 knowledge documents. |
| Preview project-path smoke test | Passed | `npm run validate:preview-smoke` passed with 7 project-path assets. |
| PWA manifest and app shell validation | Passed | `npm run validate:pwa` passed with 628 knowledge documents. |
| Offline cache validation | Passed | `npm run validate:offline` passed with 16 shell assets and 628 document assets. |
| GitHub Pages artifact validation | Passed | `npm run validate:deployment` passed with 13 artifacts. |
| Frontend static contract validation | Passed | `npm run validate:frontend` passed. |

## Follow-up Validation

| Item | Status | Evidence |
| --- | --- | --- |
| Formula registry validation | Passed | `npm run validate:formula-registry` passed with 16 formula IDs and 9 fixtures. |
| Score policy validation | Passed | `npm run validate:score-policy` passed for `decision-score-policy.v1`. |
| Generated fixture cache policy validation | Passed | `npm run validate:cache-policy` passed with 3 artifacts. |
| Simulator fixture validation | Passed | `npm run validate:fixtures` passed with 9 simulator fixtures. |
| Dashboard fixture drift validation | Passed | `npm run validate:dashboard-drift` passed. |
| Dashboard projection API validation | Passed | `npm run validate:dashboard-api` passed with 5 runtime projections. |

## Pages URL Verification

| URL | Status | Evidence |
| --- | --- | --- |
| `https://archer0615.github.io/AtlasEnterprise/` | Failed | HTTP 404 Not Found on 2026-07-17. |
| `https://archer0615.github.io/AtlasEnterprise/manifest.webmanifest` | Failed | HTTP 404 Not Found on 2026-07-17. |

## Workflow Trigger Readiness

| Item | Status | Evidence |
| --- | --- | --- |
| GitHub CLI availability | Blocked | `gh` command is not installed or not on `PATH`. |
| Remote branch check | Passed | `origin/master` exists at `f8c55f9231564c13162bca82eae4361afde8e921`. |
| Local workflow file | Present locally | `.github/workflows/pages.yml` exists in the workspace. |

## Acceptance Criteria

| Criterion | Expected Result |
| --- | --- |
| GitHub Actions workflow dispatch completes | Deploy job succeeds and reports a GitHub Pages URL. |
| Pages root URL loads | `https://archer0615.github.io/AtlasEnterprise/` returns HTTP 200. |
| Manifest loads | `/manifest.webmanifest` returns HTTP 200. |
| Service worker loads | `/sw.js` returns HTTP 200. |
| Knowledge index loads | `/knowledge/index.json` returns HTTP 200. |
| Search index loads | `/knowledge/search-index.json` returns HTTP 200. |
| PWA runs without backend | Dashboard and knowledge views load without ASP.NET Core, database, auth server, or hosted API. |
| Offline cache works after first load | App shell and generated knowledge assets remain available after refresh/offline simulation. |

## Blockers

- GitHub Pages workflow could not be triggered from this environment because GitHub CLI is unavailable.
- Deployed Pages URL currently returns 404, so deployed preview acceptance cannot pass yet.
