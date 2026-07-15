# Git Change Inventory - 2026-07-15

## Summary

| Status | Count |
| --- | ---: |
| Deleted tracked files | 168 |
| Modified tracked files | 11 |
| Untracked paths | 40 |

## Untracked Scope

| Root | File Count |
| --- | ---: |
| `.codex` | 27 |
| `docs` | 18 |
| `frontend` | 166 |
| `knowledge` | 149 |
| `package.json` | 1 |

## Modified Tracked Files

- `PWA-Migration-Report.json`
- `README.md`
- `docs/pwa/IndexedDBDesign.md`
- `frontend/README.md`
- `knowledge/entity/Asset.md`
- `knowledge/entity/Household.md`
- `knowledge/entity/Liability.md`
- `knowledge/entity/Loan.md`
- `knowledge/entity/Mortgage.md`
- `knowledge/entity/Portfolio.md`
- `knowledge/entity/Position.md`

## Interpretation

- The large deleted-file count is expected from moving legacy `docs/knowledge/` files into the canonical outer `knowledge/` tree.
- The untracked `frontend/` files are expected from the new static-first PWA shell and generated static knowledge JSON.
- The untracked `.codex/` and `docs/` files are expected from migration reports, state files, and PWA validation documentation.
- No commit has been created yet.
