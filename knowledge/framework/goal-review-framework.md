# Goal Review Framework

Version: 1.0

## Purpose
Defines the enterprise framework for periodically reviewing financial goals, measuring progress, identifying deviations, and triggering replanning within Project Atlas.

## Objectives
- Continuously evaluate goal progress.
- Detect meaningful deviations early.
- Trigger recommendations and replanning.
- Maintain a complete review history.

## Review Principles
- Reviews are data-driven.
- Every review is traceable.
- Reviews never modify historical data.
- Material deviations require explanation.

## Review Scope
Applies to:
- Retirement Goals
- Home Purchase
- Home Upgrade
- Education
- Emergency Fund
- Investment Goals
- Debt Reduction
- Custom Goals

## Review Triggers
### Scheduled
- Monthly
- Quarterly
- Semi-Annual
- Annual

### Event Driven
- Income change
- Market shock
- Major purchase
- Goal completion
- Life-stage transition
- Financial Health Score deterioration

## Review Workflow
1. Load current goal state.
2. Compare against baseline.
3. Calculate progress metrics.
4. Detect deviations.
5. Evaluate business rules.
6. Generate recommendations.
7. Create review record.

## Review Metrics
- Goal Funding Ratio
- Funding Gap
- Progress %
- Time Remaining
- Expected Completion Date
- Goal Success Probability
- Risk Level

## Review Outcomes
- On Track
- Minor Adjustment
- Replan Recommended
- Critical Intervention Required
- Goal Completed

## Replanning Rules
- Preserve mandatory goals.
- Recalculate funding priorities.
- Re-evaluate liquidity.
- Refresh projections.
- Re-score recommendations.

## Review Record
Each review stores:
- Review ID
- Goal ID
- Review Date
- Reviewer
- Trigger
- Outcome
- Recommendation IDs
- Next Review Date

## Business Rules
- Completed goals remain immutable.
- Every review references an assumption version.
- Historical reviews are append-only.
- Critical reviews generate alerts.

## Explainability
Each review includes:
- Progress summary
- KPI changes
- Triggered rules
- Assumptions
- Recommended actions

## Integration
Consumes:
- Goal Funding Framework
- Financial Projection Framework
- Decision Metrics Framework
- Recommendation Priority Framework
- Financial Alert Framework

Produces:
- Dashboard
- Decision Engine
- Execution Plan Framework
- Decision History Framework

## KPIs
- Goal Review Completion Rate
- On-Time Review Rate
- Goal Success Rate
- Replan Frequency
- Funding Improvement Rate

## Testing
- Scheduled review
- Event-driven review
- Goal completed
- Goal behind schedule
- Multiple simultaneous goals
- Retirement review

## Future Enhancements
- AI-assisted goal reviews
- Predictive deviation detection
- Household goal reviews
- Automatic replanning

## Phase 2 Executable Specification

### Review Execution Contract

| Field | Required | Description |
|-------|----------|-------------|
| ReviewExecutionId | Yes | Stable review run identifier |
| ReviewId | Yes | Review record identifier |
| HouseholdId | Yes | Household scope |
| GoalId | Yes | Goal being reviewed |
| ReviewTrigger | Yes | Scheduled, EventDriven, Manual, Critical |
| AssumptionVersionSet | Yes | Assumptions used |
| SourceSnapshotId | Yes | Source data snapshot |
| Outcome | Yes | Review outcome |
| NextReviewDate | Yes | Next review date |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| ExecuteGoalReview | GoalReviewApplicationService | GoalReviewCompleted |
| ScheduleGoalReview | GoalReviewApplicationService | GoalReviewScheduled |
| ApplyGoalReviewOutcome | GoalReviewApplicationService | GoalReviewOutcomeApplied |
| ReplayGoalReview | AdministrationApplicationService | GoalReviewReplayed |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GoalReviewScheduled | Review scheduled | Notification, Calendar |
| GoalReviewCompleted | Review finished | Dashboard, Decision Engine |
| GoalReviewCriticalInterventionRequired | Critical outcome detected | Alert, Execution Plan |
| GoalReviewReplanRecommended | Replanning required | Recommendation Engine, Scenario Engine |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GRF-VR-001 | Every review must reference assumption version and source snapshot. | Reject review |
| GRF-VR-002 | Completed goals are immutable except append-only review history. | Reject mutation |
| GRF-VR-003 | Critical review outcomes must emit alert event. | Reject completion |
| GRF-VR-004 | Next review date must be after review date. | Reject schedule |
| GRF-VR-005 | Historical reviews are append-only. | Reject overwrite |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/goals/{goalId}/reviews | POST | Execute goal review | GoalReview:Write |
| /api/v1/goals/{goalId}/reviews | GET | List goal reviews | GoalReview:Read |
| /api/v1/goals/{goalId}/reviews/schedule | POST | Schedule next review | GoalReview:Write |
| /api/v1/goal-reviews/{reviewId}/replay | POST | Replay historical review | Audit:Replay |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption version | Review is rejected |
| Critical intervention outcome | Alert event is emitted |
| Next review before review date | Schedule is rejected |
| Completed goal review | Review history appended without mutating goal |
| Historical replay | Original review outcome reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Review Execution Contract

| Field | Required | Description |
|-------|----------|-------------|
| ReviewExecutionId | Yes | Stable review run identifier |
| ReviewId | Yes | Review record identifier |
| HouseholdId | Yes | Household scope |
| GoalId | Yes | Goal being reviewed |
| ReviewTrigger | Yes | Scheduled, EventDriven, Manual, Critical |
| AssumptionVersionSet | Yes | Assumptions used |
| SourceSnapshotId | Yes | Source data snapshot |
| Outcome | Yes | Review outcome |
| NextReviewDate | Yes | Next review date |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| ExecuteGoalReview | GoalReviewApplicationService | GoalReviewCompleted |
| ScheduleGoalReview | GoalReviewApplicationService | GoalReviewScheduled |
| ApplyGoalReviewOutcome | GoalReviewApplicationService | GoalReviewOutcomeApplied |
| ReplayGoalReview | AdministrationApplicationService | GoalReviewReplayed |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GoalReviewScheduled | Review scheduled | Notification, Calendar |
| GoalReviewCompleted | Review finished | Dashboard, Decision Engine |
| GoalReviewCriticalInterventionRequired | Critical outcome detected | Alert, Execution Plan |
| GoalReviewReplanRecommended | Replanning required | Recommendation Engine, Scenario Engine |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GRF-VR-001 | Every review must reference assumption version and source snapshot. | Reject review |
| GRF-VR-002 | Completed goals are immutable except append-only review history. | Reject mutation |
| GRF-VR-003 | Critical review outcomes must emit alert event. | Reject completion |
| GRF-VR-004 | Next review date must be after review date. | Reject schedule |
| GRF-VR-005 | Historical reviews are append-only. | Reject overwrite |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/goals/{goalId}/reviews | POST | Execute goal review | GoalReview:Write |
| /api/v1/goals/{goalId}/reviews | GET | List goal reviews | GoalReview:Read |
| /api/v1/goals/{goalId}/reviews/schedule | POST | Schedule next review | GoalReview:Write |
| /api/v1/goal-reviews/{reviewId}/replay | POST | Replay historical review | Audit:Replay |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption version | Review is rejected |
| Critical intervention outcome | Alert event is emitted |
| Next review before review date | Schedule is rejected |
| Completed goal review | Review history appended without mutating goal |
| Historical replay | Original review outcome reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
