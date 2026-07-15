# Goal Funding Framework

## Split Navigation

- [Goal funding targets and contributions](goal-funding/targets-and-contributions.md)
- [Goal funding prioritization and reallocation](goal-funding/prioritization-and-reallocation.md)

Version: 1.0

## Purpose
Defines the enterprise framework used by Project Atlas to calculate, monitor, prioritize, and optimize funding for financial goals throughout a user's lifetime.

## Objectives
- Standardize funding calculations.
- Measure funding progress consistently.
- Prioritize capital allocation across competing goals.
- Provide explainable recommendations.

## Supported Goal Types
- Emergency Fund
- Home Purchase
- Home Upgrade
- Retirement
- Education
- Vehicle Purchase
- Major Lifestyle Goals
- Legacy / Estate
- Custom Goals

## Goal Attributes
Each goal contains:
- GoalId
- Name
- Category
- Priority
- Target Amount
- Target Date
- Minimum Funding Requirement
- Current Funding
- Funding Source(s)
- Funding Status

## Funding Sources
- Salary
- Bonus
- Investment Contributions
- Investment Withdrawals
- Rental Income
- Business Income
- Asset Sales
- Windfalls
- Financing (where permitted)

## Core Calculations

Funding Gap =
Target Amount - Current Funding

Funding Ratio =
Current Funding / Target Amount

Required Monthly Contribution =
Funding Gap / Remaining Months

Goal Success Probability =
Scenario Engine output using market assumptions and cash flow projections.

## Funding Status
- Not Started
- Behind Schedule
- On Track
- Fully Funded
- Overfunded

## Funding Priority Rules
1. Mandatory obligations
2. Emergency Fund
3. Insurance
4. Retirement minimum
5. Housing
6. Education
7. Other long-term goals
8. Lifestyle goals

## Decision Process
1. Validate goal inputs.
2. Calculate funding gap.
3. Evaluate available capital.
4. Allocate funding by priority.
5. Validate constraints.
6. Generate recommendation.

## Business Rules
- Mandatory goals cannot lose allocated funding.
- Reserved capital cannot be double allocated.
- Funding plans are recalculated after major financial events.
- Goal priorities follow Goal Prioritization Framework.

## Outputs
- Funding Ratio
- Funding Gap
- Monthly Contribution Target
- Recommended Funding Order
- Funding Forecast
- Goal Risk Assessment

## Integration
Consumes:
- Capital Allocation Framework
- Goal Prioritization
- Net Worth Framework
- Liquidity Framework
- Financial Health Score
- Risk Budget Framework

Produces:
- Decision Engine
- Scenario Engine
- Dashboard
- Retirement Engine

## Explainability
Each recommendation reports:
- Current funding status
- Funding gap
- Allocation decisions
- Blocking constraints
- Alternative scenarios

## KPIs
- Goal Funding Ratio
- Goal Completion Rate
- Funding Gap
- Monthly Funding Progress
- Goal Success Probability

## Testing
- Single goal
- Multiple competing goals
- Windfall allocation
- Income reduction
- Delayed target date
- Retirement funding stress test

## Future Enhancements
- Dynamic funding optimization
- Household goal pooling
- Tax-aware funding
- AI funding recommendations

## Phase 2 Executable Specification

### Funding Plan Contract

| Field | Required | Description |
|-------|----------|-------------|
| FundingPlanId | Yes | Stable funding plan identifier |
| HouseholdId | Yes | Household scope |
| GoalId | Yes | Target goal |
| TargetAmount | Yes | Required target amount |
| CurrentFunding | Yes | Current allocated funding |
| FundingGap | Yes | Remaining gap |
| RequiredMonthlyContribution | Yes | Contribution needed by target date |
| FundingSourceSet | Yes | Approved funding sources |
| PriorityRank | Yes | Funding priority rank |
| SourceSnapshotId | Yes | Source data snapshot |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CalculateGoalFundingPlan | GoalFundingApplicationService | GoalFundingPlanCalculated |
| AllocateGoalFunding | GoalFundingApplicationService | GoalFundingAllocated |
| RebalanceGoalFunding | GoalFundingApplicationService | GoalFundingRebalanced |
| ReplayGoalFundingPlan | AdministrationApplicationService | GoalFundingPlanReplayed |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GoalFundingPlanCalculated | Funding plan calculated | Dashboard, Decision Engine |
| GoalFundingAllocated | Funding allocation committed | Goal Progress, Audit |
| GoalFundingShortfallDetected | Funding gap exceeds threshold | Alert, Recommendation Engine |
| GoalFundingRebalanced | Allocations changed by priority or event | Scenario Engine, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GFF-VR-001 | Target amount must be positive. | Reject plan |
| GFF-VR-002 | Reserved capital cannot be allocated to multiple goals. | Reject allocation |
| GFF-VR-003 | Mandatory goal funding cannot be reduced by discretionary goal allocation. | Reject allocation |
| GFF-VR-004 | Required monthly contribution must use current target date and source snapshot. | Reject calculation |
| GFF-VR-005 | Historical funding plans are immutable. | Reject update |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/goals/{goalId}/funding-plan | POST | Calculate funding plan | GoalFunding:Evaluate |
| /api/v1/goals/{goalId}/funding-plan | GET | Retrieve funding plan | GoalFunding:Read |
| /api/v1/goals/{goalId}/funding/allocate | POST | Allocate funding | GoalFunding:Write |
| /api/v1/goals/funding/rebalance | POST | Rebalance goal funding | GoalFunding:Write |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Multiple goals share reserved capital | Allocation is rejected |
| Windfall allocation | Mandatory and high-priority goals receive funding first |
| Income reduction | Required contribution and success probability recalculate |
| Historical replay | Original funding plan reproduces |
| Discretionary allocation harms emergency fund | Allocation is blocked |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Funding Plan Contract

| Field | Required | Description |
|-------|----------|-------------|
| FundingPlanId | Yes | Stable funding plan identifier |
| HouseholdId | Yes | Household scope |
| GoalId | Yes | Target goal |
| TargetAmount | Yes | Required target amount |
| CurrentFunding | Yes | Current allocated funding |
| FundingGap | Yes | Remaining gap |
| RequiredMonthlyContribution | Yes | Contribution needed by target date |
| FundingSourceSet | Yes | Approved funding sources |
| PriorityRank | Yes | Funding priority rank |
| SourceSnapshotId | Yes | Source data snapshot |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CalculateGoalFundingPlan | GoalFundingApplicationService | GoalFundingPlanCalculated |
| AllocateGoalFunding | GoalFundingApplicationService | GoalFundingAllocated |
| RebalanceGoalFunding | GoalFundingApplicationService | GoalFundingRebalanced |
| ReplayGoalFundingPlan | AdministrationApplicationService | GoalFundingPlanReplayed |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GoalFundingPlanCalculated | Funding plan calculated | Dashboard, Decision Engine |
| GoalFundingAllocated | Funding allocation committed | Goal Progress, Audit |
| GoalFundingShortfallDetected | Funding gap exceeds threshold | Alert, Recommendation Engine |
| GoalFundingRebalanced | Allocations changed by priority or event | Scenario Engine, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GFF-VR-001 | Target amount must be positive. | Reject plan |
| GFF-VR-002 | Reserved capital cannot be allocated to multiple goals. | Reject allocation |
| GFF-VR-003 | Mandatory goal funding cannot be reduced by discretionary goal allocation. | Reject allocation |
| GFF-VR-004 | Required monthly contribution must use current target date and source snapshot. | Reject calculation |
| GFF-VR-005 | Historical funding plans are immutable. | Reject update |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/goals/{goalId}/funding-plan | POST | Calculate funding plan | GoalFunding:Evaluate |
| /api/v1/goals/{goalId}/funding-plan | GET | Retrieve funding plan | GoalFunding:Read |
| /api/v1/goals/{goalId}/funding/allocate | POST | Allocate funding | GoalFunding:Write |
| /api/v1/goals/funding/rebalance | POST | Rebalance goal funding | GoalFunding:Write |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Multiple goals share reserved capital | Allocation is rejected |
| Windfall allocation | Mandatory and high-priority goals receive funding first |
| Income reduction | Required contribution and success probability recalculate |
| Historical replay | Original funding plan reproduces |
| Discretionary allocation harms emergency fund | Allocation is blocked |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
