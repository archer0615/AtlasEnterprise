# Entity Filename Normalization Plan

## Scope

This plan covers entity Markdown filenames under `knowledge/entity/`.

## Current State

The remaining entity files use PascalCase names that mirror domain entity names:

- `ActionPlan.md`
- `Asset.md`
- `Decision.md`
- `ExecutionPlan.md`
- `Goal.md`
- `Household.md`
- `Liability.md`
- `Loan.md`
- `Mortgage.md`
- `Notification.md`
- `Portfolio.md`
- `Position.md`
- `Recommendation.md`
- `Scenario.md`
- `User.md`

## Recommendation

Keep PascalCase entity filenames for now because they match aggregate and entity names used in the domain model. Rename only if the whole knowledge repository adopts kebab-case as a documented convention.

## If Renaming Later

Use one migration batch and update generated knowledge artifacts immediately after renaming.

| Current | Future Candidate |
| --- | --- |
| `ActionPlan.md` | `action-plan.md` |
| `ExecutionPlan.md` | `execution-plan.md` |
| `User.md` | `user.md` |

## Guardrails

- Do not split or rename entity files without regenerating `frontend/knowledge/`.
- Preserve stable document redirects or mapping if the frontend stores document IDs.
- Confirm search index and document counts after any rename.
