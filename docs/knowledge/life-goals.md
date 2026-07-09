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

-   docs/01-Blueprint.md
-   docs/13-DecisionEngine.md
-   docs/14-Scenario.md
-   docs/16-LifeTimeline.md
-   docs/17-LifeEvents.md
-   knowledge/financial-philosophy.md
