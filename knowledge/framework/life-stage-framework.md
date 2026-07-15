# Life Stage Framework

Version: 1.0

## Purpose
Defines the lifecycle framework that Project Atlas uses to tailor financial strategies, recommendations, and decision rules throughout a person's lifetime.

## Objectives
- Standardize life-stage classification.
- Align recommendations with changing priorities.
- Drive scenario assumptions and decision rules.
- Provide transparent transitions between stages.

## Design Principles
- Based on financial circumstances rather than age alone.
- Supports manual override with audit history.
- Multiple transition events may occur simultaneously.
- Re-evaluated after significant financial or household changes.

## Standard Life Stages

### Stage 1 – Foundation
Focus:
- Career establishment
- Budgeting
- Emergency fund
- Insurance
- High-interest debt elimination

### Stage 2 – Accumulation
Focus:
- Income growth
- Home purchase
- Portfolio construction
- Family preparation

### Stage 3 – Expansion
Focus:
- Family growth
- Education funding
- Home upgrade
- Wealth accumulation

### Stage 4 – Optimization
Focus:
- Debt optimization
- Tax efficiency
- Portfolio optimization
- Retirement acceleration

### Stage 5 – Retirement Transition
Focus:
- Income replacement
- Withdrawal planning
- Healthcare funding
- Estate preparation

### Stage 6 – Retirement
Focus:
- Sustainable withdrawals
- Capital preservation
- Legacy planning

## Transition Events
- Employment change
- Marriage
- Child birth/adoption
- Home purchase
- Home upgrade
- Major inheritance
- Business ownership
- Early retirement
- Retirement

## Stage Profile
Each stage defines:
- Primary objectives
- Recommended savings rate
- Risk budget guidance
- Target liquidity
- Asset allocation baseline
- Debt strategy
- Insurance emphasis
- Decision priorities

## Decision Engine Integration
Influences:
- Financial Health Score
- Goal Prioritization
- Asset Allocation
- Capital Allocation
- Withdrawal Strategy
- House Decision Framework
- Scenario Engine

## Business Rules
- Only one active life stage at a time.
- Transition history is immutable.
- Major events trigger reassessment.
- Stage-specific defaults never override hard constraints.

## Explainability
Recommendations must include:
- Current stage
- Transition reason
- Stage assumptions
- Key recommendation impacts

## KPIs
- Stage Progress
- Goal Completion Rate
- Savings Ratio
- Retirement Readiness
- Financial Health Trend

## Testing
- Single adult
- Married couple
- Growing family
- Mid-career transition
- Early retirement
- Standard retirement

## Future Enhancements
- Household life-stage modeling
- AI transition prediction
- Country-specific stage profiles
- Dynamic milestone integration

## Phase 2 Executable Specification

### Life Stage Evaluation Contract

| Field | Required | Description |
|-------|----------|-------------|
| LifeStageEvaluationId | Yes | Stable evaluation identifier |
| HouseholdId | Yes | Household scope |
| CurrentStage | Yes | Active life stage |
| CandidateStage | No | Proposed stage when transition is detected |
| TransitionEventSet | Yes | Events driving classification |
| StageProfileVersion | Yes | Stage profile version |
| SourceSnapshotId | Yes | Source data snapshot |
| OverrideReason | No | Required when user overrides |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| EvaluateLifeStage | LifeStageApplicationService | LifeStageEvaluated |
| TransitionLifeStage | LifeStageApplicationService | LifeStageTransitioned |
| OverrideLifeStage | LifeStageApplicationService | LifeStageOverrideApplied |
| ReplayLifeStageEvaluation | AdministrationApplicationService | LifeStageEvaluationReplayed |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LSF-VR-001 | Only one active life stage is allowed per household. | Reject transition |
| LSF-VR-002 | Transition must reference event set and source snapshot. | Reject transition |
| LSF-VR-003 | User override requires reason and audit. | Reject override |
| LSF-VR-004 | Stage defaults cannot override hard constraints. | Reject recommendation |
| LSF-VR-005 | Historical stage transitions are immutable. | Reject overwrite |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-stage/evaluate | POST | Evaluate current life stage | LifeStage:Evaluate |
| /api/v1/life-stage/transition | POST | Transition life stage | LifeStage:Write |
| /api/v1/life-stage/override | POST | Override recommended stage | LifeStage:Write |
| /api/v1/life-stage/history | GET | Retrieve stage history | LifeStage:Read |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Multiple active stages | Transition is rejected |
| Major life event | Stage reassessment runs |
| Override without reason | Override is rejected |
| Hard constraint conflict | Stage default is not applied |
| Historical replay | Original stage sequence reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Life Stage Evaluation Contract

| Field | Required | Description |
|-------|----------|-------------|
| LifeStageEvaluationId | Yes | Stable evaluation identifier |
| HouseholdId | Yes | Household scope |
| CurrentStage | Yes | Active life stage |
| CandidateStage | No | Proposed stage when transition is detected |
| TransitionEventSet | Yes | Events driving classification |
| StageProfileVersion | Yes | Stage profile version |
| SourceSnapshotId | Yes | Source data snapshot |
| OverrideReason | No | Required when user overrides |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| EvaluateLifeStage | LifeStageApplicationService | LifeStageEvaluated |
| TransitionLifeStage | LifeStageApplicationService | LifeStageTransitioned |
| OverrideLifeStage | LifeStageApplicationService | LifeStageOverrideApplied |
| ReplayLifeStageEvaluation | AdministrationApplicationService | LifeStageEvaluationReplayed |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LSF-VR-001 | Only one active life stage is allowed per household. | Reject transition |
| LSF-VR-002 | Transition must reference event set and source snapshot. | Reject transition |
| LSF-VR-003 | User override requires reason and audit. | Reject override |
| LSF-VR-004 | Stage defaults cannot override hard constraints. | Reject recommendation |
| LSF-VR-005 | Historical stage transitions are immutable. | Reject overwrite |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-stage/evaluate | POST | Evaluate current life stage | LifeStage:Evaluate |
| /api/v1/life-stage/transition | POST | Transition life stage | LifeStage:Write |
| /api/v1/life-stage/override | POST | Override recommended stage | LifeStage:Write |
| /api/v1/life-stage/history | GET | Retrieve stage history | LifeStage:Read |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Multiple active stages | Transition is rejected |
| Major life event | Stage reassessment runs |
| Override without reason | Override is rejected |
| Hard constraint conflict | Stage default is not applied |
| Historical replay | Original stage sequence reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
