# Financial Projection Framework

Version: 1.0

## Purpose
Defines the enterprise standard for projecting future financial outcomes across all Project Atlas engines. This framework provides deterministic, explainable projections for cash flow, assets, liabilities, investments, retirement, and major life decisions.

## Objectives
- Standardize projection methodologies.
- Ensure consistency across all engines.
- Support scenario comparison.
- Produce auditable and explainable forecasts.

## Projection Principles
- Deterministic by default.
- Scenario-driven when assumptions differ.
- Time-series based.
- Assumption-version controlled.
- Fully reproducible.

## Projection Scope
### Cash Flow
- Income
- Expenses
- Savings
- Free Cash Flow

### Assets
- Cash
- Investment Portfolio
- Property
- Retirement Assets

### Liabilities
- Mortgage
- Personal Loans
- Consumer Debt

### Investment
- Portfolio Growth
- Expected Return
- Dividend Income
- Rebalancing Effects

### Retirement
- Retirement Assets
- Withdrawal Schedule
- Portfolio Longevity

### Housing
- Property Appreciation
- Mortgage Amortization
- Upgrade Scenarios

## Projection Horizon
Supported periods:
- Monthly
- Quarterly
- Yearly

Supported durations:
- 1 year
- 5 years
- 10 years
- 20 years
- Lifetime

## Required Inputs
- Market Assumptions
- Inflation Assumptions
- Salary Growth
- Investment Returns
- Interest Rates
- Tax Rules
- Life Stage
- Goal Funding
- Cash Flow

## Projection Engine Workflow
1. Load assumptions.
2. Validate inputs.
3. Generate baseline forecast.
4. Apply scenario adjustments.
5. Execute business rules.
6. Calculate KPIs.
7. Produce explainability report.

## Outputs
- Projected Net Worth
- Cash Flow Forecast
- Asset Growth
- Debt Reduction
- Retirement Readiness
- Goal Funding Forecast
- Liquidity Forecast

## Business Rules
- All projections reference an assumption version.
- Historical projections remain immutable.
- Scenario projections never overwrite baseline projections.
- Projection timestamps are recorded.

## Explainability
Every projection includes:
- Assumptions used
- Formula references
- Triggered business rules
- Confidence level
- Scenario differences

## Integration
Consumes:
- Scenario Framework
- Net Worth Framework
- Goal Funding Framework
- Liquidity Framework
- Market Assumptions
- Financial Ratio Framework

Produces:
- Decision Engine
- Dashboard
- Retirement Engine
- House Decision Framework
- Scenario Engine

## KPIs
- Forecast Accuracy
- Projection Coverage
- Scenario Variance
- Goal Success Probability
- Forecast Confidence

## Testing
- Stable economy
- High inflation
- Market crash
- Salary increase
- Early retirement
- Home upgrade

## Future Enhancements
- Monte Carlo simulation
- AI-assisted forecasting
- Real-time market integration
- Household projection models

## Phase 2 Executable Specification

### Projection Snapshot Contract

| Field | Required | Description |
|-------|----------|-------------|
| ProjectionId | Yes | Stable projection identifier |
| HouseholdId | Yes | Owning household |
| ScenarioId | No | Scenario reference when applicable |
| ProjectionType | Yes | Baseline, Alternative, Stress, Retirement, Housing, Goal |
| Horizon | Yes | Monthly, Quarterly, Yearly, Lifetime |
| StartDate | Yes | Projection start date |
| EndDate | Yes | Projection end date |
| AssumptionVersionSet | Yes | Assumptions used |
| FormulaVersionSet | Yes | Formulas used |
| SourceSnapshotId | Yes | Source data snapshot |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| GenerateFinancialProjection | ProjectionApplicationService | FinancialProjectionGenerated |
| GenerateScenarioProjection | ScenarioApplicationService | ScenarioProjectionGenerated |
| ReplayFinancialProjection | AdministrationApplicationService | FinancialProjectionReplayed |
| ArchiveFinancialProjection | ProjectionApplicationService | FinancialProjectionArchived |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| FinancialProjectionGenerated | Baseline projection created | Dashboard, Decision Engine |
| ScenarioProjectionGenerated | Scenario projection created | Scenario Engine, Recommendation Engine |
| ProjectionVarianceDetected | Projection differs materially from baseline | Alert, Decision Review |
| FinancialProjectionReplayed | Historical projection reproduced | Audit, Compliance |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FPF-VR-001 | Every projection must reference assumption and formula versions. | Reject generation |
| FPF-VR-002 | Scenario projection must not overwrite baseline projection. | Reject write |
| FPF-VR-003 | Projection horizon must be supported by requested projection type. | Reject command |
| FPF-VR-004 | Historical projection snapshots are immutable. | Reject update |
| FPF-VR-005 | Currency conversion must be explicit when mixed currencies exist. | Reject generation |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/projections | POST | Generate financial projection | Projection:Evaluate |
| /api/v1/projections/{projectionId} | GET | Retrieve projection | Projection:Read |
| /api/v1/projections/{projectionId}/replay | POST | Replay historical projection | Audit:Replay |
| /api/v1/scenarios/{scenarioId}/projection | POST | Generate scenario projection | Scenario:Evaluate |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption version | Projection is rejected |
| Scenario projection | Baseline remains unchanged |
| High inflation scenario | Projection variance is emitted |
| Historical replay | Original projection values reproduce |
| Mixed currency inputs | Explicit conversion rule is required |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Projection Snapshot Contract

| Field | Required | Description |
|-------|----------|-------------|
| ProjectionId | Yes | Stable projection identifier |
| HouseholdId | Yes | Owning household |
| ScenarioId | No | Scenario reference when applicable |
| ProjectionType | Yes | Baseline, Alternative, Stress, Retirement, Housing, Goal |
| Horizon | Yes | Monthly, Quarterly, Yearly, Lifetime |
| StartDate | Yes | Projection start date |
| EndDate | Yes | Projection end date |
| AssumptionVersionSet | Yes | Assumptions used |
| FormulaVersionSet | Yes | Formulas used |
| SourceSnapshotId | Yes | Source data snapshot |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| GenerateFinancialProjection | ProjectionApplicationService | FinancialProjectionGenerated |
| GenerateScenarioProjection | ScenarioApplicationService | ScenarioProjectionGenerated |
| ReplayFinancialProjection | AdministrationApplicationService | FinancialProjectionReplayed |
| ArchiveFinancialProjection | ProjectionApplicationService | FinancialProjectionArchived |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| FinancialProjectionGenerated | Baseline projection created | Dashboard, Decision Engine |
| ScenarioProjectionGenerated | Scenario projection created | Scenario Engine, Recommendation Engine |
| ProjectionVarianceDetected | Projection differs materially from baseline | Alert, Decision Review |
| FinancialProjectionReplayed | Historical projection reproduced | Audit, Compliance |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FPF-VR-001 | Every projection must reference assumption and formula versions. | Reject generation |
| FPF-VR-002 | Scenario projection must not overwrite baseline projection. | Reject write |
| FPF-VR-003 | Projection horizon must be supported by requested projection type. | Reject command |
| FPF-VR-004 | Historical projection snapshots are immutable. | Reject update |
| FPF-VR-005 | Currency conversion must be explicit when mixed currencies exist. | Reject generation |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/projections | POST | Generate financial projection | Projection:Evaluate |
| /api/v1/projections/{projectionId} | GET | Retrieve projection | Projection:Read |
| /api/v1/projections/{projectionId}/replay | POST | Replay historical projection | Audit:Replay |
| /api/v1/scenarios/{scenarioId}/projection | POST | Generate scenario projection | Scenario:Evaluate |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption version | Projection is rejected |
| Scenario projection | Baseline remains unchanged |
| High inflation scenario | Projection variance is emitted |
| Historical replay | Original projection values reproduce |
| Mixed currency inputs | Explicit conversion rule is required |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
