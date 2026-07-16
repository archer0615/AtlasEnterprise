# Refinancing Break-Even Spec

Document Path: knowledge/entity/loan/refinancing-break-even-spec.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Debt Management
Bounded Context: Loan
Owner: Project Atlas
Source of Truth: Atlas Refinancing Break-Even Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines `FORM-REFI-BREAK-EVEN`, the canonical formula for comparing current loan cost against refinancing cost.

## Inputs

| Input | Required | Unit | Rule |
| --- | --- | --- | --- |
| CurrentBalance | Yes | Money | Outstanding loan balance. |
| CurrentAnnualRate | Yes | Percentage | Current loan annual rate. |
| CurrentRemainingMonths | Yes | Count | Remaining term. |
| NewAnnualRate | Yes | Percentage | Proposed refinance annual rate. |
| NewTermMonths | Yes | Count | Proposed refinance term. |
| UpfrontFees | Yes | Money | Appraisal, processing, legal, and closing fees. |
| PrepaymentPenalty | No | Money | Defaults to zero. |
| HoldingPeriodMonths | Yes | Count | Expected time before sale, refinance, or payoff. |
| Currency | Yes | Currency | Must match current loan currency. |

## Formula

- CurrentCost = total interest and required payments over HoldingPeriodMonths under current schedule.
- RefinanceCost = UpfrontFees + PrepaymentPenalty + total interest and required payments over HoldingPeriodMonths under new schedule.
- MonthlySavings = CurrentMonthlyPayment - NewMonthlyPayment.
- NetBenefit = CurrentCost - RefinanceCost.
- BreakEvenMonths = ceiling((UpfrontFees + PrepaymentPenalty) / MonthlySavings) when MonthlySavings > 0.
- If MonthlySavings <= 0, BreakEvenMonths is not available and recommendation status is no-benefit unless other risk constraints justify refinancing.

## Outputs

- Current monthly payment.
- New monthly payment.
- Monthly savings.
- Break-even months.
- Net benefit over holding period.
- Recommendation status: Benefit, Conditional, No Benefit, or Review Required.
- Formula version and assumption references.

## Decision Rules

- Refinancing is Benefit only when NetBenefit > 0 and BreakEvenMonths <= HoldingPeriodMonths.
- Refinancing is Conditional when NetBenefit > 0 but liquidity, DTI, LTV, or fee assumptions require review.
- Refinancing is No Benefit when MonthlySavings <= 0 or BreakEvenMonths exceeds HoldingPeriodMonths.
- Refinancing is Review Required when required inputs are estimated, stale, or missing.

## Validation

- Reject negative fees, balance, rates, or terms.
- Reject currency mismatch.
- Verify both current and new schedules use `FORM-LOAN-AMORTIZATION`.
- Replay must use original rates, fees, term, holding period, and formula version.

## Related Specifications

- `knowledge/catalog/financial-formula-catalog.md`
- `knowledge/entity/loan/amortization-spec.md`
- `knowledge/entity/loan/risk-and-refinancing.md`
- `knowledge/entity/mortgage/scenario-and-refinance-behavior.md`
- `knowledge/workflow/loan-workflow.md`
