# Scenario Workbench

## Workflow

Scenario lifecycle supports:

- Create.
- Update.
- Clone.
- Run.
- Compare.
- Archive.
- Restore.

## Scenario Contract

| Field | Meaning |
| --- | --- |
| `scenarioId` | Stable local scenario identifier. |
| `baseScenarioId` | Base scenario when this is an alternative. |
| `type` | Base or alternative. |
| `inputVersion` | Input snapshot version. |
| `formulaVersion` | Formula registry version. |
| `assumptionVersion` | Assumption set version. |
| `timestamp` | Run timestamp. |
| `overrides` | Scenario-only overrides. |
| `output` | Serializable projection output. |
| `warnings` | Stale result or actual-data override warnings. |
| `runVersion` | Deterministic input/formula/assumption key. |

## Rules

- Alternative scenarios must not overwrite actual data.
- Scenario run output must be deterministic.
- Stale detection compares stored run version with current input, formula, and assumption version.
- Compare requires two or more scenario runs.
- Milestone timelines should support Goal, Loan, Mortgage, and Retirement milestones.
