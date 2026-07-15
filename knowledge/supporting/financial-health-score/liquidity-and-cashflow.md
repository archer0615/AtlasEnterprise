# Financial Health Score Liquidity and Cashflow

## Purpose

This split document isolates liquidity and cashflow scoring inputs from the larger Financial Health Score specification.

## Source

- Parent specification: [Financial Health Score](../financial-health-score.md)

## Liquidity Inputs

- Emergency reserve months
- Cash reserve adequacy
- Near-term obligation coverage
- Liquid asset availability

## Cashflow Inputs

- Monthly free cash flow
- Savings rate
- Negative month count
- Income and expense stability

## Dashboard Use

- Dashboard metrics may summarize liquidity and cashflow status.
- Dashboard labels must not replace canonical scoring definitions.
- Scenario fixtures should include warning references when reserve or cashflow thresholds are breached.

## Related References

- [Cash Reserve Framework](../../framework/cash-reserve-framework.md)
- [Cashflow Supporting Document](../cashflow.md)
- [Financial Dashboard Metrics](../../reporting/financial-dashboard-metrics.md)
