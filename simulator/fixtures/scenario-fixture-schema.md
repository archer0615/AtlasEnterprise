# Scenario Fixture Schema

## Required Top-level Fields

| Field | Type | Rule |
| --- | --- | --- |
| `fixtureId` | string | Stable kebab-case identifier. |
| `name` | string | Human-readable fixture name. |
| `asOfDate` | string | ISO date for deterministic planning context. |
| `assumptionVersion` | string | Versioned assumption source reference. |
| `formulaVersion` | string | Versioned formula source reference. |
| `question` | string | Decision question under test. |
| `inputs` | object | Explicit fixture inputs. |
| `expected` | object | Expected metrics, warnings, and recommendation. |
| `tolerances` | object | Numeric tolerance rules. |
| `references` | string array | Existing repository files used by the fixture. |

## Expected Recommendation Fields

| Field | Type | Rule |
| --- | --- | --- |
| `status` | string | Decision status such as `conditional`, `defer`, or `monitor`. |
| `score` | number | Deterministic score for comparison and regression checks. |
| `explanation` | string | Short explanation suitable for dashboard display. |
| `warningReferences` | string array | Warning IDs that explain constraints or risks. |

## Dashboard Snapshot Bridge

| Field | Type | Rule |
| --- | --- | --- |
| `snapshotId` | string | Stable dashboard snapshot identifier. |
| `label` | string | Traditional Chinese label for the scenario switcher. |
| `sourceFixture` | string | Path to the simulator fixture behind the dashboard data. |
| `metrics` | array | Exactly four dashboard metrics for first-screen stability. |
| `scenarios` | array | At least three comparable options. |
| `actions` | array | At least three next actions. |

## Validation

- JSON schema source: [scenario-fixture.schema.json](scenario-fixture.schema.json)
- Dashboard schema source: [dashboard-snapshot.schema.json](../../frontend/fixtures/dashboard-snapshot.schema.json)
- `npm run validate:fixtures` checks required simulator and dashboard bridge fields.
- `npm run validate:frontend` checks that the dashboard bridge is wired into the PWA shell.
- `npm run validate` runs frontend, fixture, and PWA validation together.
