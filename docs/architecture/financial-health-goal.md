# Financial Health and Goal Progress

## Runtime Policy

Financial health and goal progress are local projection outputs. They are not account balances, bank feeds, or cloud-synced facts unless the source is explicitly marked Actual.

## Score Model

| Field | Meaning |
| --- | --- |
| `overallScore` | Average of component scores when enough evidence exists. |
| `components` | Cash flow, net worth, and goal progress scores. |
| `freshness` | Actual, Estimated, Projected, or Insufficient Data. |
| `missingEvidence` | Components with insufficient data. |
| `explanation` | Deterministic human-readable reason. |

## Goal Progress

| Field | Meaning |
| --- | --- |
| `targetAmount` | Goal target amount. |
| `currentAmount` | Current funded amount. |
| `gap` | Remaining amount. |
| `progress` | Current divided by target. |
| `monthlyContribution` | Assumed monthly contribution. |
| `projectedCompletionDate` | Deterministic projected completion date. |
| `atRisk` | True when projected completion is after due date or evidence is insufficient. |

## Status Transitions

- `draft` to `active`.
- `active` to `at-risk`.
- `active` to `completed`.
- `active` to `archived`.
- `archived` to `active` through restore.

Illegal transition tests should reject direct `archived` to `completed` and direct `completed` to `draft`.
