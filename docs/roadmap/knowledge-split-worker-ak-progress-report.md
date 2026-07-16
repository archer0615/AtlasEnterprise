# Knowledge Split Worker AK Progress Report

## Assignment

- Worker: AK
- Date: 2026-07-16
- Scope: legacy entity reference marking and retirement planning.
- Write range:
  - `docs/knowledge/entity/Loan.md`
  - `docs/knowledge/entity/Mortgage.md`
  - `docs/knowledge/entity/Liability.md`
  - `docs/knowledge/entity/Asset.md`
  - `docs/knowledge/entity/Household.md`
  - `docs/roadmap/knowledge-split-worker-ak-progress-report.md`
  - `docs/roadmap/legacy-docs-retirement-plan-2026-07-16.md`

## Completed

- Added `Legacy Reference` blocks at the top of the 5 assigned legacy entity documents.
- Linked each legacy document to its canonical root `knowledge/entity/*.md` counterpart.
- Created the legacy docs retirement plan for the in-scope entity files.
- Preserved legacy document body content without splitting or migration.
- Avoided changes to `frontend/knowledge` generated files.

## Canonical Mapping

- `docs/knowledge/entity/Loan.md` -> `knowledge/entity/Loan.md`
- `docs/knowledge/entity/Mortgage.md` -> `knowledge/entity/Mortgage.md`
- `docs/knowledge/entity/Liability.md` -> `knowledge/entity/Liability.md`
- `docs/knowledge/entity/Asset.md` -> `knowledge/entity/Asset.md`
- `docs/knowledge/entity/Household.md` -> `knowledge/entity/Household.md`

## Verification

- Confirm the 5 legacy files contain `Legacy Reference` before the original entity title.
- Confirm every canonical source path exists under `knowledge/entity/`.
- Confirm `git diff -- docs/knowledge/entity/Loan.md docs/knowledge/entity/Mortgage.md docs/knowledge/entity/Liability.md docs/knowledge/entity/Asset.md docs/knowledge/entity/Household.md docs/roadmap/knowledge-split-worker-ak-progress-report.md docs/roadmap/legacy-docs-retirement-plan-2026-07-16.md` only shows the marker additions and the two roadmap files.

