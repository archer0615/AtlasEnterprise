# Goal and Financial Health Specification Traceability

## Baseline

| Item | Value |
| --- | --- |
| Starting commit | `87977b02dee36094723ae46ba3e27e01be069832` |
| Target local schema | IndexedDB `6` |
| Store | `goals` |

## Runtime Field Traceability

| Runtime Field | Canonical Source | Canonical Property / Rule | Type | Validation | Persistence | Projection | UI | Test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | `knowledge/entity/Goal.md` | Goal identity | string | required after normalization | `goals.id` | `goalId` | goal list actions | `test:goal-financial-health-domain` |
| `ownerId` | `knowledge/entity/User.md`, `knowledge/entity/Household.md` | Ownership reference | string | required | `goals.ownerId` | owner-scoped inputs | hidden goal panel | `test:goal-financial-health-application` |
| `name` | `knowledge/entity/Goal.md` | Display name | string | required, max length | `goals.name` | progress label | goal list | `test:goal-financial-health-domain` |
| `goalType` | `knowledge/enumeration-catalog.md` | Goal type | string | enum | `goals.goalType` | progress type | select input | `test:goal-financial-health-domain` |
| `targetAmount` | `knowledge/goal-progress-tracking.md` | Target value | number | finite positive | `goals.targetAmount` | percent and remaining amount | goal list | `test:goal-financial-health-domain` |
| `currentAmount` | `knowledge/goal-progress-tracking.md` | Existing progress | number | finite non-negative | `goals.currentAmount` | percent and remaining amount | goal list | `test:goal-financial-health-domain` |
| `currency` | `knowledge/financial-ratio-framework.md` | Currency handling | string | supported enum | `goals.currency` | completeness warning | progress panel | `test:goal-financial-health-domain` |
| `status` | `knowledge/goal-lifecycle.md` | Lifecycle state | string | enum and transition guard | `goals.status` | active scope | transition buttons | `test:goal-financial-health-application` |
| `parentGoalId` | `knowledge/goal-dependency.md` | Parent dependency | string | owner, self, cycle guard | `goals.parentGoalId` | dependency validation only | not emphasized | `test:goal-financial-health-domain` |

## Validation Mapping

Validation errors use stable `ATLAS_GOAL_*` codes for required name, invalid type, invalid target, invalid currency, invalid date range, invalid status, invalid transition, invalid parent, and dependency cycle.
