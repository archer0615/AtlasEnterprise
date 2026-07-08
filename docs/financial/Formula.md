# Formula Specification

## Grace Period Loan Payment
```text
MonthlyPayment = Principal * AnnualInterestRate / 12
```

## Amortized Loan Payment
```text
r = AnnualInterestRate / 12
n = RemainingMonths
MonthlyPayment = Principal * r * (1+r)^n / ((1+r)^n - 1)
```

## Compound Investment Projection
```text
EndingValue = StartingValue * (1 + AnnualReturn)^Years + FutureValueOfContributions
```

## Cash Flow
```text
FreeCashFlow = TotalIncome - FixedExpenses - VariableExpenses - LoanPayments - InsurancePremiums - PlannedInvestments
```

## Home Upgrade Net Cash Need
```text
CurrentHomeEquity = EstimatedSalePrice - RemainingLoanBalance - TransactionCosts - Tax
RequiredDownPayment = NewHomePrice * DownPaymentRate
NetCashNeed = RequiredDownPayment + PurchaseCosts + DecorationCost - CurrentHomeEquity - SpouseContribution
```
