# PWA Preview Acceptance Checklist

## Status

Accepted.

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
| `https://archer0615.github.io/AtlasEnterprise/` | Passed | HTTP 200 OK on 2026-07-17 after workflow run `29563633110`. |
| `https://archer0615.github.io/AtlasEnterprise/manifest.webmanifest` | Passed | HTTP 200 OK on 2026-07-17 after workflow run `29563633110`. |
| `https://archer0615.github.io/AtlasEnterprise/sw.js` | Passed | HTTP 200 OK on 2026-07-17 after workflow run `29563633110`. |
| `https://archer0615.github.io/AtlasEnterprise/knowledge/index.json` | Passed | HTTP 200 OK on 2026-07-17 after workflow run `29563633110`. |
| `https://archer0615.github.io/AtlasEnterprise/knowledge/search-index.json` | Passed | HTTP 200 OK on 2026-07-17 after workflow run `29563633110`. |

## Workflow Trigger Readiness

| Item | Status | Evidence |
| --- | --- | --- |
| GitHub CLI availability | Not required | Push-triggered workflow deployed successfully without `gh`. |
| Remote branch check | Passed | `origin/master` deployed commit `509e9a0ff8463da13bff75be18c3c2dc053185f1`. |
| Local workflow file | Present locally | `.github/workflows/pages.yml` exists in the workspace. |
| GitHub Pages workflow | Passed | `Deploy Atlas PWA to GitHub Pages` run `29563633110` completed successfully. |

## Acceptance Criteria

| Criterion | Expected Result |
| --- | --- |
| GitHub Actions workflow dispatch completes | Deploy job succeeds and reports a GitHub Pages URL. |
| Pages PWA URL loads | `https://archer0615.github.io/AtlasEnterprise/` returns HTTP 200. |
| Manifest loads | `/manifest.webmanifest` returns HTTP 200. |
| Service worker loads | `/sw.js` returns HTTP 200. |
| Knowledge index loads | `/knowledge/index.json` returns HTTP 200. |
| Search index loads | `/knowledge/search-index.json` returns HTTP 200. |
| PWA runs without backend | Dashboard and knowledge views load without ASP.NET Core, database, auth server, or hosted API. |
| Offline cache works after first load | App shell and generated knowledge assets remain available after refresh/offline simulation. |

## Release Status

- Internal preview deployment is accepted.
- GitHub Pages PWA URL: `https://archer0615.github.io/AtlasEnterprise/`
- Deployed commit: `509e9a0ff8463da13bff75be18c3c2dc053185f1`
- Workflow run: `https://github.com/archer0615/AtlasEnterprise/actions/runs/29563633110`

## Blockers

- None for internal preview deployment.
