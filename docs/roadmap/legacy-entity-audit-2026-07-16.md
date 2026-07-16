# Legacy Entity Audit - 2026-07-16

## Scope

Reviewed duplicated legacy entity documents under `docs/knowledge/entity/**` against canonical ownership defined in `docs/roadmap/entity-doc-source-of-truth-note.md`.

## Findings

| Legacy File | Canonical Counterpart | Risk | Recommendation |
| --- | --- | --- | --- |
| `docs/knowledge/entity/Loan.md` | `knowledge/entity/Loan.md` | Parallel entity behavior and persistence wording can diverge. | Keep canonical edits in `knowledge/entity/Loan.md`; mark legacy file for alignment or retirement. |
| `docs/knowledge/entity/Mortgage.md` | `knowledge/entity/Mortgage.md` | Parallel mortgage lifecycle and API wording can diverge. | Keep canonical edits in `knowledge/entity/Mortgage.md`; mark legacy file for alignment or retirement. |
| `docs/knowledge/entity/Liability.md` | `knowledge/entity/Liability.md` | Parallel liability state and rules can diverge. | Keep canonical edits in `knowledge/entity/Liability.md`; mark legacy file for alignment or retirement. |
| `docs/knowledge/entity/Asset.md` | `knowledge/entity/Asset.md` | Parallel asset classification, valuation, and audit wording can diverge. | Keep canonical edits in `knowledge/entity/Asset.md`; mark legacy file for alignment or retirement. |
| `docs/knowledge/entity/Household.md` | `knowledge/entity/Household.md` | Parallel household ownership and relationship wording can diverge. | Keep canonical edits in `knowledge/entity/Household.md`; mark legacy file for alignment or retirement. |

## Resolution Rule

- `knowledge/entity/**` remains canonical.
- `docs/knowledge/entity/**` should not receive new behavior, command, persistence, API, or governance rules.
- Legacy docs should either link to canonical files or be retired after stakeholder review.
