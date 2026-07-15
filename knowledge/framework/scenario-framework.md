# Project Atlas Scenario Framework

> **PWA v1 Architecture Amendment (2026-07-11):** Any PostgreSQL, EF Core, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase mapping. Atlas v1 uses in-process TypeScript Application Use Cases and IndexedDB repositories. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# Project Atlas — Scenario Framework

> File: `knowledge/scenario-framework.md`  
> Layer: Knowledge Base / Decision Modeling  
> Status: Specification Draft v1.0  
> Owner: Project Atlas  
> Purpose: Define the standard scenario model used across cashflow, loan, investment, home upgrade, retirement, insurance, tax, and life-event decision engines.

---

## 1. Document Purpose

This document defines the official Scenario Framework for Project Atlas.

Project Atlas is not a bookkeeping system. It is a Life Financial Decision Operating System. Therefore, a scenario is not merely a saved set of assumptions. A scenario is a structured representation of a possible life-financial path, including user decisions, market assumptions, income and expense paths, asset behavior, liabilities, life events, and decision constraints.

The Scenario Framework provides a consistent model so that Codex can implement all simulation, comparison, dashboard, recommendation, and decision-rule logic without repeatedly inventing new structures.

This document is the canonical reference for:

- Scenario entity design
- Scenario classification
- Baseline and alternative scenario handling
- Assumption override hierarchy
- Time-series projection structure
- Scenario comparison rules
- Sensitivity testing
- Stress testing
- Monte Carlo readiness
- Decision scoring integration
- API and database design requirements
- Validation and testing expectations

---

## 2. Core Principle

A scenario represents one coherent version of the user's future.

Every scenario must answer the following question:

> If the user makes this set of decisions under this set of assumptions, what does their financial life look like over time?

A scenario must always include:

1. A starting financial state
2. A projection horizon
3. A set of assumptions
4. A set of decisions
5. A sequence of life events
6. Simulation outputs
7. KPI results
8. Risk and feasibility assessment
9. Comparison metadata

A scenario must not be treated as a random collection of numbers.

---

## 3. Scenario Design Goals

The Scenario Framework must support the following product goals:

1. Compare major life-financial choices objectively.
2. Preserve assumptions used at the time of calculation.
3. Make every recommendation auditable.
4. Allow the same scenario to be recalculated when assumptions change.
5. Support deterministic simulation first.
6. Support stress testing and Monte Carlo later without redesigning the domain model.
7. Keep user decisions separate from market assumptions.
8. Keep baseline financial facts separate from hypothetical changes.
9. Allow scenario versioning.
10. Allow Codex to implement scenario APIs without asking for missing definitions.

---

## 4. Scenario Definition

A Scenario is a named projection case derived from a user's household financial profile.

Formal definition:

```text
Scenario = FinancialState(t0)
         + ProjectionHorizon
         + AssumptionSet
         + DecisionSet
         + LifeEventSet
         + EngineExecutionResult
         + KPIResultSet
         + RiskAssessment
```

Where:

- `FinancialState(t0)` is the user's current baseline state.
- `ProjectionHorizon` defines the simulation period.
- `AssumptionSet` defines market, inflation, tax, loan, income, and expense assumptions.
- `DecisionSet` defines user-controllable choices.
- `LifeEventSet` defines major personal or family events.
- `EngineExecutionResult` is the calculated output from Atlas engines.
- `KPIResultSet` is the standardized measurement layer.
- `RiskAssessment` determines feasibility, fragility, and warning level.

---

## 5. Scenario Types

Atlas must support the following scenario types.

### 5.1 Baseline Scenario

The Baseline Scenario represents the user's current path if no major change is made.

Examples:

- Keep current home.
- Continue current mortgage.
- Continue current investment contribution pattern.
- Continue existing income and expense assumptions.
- No home upgrade.
- No early loan repayment.

Rules:

- Every scenario comparison must have exactly one baseline unless explicitly running a standalone analysis.
- Baseline must be deterministic.
- Baseline must be recalculable.
- Baseline must not contain speculative decisions unless those are already committed.

### 5.2 Decision Scenario

A Decision Scenario represents one major financial decision path.

Examples:

- Upgrade home in 2028.
- Keep first home and buy second home.
- Sell first home and buy second home.
- Buy car in 2027.
- Repay personal loan early.
- Increase ETF allocation.
- Retire at age 60.

Rules:

- Each Decision Scenario should isolate one major decision whenever possible.
- If multiple decisions are bundled, the scenario must explicitly list all decision components.
- The system must identify which decision variables differ from baseline.

### 5.3 Stress Scenario

A Stress Scenario applies adverse assumptions to test resilience.

Examples:

- Income decreases by 20% for 12 months.
- Mortgage rate rises by 1.5%.
- Equity market drops 35% in year one.
- Rental income is delayed for 6 months.
- Emergency expense occurs.
- Bonus is not received for two years.

Rules:

- Stress scenarios must preserve the user's decision path but override adverse assumptions.
- Stress scenario output must include survivability and recovery metrics.
- Stress scenario must not be presented as forecast. It is a risk test.

### 5.4 Optimistic Scenario

An Optimistic Scenario applies favorable assumptions.

Examples:

- Salary grows faster than expected.
- Investment return exceeds base case.
- Home price appreciates faster.
- Interest rates decline.
- Expenses grow slower than inflation.

Rules:

- Optimistic scenarios must be clearly labeled.
- They must not be used as the default recommendation basis.
- Decision scoring may reference optimistic scenarios, but final recommendation must remain viable under base and stress conditions.

### 5.5 Sensitivity Scenario

A Sensitivity Scenario changes one variable or a controlled set of variables to measure impact.

Examples:

- Mortgage rate +0.5%, +1.0%, +1.5%.
- Investment return -1%, base, +1%.
- Home upgrade price +5%, +10%, +15%.
- Retirement age 55, 60, 65.

Rules:

- Sensitivity scenarios must specify the changed variable.
- Sensitivity scenarios should be generated programmatically.
- Sensitivity scenarios are usually not saved as permanent user-facing scenarios unless the user explicitly saves them.

### 5.6 Milestone Scenario

A Milestone Scenario checks whether a specific life goal can be reached by a target date.

Examples:

- Net worth reaches TWD 20M by age 45.
- Emergency fund reaches 12 months of expenses by 2027.
- Mortgage balance below TWD 8M by 2032.
- Retirement portfolio reaches required capital by age 60.

Rules:

- Milestone scenario must include goal definition.
- Output must show probability or deterministic feasibility depending on simulation mode.
- Milestone success must be binary and measurable.

### 5.7 What-if Scenario

A What-if Scenario is exploratory and may be incomplete.

Examples:

- What if I buy a car next year?
- What if I keep the first home?
- What if I stop investing for two years?

Rules:

- What-if scenarios may allow draft state.
- Draft scenarios must not be used in final recommendations.
- Draft scenarios must become validated scenarios before comparison.

---

## 6. Scenario Lifecycle

A scenario must move through a defined lifecycle.

```text
Draft -> Validated -> Simulated -> Compared -> Archived
```

### 6.1 Draft

The scenario has been created but may not have complete assumptions or decisions.

Allowed operations:

- Edit inputs
- Add/remove decisions
- Add/remove life events
- Save draft

Not allowed:

- Final recommendation
- Dashboard KPI commitment
- Decision score publication

### 6.2 Validated

The scenario has passed input validation.

Requirements:

- Projection horizon exists.
- Required assumptions are resolved.
- Required financial state exists.
- Decision variables are valid.
- No conflicting life events exist.

### 6.3 Simulated

All relevant engines have completed execution.

Requirements:

- CashFlowEngine output exists.
- LoanEngine output exists when liabilities exist.
- InvestmentEngine output exists when assets exist.
- HomeUpgradeEngine output exists when property decision exists.
- RetirementEngine output exists when retirement horizon is relevant.
- DecisionEngine can consume KPI results.

### 6.4 Compared

The scenario has been compared against baseline or other scenarios.

Requirements:

- Comparison target exists.
- KPI delta results exist.
- Risk delta results exist.
- Trade-off summary exists.

### 6.5 Archived

The scenario is preserved for audit or history but no longer active.

Rules:

- Archived scenarios are read-only.
- Archived scenarios may be cloned into a new draft.
- Archived scenarios must retain original assumptions and engine outputs.

---

## 7. Scenario Identity and Versioning

Every scenario must have a stable identity and version history.

Required identity fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| ScenarioId | UUID | Yes | Stable scenario identifier |
| HouseholdId | UUID | Yes | Owner household |
| Name | string | Yes | User-visible name |
| Description | string | No | Scenario explanation |
| ScenarioType | enum | Yes | Baseline, Decision, Stress, etc. |
| Status | enum | Yes | Draft, Validated, Simulated, Compared, Archived |
| BaseScenarioId | UUID | Conditional | Required for comparison scenarios |
| ParentScenarioId | UUID | No | Used when cloned |
| Version | integer | Yes | Scenario version |
| CreatedAt | datetime | Yes | Creation timestamp |
| UpdatedAt | datetime | Yes | Last update timestamp |
| SimulatedAt | datetime | No | Last successful simulation timestamp |

Versioning rules:

1. Editing scenario inputs after simulation must create a new version or mark output stale.
2. Engine outputs must reference the exact scenario version used.
3. Assumption snapshots must be immutable once simulation is completed.
4. User-facing comparison must show if scenario versions are not aligned.

---

## 8. Scenario Time Model

All scenario simulations must use a discrete time model.

Default time step:

```text
Monthly
```

Supported time steps:

| Time Step | Usage |
|---|---|
| Monthly | Default cashflow, loan, investment, household simulation |
| Quarterly | Dividend and FCN reporting summaries |
| Annual | Dashboard aggregation and retirement summary |

Rules:

1. Internal simulation should use monthly granularity.
2. Annual results must be derived from monthly results, not separately guessed.
3. Quarterly results must be aggregation views unless a product genuinely pays quarterly.
4. Dates must be represented by actual calendar months, not generic period numbers only.

Scenario horizon fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| StartDate | date | Yes | Projection start date |
| EndDate | date | Yes | Projection end date |
| HorizonMonths | integer | Derived | Number of months |
| UserCurrentAge | decimal | Optional | Used for age-based timeline |
| RetirementAge | decimal | Optional | Required for retirement scenarios |

Default horizon rules:

- Cashflow short-term analysis: 36 months
- Home upgrade analysis: 10 to 30 years
- Loan analysis: remaining loan term
- Retirement analysis: until age 95 by default
- Life decision dashboard: minimum 30 years unless scenario is explicitly short-term

---

## 9. Assumption Resolution Hierarchy

Scenario assumptions must be resolved using a consistent hierarchy.

Priority order from highest to lowest:

```text
ScenarioOverride
> DecisionSpecificOverride
> UserProfileAssumption
> HouseholdDefaultAssumption
> AtlasTaiwanAssumption
> AtlasGlobalDefaultAssumption
```

Meaning:

1. Scenario-specific override wins over all other assumptions.
2. Decision-specific override applies only to that decision module.
3. User profile assumptions override general household defaults.
4. Household defaults override Atlas defaults.
5. Taiwan assumptions are preferred for Taiwan-specific financial modeling.
6. Global defaults are fallback only.

Codex must never silently invent assumptions. If an assumption cannot be resolved, the scenario must be invalid unless the field is explicitly optional.

---

## 10. Standard Assumption Categories

Each scenario may contain assumptions from the following categories.

### 10.1 Market Assumptions

Defined primarily in:

- `knowledge/market-assumptions.md`
- `knowledge/taiwan-financial-assumptions.md`

Examples:

- Equity return
- Bond return
- Cash return
- Real estate appreciation
- Volatility
- Correlation
- Dividend yield
- FX movement

### 10.2 Inflation Assumptions

Examples:

- General inflation
- Lifestyle inflation
- Education inflation
- Medical inflation
- Housing maintenance inflation

### 10.3 Income Assumptions

Examples:

- Monthly salary
- Annual bonus
- Salary growth
- Bonus reliability
- Job loss risk
- Side income
- FCN income
- Dividend income

### 10.4 Expense Assumptions

Examples:

- Base living expense
- Housing expense
- Insurance premium
- Car expense
- Travel expense
- Family support
- Child-related expense
- Emergency expense

### 10.5 Loan Assumptions

Examples:

- Mortgage rate
- Personal loan rate
- Loan term
- Grace period
- Early repayment rule
- Refinance rule
- Interest rate shock

### 10.6 Property Assumptions

Examples:

- Purchase price
- Sale price
- Transaction tax
- Agent fee
- Decoration cost
- Repair cost
- Rental income
- Vacancy rate
- Maintenance cost

### 10.7 Retirement Assumptions

Examples:

- Retirement age
- Retirement monthly expense
- Withdrawal rate
- Portfolio allocation during retirement
- Longevity age
- Healthcare cost

### 10.8 Tax Assumptions

Examples:

- Income tax
- Property transaction tax
- Dividend tax treatment
- Real estate holding cost

Tax model may be simplified in MVP, but simplification must be explicitly marked.

---

## 11. Decision Set Model

A scenario must distinguish between assumptions and decisions.

Assumptions describe the environment.

Decisions describe user-controllable choices.

Examples of decisions:

- Buy second home
- Sell first home
- Keep first home and rent it out
- Repay personal loan early
- Increase monthly ETF contribution
- Reduce cash reserve
- Buy car
- Change retirement age
- Change insurance coverage

Standard decision fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| DecisionId | UUID | Yes | Unique decision id |
| ScenarioId | UUID | Yes | Parent scenario |
| DecisionType | enum | Yes | HomeUpgrade, LoanRepayment, Retirement, etc. |
| EffectiveDate | date | Yes | When decision starts |
| Amount | decimal | Conditional | Decision amount if applicable |
| Recurrence | enum | Optional | OneTime, Monthly, Annual |
| ParametersJson | jsonb | Yes | Decision-specific parameters |
| IsUserControlled | bool | Yes | Must be true for decisions |

Decision rules:

1. Scenario decisions must be explicit and auditable.
2. A scenario may contain multiple decisions, but each must be separately modeled.
3. Decision Engine must be able to identify which decisions caused KPI changes.
4. Engine code must not mix decision inputs into generic assumption blobs without metadata.

---

## 12. Life Event Model

Life events are major events that affect financial projection.

Examples:

- Marriage
- Child birth
- Parent support
- Home purchase
- Home sale
- Car purchase
- Job change
- Income interruption
- Retirement
- Major medical expense
- Insurance payout

Standard life event fields:

| Field | Type | Required | Description |
|---|---:|---:|---|
| LifeEventId | UUID | Yes | Unique event id |
| ScenarioId | UUID | Yes | Parent scenario |
| EventType | enum | Yes | HomePurchase, ChildBirth, Retirement, etc. |
| EventDate | date | Yes | Event date |
| CashImpact | decimal | Optional | One-time cash impact |
| MonthlyCashflowImpact | decimal | Optional | Recurring cashflow impact |
| AssetImpact | decimal | Optional | Asset value impact |
| LiabilityImpact | decimal | Optional | Liability impact |
| Description | string | Optional | User-visible explanation |
| ParametersJson | jsonb | Optional | Event-specific parameters |

Rules:

1. Life events may be user-controlled or external.
2. Life events must affect one or more engines.
3. Life events must not be silently ignored.
4. Conflicting life events must trigger validation errors.

Example conflicts:

- Selling a property before it is purchased.
- Retiring before projection start date without retirement status set.
- Repaying a loan after the loan is already paid off.
- Renting out a property that has already been sold.

---

## 13. Scenario Input Snapshot

Every simulated scenario must preserve an immutable input snapshot.

The snapshot must include:

1. Financial state snapshot
2. Assumption snapshot
3. Decision snapshot
4. Life event snapshot
5. Engine version metadata
6. Formula version metadata
7. User profile reference
8. Calculation timestamp

Purpose:

- Auditability
- Reproducibility
- Comparison stability
- Debugging
- Codex implementation consistency

Rule:

A scenario result is invalid if its input snapshot cannot be reconstructed.

---

## 14. Scenario Output Model

Scenario output must be time-series based.

Required output categories:

1. Cashflow projection
2. Asset projection
3. Liability projection
4. Net worth projection
5. Liquidity projection
6. Debt burden projection
7. Investment projection
8. Retirement capital projection
9. Milestone achievement status
10. Risk warning timeline

Minimum monthly output fields:

| Field | Description |
|---|---|
| PeriodDate | Month represented |
| IncomeTotal | Total income for month |
| ExpenseTotal | Total expenses for month |
| NetCashflow | Income minus expenses |
| CashBalance | End-of-month cash balance |
| InvestmentBalance | End-of-month investment balance |
| PropertyValue | End-of-month property value |
| LiabilityBalance | End-of-month total debt |
| NetWorth | Assets minus liabilities |
| DebtServiceAmount | Monthly debt payment |
| DebtServiceRatio | Debt payment divided by income |
| EmergencyFundMonths | Cash divided by monthly core expense |
| RiskLevel | Green, Yellow, Orange, Red |

---

## 15. KPI Integration

Scenario outputs must feed standardized KPI definitions.

Canonical source:

- `knowledge/kpi-definitions.md`

Core KPIs:

1. Net Worth
2. Liquid Net Worth
3. Monthly Net Cashflow
4. Annual Net Cashflow
5. Emergency Fund Months
6. Debt-to-Asset Ratio
7. Debt Service Ratio
8. Housing Burden Ratio
9. Investment Asset Ratio
10. Retirement Readiness Ratio
11. Financial Independence Progress
12. Maximum Drawdown Tolerance
13. Scenario Safety Margin
14. Cashflow Survival Months
15. Goal Achievement Ratio

Rules:

- KPI values must be calculated from scenario outputs.
- KPI definitions must not be duplicated inside scenario logic.
- Scenario comparison must use KPI deltas.
- Dashboard must show both absolute KPI and delta from baseline.

---

## 16. Scenario Comparison Framework

Scenario comparison is central to Atlas.

Comparison types:

1. Scenario vs Baseline
2. Scenario vs Scenario
3. Scenario vs Stress Scenario
4. Scenario vs Goal Target
5. Scenario vs Threshold

Required comparison output:

| Output | Description |
|---|---|
| KPI Delta | Difference in KPIs |
| Timeline Delta | Difference over time |
| Risk Delta | Change in risk level |
| Cashflow Delta | Monthly/annual cashflow difference |
| Net Worth Delta | Projected wealth difference |
| Liquidity Delta | Cash reserve difference |
| Debt Delta | Debt burden difference |
| Retirement Delta | Retirement readiness difference |
| Decision Tradeoff | Qualitative explanation |

Comparison rules:

1. Baseline must be calculated using the same start date as comparison scenario.
2. Comparison scenarios must use compatible horizons.
3. If horizons differ, comparison must use overlapping period and show warning.
4. KPI deltas must state direction: better, worse, neutral, unknown.
5. A scenario with higher net worth but unacceptable liquidity risk must not be automatically ranked higher.

---

## 17. Scenario Scoring

Scenario scoring is handled by the Decision Engine, but the scenario must provide required inputs.

Recommended score dimensions:

1. Cashflow Safety
2. Liquidity Resilience
3. Debt Sustainability
4. Retirement Compatibility
5. Goal Alignment
6. Risk Exposure
7. Optionality Preservation
8. Psychological Burden Proxy
9. Upside Potential
10. Downside Protection

Default score range:

```text
0 to 100
```

Recommended classification:

| Score | Classification |
|---:|---|
| 85–100 | Strongly feasible |
| 70–84 | Feasible with monitoring |
| 55–69 | Conditionally feasible |
| 40–54 | High risk |
| 0–39 | Not recommended |

Rules:

1. Score must never be based on expected return alone.
2. Liquidity and debt risk must carry high weight.
3. Stress scenario failure must cap final recommendation score.
4. A scenario can be financially optimal but still not recommended if it violates user's decision principles.

---

## 18. Risk Level Model

Every scenario must produce a risk level.

Risk levels:

| Level | Meaning |
|---|---|
| Green | Healthy and sustainable |
| Yellow | Acceptable but needs monitoring |
| Orange | Fragile under moderate stress |
| Red | High risk or infeasible |

Risk indicators:

1. Negative monthly cashflow persists.
2. Emergency fund falls below required threshold.
3. Debt service ratio exceeds safe range.
4. Retirement capital gap widens.
5. Asset concentration becomes excessive.
6. Loan burden remains high for too long.
7. Stress scenario causes insolvency or forced asset sale.

Rules:

- Risk level must be explainable.
- Risk level must be time-sensitive, not only final-period based.
- A scenario may have a Green final outcome but Red interim risk. This must be shown.

---

## 19. Scenario Validation Rules

Required validation categories:

### 19.1 Structural Validation

- Scenario has name.
- Scenario has household id.
- Scenario has start and end date.
- Scenario type is valid.
- Scenario status is valid.

### 19.2 Assumption Validation

- Required assumptions are resolved.
- No negative rate unless explicitly allowed.
- Inflation assumptions are within reasonable bounds.
- Return assumptions are within configured limits.
- Correlation matrix must be valid when used.

### 19.3 Decision Validation

- Decision effective date is within scenario horizon.
- Decision amount is non-negative unless defined otherwise.
- Decision type parameters are valid.
- Decision does not conflict with existing financial state.

### 19.4 Life Event Validation

- Event date is within horizon.
- Event type is valid.
- Required event parameters exist.
- Events do not conflict chronologically.

### 19.5 Engine Readiness Validation

- Required engine inputs are available.
- Engine dependency order is valid.
- Scenario snapshot can be created.

---

## 20. Engine Execution Order

Default scenario engine execution order:

```text
1. AssumptionResolver
2. TimelineBuilder
3. LifeEventProcessor
4. CashFlowEngine
5. LoanEngine
6. InvestmentEngine
7. HomeUpgradeEngine
8. RetirementEngine
9. KPIEngine
10. RiskEngine
11. DecisionEngine
12. ScenarioComparisonEngine
```

Notes:

- Some engines may run iteratively when dependencies exist.
- Loan payment affects cashflow.
- Cashflow surplus may affect investment contribution.
- Home upgrade affects loan, cash, property, expense, and retirement feasibility.
- Retirement simulation depends on investment and cashflow outputs.

Codex must not implement engines as isolated calculators without a shared scenario timeline.

---

## 21. Deterministic, Stress, and Monte Carlo Modes

Atlas must support multiple simulation modes.

### 21.1 Deterministic Mode

Default MVP mode.

Characteristics:

- Uses fixed assumptions.
- Produces one projection path.
- Easy to explain.
- Used for primary comparison.

### 21.2 Stress Mode

Adverse deterministic path.

Characteristics:

- Uses defined stress overrides.
- Tests resilience.
- Produces survivability metrics.

### 21.3 Monte Carlo Mode

Future advanced mode.

Characteristics:

- Uses distributions, volatility, and correlation.
- Produces probability bands.
- Requires market assumption covariance model.
- Must be clearly separated from deterministic forecast.

MVP rule:

- Build data model to support Monte Carlo later.
- Do not implement full Monte Carlo until deterministic and stress engines are stable.

---

## 22. Scenario Template Model

Atlas should provide scenario templates to reduce input complexity.

Recommended templates:

1. Keep Current Path
2. Sell First Home and Upgrade
3. Keep First Home and Buy Second Home
4. Early Loan Repayment
5. Buy Car
6. Increase ETF Investment
7. Conservative Retirement
8. Aggressive Retirement
9. One-Year Income Shock
10. Interest Rate Shock
11. Market Crash
12. High Inflation

Template fields:

| Field | Description |
|---|---|
| TemplateId | Unique id |
| Name | User-visible name |
| ScenarioType | Default scenario type |
| RequiredInputs | Inputs user must provide |
| DefaultAssumptions | Template-level default assumptions |
| DecisionDefaults | Default decision set |
| LifeEventDefaults | Default life events |
| ValidationRules | Template-specific rules |

Templates must create draft scenarios, not final recommendations.

---

## 23. Database Design Guidance

Recommended database tables:

1. scenarios
2. scenario_versions
3. scenario_assumption_snapshots
4. scenario_decisions
5. scenario_life_events
6. scenario_engine_runs
7. scenario_monthly_results
8. scenario_kpi_results
9. scenario_risk_results
10. scenario_comparisons
11. scenario_templates

Important PostgreSQL guidance:

- Use `uuid` for identifiers.
- Use `jsonb` for structured decision parameters and assumption snapshots.
- Use normalized tables for high-query outputs such as monthly results and KPI results.
- Do not store everything only as JSON.
- Preserve immutable snapshots for simulated versions.
- Use indexes on `household_id`, `scenario_id`, `version`, `period_date`, and `scenario_type`.

---

## 24. API Design Guidance

Required API capabilities:

### 24.1 Scenario Management

- Create scenario
- Clone scenario
- Update draft scenario
- Validate scenario
- Archive scenario
- List scenarios
- Get scenario detail

### 24.2 Simulation

- Run scenario simulation
- Get engine run status
- Get scenario monthly results
- Get scenario KPI results
- Get scenario risk timeline

### 24.3 Comparison

- Compare scenario against baseline
- Compare multiple scenarios
- Get KPI delta summary
- Get tradeoff explanation

### 24.4 Templates

- List scenario templates
- Create scenario from template

API rules:

1. Simulation must be explicit. Saving a scenario must not automatically imply successful simulation.
2. Long-running simulations may need async job model later.
3. MVP may run synchronously if execution time is acceptable.
4. API response must clearly state whether results are fresh or stale.

---

## 25. Frontend Display Guidance

The UI must present scenarios as decision paths, not spreadsheets.

Required display sections:

1. Scenario summary
2. Key decision changes
3. Assumption changes
4. Timeline chart
5. KPI cards
6. Risk warnings
7. Baseline comparison
8. Cashflow projection
9. Net worth projection
10. Decision recommendation

Display rules:

- Always show baseline next to decision scenario when comparing.
- Highlight material changes only.
- Show warnings when assumptions are optimistic.
- Show liquidity risk before long-term upside.
- Do not hide interim negative cashflow.

---

## 26. Explanation Requirements

Every scenario recommendation must be explainable.

Required explanation fields:

1. Why this scenario is better or worse than baseline
2. Which KPIs improved
3. Which KPIs deteriorated
4. Main risk drivers
5. Required conditions for success
6. Failure triggers
7. Suggested monitoring KPIs

Example structure:

```text
This scenario improves long-term net worth but reduces liquidity during 2028–2031. It is feasible only if emergency fund remains above 12 months and debt service ratio stays below the configured warning threshold.
```

---

## 27. Business Rules

Scenario business rules:

1. A final recommendation must compare at least one scenario against baseline.
2. A scenario cannot be recommended if it fails critical liquidity requirements.
3. A stress scenario failure must be disclosed.
4. Long-term net worth improvement cannot override short-term insolvency.
5. User decision principles must override purely mathematical optimization.
6. Assumptions must be visible and auditable.
7. Scenario outputs must be reproducible.
8. Draft scenarios cannot be used as final recommendation inputs.
9. Any stale simulation must be clearly marked.
10. Every major life decision must identify cashflow, debt, investment, and retirement impact.

---

## 28. Formula Requirements

Scenario framework depends on formulas from other documents, but requires the following formula categories to exist:

1. Monthly net cashflow
2. Cumulative cash balance
3. Asset growth
4. Liability amortization
5. Net worth
6. Liquid net worth
7. Debt service ratio
8. Emergency fund months
9. Retirement capital requirement
10. Retirement readiness ratio
11. Scenario KPI delta
12. Risk level aggregation
13. Scenario score
14. Stress survivability months
15. Goal achievement ratio

If formulas are not yet formally defined, Codex must mark implementation as pending and avoid inventing business-critical calculations.

---

## 29. Testing Requirements

Scenario framework testing must include:

### 29.1 Unit Tests

- Assumption resolution order
- Scenario validation
- Decision conflict detection
- Life event processing
- KPI delta calculation
- Risk level mapping

### 29.2 Integration Tests

- Baseline simulation
- Home upgrade scenario
- Loan repayment scenario
- Stress scenario
- Scenario comparison
- Scenario versioning

### 29.3 Regression Tests

- Same input snapshot produces same output.
- Archived scenario remains unchanged after assumption update.
- Updated scenario marks previous results stale.

### 29.4 Edge Case Tests

- Negative cashflow
- Zero income period
- Loan fully repaid early
- Property sold during horizon
- Retirement before scenario start
- Horizon mismatch in comparison
- Missing assumption

---

## 30. Codex Implementation Rules

Codex must follow these rules:

1. Implement scenario domain model before scenario UI.
2. Implement deterministic scenario simulation before Monte Carlo.
3. Keep scenario inputs, snapshots, and outputs separate.
4. Never overwrite simulated snapshots.
5. Use explicit status transitions.
6. Use typed enums for scenario type and status.
7. Use value objects for money, rate, period, and horizon where appropriate.
8. Keep engine orchestration separate from individual engine calculations.
9. Make all formulas testable.
10. Do not hard-code Taiwan financial assumptions inside engine code. Use assumption providers.
11. Do not mix user financial facts with hypothetical scenario overrides.
12. Return validation errors instead of silently correcting critical inputs.
13. Always expose stale-result status.

---

## 31. Open Items and Follow-up Documents

The Scenario Framework depends on the following documents being complete or aligned:

Already expected:

- `docs/14-Scenario.md`
- `docs/13-DecisionEngine.md`
- `docs/08-CashFlowEngine.md`
- `docs/09-InvestmentEngine.md`
- `docs/10-LoanEngine.md`
- `docs/11-HomeUpgradeEngine.md`
- `docs/12-RetirementEngine.md`
- `knowledge/kpi-definitions.md`
- `knowledge/market-assumptions.md`
- `knowledge/risk-framework.md`
- `.codex/decision-rules.md`
- `.codex/financial-rules.md`

Recommended next documents:

1. `knowledge/scenario-templates.md`
2. `knowledge/stress-testing.md`
3. `knowledge/sensitivity-analysis.md`
4. `docs/14A-Scenario-API.md`
5. `docs/14B-Scenario-Database.md`
6. `docs/14C-Scenario-Testing.md`

---

## 32. Summary

A scenario in Project Atlas is a structured life-financial projection path. It combines current financial state, future assumptions, explicit decisions, life events, engine outputs, KPI results, and risk assessment.

The Scenario Framework ensures that every major financial decision can be simulated, compared, explained, tested, and reproduced.

This framework is mandatory for all decision modules. Any feature that evaluates a future financial path must use this scenario model instead of creating isolated ad hoc calculators.
