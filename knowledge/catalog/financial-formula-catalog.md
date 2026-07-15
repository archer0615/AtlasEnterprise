# Financial Formula Catalog

## Formula Groups
- NPV
- IRR
- CAGR
- XIRR
- PMT
- FV
- PV
- Loan Amortization
- DTI
- LTV
- Savings Rate
- Safe Withdrawal Rate
- Net Worth
- Cash Flow Coverage

All formulas include version, assumptions and references.

## Phase 2 Executable Specification

### Formula Definition Contract

| Field | Required | Description |
|-------|----------|-------------|
| FormulaId | Yes | Stable formula identifier |
| FormulaName | Yes | Human-readable name |
| FormulaGroup | Yes | NPV, IRR, CAGR, XIRR, PMT, FV, PV, Loan, Ratio, Cash Flow |
| FormulaVersion | Yes | Immutable version |
| Expression | Yes | Canonical expression or implementation reference |
| Inputs | Yes | Required inputs with type and unit |
| OutputUnit | Yes | Money, Ratio, Percentage, Count, Score |
| AssumptionRefs | Yes | Assumptions used by formula |
| SourceRefs | Yes | Knowledge or specification references |
| Status | Yes | Draft, Active, Deprecated, Retired |

### Formula Catalog

| Formula ID | Group | Purpose | Primary Consumers |
|------------|-------|---------|-------------------|
| FORM-NPV | NPV | Discount future cash flows | Scenario Engine, Decision Engine |
| FORM-IRR | IRR | Calculate internal return rate | Investment Engine |
| FORM-XIRR | XIRR | Calculate irregular cashflow return | Portfolio Engine |
| FORM-PMT | PMT | Calculate loan payment | Loan Engine |
| FORM-DTI | DTI | Measure debt burden | Loan Engine, Financial Health Score |
| FORM-LTV | LTV | Measure collateral leverage | Housing, Loan Engine |
| FORM-SAVINGS-RATE | Savings Rate | Measure income retained | Cash Flow Engine |
| FORM-SWR | Safe Withdrawal Rate | Estimate retirement withdrawals | Retirement Engine |
| FORM-NET-WORTH | Net Worth | Calculate assets minus liabilities | Dashboard |
| FORM-CF-COVERAGE | Cash Flow Coverage | Measure expense coverage | Liquidity, Dashboard |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishFormulaDefinition | GovernanceApplicationService | FormulaDefinitionPublished |
| DeprecateFormulaVersion | GovernanceApplicationService | FormulaVersionDeprecated |
| EvaluateFormula | CalculationApplicationService | FormulaEvaluated |
| ValidateFormulaInputs | CalculationApplicationService | FormulaInputsValidated |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FFC-VR-001 | Active formula must include version, inputs, units, and assumptions. | Reject publish |
| FFC-VR-002 | Formula versions are immutable after activation. | Reject update |
| FFC-VR-003 | Money formulas must preserve currency metadata. | Reject evaluation |
| FFC-VR-004 | Ratio formulas must define numerator and denominator units. | Reject publish |
| FFC-VR-005 | Deprecated formulas remain replayable for historical snapshots. | Reject retirement |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/formulas | GET | List formula definitions | Formula:Read |
| /api/v1/formulas/{formulaId}/versions/{version} | GET | Retrieve formula version | Formula:Read |
| /api/v1/formulas/evaluate | POST | Evaluate formula | Formula:Evaluate |
| /api/v1/formulas/{formulaId}/deprecate | POST | Deprecate formula version | Formula:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption reference | Formula publish fails |
| Historical formula version read | Original expression is returned |
| Currency mismatch | Evaluation fails |
| Zero denominator ratio | Deterministic validation error returned |
| Deprecated formula replay | Historical snapshot remains reproducible |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Formula Definition Contract

| Field | Required | Description |
|-------|----------|-------------|
| FormulaId | Yes | Stable formula identifier |
| FormulaName | Yes | Human-readable name |
| FormulaGroup | Yes | NPV, IRR, CAGR, XIRR, PMT, FV, PV, Loan, Ratio, Cash Flow |
| FormulaVersion | Yes | Immutable version |
| Expression | Yes | Canonical expression or implementation reference |
| Inputs | Yes | Required inputs with type and unit |
| OutputUnit | Yes | Money, Ratio, Percentage, Count, Score |
| AssumptionRefs | Yes | Assumptions used by formula |
| SourceRefs | Yes | Knowledge or specification references |
| Status | Yes | Draft, Active, Deprecated, Retired |

### Formula Catalog

| Formula ID | Group | Purpose | Primary Consumers |
|------------|-------|---------|-------------------|
| FORM-NPV | NPV | Discount future cash flows | Scenario Engine, Decision Engine |
| FORM-IRR | IRR | Calculate internal return rate | Investment Engine |
| FORM-XIRR | XIRR | Calculate irregular cashflow return | Portfolio Engine |
| FORM-PMT | PMT | Calculate loan payment | Loan Engine |
| FORM-DTI | DTI | Measure debt burden | Loan Engine, Financial Health Score |
| FORM-LTV | LTV | Measure collateral leverage | Housing, Loan Engine |
| FORM-SAVINGS-RATE | Savings Rate | Measure income retained | Cash Flow Engine |
| FORM-SWR | Safe Withdrawal Rate | Estimate retirement withdrawals | Retirement Engine |
| FORM-NET-WORTH | Net Worth | Calculate assets minus liabilities | Dashboard |
| FORM-CF-COVERAGE | Cash Flow Coverage | Measure expense coverage | Liquidity, Dashboard |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishFormulaDefinition | GovernanceApplicationService | FormulaDefinitionPublished |
| DeprecateFormulaVersion | GovernanceApplicationService | FormulaVersionDeprecated |
| EvaluateFormula | CalculationApplicationService | FormulaEvaluated |
| ValidateFormulaInputs | CalculationApplicationService | FormulaInputsValidated |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FFC-VR-001 | Active formula must include version, inputs, units, and assumptions. | Reject publish |
| FFC-VR-002 | Formula versions are immutable after activation. | Reject update |
| FFC-VR-003 | Money formulas must preserve currency metadata. | Reject evaluation |
| FFC-VR-004 | Ratio formulas must define numerator and denominator units. | Reject publish |
| FFC-VR-005 | Deprecated formulas remain replayable for historical snapshots. | Reject retirement |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/formulas | GET | List formula definitions | Formula:Read |
| /api/v1/formulas/{formulaId}/versions/{version} | GET | Retrieve formula version | Formula:Read |
| /api/v1/formulas/evaluate | POST | Evaluate formula | Formula:Evaluate |
| /api/v1/formulas/{formulaId}/deprecate | POST | Deprecate formula version | Formula:Admin |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing assumption reference | Formula publish fails |
| Historical formula version read | Original expression is returned |
| Currency mismatch | Evaluation fails |
| Zero denominator ratio | Deterministic validation error returned |
| Deprecated formula replay | Historical snapshot remains reproducible |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
