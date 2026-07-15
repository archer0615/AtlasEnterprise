# Financial Milestone Framework

Version: 1.0

## Purpose
Defines the standard financial milestone model for Project Atlas. Milestones represent measurable achievements used by the Decision Engine to evaluate progress toward long-term financial independence.

## Objectives
- Standardize milestone definitions.
- Measure progress consistently.
- Trigger recommendation updates.
- Improve explainability across the platform.

## Milestone Categories

### Foundation
- First positive monthly cash flow
- Emergency reserve established
- Insurance protection completed

### Stability
- High-interest debt eliminated
- Six-month emergency reserve achieved
- Financial Health Score reaches target

### Growth
- First investment portfolio created
- Portfolio reaches first target value
- Home purchase completed

### Expansion
- Home upgrade completed
- Children's education fund established
- Multiple income sources achieved

### Independence
- Retirement funding ratio exceeds target
- Passive income covers essential expenses
- Mortgage substantially reduced or repaid

### Legacy
- Estate plan completed
- Beneficiary designations verified
- Intergenerational wealth plan established

## Milestone Attributes
Each milestone contains:
- MilestoneId
- Name
- Category
- Description
- Success Criteria
- Required Inputs
- Trigger Events
- Completion Date
- Status

## Completion States
- Planned
- In Progress
- Achieved
- Deferred
- Cancelled

## Trigger Events
- Income increase
- Goal completion
- Portfolio growth
- Debt repayment
- Property purchase
- Retirement
- Major life event

## Decision Engine Integration
Milestones influence:
- Goal Prioritization
- Financial Health Score
- Life Stage Model
- Scenario Engine
- Recommendation Engine

## Business Rules
- Milestones are immutable once achieved.
- Achievement requires validation.
- Milestones may unlock additional recommendations.
- Historical milestone history is retained.

## Explainability
Each recommendation reports:
- Relevant milestones
- Newly achieved milestones
- Outstanding milestones
- Next recommended milestone
- Blocking constraints

## KPIs
- Milestone Completion Rate
- Time to Milestone
- Goal Funding Progress
- Financial Independence Progress
- Retirement Readiness

## Testing
- Sequential milestone completion
- Parallel milestones
- Delayed milestones
- Reversed financial conditions
- Household milestone scenarios

## Future Enhancements
- Household milestones
- Country-specific milestone libraries
- Predictive milestone forecasting
- AI milestone planning

## Phase 2 Executable Specification

### Milestone Object Contract

| Field | Required | Description |
|-------|----------|-------------|
| MilestoneId | Yes | Stable milestone identifier |
| HouseholdId | Yes | Owning household |
| Category | Yes | Foundation, Stability, Growth, Expansion, Independence, Legacy |
| SuccessCriteria | Yes | Measurable completion condition |
| RequiredInputs | Yes | Data required for validation |
| TriggerEvents | Yes | Events that may cause evaluation |
| Status | Yes | Planned, InProgress, Achieved, Deferred, Cancelled |
| AchievedAt | No | Completion timestamp |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateFinancialMilestone | GoalApplicationService | FinancialMilestoneCreated |
| EvaluateFinancialMilestone | GoalApplicationService | FinancialMilestoneEvaluated |
| MarkMilestoneAchieved | GoalApplicationService | FinancialMilestoneAchieved |
| DeferFinancialMilestone | GoalApplicationService | FinancialMilestoneDeferred |
| CancelFinancialMilestone | GoalApplicationService | FinancialMilestoneCancelled |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| FinancialMilestoneCreated | Milestone registered | Goal Engine, Dashboard |
| FinancialMilestoneAchieved | Success criteria validated | Decision Engine, Notification |
| FinancialMilestoneDeferred | Milestone delayed | Recommendation Engine |
| FinancialMilestoneCancelled | Milestone no longer applies | Audit, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FMF-VR-001 | Achieved milestones are immutable. | Reject update |
| FMF-VR-002 | Achievement requires success criteria evidence. | Reject achievement |
| FMF-VR-003 | Deferred milestones require reason and review date. | Reject defer |
| FMF-VR-004 | Cancelled milestones remain in history. | Reject deletion |
| FMF-VR-005 | Trigger events must map to known domain events. | Reject definition |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/milestones | GET | List household milestones | Goal:Read |
| /api/v1/milestones | POST | Create milestone | Goal:Write |
| /api/v1/milestones/{milestoneId}/evaluate | POST | Evaluate milestone | Goal:Evaluate |
| /api/v1/milestones/{milestoneId}/defer | POST | Defer milestone | Goal:Write |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Success criteria satisfied | Milestone becomes Achieved |
| Missing evidence | Achievement is rejected |
| Achieved milestone update | Update is rejected |
| Trigger event received | Milestone evaluation runs |
| Deferred milestone | Review date and reason are stored |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Milestone Object Contract

| Field | Required | Description |
|-------|----------|-------------|
| MilestoneId | Yes | Stable milestone identifier |
| HouseholdId | Yes | Owning household |
| Category | Yes | Foundation, Stability, Growth, Expansion, Independence, Legacy |
| SuccessCriteria | Yes | Measurable completion condition |
| RequiredInputs | Yes | Data required for validation |
| TriggerEvents | Yes | Events that may cause evaluation |
| Status | Yes | Planned, InProgress, Achieved, Deferred, Cancelled |
| AchievedAt | No | Completion timestamp |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateFinancialMilestone | GoalApplicationService | FinancialMilestoneCreated |
| EvaluateFinancialMilestone | GoalApplicationService | FinancialMilestoneEvaluated |
| MarkMilestoneAchieved | GoalApplicationService | FinancialMilestoneAchieved |
| DeferFinancialMilestone | GoalApplicationService | FinancialMilestoneDeferred |
| CancelFinancialMilestone | GoalApplicationService | FinancialMilestoneCancelled |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| FinancialMilestoneCreated | Milestone registered | Goal Engine, Dashboard |
| FinancialMilestoneAchieved | Success criteria validated | Decision Engine, Notification |
| FinancialMilestoneDeferred | Milestone delayed | Recommendation Engine |
| FinancialMilestoneCancelled | Milestone no longer applies | Audit, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FMF-VR-001 | Achieved milestones are immutable. | Reject update |
| FMF-VR-002 | Achievement requires success criteria evidence. | Reject achievement |
| FMF-VR-003 | Deferred milestones require reason and review date. | Reject defer |
| FMF-VR-004 | Cancelled milestones remain in history. | Reject deletion |
| FMF-VR-005 | Trigger events must map to known domain events. | Reject definition |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/milestones | GET | List household milestones | Goal:Read |
| /api/v1/milestones | POST | Create milestone | Goal:Write |
| /api/v1/milestones/{milestoneId}/evaluate | POST | Evaluate milestone | Goal:Evaluate |
| /api/v1/milestones/{milestoneId}/defer | POST | Defer milestone | Goal:Write |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Success criteria satisfied | Milestone becomes Achieved |
| Missing evidence | Achievement is rejected |
| Achieved milestone update | Update is rejected |
| Trigger event received | Milestone evaluation runs |
| Deferred milestone | Review date and reason are stored |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
