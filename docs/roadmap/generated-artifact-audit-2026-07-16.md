# Generated Artifact Audit - 2026-07-16

Worker: AN

Scope:
- `frontend/knowledge/**`
- `frontend/sw-version.js`
- Build rule: `npm run build:knowledge` -> `node frontend/scripts/build-knowledge-index.mjs`

## Result

No generated artifact mismatch found.

## Counts

| Item | Count |
| --- | ---: |
| Source Markdown under `knowledge/` | 608 |
| `frontend/knowledge/index.json` documents | 608 |
| `frontend/knowledge/search-index.json` documents | 608 |
| `frontend/knowledge/document-assets.json` documents | 608 |
| `frontend/knowledge/documents/*.json` files | 608 |

## Build ID State

| Artifact | Build ID |
| --- | --- |
| Expected from source document ids and hashes | `b9cacfabbf3c` |
| `frontend/knowledge/index.json` | `b9cacfabbf3c` |
| `frontend/knowledge/search-index.json` | `b9cacfabbf3c` |
| `frontend/knowledge/document-assets.json` | `b9cacfabbf3c` |
| `frontend/sw-version.js` | `atlas-knowledge-b9cacfabbf3c` |

Generated timestamps:
- `index.json`: `2026-07-16T15:05:41.616Z`
- `search-index.json`: `2026-07-16T15:05:41.620Z`
- `document-assets.json`: `2026-07-16T15:05:41.649Z`

## Checks

| Check | Result |
| --- | --- |
| Missing source documents in `index.json` | 0 |
| Extra documents in `index.json` | 0 |
| Source hash mismatches in `index.json` | 0 |
| Missing source documents in `search-index.json` | 0 |
| Extra documents in `search-index.json` | 0 |
| Missing entries in `document-assets.json` | 0 |
| Extra entries in `document-assets.json` | 0 |
| Missing document JSON files | 0 |
| Extra document JSON files | 0 |
| Document JSON payload path/hash mismatches | 0 |

## Notes

- No generated files were modified.
- `npm run build:knowledge` was not executed directly because it writes generated files. The audit reproduced the build script's deterministic id/hash/count checks in read-only mode.
- The working tree already contains many unrelated generated and knowledge changes from other workers; they were not reverted or cleaned.

## Verification

Read-only Node verification:
- Recomputed stable document ids from `knowledge/**/*.md`.
- Recomputed SHA-256 source hashes from source Markdown.
- Recomputed expected build id from `[id, sourceHash]` pairs.
- Compared `index.json`, `search-index.json`, `document-assets.json`, `frontend/knowledge/documents/*.json`, and `frontend/sw-version.js`.
