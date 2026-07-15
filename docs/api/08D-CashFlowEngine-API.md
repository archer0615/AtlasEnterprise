# Project Atlas Enterprise
# docs/api/08D-CashFlowEngine-API.md

Version: 2.0  
Status: Application Contract

## 1. Purpose

Defines browser-local Application Use Cases for the Cash Flow Engine. No network server is required.

## 2. Use Cases

| Use Case | Type | Purpose |
|---|---|---|
| GetCashFlowSummary | Query | Read current cash-flow summary |
| ForecastCashFlow | Command | Generate forecast |
| ValidateCashFlowInput | Query | Validate source data |
| SimulateCashFlowScenario | Command | Execute isolated scenario |
| GetForecastHistory | Query | Read persisted results |
| GetForecastDetail | Query | Read traceable forecast |

## 3. Forecast Request

```ts
interface ForecastCashFlowRequest {
  householdId: string;
  scenarioVersionId?: string;
  startMonth: string;
  endMonth: string;
  inflationRate: number;
  frequency: "MONTHLY" | "ANNUAL";
}
```

## 4. Forecast Response

```ts
interface ForecastCashFlowResponse {
  forecastId: string;
  monthlyCashFlow: MonthlyCashFlowDto[];
  annualCashFlow: AnnualCashFlowDto[];
  freeCashFlow: MoneyDto;
  cashReserveMonths: number;
  healthScore: number;
  warnings: WarningDto[];
  traceId: string;
  formulaVersions: Record<string, string>;
  ruleVersions: Record<string, string>;
}
```

## 5. Persistence

Forecast results are stored in IndexedDB only when the caller requests persistence. Temporary scenario previews may remain in memory.

## 6. Performance Targets

- Typical forecast: under 500 ms on supported desktop browsers.
- Validation: under 100 ms.
- Scenario comparison: under 2 seconds.
- Long calculations must support cancellation and progress reporting.

## 7. Offline Behavior

All Cash Flow use cases must function offline after the application shell is cached.

## 8. Future REST Adapter

A future remote adapter may map these contracts to `/api/v1/cashflow`, but the use cases remain the canonical contract.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-07-09 | REST contract |
| 2.0 | 2026-07-11 | Local application contract |
