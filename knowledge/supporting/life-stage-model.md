# Life Stage Model

Version: 1.0

## Purpose
Defines the standard life-stage framework used by Project Atlas to adapt financial recommendations throughout a user's lifetime.

## Objectives
- Align decisions with changing life priorities.
- Drive scenario assumptions by life stage.
- Adjust risk tolerance, cash flow, and goal weighting automatically.

## Core Principles
- Life stage is determined by financial characteristics rather than age alone.
- Multiple transition events may move a user between stages.
- Recommendations remain explainable and deterministic.

## Standard Life Stages

### Stage 1 – Foundation
Typical focus:
- Career establishment
- Emergency fund
- Insurance
- Debt control

### Stage 2 – Growth
Typical focus:
- Income growth
- Home purchase
- Family planning
- Investment accumulation

### Stage 3 – Expansion
Typical focus:
- Children
- Education funding
- Home upgrade
- Asset diversification

### Stage 4 – Consolidation
Typical focus:
- Mortgage reduction
- Retirement acceleration
- Portfolio optimization
- Risk reduction

### Stage 5 – Retirement Transition
Typical focus:
- Income replacement
- Withdrawal planning
- Healthcare planning
- Estate preparation

### Stage 6 – Retirement
Typical focus:
- Sustainable withdrawals
- Capital preservation
- Legacy planning

## Transition Events
Examples:
- First full-time job
- Marriage
- Child birth
- Home purchase
- Home upgrade
- Business ownership
- Early retirement
- Retirement
- Major inheritance

## Stage Attributes
Each stage defines:
- Primary objectives
- Default risk profile
- Cash reserve target
- Debt strategy
- Investment priority
- Withdrawal policy
- Insurance emphasis

## Decision Engine Integration
Life stage influences:
- Goal Prioritization
- Financial Health Score
- Asset Allocation
- Rebalancing
- Retirement Strategy
- Scenario Analysis

## Business Rules
- Life stage may change after validated life events.
- Users may override recommended stage with justification.
- Historical stages are retained for audit purposes.

## Explainability
Recommendations must include:
- Current life stage
- Triggering transition events
- Stage-specific assumptions
- Impact on recommendations

## Testing
- Single-stage users
- Multiple transition events
- Delayed retirement
- Early retirement
- Family expansion
- Home upgrade scenarios

## Future Enhancements
- AI-assisted stage detection
- Regional customization
- Household-level life stage
- Predictive transition modeling

## Phase 2 Executable Specification

### Life Stage Model Contract

| Field | Required | Description |
|-------|----------|-------------|
| LifeStageModelId | Yes | Stable model identifier |
| StageCode | Yes | Foundation, Growth, Expansion, Consolidation, RetirementTransition, Retirement |
| ModelVersion | Yes | Immutable model version |
| ClassificationCriteria | Yes | Financial and life event criteria |
| DefaultRiskProfile | Yes | Stage risk profile default |
| CashReserveTarget | Yes | Stage liquidity target |
| InvestmentPriority | Yes | Stage investment priority |
| WithdrawalPolicy | No | Required for retirement stages |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishLifeStageModel | GovernanceApplicationService | LifeStageModelPublished |
| ClassifyLifeStage | LifeStageApplicationService | LifeStageClassified |
| ValidateLifeStageModel | GovernanceApplicationService | LifeStageModelValidated |
| ReplayLifeStageClassification | AdministrationApplicationService | LifeStageClassificationReplayed |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LSM-VR-001 | Every stage model must define classification criteria and defaults. | Reject model |
| LSM-VR-002 | Retirement stages must define withdrawal policy. | Reject model |
| LSM-VR-003 | Model versions are immutable after activation. | Reject update |
| LSM-VR-004 | Classification must reference model version and source snapshot. | Reject classification |
| LSM-VR-005 | Replay must use original model version. | Reject replay |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-stage-models | GET | List active stage models | LifeStage:Read |
| /api/v1/life-stage-models | POST | Publish stage model | LifeStage:Admin |
| /api/v1/life-stage-models/classify | POST | Classify life stage | LifeStage:Evaluate |
| /api/v1/life-stage-models/validate | POST | Validate stage model | LifeStage:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing classification criteria | Model publish fails |
| Retirement stage missing withdrawal policy | Model validation fails |
| Same source and model version | Same classification returned |
| Model version update | New immutable version required |
| Historical replay | Original classification reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Life Stage Model Contract

| Field | Required | Description |
|-------|----------|-------------|
| LifeStageModelId | Yes | Stable model identifier |
| StageCode | Yes | Foundation, Growth, Expansion, Consolidation, RetirementTransition, Retirement |
| ModelVersion | Yes | Immutable model version |
| ClassificationCriteria | Yes | Financial and life event criteria |
| DefaultRiskProfile | Yes | Stage risk profile default |
| CashReserveTarget | Yes | Stage liquidity target |
| InvestmentPriority | Yes | Stage investment priority |
| WithdrawalPolicy | No | Required for retirement stages |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishLifeStageModel | GovernanceApplicationService | LifeStageModelPublished |
| ClassifyLifeStage | LifeStageApplicationService | LifeStageClassified |
| ValidateLifeStageModel | GovernanceApplicationService | LifeStageModelValidated |
| ReplayLifeStageClassification | AdministrationApplicationService | LifeStageClassificationReplayed |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| LSM-VR-001 | Every stage model must define classification criteria and defaults. | Reject model |
| LSM-VR-002 | Retirement stages must define withdrawal policy. | Reject model |
| LSM-VR-003 | Model versions are immutable after activation. | Reject update |
| LSM-VR-004 | Classification must reference model version and source snapshot. | Reject classification |
| LSM-VR-005 | Replay must use original model version. | Reject replay |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/life-stage-models | GET | List active stage models | LifeStage:Read |
| /api/v1/life-stage-models | POST | Publish stage model | LifeStage:Admin |
| /api/v1/life-stage-models/classify | POST | Classify life stage | LifeStage:Evaluate |
| /api/v1/life-stage-models/validate | POST | Validate stage model | LifeStage:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing classification criteria | Model publish fails |
| Retirement stage missing withdrawal policy | Model validation fails |
| Same source and model version | Same classification returned |
| Model version update | New immutable version required |
| Historical replay | Original classification reproduces |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
