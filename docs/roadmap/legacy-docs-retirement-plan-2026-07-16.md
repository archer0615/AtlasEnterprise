# Legacy Docs Retirement Plan - 2026-07-16

## Scope

- Legacy entity documents under `docs/knowledge/entity/`.
- Worker AK scope:
  - `docs/knowledge/entity/Loan.md`
  - `docs/knowledge/entity/Mortgage.md`
  - `docs/knowledge/entity/Liability.md`
  - `docs/knowledge/entity/Asset.md`
  - `docs/knowledge/entity/Household.md`

## Canonical Sources

- `docs/knowledge/entity/Loan.md` -> `knowledge/entity/Loan.md`
- `docs/knowledge/entity/Mortgage.md` -> `knowledge/entity/Mortgage.md`
- `docs/knowledge/entity/Liability.md` -> `knowledge/entity/Liability.md`
- `docs/knowledge/entity/Asset.md` -> `knowledge/entity/Asset.md`
- `docs/knowledge/entity/Household.md` -> `knowledge/entity/Household.md`

## Retirement Rules

- Do not split, migrate, or rewrite legacy document body content during this marker pass.
- Treat each legacy file as historical reference only after the `Legacy Reference` block is present.
- Use the linked `knowledge/entity/*.md` file as the canonical source for current implementation and product decisions.
- Avoid generating frontend knowledge artifacts from these legacy files as canonical inputs.
- Preserve legacy files until all inbound links and tooling references have been audited.

## Retirement Steps

1. Mark each legacy entity file with a top-level `Legacy Reference` block.
2. Verify every marked file links to an existing canonical `knowledge/entity/*.md` file.
3. Audit references that still point to `docs/knowledge/entity/*.md` as canonical documentation.
4. Update documentation index or reader guidance to prefer `knowledge/entity/*.md`.
5. Retire or archive legacy files only after dependent links, generated indexes, and worker reports confirm no canonical usage remains.

## Worker AK Result

- Legacy reference markers added for the 5 in-scope entity files.
- Canonical source links point to the matching root `knowledge/entity/*.md` files.
- No legacy content was split or moved.
- No `frontend/knowledge` generated files were modified.

