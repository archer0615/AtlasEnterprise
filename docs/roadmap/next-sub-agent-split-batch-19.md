# Next Sub Agent Split - Batch 19

## Purpose

Prepare the next ownership batch after Worker AD by assigning high-line-count documents that still need clearer split navigation or follow-up split coverage.

## Worker Assignments

| Worker | Primary Files | Split Axis | Expected Output |
| --- | --- | --- | --- |
| AE | `knowledge/entity/Goal.md`, `knowledge/entity/ActionPlan.md` | Goal identity, funding state, action plan commands, audit, API and persistence | Parent split navigation plus focused child documents under `knowledge/entity/goal/` and `knowledge/entity/action-plan/` |
| AF | `knowledge/entity/ExecutionPlan.md`, `knowledge/entity/Recommendation.md` | Execution planning, recommendation lifecycle, commands, state, governance | Parent split navigation plus focused child documents under `knowledge/entity/execution-plan/` and `knowledge/entity/recommendation/` |
| AG | `knowledge/reporting/decision-reporting.md`, `knowledge/reporting/goal-reporting.md` | Reporting metrics, dashboard views, audit, export and governance | Parent split navigation plus focused child documents under `knowledge/reporting/decision-reporting/` and `knowledge/reporting/goal-reporting/` |
| AH | `knowledge/framework/scenario-framework.md`, `knowledge/framework/goal-execution-framework.md` | Scenario design, scoring, execution, goal execution workflow and governance | Parent split navigation plus focused child documents under `knowledge/framework/scenario/` and `knowledge/framework/goal-execution/` |
| AI | `knowledge/reporting/goal-metrics.md`, `knowledge/reporting/goal-dashboard.md` | Goal metric definitions, dashboard widgets, implementation and governance | Parent split navigation plus focused child documents under `knowledge/reporting/goal-metrics/` and `knowledge/reporting/goal-dashboard/` |
| AJ | `knowledge/security/security-framework/security-architecture.md` | Identity/access, secrets/interface security, data isolation and threat controls | Parent split navigation plus focused child documents under `knowledge/security/security-framework/security-architecture/` |
| AK | `docs/knowledge/entity/Loan.md`, `Mortgage.md`, `Liability.md`, `Asset.md`, `Household.md` | Legacy reference governance | Legacy reference markers plus canonical `knowledge/entity/*.md` source links; no legacy body split |

## Priority Order

1. Worker AE: entity documents have no current `Split Navigation` and exceed 1,300 lines.
2. Worker AF: execution and recommendation entities are workflow-critical and still lack parent split navigation.
3. Worker AG: reporting documents repeat dashboard, testing, audit, and matrix sections already present in split-heavy supporting documents.
4. Worker AH: framework files remained high-line-count after entity/reporting work.
5. Worker AI: goal metrics and dashboard were remaining high-line-count reporting documents without split navigation.
6. Worker AJ: security architecture was the remaining high-line-count security child document without split navigation.
7. Worker AK: legacy entity documents were not split; they were marked as non-canonical references.

## Guardrails

- Preserve canonical parent content unless the task explicitly migrates content.
- Add split links near the top of each parent document.
- Keep entity command/event sections separate from reporting/dashboard sections.
- Do not modify generated `frontend/knowledge/**` files in this batch.
- Rebuild generated knowledge only after all split files are complete.

## Validation

- Confirm each parent file contains `Split Navigation`.
- Confirm each child file has one clear ownership scope.
- Confirm links are relative and resolve from the parent file.
- Run `npm run build:knowledge` and `npm run validate:frontend` after the batch.

## Completion Notes

- Workers AE through AK are covered by progress reports in `docs/roadmap/`.
- Workers AI, AJ, and AK were executed by actual sub agents.
- Batch-level generated artifact validation is recorded in `release-note-knowledge-split-2026-07-16.md` and `generated-artifact-audit-2026-07-16.md`.
