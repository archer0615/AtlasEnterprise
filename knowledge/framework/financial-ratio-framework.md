# Financial Ratio Framework

Version: 2.0

## Purpose
Defines the enterprise framework governing all financial ratios used by Project Atlas. Unlike `financial-ratios.md`, which is the canonical ratio catalog, this framework specifies lifecycle, governance, calculation standards, ownership, validation, versioning, and engine integration.

## Relationship to financial-ratios.md
- financial-ratios.md = Ratio Catalog (what ratios exist)
- financial-ratio-framework.md = Governance Framework (how ratios are defined, maintained, calculated, versioned, validated, and consumed)

## Framework Scope
- Ratio taxonomy
- Naming standards
- Formula governance
- Version control
- Calculation timing
- Data quality
- Validation
- Engine ownership
- Explainability
- API exposure

## Ratio Lifecycle
Draft
→ Review
→ Approved
→ Active
→ Deprecated
→ Archived

## Naming Standard
FR-{DOMAIN}-{NUMBER}

Examples:
- FR-LIQ-001
- FR-DEBT-002
- FR-RET-001

## Formula Governance
Every ratio must define:
- Stable ID
- Business definition
- Formula
- Inputs
- Units
- Assumptions
- Thresholds
- Version
- Owner Engine

## Calculation Rules
- Deterministic
- Reproducible
- Time-stamped
- Assumption-version aware
- Currency normalized

## Data Validation
Validate:
- Missing inputs
- Negative values
- Currency consistency
- Date alignment
- Duplicate records

## Engine Consumers
- Financial Health Score
- Decision Engine
- Dashboard
- Scenario Engine
- Cash Flow Engine
- Investment Engine
- Loan Engine
- Retirement Engine

## Explainability
Each calculated ratio records:
- Formula version
- Input values
- Output value
- Threshold evaluation
- Source entities

## Business Rules
- Ratio IDs are immutable.
- Formula changes require version increments.
- Historical values are never recalculated using newer formulas.
- All engines consume canonical ratio definitions.

## KPIs
- Ratio calculation success rate
- Validation error rate
- Formula version coverage
- Data completeness

## Future Enhancements
- Custom user ratios
- AI anomaly detection
- Country-specific ratio packs

## Phase 2 Executable Specification

### Ratio Definition Contract

| Field | Required | Description |
|-------|----------|-------------|
| RatioId | Yes | Stable ratio identifier |
| RatioName | Yes | Canonical name |
| Domain | Yes | Liquidity, CashFlow, Debt, Investment, Housing, Retirement, Insurance, Wealth |
| FormulaId | Yes | Formula catalog reference |
| RatioVersion | Yes | Immutable ratio version |
| Inputs | Yes | Required source fields |
| Unit | Yes | Ratio, Percent, Months, Score |
| ThresholdSet | Yes | Target, warning, critical |
| OwnerEngine | Yes | Engine responsible for calculation |
| Status | Yes | Draft, Review, Approved, Active, Deprecated, Archived |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishRatioDefinition | GovernanceApplicationService | RatioDefinitionPublished |
| CalculateFinancialRatio | RatioApplicationService | FinancialRatioCalculated |
| DeprecateRatioVersion | GovernanceApplicationService | RatioVersionDeprecated |
| ValidateRatioInputs | RatioApplicationService | RatioInputsValidated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| RatioDefinitionPublished | Ratio becomes active | Dashboard, Decision Engine |
| FinancialRatioCalculated | Ratio value calculated | Financial Health Score, Dashboard |
| RatioThresholdBreached | Ratio crosses threshold | Alert, Recommendation Engine |
| RatioVersionDeprecated | Version deprecated | Audit, Governance |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FRF-VR-001 | Ratio ID is immutable after approval. | Reject update |
| FRF-VR-002 | Formula changes require a new ratio version. | Reject update |
| FRF-VR-003 | Historical ratio values must reference original version. | Reject replay |
| FRF-VR-004 | Ratio inputs must be normalized before calculation. | Reject calculation |
| FRF-VR-005 | Threshold ranges must not overlap. | Reject publish |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/ratios/definitions | GET | List ratio definitions | Ratio:Read |
| /api/v1/ratios/calculate | POST | Calculate ratio values | Ratio:Evaluate |
| /api/v1/ratios/{ratioId}/history | GET | Retrieve ratio history | Ratio:Read |
| /api/v1/ratios/{ratioId}/deprecate | POST | Deprecate ratio version | Ratio:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Overlapping thresholds | Definition publish fails |
| Formula version change | New ratio version is required |
| Missing normalized input | Calculation fails |
| Historical ratio read | Original version and value are returned |
| Threshold breach | RatioThresholdBreached event is emitted |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 2.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Ratio Definition Contract

| Field | Required | Description |
|-------|----------|-------------|
| RatioId | Yes | Stable ratio identifier |
| RatioName | Yes | Canonical name |
| Domain | Yes | Liquidity, CashFlow, Debt, Investment, Housing, Retirement, Insurance, Wealth |
| FormulaId | Yes | Formula catalog reference |
| RatioVersion | Yes | Immutable ratio version |
| Inputs | Yes | Required source fields |
| Unit | Yes | Ratio, Percent, Months, Score |
| ThresholdSet | Yes | Target, warning, critical |
| OwnerEngine | Yes | Engine responsible for calculation |
| Status | Yes | Draft, Review, Approved, Active, Deprecated, Archived |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishRatioDefinition | GovernanceApplicationService | RatioDefinitionPublished |
| CalculateFinancialRatio | RatioApplicationService | FinancialRatioCalculated |
| DeprecateRatioVersion | GovernanceApplicationService | RatioVersionDeprecated |
| ValidateRatioInputs | RatioApplicationService | RatioInputsValidated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| RatioDefinitionPublished | Ratio becomes active | Dashboard, Decision Engine |
| FinancialRatioCalculated | Ratio value calculated | Financial Health Score, Dashboard |
| RatioThresholdBreached | Ratio crosses threshold | Alert, Recommendation Engine |
| RatioVersionDeprecated | Version deprecated | Audit, Governance |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FRF-VR-001 | Ratio ID is immutable after approval. | Reject update |
| FRF-VR-002 | Formula changes require a new ratio version. | Reject update |
| FRF-VR-003 | Historical ratio values must reference original version. | Reject replay |
| FRF-VR-004 | Ratio inputs must be normalized before calculation. | Reject calculation |
| FRF-VR-005 | Threshold ranges must not overlap. | Reject publish |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/ratios/definitions | GET | List ratio definitions | Ratio:Read |
| /api/v1/ratios/calculate | POST | Calculate ratio values | Ratio:Evaluate |
| /api/v1/ratios/{ratioId}/history | GET | Retrieve ratio history | Ratio:Read |
| /api/v1/ratios/{ratioId}/deprecate | POST | Deprecate ratio version | Ratio:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Overlapping thresholds | Definition publish fails |
| Formula version change | New ratio version is required |
| Missing normalized input | Calculation fails |
| Historical ratio read | Original version and value are returned |
| Threshold breach | RatioThresholdBreached event is emitted |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 2.0 | 2026-07-15 | Phase 2 executable specification added. |
