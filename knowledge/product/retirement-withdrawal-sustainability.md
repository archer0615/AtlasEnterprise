# Retirement Withdrawal Sustainability

Document Path: knowledge/product/retirement-withdrawal-sustainability.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Retirement
Owner: Project Atlas
Source of Truth: Atlas Retirement Withdrawal Sustainability Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines `FORM-WITHDRAWAL-SUSTAINABILITY`, the formula contract for estimating whether a retirement withdrawal plan remains sustainable under base, conservative, and stress assumptions.

## Inputs

| Input | Required | Unit | Rule |
| --- | --- | --- | --- |
| InitialPortfolioValue | Yes | Money | Must be greater than zero. |
| AnnualWithdrawalAmount | Yes | Money | Must be zero or greater. |
| WithdrawalStrategy | Yes | Enum | Fixed amount, fixed percentage, guardrail, dynamic, or bucket. |
| RetirementHorizonYears | Yes | Count | Positive integer. |
| ExpectedReturn | Yes | Percentage | Versioned assumption. |
| InflationRate | Yes | Percentage | Versioned assumption. |
| VolatilityAssumption | No | Percentage | Required for stochastic or stress testing. |
| IncomeSources | No | Money schedule | Pension, rental, dividend, or other retirement income. |
| ExpenseSchedule | Yes | Money schedule | Retirement expenses by period. |

## Formula

- RealWithdrawal = nominal withdrawal adjusted by InflationRate.
- NetWithdrawalNeed = ExpenseSchedule - IncomeSources.
- PortfolioEndBalance = prior balance * (1 + ExpectedReturn) - NetWithdrawalNeed.
- SustainabilityRatio = projected ending balance / InitialPortfolioValue.
- FailurePeriod = first period where projected balance is below zero.
- StressResult = minimum sustainability status across configured stress scenarios.

## Outputs

- Sustainability status: Strong, Watch, At Risk, or Failed.
- Projected ending balance.
- First failure period when applicable.
- Safe withdrawal estimate.
- Required contribution or spending reduction when at risk.
- Formula version and assumption references.

## Validation

- Reject negative horizon, portfolio value, or invalid strategy.
- Reject missing inflation or return assumption versions.
- Stress scenario must preserve original assumptions for replay.
- Guardrail strategy must define upper and lower adjustment thresholds.

## Related Specifications

- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/supporting/retirement.md`
- `knowledge/framework/financial-projection-framework.md`
- `knowledge/product/simulator-formula-coverage.md`
