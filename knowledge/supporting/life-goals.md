# Life Goals Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Project Atlas 對人生目標（Life
Goals）的領域模型、商業規則與共同語言。

所有 Decision Engine、Scenario Engine、Cash Flow Engine、Retirement
Engine 皆以 Life Goals 作為決策依據。

------------------------------------------------------------------------

# Core Philosophy

財務只是工具。

所有資產、現金流、投資、保險、貸款與退休策略，皆應服務人生目標，而非成為最終目的。

------------------------------------------------------------------------

# Goal Categories

## Family

-   Marriage
-   Children
-   Education
-   Parent Support

## Housing

-   First Home
-   Home Upgrade
-   Renovation
-   Rental Strategy

## Career

-   Career Development
-   Entrepreneurship
-   Sabbatical

## Financial

-   Financial Independence
-   Passive Income Target
-   Net Worth Target

## Retirement

-   Retirement Age
-   Retirement Lifestyle
-   Legacy Planning

## Lifestyle

-   Travel
-   Hobbies
-   Health
-   Charity

------------------------------------------------------------------------

# Goal Attributes

每個 Goal 至少包含：

-   Goal Id
-   Name
-   Category
-   Description
-   Priority
-   Target Date
-   Target Amount
-   Current Progress
-   Owner
-   Status

------------------------------------------------------------------------

# Goal Status

-   Planned
-   Active
-   On Hold
-   Completed
-   Cancelled

------------------------------------------------------------------------

# Priority Levels

-   Critical
-   High
-   Medium
-   Low

------------------------------------------------------------------------

# Success Metrics

-   Progress %
-   Funding Ratio
-   Expected Completion Date
-   Cash Flow Impact
-   Probability of Success

------------------------------------------------------------------------

# Dependencies

Goal 可依賴：

-   Other Goals
-   Cash Flow
-   Investment Portfolio
-   Property
-   Loan
-   Retirement Plan

------------------------------------------------------------------------

# Business Rules

## LG-001

所有重大財務決策必須標示受影響的人生目標。

## LG-002

Goal Priority 高於投資報酬最佳化。

## LG-003

每個 Goal 必須具備可量化完成條件。

## LG-004

Scenario 必須重新評估 Goal Success Probability。

## LG-005

Decision Engine 必須揭露各方案對 Goal 的影響。

------------------------------------------------------------------------

# KPIs

-   Goal Completion Rate
-   Goal Funding Ratio
-   Goal Achievement Probability
-   Goal Delay
-   Goal Risk Score

------------------------------------------------------------------------

# Domain Events

-   GoalCreated
-   GoalUpdated
-   GoalCompleted
-   GoalCancelled
-   GoalFundingChanged
-   GoalPriorityChanged

------------------------------------------------------------------------

# Related Engines

-   Decision Engine
-   Scenario Engine
-   Cash Flow Engine
-   Retirement Engine
-   Dashboard Engine

------------------------------------------------------------------------

# Related Documents

-   docs/specification/01-Blueprint.md
-   docs/13-DecisionEngine.md
-   docs/14-Scenario.md
-   docs/16-LifeTimeline.md
-   docs/17-LifeEvents.md
-   knowledge/financial-philosophy.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Life Goal Contract

| Field | Required | Description |
|-------|----------|-------------|
| GoalId | Yes | Stable goal identifier |
| HouseholdId | Yes | Household scope |
| Category | Yes | Family, Housing, Career, Financial, Retirement, Lifestyle |
| Priority | Yes | Critical, High, Medium, Low |
| TargetDate | Yes | Expected completion date |
| TargetAmount | No | Financial target when applicable |
| CompletionCriteria | Yes | Quantifiable success criteria |
| Owner | Yes | Responsible owner |
| Status | Yes | Planned, Active, On Hold, Completed, Cancelled |
| TraceId | Yes | Audit trace |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateLifeGoal | GoalApplicationService | GoalCreated |
| UpdateLifeGoal | GoalApplicationService | GoalUpdated |
| CompleteLifeGoal | GoalApplicationService | GoalCompleted |
| CancelLifeGoal | GoalApplicationService | GoalCancelled |
| ReplayLifeGoalHistory | AdministrationApplicationService | LifeGoalHistoryReplayed |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LG-VR-001 | Every goal must have measurable completion criteria. | Reject goal |
| LG-VR-002 | Major decisions must reference affected goals. | Reject decision |
| LG-VR-003 | Goal priority must outrank pure return optimization. | Reject recommendation |
| LG-VR-004 | Scenario evaluation must recalculate success probability. | Reject scenario |
| LG-VR-005 | Historical goal events are append-only. | Reject overwrite |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-goals | POST | Create life goal | Goal:Write |
| /api/v1/life-goals | GET | List life goals | Goal:Read |
| /api/v1/life-goals/{goalId} | GET | Retrieve life goal | Goal:Read |
| /api/v1/life-goals/{goalId}/complete | POST | Complete life goal | Goal:Write |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing completion criteria | Goal creation fails |
| Scenario changes funding | Success probability recalculates |
| Completed goal update | Mutation is rejected |
| Decision without affected goal | Decision is rejected |
| Historical replay | Original goal state reproduces |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Life Goal Contract

| Field | Required | Description |
|-------|----------|-------------|
| GoalId | Yes | Stable goal identifier |
| HouseholdId | Yes | Household scope |
| Category | Yes | Family, Housing, Career, Financial, Retirement, Lifestyle |
| Priority | Yes | Critical, High, Medium, Low |
| TargetDate | Yes | Expected completion date |
| TargetAmount | No | Financial target when applicable |
| CompletionCriteria | Yes | Quantifiable success criteria |
| Owner | Yes | Responsible owner |
| Status | Yes | Planned, Active, On Hold, Completed, Cancelled |
| TraceId | Yes | Audit trace |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateLifeGoal | GoalApplicationService | GoalCreated |
| UpdateLifeGoal | GoalApplicationService | GoalUpdated |
| CompleteLifeGoal | GoalApplicationService | GoalCompleted |
| CancelLifeGoal | GoalApplicationService | GoalCancelled |
| ReplayLifeGoalHistory | AdministrationApplicationService | LifeGoalHistoryReplayed |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LG-VR-001 | Every goal must have measurable completion criteria. | Reject goal |
| LG-VR-002 | Major decisions must reference affected goals. | Reject decision |
| LG-VR-003 | Goal priority must outrank pure return optimization. | Reject recommendation |
| LG-VR-004 | Scenario evaluation must recalculate success probability. | Reject scenario |
| LG-VR-005 | Historical goal events are append-only. | Reject overwrite |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-goals | POST | Create life goal | Goal:Write |
| /api/v1/life-goals | GET | List life goals | Goal:Read |
| /api/v1/life-goals/{goalId} | GET | Retrieve life goal | Goal:Read |
| /api/v1/life-goals/{goalId}/complete | POST | Complete life goal | Goal:Write |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing completion criteria | Goal creation fails |
| Scenario changes funding | Success probability recalculates |
| Completed goal update | Mutation is rejected |
| Decision without affected goal | Decision is rejected |
| Historical replay | Original goal state reproduces |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
