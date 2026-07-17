> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Enumeration State and Rule Model

## Purpose
This split document isolates state, lifecycle, category, mapping, validation, and business rule groups from the parent Enumeration Catalog.

## Source
- Parent specification: [Enumeration Catalog](../enumeration-catalog.md)

## Model Scope
- State Transition Matrix
- Lifecycle Enumerations
- Status Enumerations
- Priority Enumerations
- Category Enumerations
- Permission Enumerations
- Validation Enumerations
- PWA Runtime Mapping / Future Cloud Mapping
- Future Cloud Mapping
- API Mapping
- Validation Rules
- Business Rules

## State Transition Matrix
| Enumeration | From | To | Trigger | Guard | Result |
|---|---|---|---|---|---|
| GoalStatus | Draft | Active | Goal activation | Required goal fields are valid | Goal becomes active |
| GoalStatus | Active | Prioritized | Goal prioritization | Priority model accepts goal | Goal becomes prioritized |
| GoalStatus | Active | Deferred | Goal deferral | Deferral reason is captured | Goal becomes deferred |
| DecisionStatus | Pending | Evaluating | Scenario evaluation begins | Scenario input is valid | Decision becomes evaluating |
| DecisionStatus | Evaluating | Recommended | Recommendation generated | Recommendation is complete | Decision becomes recommended |
| DecisionStatus | Recommended | Accepted | User accepts decision | Acceptance is recorded | Decision becomes accepted |

## Lifecycle Enumerations
- GoalStatus
- DecisionStatus
- ScenarioStatus
- WorkflowStatus
- JobStatus

## Status Enumerations
- GoalStatus
- DecisionStatus
- ScenarioStatus
- WorkflowStatus
- JobStatus

## Priority Enumerations
- RecommendationPriority

## Category Enumerations
- LoanType
- AssetType
- PropertyType
- NotificationChannel

## Permission Enumerations
- Permission Enumerations use catalog-approved values for identity, authorization, policy, and administrative control surfaces.

## Validation Enumerations
- Validation Enumerations define allowed status, type, priority, category, channel, and currency values for API, DTO, persistence, workflow, and state machine usage.

## PWA Runtime Mapping
- PWA Runtime Mapping / Future Cloud Mapping preserves Enumeration database values, allowed values, and compatibility with Future Cloud Mapping persistence.

## Future Cloud Mapping
- Future Cloud Mapping preserves Enumeration conversion, owned usage where applicable, value comparison, migration compatibility, and query behavior.

## API Mapping
- API Mapping preserves JSON Value, API Values, display values, and backward-compatible external contracts.

## Validation Rules
| Rule ID | Description | Condition | Validation | Blocking | Error |
|---|---|---|---|---|---|
| ENUM-VR-001 | Validate enumeration catalog requirement 1. | Enumeration value is accepted or emitted. | Name, values, API value, database value, default, nullability, and compatibility are checked. | Yes | ENUM-ERR-001 |
| ENUM-VR-002 | Validate enumeration catalog requirement 2. | Enumeration value is accepted or emitted. | Name, values, API value, database value, default, nullability, and compatibility are checked. | Yes | ENUM-ERR-002 |
| ENUM-VR-003 | Validate enumeration catalog requirement 3. | Enumeration value is accepted or emitted. | Name, values, API value, database value, default, nullability, and compatibility are checked. | Yes | ENUM-ERR-003 |

## Business Rules
- Enumeration business rules preserve allowed values, display text, internal value, API Values, Database Values, JSON Value, compatibility, lifecycle, state transition, validation, and governance behavior.
