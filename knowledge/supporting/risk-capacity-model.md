# Risk Capacity Model

Version: 1.0

## Purpose
Defines how Project Atlas measures a user's objective ability to take financial risk. Unlike Risk Tolerance (behavioral preference), Risk Capacity is derived from measurable financial facts.

## Principles
- Objective and data-driven.
- Independent from market sentiment.
- Recalculated whenever material financial data changes.
- Used by the Decision Engine, Asset Allocation Framework, and Financial Health Score.

## Inputs
### Income
- Stable monthly income
- Income diversification
- Employment stability

### Cash Flow
- Savings rate
- Free cash flow
- Cash flow volatility

### Assets
- Liquid assets
- Investment assets
- Real estate equity

### Liabilities
- Mortgage balance
- Consumer debt
- Debt-to-income ratio

### Time Horizon
- Goal horizon
- Retirement horizon
- Expected investment duration

### Emergency Preparedness
- Emergency reserve months
- Insurance coverage
- Contingency planning

## Capacity Dimensions
1. Liquidity Capacity
2. Income Capacity
3. Debt Capacity
4. Investment Capacity
5. Time Capacity
6. Recovery Capacity

Each dimension is scored from 0–100.

## Overall Score
Weighted aggregate of all dimensions.

Suggested bands:
- 0–20 Very Low
- 21–40 Low
- 41–60 Moderate
- 61–80 High
- 81–100 Very High

## Business Rules
- Risk Capacity cannot exceed hard financial constraints.
- Low liquidity caps portfolio risk regardless of tolerance.
- High leverage reduces capacity.
- Longer investment horizons increase capacity.
- Capacity changes only after validated financial events.

## Decision Engine Usage
Risk Capacity influences:
- Asset Allocation
- Rebalancing
- Goal Prioritization
- Withdrawal Strategy
- Scenario Analysis

## Explainability
Recommendations must report:
- Overall score
- Dimension scores
- Key positive factors
- Limiting factors
- Resulting portfolio constraints

## KPIs
- Risk Capacity Score
- Liquidity Ratio
- Debt Burden
- Savings Rate
- Recovery Time Estimate

## Testing
- Young investor
- High-income / high-debt
- Low-income / high-assets
- Early retirement
- Market downturn
- Income interruption

## Future Enhancements
- Household risk capacity
- Bayesian score updates
- AI-assisted capacity estimation
- Country-specific calibration

## Phase 2 Executable Specification

### Risk Capacity Assessment Contract

| Field | Requirement |
|---|---|
| Aggregate | RiskCapacityAssessment |
| Identity | assessmentId |
| Scope | tenantId, householdId, asOfDate |
| Inputs | income, cashFlow, assets, liabilities, timeHorizon, emergencyPreparedness, policyVersion |
| Outputs | overallScore, dimensionScores, capacityBand, limitingFactors, portfolioConstraints |
| Determinism | Same validated financial facts and scoring model version must produce the same score. |

### Required Commands

| Command | Purpose |
|---|---|
| AssessRiskCapacity | Calculate objective risk capacity score. |
| ValidateRiskCapacityInputs | Validate source financial facts. |
| PublishRiskCapacityAssessment | Freeze assessment for decision use. |
| RecalculateRiskCapacity | Recalculate after material financial event. |
| OverrideRiskCapacityAssessment | Apply approved manual override with reason. |
| ReplayRiskCapacityAssessment | Rebuild assessment from stored inputs and score model version. |

### Domain Events

| Event | Trigger |
|---|---|
| RiskCapacityAssessed | Score calculation completes. |
| RiskCapacityInputsValidated | Input validation completes. |
| RiskCapacityAssessmentPublished | Assessment is frozen for downstream use. |
| RiskCapacityRecalculated | Material event triggers recalculation. |
| RiskCapacityAssessmentOverridden | Approved override is recorded. |
| RiskCapacityAssessmentReplayed | Historical assessment is reproduced. |

### Validation Rules

1. Dimension scores must remain within 0 through 100.
2. Overall score must not exceed hard constraints from liquidity, leverage, or negative cash flow.
3. Published assessments cannot be overwritten.
4. Override requires approver, reason, expiration, and audit reference.
5. Replay must use original source facts, weights, policy version, and score model version.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/risk-capacity/assessments | POST | Assess risk capacity. |
| /api/risk-capacity/assessments/{assessmentId} | GET | Retrieve assessment. |
| /api/risk-capacity/assessments/{assessmentId}/publish | POST | Publish assessment. |
| /api/risk-capacity/assessments/{assessmentId}/recalculate | POST | Recalculate assessment. |
| /api/risk-capacity/assessments/{assessmentId}/override | POST | Apply approved override. |
| /api/risk-capacity/assessments/{assessmentId}/replay | POST | Replay assessment. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| Low liquidity with high income | Liquidity cap limits overall score. |
| High leverage | Debt capacity lowers capacity band. |
| Published assessment mutation | Mutation is rejected. |
| Manual override without reason | Validation fails. |
| Replay assessment | Overall and dimension scores match original result. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
