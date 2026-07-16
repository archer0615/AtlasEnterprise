# Financial Formula Catalog

Document Path: knowledge/catalog/financial-formula-catalog.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.1
Status: Canonical Specification
Domain: Formula Governance
Bounded Context: Calculation
Owner: Project Atlas
Source of Truth: Atlas Financial Formula Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines stable formula identifiers, metadata, lifecycle controls, and validation expectations for formulas used by dashboards, simulators, engines, and decision workflows.

## Formula Definition Contract

| Field | Required | Description |
| --- | --- | --- |
| FormulaId | Yes | Stable formula identifier. |
| FormulaName | Yes | Human-readable formula name. |
| FormulaGroup | Yes | Formula family such as Loan, Ratio, Portfolio, Retirement, Cash Flow, or Score. |
| FormulaVersion | Yes | Immutable formula version. |
| Expression | Yes | Canonical expression, pseudo-formula, or implementation reference. |
| Inputs | Yes | Required inputs with type, unit, and validation rules. |
| OutputUnit | Yes | Money, ratio, percentage, count, score, date, or schedule. |
| AssumptionRefs | Yes | Assumption versions required by the formula. |
| SourceRefs | Yes | Knowledge, roadmap, fixture, or implementation references. |
| Status | Yes | Draft, Active, Deprecated, or Retired. |

## Formula Identifier Catalog

| Formula ID | Version | Group | Purpose | Primary Consumers |
| --- | --- | --- | --- | --- |
| FORM-NPV | 1.0 | Discounting | Discount future cash flows. | Scenario Engine, Decision Engine |
| FORM-IRR | 1.0 | Return | Calculate internal rate of return. | Investment Engine |
| FORM-XIRR | 1.0 | Return | Calculate irregular cash-flow return. | Portfolio Engine |
| FORM-PMT | 1.0 | Loan | Calculate periodic loan payment. | Loan Engine |
| FORM-LOAN-AMORTIZATION | 1.0 | Loan | Generate principal, interest, and balance schedule. | Loan Engine, Simulator |
| FORM-REFI-BREAK-EVEN | 1.0 | Loan | Calculate refinancing break-even period and net benefit. | Loan Engine, Dashboard |
| FORM-DTI | 1.0 | Ratio | Measure debt burden against income. | Loan Engine, Financial Health Score |
| FORM-LTV | 1.0 | Ratio | Measure collateral leverage. | Housing, Loan Engine |
| FORM-SAVINGS-RATE | 1.0 | Ratio | Measure retained income. | Cash Flow Engine |
| FORM-SWR | 1.0 | Retirement | Estimate sustainable withdrawals. | Retirement Engine |
| FORM-NET-WORTH | 1.0 | Balance Sheet | Calculate assets minus liabilities. | Dashboard |
| FORM-CF-COVERAGE | 1.0 | Liquidity | Measure expense coverage. | Liquidity, Dashboard |
| FORM-PORTFOLIO-DRAWDOWN | 1.0 | Portfolio | Measure portfolio peak-to-trough drawdown. | Portfolio Engine, Simulator |
| FORM-DRAWDOWN-ATTRIBUTION | 1.0 | Portfolio | Attribute drawdown to assets, sectors, accounts, or factors. | Portfolio Engine, Dashboard |
| FORM-WITHDRAWAL-SUSTAINABILITY | 1.0 | Retirement | Estimate retirement withdrawal sustainability under assumptions and stress cases. | Retirement Engine, Simulator |
| FORM-DECISION-SCORE | 1.0 | Score | Normalize weighted decision score. | Decision Dashboard |

## Formula Governance Commands

| Command | Actor | Output |
| --- | --- | --- |
| PublishFormulaDefinition | GovernanceApplicationService | FormulaDefinitionPublished |
| DeprecateFormulaVersion | GovernanceApplicationService | FormulaVersionDeprecated |
| EvaluateFormula | CalculationApplicationService | FormulaEvaluated |
| ValidateFormulaInputs | CalculationApplicationService | FormulaInputsValidated |

## Validation Rules

| Rule ID | Rule | Failure |
| --- | --- | --- |
| FFC-VR-001 | Active formula must include version, inputs, units, and assumptions. | Reject publish |
| FFC-VR-002 | Formula versions are immutable after activation. | Reject update |
| FFC-VR-003 | Money formulas must preserve currency metadata. | Reject evaluation |
| FFC-VR-004 | Ratio formulas must define numerator and denominator units. | Reject publish |
| FFC-VR-005 | Deprecated formulas remain replayable for historical snapshots. | Reject retirement |
| FFC-VR-006 | Schedule formulas must define period order, rounding, and terminal balance handling. | Reject publish |
| FFC-VR-007 | Break-even formulas must define upfront cost, recurring savings, and comparison horizon. | Reject publish |

## API Contract

| Endpoint | Method | Purpose | Permission |
| --- | --- | --- | --- |
| `/api/v1/formulas` | GET | List formula definitions. | Formula:Read |
| `/api/v1/formulas/{formulaId}/versions/{version}` | GET | Retrieve formula version. | Formula:Read |
| `/api/v1/formulas/evaluate` | POST | Evaluate formula. | Formula:Evaluate |
| `/api/v1/formulas/{formulaId}/deprecate` | POST | Deprecate formula version. | Formula:Admin |

## Testing Matrix

| Test | Expected Result |
| --- | --- |
| Missing assumption reference | Formula publish fails. |
| Historical formula version read | Original expression is returned. |
| Currency mismatch | Evaluation fails. |
| Zero denominator ratio | Deterministic validation error returned. |
| Deprecated formula replay | Historical snapshot remains reproducible. |
| Amortization terminal balance | Final period balance resolves to zero or configured residual. |
| Refinancing no-savings case | Break-even returns no-benefit status. |

## Related Specifications

- `knowledge/product/dashboard-formula-traceability.md`
- `knowledge/product/simulator-formula-coverage.md`
- `knowledge/product/dashboard-metric-formula-mapping.md`
- `knowledge/product/formula-validation-matrix.md`
- `knowledge/product/formula-coverage-roadmap.md`
- `knowledge/engine/calculation-engine-framework.md`
- `knowledge/entity/loan/amortization-spec.md`
- `knowledge/entity/loan/refinancing-break-even-spec.md`

## Version History

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
| 1.1 | 2026-07-16 | Consolidated duplicate sections and added formula identifier catalog. |
