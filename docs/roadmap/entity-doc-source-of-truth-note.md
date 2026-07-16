# Entity Document Source of Truth Note

## Purpose

Define canonical ownership before editing duplicated entity documents under `knowledge/entity/**` and `docs/knowledge/entity/**`.

## Source of Truth

| Document Area | Canonical Source | Treatment |
| --- | --- | --- |
| Entity specifications | `knowledge/entity/**` | Canonical entity specification content. |
| Split entity documents | `knowledge/entity/<entity>/**` | Navigation and review units derived from the canonical parent. |
| Legacy entity docs | `docs/knowledge/entity/**` | Reference copies only until explicitly migrated or retired. |
| Generated frontend index | `frontend/knowledge/**` | Generated artifact; update only through knowledge build scripts. |

## Rules

- Edit `knowledge/entity/**` first for entity behavior, commands, persistence, and governance changes.
- Do not create new canonical behavior in `docs/knowledge/entity/**`.
- If a legacy docs file conflicts with `knowledge/entity/**`, preserve the canonical `knowledge/entity/**` wording and mark the legacy file for alignment.
- Split documents should link back to the parent and avoid becoming independent competing specifications.

## Follow-Up

- Audit `docs/knowledge/entity/Loan.md`, `docs/knowledge/entity/Mortgage.md`, `docs/knowledge/entity/Liability.md`, and `docs/knowledge/entity/Asset.md` for retirement or alignment.
