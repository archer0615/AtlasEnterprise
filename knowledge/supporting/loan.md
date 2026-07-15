# Loan Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

Loan 是 Project Atlas 中的重要現金流工具，而非單純負債。

貸款的存在應提升人生決策彈性，而非增加財務風險。

------------------------------------------------------------------------

# Core Principles

-   不以「零負債」為目標。
-   以最佳化 Cash Flow 為優先。
-   保留流動性優先於過度提前還款。
-   貸款必須服務人生目標。

------------------------------------------------------------------------

# Loan Types

## Mortgage

-   First Mortgage
-   Second Mortgage
-   Home Equity Loan
-   Home Equity Line of Credit

## Personal Loan

-   Unsecured Loan
-   Salary Loan

## Auto Loan

-   Vehicle Financing

## Investment Loan

-   Margin Loan
-   Securities Financing

------------------------------------------------------------------------

# Loan Attributes

每筆 Loan 至少包含：

-   Principal
-   Outstanding Balance
-   Interest Rate
-   Interest Type
-   Loan Term
-   Payment Frequency
-   Payment Method
-   Start Date
-   End Date
-   Currency
-   Collateral
-   Scenario

------------------------------------------------------------------------

# Interest Types

-   Fixed Rate
-   Floating Rate
-   Mixed Rate

------------------------------------------------------------------------

# Repayment Methods

-   Equal Principal and Interest
-   Equal Principal
-   Interest Only
-   Balloon Payment
-   Bullet Payment

------------------------------------------------------------------------

# Loan Status

-   Planned
-   Active
-   PaidOff
-   Default
-   Closed

------------------------------------------------------------------------

# Business Rules

## LN-001

貸款不得使 Monthly Free Cash Flow 低於安全門檻。

## LN-002

提前還款前，必須比較：

-   投資報酬率
-   貸款利率
-   流動性影響
-   稅務影響

## LN-003

房貸優先視為長期策略工具。

## LN-004

信貸不得作為長期生活費來源。

## LN-005

任何增貸皆需重新模擬未來 30 年 Cash Flow。

------------------------------------------------------------------------

# Risk Levels

-   Low
-   Medium
-   High
-   Critical

依據：

-   Debt Service Ratio
-   Loan To Value
-   Cash Flow
-   Emergency Fund
-   Income Stability

------------------------------------------------------------------------

# KPIs

-   Total Outstanding
-   Monthly Payment
-   Interest Cost
-   Remaining Term
-   Debt Service Ratio
-   Loan To Value
-   Average Interest Rate

------------------------------------------------------------------------

# Domain Events

-   LoanCreated
-   LoanActivated
-   LoanRefinanced
-   LoanPaymentMade
-   LoanPartiallyPaid
-   LoanPaidOff
-   InterestRateChanged

------------------------------------------------------------------------

# Related Engines

-   Loan Engine
-   Cash Flow Engine
-   Decision Engine
-   Home Upgrade Engine
-   Retirement Engine

------------------------------------------------------------------------

# Related Documents

-   docs/10-LoanEngine.md
-   docs/08-CashFlowEngine.md
-   docs/11-HomeUpgradeEngine.md
-   knowledge/cashflow.md
-   knowledge/property.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Loan Contract

| Field | Requirement |
|---|---|
| Aggregate | Loan |
| Identity | loanId |
| Scope | tenantId, householdId, scenarioId |
| Required State | type, principal, outstandingBalance, interestRate, term, paymentMethod, status |
| Derived State | monthlyPayment, remainingTerm, interestCost, riskLevel, debtServiceRatio |
| Invariant | A loan cannot be active without repayment schedule and affordability validation. |

## Required Commands

| Command | Purpose |
|---|---|
| CreateLoan | Register a planned or active loan. |
| ActivateLoan | Move a validated loan into active status. |
| RecordLoanPayment | Apply scheduled or unscheduled repayment. |
| UpdateLoanInterestRate | Change floating or mixed interest rate assumptions. |
| RefinanceLoan | Replace terms with a validated refinancing structure. |
| PayOffLoan | Close the loan after full repayment. |
| ReplayLoanLifecycle | Rebuild lifecycle state from events. |

## Domain Events

| Event | Trigger |
|---|---|
| LoanCreated | Loan record is created. |
| LoanActivated | Loan becomes active. |
| LoanPaymentMade | Scheduled payment is recorded. |
| LoanPartiallyPaid | Extra principal payment is recorded. |
| InterestRateChanged | Rate changes for floating or mixed loan. |
| LoanRefinanced | Refinancing terms are accepted. |
| LoanPaidOff | Outstanding balance reaches zero. |

## Validation Rules

1. Principal and outstanding balance must be non-negative.
2. Active loans must have start date, term, interest rate, currency, and repayment method.
3. Loan status transitions must follow Planned -> Active -> PaidOff or Closed.
4. Refinancing must pass loan decision rules before terms are replaced.
5. Payment application must not create negative outstanding balance.

## API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/loans | POST | Create a loan. |
| /api/loans/{loanId} | GET | Retrieve loan state. |
| /api/loans/{loanId}/activate | POST | Activate a validated loan. |
| /api/loans/{loanId}/payments | POST | Record a payment. |
| /api/loans/{loanId}/interest-rate | PUT | Update loan interest rate. |
| /api/loans/{loanId}/refinance | POST | Execute refinancing. |
| /api/loans/{loanId}/payoff | POST | Pay off and close the loan. |

## Testing Matrix

| Scenario | Expected Result |
|---|---|
| Create valid mortgage | LoanCreated is emitted. |
| Activate without repayment schedule | Validation fails. |
| Extra payment below outstanding balance | LoanPartiallyPaid is emitted. |
| Full payoff | LoanPaidOff is emitted and status becomes PaidOff. |
| Replay lifecycle | Rebuilt outstanding balance matches event history. |

## Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
