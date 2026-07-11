> **PWA v1 Architecture Amendment (2026-07-11):** Any PostgreSQL, EF Core, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase mapping. Atlas v1 uses in-process TypeScript Application Use Cases and IndexedDB repositories. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# knowledge/financial-health-score.md

# Atlas Financial Health Score

Project Atlas / Life Financial Decision Operating System  
Document Type: Knowledge Specification  
Version: v1.0  
Status: Draft for Codex Implementation  
Last Updated: 2026-07-09

---

## 1. Purpose

Financial Health Score is the standardized 0–100 scoring model used by Project Atlas to evaluate a household's current financial resilience, liquidity, leverage, cashflow safety, protection adequacy, investment structure, and long-term goal readiness.

It is not a credit score, investment performance score, or net worth ranking system.

Its purpose is to answer:

> “At this point in life, is the household financially healthy enough to withstand risks and make major financial decisions?”

The score is used by:

- Dashboard summary
- Scenario comparison
- Decision Engine
- Cash Flow Engine
- Home Upgrade Engine
- Loan Engine
- Retirement Engine
- Insurance assessment
- Portfolio review
- Life Event readiness analysis

---

## 2. Scope

Financial Health Score evaluates the household as a financial decision unit.

It covers:

1. Liquidity safety
2. Cashflow stability
3. Debt pressure
4. Housing burden
5. Emergency reserve
6. Protection adequacy
7. Investment structure
8. Retirement readiness
9. Scenario resilience
10. Decision capacity

It does not directly evaluate:

- Individual stock picking skill
- Short-term investment return
- Trading performance
- Psychological satisfaction
- Lifestyle happiness
- Tax filing correctness
- Insurance product quality ranking
- Bank credit underwriting approval probability

---

## 3. Core Design Principles

### 3.1 Decision-Oriented, Not Vanity-Oriented

A higher score means the household has stronger capacity to absorb downside shocks and execute major decisions.

It does not mean the household is richer than others.

### 3.2 Household-Centric

The score evaluates family-level financial structure, not only the primary income earner.

### 3.3 Taiwan-Aware

The model must support Taiwan-specific assumptions, including:

- Mortgage structures
- Grace period risk
- Floating interest rate exposure
- Taiwan household income patterns
- Labor insurance / national pension context
- Taiwan tax and property holding assumptions
- Insurance market conventions
- ETF dividend preference behavior

### 3.4 Explainable

Every score must be explainable through:

- Category score
- Metric score
- Triggered rule
- Weight
- Direction of impact
- Recommended improvement

### 3.5 Scenario-Sensitive

The score must be calculated for both current state and projected scenarios.

Example:

- Current Financial Health Score: 72
- After buying second home: 58
- After selling first home: 76
- After early loan repayment: 69
- After retirement: 63

---

## 4. Score Scale

| Score Range | Level | Interpretation |
|---:|---|---|
| 90–100 | Excellent | Strong financial resilience; major decisions are generally feasible if goal-aligned. |
| 80–89 | Strong | Healthy structure with manageable risks; suitable for controlled expansion. |
| 70–79 | Stable | Acceptable baseline; decisions require stress testing and risk controls. |
| 60–69 | Watch | Some structural weakness; major commitments require mitigation first. |
| 50–59 | Fragile | Household can function but is vulnerable to income, market, or rate shocks. |
| 40–49 | High Risk | Material financial stress; avoid expansion unless risk is reduced. |
| 0–39 | Critical | Financial structure is unsafe; focus on stabilization, liquidity, and debt control. |

---

## 5. Total Score Formula

```text
FinancialHealthScore =
    LiquidityScore              * 0.18 +
    CashFlowScore               * 0.18 +
    DebtScore                   * 0.16 +
    HousingScore                * 0.12 +
    ProtectionScore             * 0.10 +
    InvestmentScore             * 0.10 +
    RetirementScore             * 0.08 +
    ScenarioResilienceScore     * 0.08
```

Total score must be rounded to one decimal place for calculation and to nearest integer for dashboard display.

Dashboard display rule:

```text
DisplayScore = ROUND(FinancialHealthScore, 0)
```

Internal engine rule:

```text
InternalScore = ROUND(FinancialHealthScore, 1)
```

---

## 6. Category Weights

| Category | Weight | Primary Question |
|---|---:|---|
| Liquidity | 18% | Can the household survive near-term cash shocks? |
| Cashflow | 18% | Is monthly cashflow structurally positive and stable? |
| Debt | 16% | Is total debt pressure manageable? |
| Housing | 12% | Is housing cost sustainable? |
| Protection | 10% | Is family downside risk protected? |
| Investment | 10% | Is asset allocation coherent and liquid enough? |
| Retirement | 8% | Is long-term independence on track? |
| Scenario Resilience | 8% | Can the plan survive adverse assumptions? |

Total weight must equal 100%.

---

## 7. Input Data Requirements

### 7.1 Household Profile

Required fields:

- HouseholdId
- PrimaryMemberAge
- SpouseAge, if applicable
- DependentsCount
- RetirementTargetAge
- BaseCurrency
- CountryCode
- PlanningHorizonYears

### 7.2 Income Inputs

Required fields:

- MonthlySalaryIncome
- AnnualBonusIncome
- DividendIncome
- InterestIncome
- RentalIncome
- StructuredProductIncome
- OtherRecurringIncome
- IncomeStabilityRating

### 7.3 Expense Inputs

Required fields:

- MonthlyLivingExpense
- MortgagePayment
- PersonalLoanPayment
- InsurancePremium
- ChildcareExpense
- ParentSupportExpense
- TransportationExpense
- DiscretionaryExpense
- OtherRecurringExpense

### 7.4 Asset Inputs

Required fields:

- CashBalance
- BankDepositBalance
- TWDInvestmentBalance
- USDInvestmentBalance
- StockMarketValue
- ETFMarketValue
- BondMarketValue
- FundMarketValue
- StructuredProductMarketValue
- RealEstateEstimatedValue
- RetirementAccountBalance
- OtherAssetValue

### 7.5 Liability Inputs

Required fields:

- MortgageOutstandingPrincipal
- PersonalLoanOutstandingPrincipal
- CreditCardRevolvingBalance
- CarLoanOutstandingPrincipal
- OtherDebtOutstandingPrincipal
- MortgageInterestRate
- PersonalLoanInterestRate
- RemainingMortgageYears
- RemainingPersonalLoanYears

### 7.6 Insurance Inputs

Required fields:

- LifeInsuranceCoverage
- MedicalInsuranceCoverage
- DisabilityCoverage
- CriticalIllnessCoverage
- AnnualPremium
- EmployerGroupCoverage
- CoverageExpiryAge

### 7.7 Scenario Inputs

Required fields:

- ScenarioType
- MajorPurchaseAmount
- NewDebtAmount
- InterestRateShock
- IncomeShock
- MarketDrawdown
- ExpenseShock
- RetirementWithdrawalRate

---

## 8. Liquidity Score

### 8.1 Purpose

Liquidity Score measures whether the household can survive short-term disruptions without forced selling, high-interest borrowing, or breaking long-term plans.

### 8.2 Formula

```text
LiquidityScore =
    EmergencyReserveScore   * 0.45 +
    CashRatioScore          * 0.25 +
    LiquidAssetScore        * 0.20 +
    CurrencyLiquidityScore  * 0.10
```

### 8.3 Emergency Reserve Months

```text
EmergencyReserveMonths = LiquidEmergencyAssets / MonthlyEssentialExpense
```

LiquidEmergencyAssets includes:

- Cash
- Demand deposits
- Money market fund
- Short-term time deposit maturing within 3 months

It excludes:

- Stocks
- ETFs
- FCN principal
- Real estate
- Retirement accounts with withdrawal penalty
- Insurance cash value unless surrender is explicitly allowed in scenario

MonthlyEssentialExpense includes:

- Living expense baseline
- Mortgage payment
- Personal loan payment
- Insurance premium
- Childcare / dependent support
- Minimum transportation cost

### 8.4 Emergency Reserve Score Mapping

| Months | Score |
|---:|---:|
| >= 12 | 100 |
| 9–11.99 | 90 |
| 6–8.99 | 80 |
| 4–5.99 | 65 |
| 3–3.99 | 50 |
| 1–2.99 | 30 |
| < 1 | 10 |

### 8.5 Cash Ratio Score

```text
CashRatio = CashAndDeposits / TotalNetWorth
```

| Cash Ratio | Score |
|---:|---:|
| 8%–25% | 100 |
| 5%–7.99% | 80 |
| 25.01%–35% | 75 |
| 3%–4.99% | 60 |
| 35.01%–50% | 55 |
| < 3% | 30 |
| > 50% | 45 |

Rationale:

- Too little cash increases liquidity risk.
- Too much cash may indicate underinvestment and inflation drag.

### 8.6 Liquid Asset Score

```text
LiquidAssetRatio = LiquidAssets / TotalAssets
```

LiquidAssets includes:

- Cash
- Deposits
- Publicly traded ETF
- Publicly traded stocks
- Bond funds
- Mutual funds with T+N liquidity

Excludes:

- Real estate
- Private assets
- Illiquid structured products before maturity
- Insurance cash value unless surrenderable

| Liquid Asset Ratio | Score |
|---:|---:|
| >= 50% | 100 |
| 35%–49.99% | 85 |
| 20%–34.99% | 70 |
| 10%–19.99% | 50 |
| < 10% | 25 |

### 8.7 Currency Liquidity Score

Currency liquidity evaluates whether short-term obligations and liquid assets are matched by currency.

```text
CurrencyLiquidityCoverage = LiquidAssetsInExpenseCurrency / SixMonthEssentialExpense
```

| Coverage | Score |
|---:|---:|
| >= 1.0 | 100 |
| 0.75–0.99 | 80 |
| 0.5–0.74 | 60 |
| 0.25–0.49 | 40 |
| < 0.25 | 20 |

---

## 9. Cashflow Score

### 9.1 Purpose

Cashflow Score measures whether the household generates sustainable surplus cash after recurring obligations.

### 9.2 Formula

```text
CashFlowScore =
    MonthlySurplusScore       * 0.40 +
    SavingsRateScore          * 0.25 +
    IncomeStabilityScore      * 0.20 +
    PassiveIncomeQualityScore * 0.15
```

### 9.3 Monthly Surplus

```text
MonthlyNetCashFlow = MonthlyRecurringIncome - MonthlyRecurringExpense
MonthlySurplusRatio = MonthlyNetCashFlow / MonthlyRecurringIncome
```

| Monthly Surplus Ratio | Score |
|---:|---:|
| >= 30% | 100 |
| 20%–29.99% | 85 |
| 10%–19.99% | 70 |
| 5%–9.99% | 55 |
| 0%–4.99% | 40 |
| < 0% | 15 |

### 9.4 Savings Rate Score

```text
SavingsRate = AnnualNetSavings / AnnualGrossIncome
```

| Savings Rate | Score |
|---:|---:|
| >= 35% | 100 |
| 25%–34.99% | 85 |
| 15%–24.99% | 70 |
| 8%–14.99% | 50 |
| 0%–7.99% | 30 |
| < 0% | 10 |

### 9.5 Income Stability Score

| Income Type | Score |
|---|---:|
| Stable salary + recurring bonus + diversified passive income | 100 |
| Stable salary + irregular bonus | 85 |
| Stable salary only | 75 |
| Variable income with 2+ year history | 60 |
| Variable income with weak visibility | 40 |
| Unstable / interrupted income | 20 |

### 9.6 Passive Income Quality Score

Passive income must be scored by durability, volatility, and capital impairment risk.

| Passive Income Source | Base Score |
|---|---:|
| Government / pension-like income | 100 |
| Broad ETF dividend income | 85 |
| Rental income with stable tenant | 80 |
| Bond interest income | 75 |
| Stock dividend income concentrated in few names | 60 |
| FCN coupon income | 45 |
| Option premium / trading income | 30 |

Adjustment rules:

```text
If passive income concentration > 50%, subtract 10.
If passive income depends on principal-at-risk product, subtract 15.
If passive income history < 12 months, subtract 10.
```

Score floor is 0.

---

## 10. Debt Score

### 10.1 Purpose

Debt Score evaluates leverage pressure and repayment safety.

### 10.2 Formula

```text
DebtScore =
    DebtToAssetScore       * 0.25 +
    DebtServiceRatioScore  * 0.35 +
    HighInterestDebtScore  * 0.20 +
    RateShockScore         * 0.20
```

### 10.3 Debt-to-Asset Ratio

```text
DebtToAssetRatio = TotalDebt / TotalAssets
```

| Ratio | Score |
|---:|---:|
| <= 20% | 100 |
| 20.01%–35% | 85 |
| 35.01%–50% | 70 |
| 50.01%–65% | 50 |
| 65.01%–80% | 30 |
| > 80% | 10 |

### 10.4 Debt Service Ratio

```text
DebtServiceRatio = MonthlyDebtPayment / MonthlyGrossIncome
```

| DSR | Score |
|---:|---:|
| <= 25% | 100 |
| 25.01%–35% | 80 |
| 35.01%–45% | 60 |
| 45.01%–55% | 35 |
| > 55% | 10 |

### 10.5 High-Interest Debt Score

High-interest debt includes:

- Credit card revolving balance
- Personal loan above configured threshold
- Unsecured debt with interest rate above mortgage rate by configured spread

```text
HighInterestDebtRatio = HighInterestDebt / TotalDebt
```

| Ratio | Score |
|---:|---:|
| 0% | 100 |
| 0.01%–5% | 80 |
| 5.01%–15% | 55 |
| 15.01%–30% | 30 |
| > 30% | 10 |

### 10.6 Rate Shock Score

```text
RateShockPaymentIncrease = PaymentAfterRateShock - CurrentPayment
RateShockBurdenRatio = RateShockPaymentIncrease / MonthlyNetCashFlowBeforeShock
```

Default rate shock:

```text
MortgageInterestRate + 1.5 percentage points
PersonalLoanInterestRate + 2.0 percentage points
```

| Rate Shock Burden Ratio | Score |
|---:|---:|
| <= 10% | 100 |
| 10.01%–25% | 80 |
| 25.01%–50% | 55 |
| 50.01%–100% | 25 |
| > 100% | 5 |

---

## 11. Housing Score

### 11.1 Purpose

Housing Score evaluates whether housing cost and housing-related leverage are sustainable.

### 11.2 Formula

```text
HousingScore =
    MortgageBurdenScore       * 0.40 +
    HousingConcentrationScore * 0.25 +
    LoanToValueScore          * 0.20 +
    UpgradeFlexibilityScore   * 0.15
```

### 11.3 Mortgage Burden Score

```text
MortgageBurdenRatio = MonthlyMortgagePayment / MonthlyGrossIncome
```

| Ratio | Score |
|---:|---:|
| <= 25% | 100 |
| 25.01%–35% | 80 |
| 35.01%–45% | 55 |
| 45.01%–55% | 30 |
| > 55% | 10 |

### 11.4 Housing Concentration Score

```text
HousingConcentrationRatio = RealEstateEquity / TotalNetWorth
```

| Ratio | Score |
|---:|---:|
| 20%–50% | 100 |
| 50.01%–65% | 80 |
| 65.01%–80% | 55 |
| > 80% | 25 |
| < 20% | 75 |

### 11.5 Loan-to-Value Score

```text
LTV = MortgageOutstandingPrincipal / PropertyEstimatedValue
```

| LTV | Score |
|---:|---:|
| <= 40% | 100 |
| 40.01%–60% | 85 |
| 60.01%–75% | 65 |
| 75.01%–85% | 40 |
| > 85% | 15 |

### 11.6 Upgrade Flexibility Score

Upgrade flexibility evaluates whether the household can execute housing transition without forced sale under poor timing.

Inputs:

- Bridge cash required
- Expected selling period
- Dual mortgage period
- Transaction tax and fee buffer
- Renovation buffer
- Emergency reserve after transaction

| Condition | Score |
|---|---:|
| Can hold both homes >= 12 months with emergency reserve intact | 100 |
| Can hold both homes 6–11 months with reserve intact | 80 |
| Can hold both homes 3–5 months with reserve pressure | 55 |
| Must sell first home quickly to close transaction | 30 |
| Transaction impossible without high-interest borrowing | 10 |

---

## 12. Protection Score

### 12.1 Purpose

Protection Score evaluates whether family financial continuity is protected against death, disability, major illness, and medical shocks.

### 12.2 Formula

```text
ProtectionScore =
    LifeCoverageScore        * 0.35 +
    DisabilityCoverageScore  * 0.25 +
    MedicalCoverageScore     * 0.20 +
    PremiumBurdenScore       * 0.20
```

### 12.3 Life Insurance Coverage Score

```text
RequiredLifeCoverage =
    OutstandingDebt +
    DependentSupportNeed +
    EducationNeed +
    FinalExpense +
    TransitionBuffer -
    LiquidAssetsAvailableForFamily

LifeCoverageRatio = TotalLifeCoverage / RequiredLifeCoverage
```

| Coverage Ratio | Score |
|---:|---:|
| >= 100% | 100 |
| 80%–99.99% | 80 |
| 60%–79.99% | 60 |
| 40%–59.99% | 35 |
| < 40% | 15 |

### 12.4 Disability Coverage Score

| Condition | Score |
|---|---:|
| Long-term disability coverage sufficient to replace >= 60% income | 100 |
| Partial disability coverage with clear benefit | 70 |
| Employer-only limited coverage | 45 |
| No meaningful disability coverage | 15 |

### 12.5 Medical Coverage Score

| Condition | Score |
|---|---:|
| Medical + cancer/critical illness + emergency reserve adequate | 100 |
| Medical coverage adequate but critical illness limited | 80 |
| Basic coverage only | 55 |
| Coverage unclear or outdated | 35 |
| No meaningful coverage | 10 |

### 12.6 Premium Burden Score

```text
PremiumBurdenRatio = AnnualInsurancePremium / AnnualGrossIncome
```

| Ratio | Score |
|---:|---:|
| 3%–8% | 100 |
| 8.01%–12% | 80 |
| 1%–2.99% | 65 |
| 12.01%–18% | 50 |
| > 18% | 25 |
| < 1% | 40 |

---

## 13. Investment Score

### 13.1 Purpose

Investment Score evaluates whether the investment structure supports long-term goals without excessive concentration, liquidity mismatch, or product complexity.

### 13.2 Formula

```text
InvestmentScore =
    AssetAllocationScore     * 0.30 +
    DiversificationScore     * 0.25 +
    LiquidityMismatchScore   * 0.20 +
    ProductComplexityScore   * 0.15 +
    CurrencyRiskScore        * 0.10
```

### 13.3 Asset Allocation Score

Asset allocation is scored against the household Investment Policy Statement.

```text
AllocationDeviation = SUM(ABS(CurrentWeight - TargetWeight)) / 2
```

| Deviation | Score |
|---:|---:|
| <= 5% | 100 |
| 5.01%–10% | 85 |
| 10.01%–20% | 65 |
| 20.01%–35% | 40 |
| > 35% | 15 |

### 13.4 Diversification Score

| Condition | Score |
|---|---:|
| Broad global diversification, no single issuer/product concentration | 100 |
| Moderate diversification, minor concentration | 80 |
| Heavy equity concentration or sector concentration | 55 |
| Few individual securities dominate portfolio | 30 |
| Single asset/product dominates investable assets | 10 |

### 13.5 Liquidity Mismatch Score

```text
LiquidityMismatchRatio = IlliquidOrLockedAssetsNeededWithin3Years / AssetsNeededWithin3Years
```

| Ratio | Score |
|---:|---:|
| 0% | 100 |
| 0.01%–20% | 80 |
| 20.01%–40% | 55 |
| 40.01%–60% | 30 |
| > 60% | 10 |

### 13.6 Product Complexity Score

| Product Structure | Score |
|---|---:|
| Transparent ETFs / deposits / plain bonds | 100 |
| Mutual funds and standard securities | 80 |
| Some structured products with limited allocation | 60 |
| Significant FCN / structured exposure | 40 |
| Highly leveraged or opaque products | 10 |

### 13.7 Currency Risk Score

```text
CurrencyMismatchRatio = ForeignCurrencyAssetsNeededForTWDGoals / TotalAssetsNeededForTWDGoals
```

| Ratio | Score |
|---:|---:|
| <= 25% | 100 |
| 25.01%–50% | 80 |
| 50.01%–70% | 55 |
| 70.01%–90% | 30 |
| > 90% | 15 |

---

## 14. Retirement Score

### 14.1 Purpose

Retirement Score evaluates whether the household is progressing toward long-term financial independence.

### 14.2 Formula

```text
RetirementScore =
    RetirementFundingRatioScore * 0.45 +
    ContributionRateScore       * 0.25 +
    WithdrawalSafetyScore       * 0.20 +
    RetirementFlexibilityScore  * 0.10
```

### 14.3 Retirement Funding Ratio

```text
RetirementFundingRatio = ProjectedRetirementAssets / RequiredRetirementAssets
```

| Ratio | Score |
|---:|---:|
| >= 120% | 100 |
| 100%–119.99% | 85 |
| 80%–99.99% | 65 |
| 60%–79.99% | 40 |
| < 60% | 15 |

### 14.4 Contribution Rate Score

```text
RetirementContributionRate = AnnualRetirementInvestment / AnnualGrossIncome
```

| Rate | Score |
|---:|---:|
| >= 20% | 100 |
| 15%–19.99% | 85 |
| 10%–14.99% | 65 |
| 5%–9.99% | 40 |
| < 5% | 20 |

### 14.5 Withdrawal Safety Score

```text
ProjectedWithdrawalRate = AnnualRetirementExpense / RetirementPortfolioAtRetirement
```

| Withdrawal Rate | Score |
|---:|---:|
| <= 3.0% | 100 |
| 3.01%–3.5% | 85 |
| 3.51%–4.0% | 70 |
| 4.01%–5.0% | 45 |
| > 5.0% | 15 |

### 14.6 Retirement Flexibility Score

| Condition | Score |
|---|---:|
| Can delay retirement, reduce spending, or use multiple income sources | 100 |
| Has at least two flexibility levers | 80 |
| Has one meaningful flexibility lever | 55 |
| Low flexibility | 30 |
| No visible flexibility | 10 |

---

## 15. Scenario Resilience Score

### 15.1 Purpose

Scenario Resilience Score evaluates how well the household survives adverse but plausible stress scenarios.

### 15.2 Required Stress Scenarios

The engine must calculate at minimum:

1. Income drops by 20% for 12 months
2. Market assets decline by 30%
3. Mortgage rate increases by 1.5 percentage points
4. Major unexpected expense equal to 6 months essential expense
5. Passive income drops by 50%
6. Housing transaction delayed by 12 months
7. Retirement return assumption reduced by 2 percentage points

### 15.3 Formula

```text
ScenarioResilienceScore =
    IncomeShockScore       * 0.20 +
    MarketShockScore       * 0.20 +
    RateShockScore         * 0.20 +
    ExpenseShockScore      * 0.15 +
    PassiveIncomeShockScore* 0.10 +
    HousingDelayScore      * 0.10 +
    RetirementShockScore   * 0.05
```

### 15.4 Generic Stress Score Mapping

For each stress scenario:

| Result | Score |
|---|---:|
| No negative cashflow; reserve remains >= 6 months | 100 |
| Temporary negative cashflow; reserve remains >= 3 months | 75 |
| Reserve falls below 3 months but no forced asset sale | 50 |
| Requires selling volatile assets or reducing debt payment flexibility | 25 |
| Requires high-interest borrowing, default risk, or plan failure | 5 |

---

## 16. Score Penalty Rules

Penalty rules are applied after weighted score calculation.

```text
FinalScore = MAX(0, WeightedScore - TotalPenalty)
```

### 16.1 Hard Penalties

| Condition | Penalty |
|---|---:|
| Monthly net cashflow is negative | -10 |
| Emergency reserve below 3 months | -8 |
| Debt service ratio above 50% | -10 |
| High-interest debt exists and is growing | -8 |
| Life insurance coverage below 50% of required need | -6 |
| Mortgage payment exceeds 45% of income | -8 |
| FCN or structured product exposure exceeds 30% of investable assets | -6 |
| Retirement funding ratio below 60% after age 45 | -8 |
| Scenario failure in 3 or more required stress tests | -12 |

### 16.2 Penalty Cap

```text
TotalPenaltyCap = 25
```

Total penalty must not exceed 25 points unless the household is in critical failure state.

### 16.3 Critical Failure Override

If any of the following is true, FinalScore must be capped at 49:

- Monthly cashflow negative for projected 6 consecutive months
- Emergency reserve below 1 month
- Debt service ratio above 60%
- Forced asset sale required to meet debt payment
- Housing transaction cannot close without unsecured borrowing

If two or more are true, FinalScore must be capped at 39.

---

## 17. Score Improvement Recommendations

The engine must generate recommendations based on the weakest score contributors.

### 17.1 Recommendation Priority

Recommendation priority order:

1. Critical safety issue
2. Liquidity issue
3. Debt pressure issue
4. Cashflow issue
5. Protection gap
6. Housing concentration issue
7. Investment structure issue
8. Retirement readiness issue
9. Optimization issue

### 17.2 Recommendation Format

Each recommendation must include:

- RecommendationId
- Category
- Severity
- CurrentMetric
- TargetMetric
- ImpactedScore
- EstimatedScoreImprovement
- ActionDescription
- Rationale
- RelatedDecisionRules

Example:

```json
{
  "recommendationId": "REC-LIQ-001",
  "category": "Liquidity",
  "severity": "High",
  "currentMetric": "Emergency reserve = 2.4 months",
  "targetMetric": "Emergency reserve >= 6 months",
  "impactedScore": "LiquidityScore",
  "estimatedScoreImprovement": 8.5,
  "actionDescription": "Increase cash reserve before taking additional mortgage debt.",
  "rationale": "Current reserve is below the safe threshold for a household with mortgage and dependents.",
  "relatedDecisionRules": ["DR-LIQ-001", "DR-HOME-003"]
}
```

---

## 18. Decision Engine Integration

Financial Health Score must not directly approve or reject decisions alone.

It informs Decision Engine through:

- Current baseline score
- Post-scenario score
- Score delta
- Category degradation
- Hard rule triggers
- Stress test failure count

### 18.1 Decision Use Rules

| Condition | Decision Interpretation |
|---|---|
| Current score >= 80 and post-decision score >= 70 | Decision may proceed if goal-aligned. |
| Current score >= 70 and post-decision score 60–69 | Decision requires mitigation. |
| Post-decision score < 60 | Decision should generally be delayed or redesigned. |
| Score drop >= 15 points | Requires explicit risk explanation. |
| Any critical failure override triggered | Decision is blocked unless classified as emergency. |

### 18.2 Scenario Comparison Rule

When comparing scenarios, the engine must display:

```text
ScenarioScoreDelta = ScenarioFinalScore - CurrentFinalScore
```

Interpretation:

| Delta | Meaning |
|---:|---|
| >= +10 | Material improvement |
| +3 to +9.9 | Moderate improvement |
| -2.9 to +2.9 | Financially neutral |
| -3 to -9.9 | Moderate deterioration |
| <= -10 | Material deterioration |

---

## 19. API Contract Requirements

The Financial Health Score calculation should be exposed through internal application services and REST API endpoints.

### 19.1 Calculate Current Score

```http
POST /api/financial-health-score/calculate
```

Request:

```json
{
  "householdId": "uuid",
  "asOfDate": "2026-07-09",
  "includeRecommendations": true,
  "includeExplainability": true
}
```

Response:

```json
{
  "householdId": "uuid",
  "asOfDate": "2026-07-09",
  "score": 72,
  "internalScore": 72.4,
  "level": "Stable",
  "categoryScores": [
    { "category": "Liquidity", "score": 68.5, "weight": 0.18 },
    { "category": "CashFlow", "score": 75.2, "weight": 0.18 }
  ],
  "penalties": [
    {
      "code": "PEN-LIQ-001",
      "description": "Emergency reserve below 3 months",
      "points": 8
    }
  ],
  "recommendations": [],
  "explainability": []
}
```

### 19.2 Calculate Scenario Score

```http
POST /api/financial-health-score/scenario
```

Request:

```json
{
  "householdId": "uuid",
  "scenarioId": "uuid",
  "includeRecommendations": true,
  "includeExplainability": true
}
```

Response must include:

- Current score
- Scenario score
- Score delta
- Category score delta
- Triggered penalties
- Failed stress tests
- Recommendations

---

## 20. Domain Model Requirements

### 20.1 Aggregate

Recommended aggregate:

```text
FinancialHealthAssessment
```

### 20.2 Entities

- FinancialHealthAssessment
- FinancialHealthCategoryScore
- FinancialHealthMetricScore
- FinancialHealthPenalty
- FinancialHealthRecommendation
- FinancialHealthStressResult
- FinancialHealthExplanation

### 20.3 Value Objects

- ScoreValue
- ScoreWeight
- ScoreLevel
- MetricValue
- RatioValue
- MoneyValue
- ScenarioDelta
- AssessmentPeriod

### 20.4 Enumerations

- FinancialHealthCategory
- FinancialHealthLevel
- PenaltySeverity
- RecommendationSeverity
- StressScenarioType
- ScoreCalculationMode

---

## 21. Database Design Requirements

Recommended tables:

```text
financial_health_assessments
financial_health_category_scores
financial_health_metric_scores
financial_health_penalties
financial_health_recommendations
financial_health_stress_results
financial_health_explanations
financial_health_score_versions
```

### 21.1 financial_health_assessments

Required columns:

- id
- household_id
- scenario_id nullable
- as_of_date
- score
- internal_score
- level
- weighted_score
- total_penalty
- calculation_version
- created_at

### 21.2 financial_health_category_scores

Required columns:

- id
- assessment_id
- category
- score
- weight
- weighted_contribution

### 21.3 financial_health_metric_scores

Required columns:

- id
- category_score_id
- metric_code
- metric_name
- raw_value
- normalized_score
- weight
- weighted_contribution
- unit

### 21.4 financial_health_penalties

Required columns:

- id
- assessment_id
- penalty_code
- severity
- points
- reason
- triggered_rule_id

### 21.5 financial_health_recommendations

Required columns:

- id
- assessment_id
- category
- severity
- current_metric
- target_metric
- estimated_score_improvement
- action_description
- rationale

---

## 22. Calculation Versioning

All calculations must be versioned.

```text
CalculationVersion = FHS-v1.0
```

Versioning is required because score formulas, assumptions, weights, and thresholds may evolve.

Historical assessments must remain reproducible.

Rules:

- Never overwrite previous score result.
- Store formula version with every assessment.
- Store assumptions snapshot or assumption version.
- If thresholds change, new scores must use new version.
- Dashboard may show latest score but history must retain old calculation version.

---

## 23. Explainability Requirements

Each score result must explain:

1. Why the final score is what it is
2. Which categories contributed most
3. Which metrics reduced score most
4. Which hard penalties were triggered
5. Which actions would improve the score most
6. Which scenario caused largest deterioration

Explanation format:

```json
{
  "type": "MetricImpact",
  "category": "Debt",
  "message": "Debt service ratio is 46%, which places the household in the high-burden zone.",
  "impact": -12.5,
  "relatedMetric": "DebtServiceRatio",
  "relatedRule": "DR-DEBT-002"
}
```

---

## 24. Testing Requirements

### 24.1 Unit Tests

Codex must implement unit tests for:

- Each category formula
- Each score mapping table
- Weighted total calculation
- Penalty application
- Critical failure override
- Scenario delta calculation
- Score level mapping
- Recommendation priority sorting

### 24.2 Boundary Tests

Boundary tests must cover exact threshold values.

Examples:

- Emergency reserve = 3.00 months
- Emergency reserve = 2.99 months
- DSR = 45.00%
- DSR = 45.01%
- Score = 69.49
- Score = 69.50

### 24.3 Scenario Tests

Required scenarios:

1. High income but high leverage
2. Low income but debt-free
3. Strong assets but low liquidity
4. High dividend income but concentrated portfolio
5. Housing upgrade with bridge risk
6. Retirement-ready but poor insurance protection
7. Negative monthly cashflow
8. FCN-heavy passive income structure

---

## 25. Business Rules

### BR-FHS-001: Score Must Be Explainable

The system must not return a final score without category scores and metric-level explanation.

### BR-FHS-002: Liquidity Has Priority Over Optimization

If emergency reserve is below 3 months, optimization recommendations must be lower priority than liquidity repair.

### BR-FHS-003: Negative Cashflow Cannot Be Masked by High Assets

If monthly cashflow is negative, the system must trigger penalty even if net worth is high.

### BR-FHS-004: Housing Upgrade Must Use Post-Decision Score

Home upgrade decisions must evaluate current score and post-upgrade scenario score.

### BR-FHS-005: Structured Product Income Must Be Risk-Adjusted

FCN or similar coupon income must not be treated as equivalent to salary, pension, rent, or broad ETF dividend income.

### BR-FHS-006: Score Is Not Decision Approval

Financial Health Score is an input to Decision Engine, not a final approval rule.

### BR-FHS-007: Critical Override Has Precedence

Critical failure override must cap score regardless of weighted category calculation.

### BR-FHS-008: All Thresholds Must Be Configurable

Weights, score mappings, penalty points, and shock assumptions must be externalized through configuration or versioned rule tables.

---

## 26. Formula Catalog

| Formula Code | Formula Name |
|---|---|
| FHS-F-001 | Financial Health Weighted Score |
| FHS-F-002 | Emergency Reserve Months |
| FHS-F-003 | Monthly Net Cashflow |
| FHS-F-004 | Monthly Surplus Ratio |
| FHS-F-005 | Savings Rate |
| FHS-F-006 | Debt-to-Asset Ratio |
| FHS-F-007 | Debt Service Ratio |
| FHS-F-008 | Mortgage Burden Ratio |
| FHS-F-009 | Loan-to-Value Ratio |
| FHS-F-010 | Required Life Coverage |
| FHS-F-011 | Life Coverage Ratio |
| FHS-F-012 | Allocation Deviation |
| FHS-F-013 | Retirement Funding Ratio |
| FHS-F-014 | Projected Withdrawal Rate |
| FHS-F-015 | Scenario Score Delta |

---

## 27. Decision Rule Catalog

| Rule Code | Rule Name |
|---|---|
| DR-FHS-001 | Require mitigation if post-decision score below 70 |
| DR-FHS-002 | Block decision if critical failure override is triggered |
| DR-FHS-003 | Flag material deterioration if score delta <= -10 |
| DR-FHS-004 | Require liquidity repair if reserve below 3 months |
| DR-FHS-005 | Require debt reduction plan if DSR above 45% |
| DR-FHS-006 | Require insurance review if life coverage below 60% |
| DR-FHS-007 | Require scenario stress test before housing upgrade |
| DR-FHS-008 | Require structured product concentration warning above 30% |
| DR-FHS-009 | Require retirement warning if funding ratio below 80% |
| DR-FHS-010 | Require cashflow warning if passive income quality score below 50 |

---

## 28. Dashboard Requirements

Dashboard must show:

- Final score
- Score level
- Score trend
- Top 3 strengths
- Top 3 weaknesses
- Top 3 recommendations
- Current vs scenario score comparison
- Category radar chart data
- Stress test result summary

Dashboard must not show only a number without explanation.

Minimum display model:

```json
{
  "score": 72,
  "level": "Stable",
  "trend": "Improving",
  "strengths": ["Investment assets are sufficient", "Income is stable"],
  "weaknesses": ["Debt service ratio is high", "Emergency reserve is low"],
  "recommendations": ["Increase emergency reserve", "Reduce high-interest debt"]
}
```

---

## 29. Implementation Notes for Codex

Codex should implement Financial Health Score as a pure domain calculation service first.

Recommended service structure:

```text
FinancialHealthScoreCalculator
LiquidityScoreCalculator
CashFlowScoreCalculator
DebtScoreCalculator
HousingScoreCalculator
ProtectionScoreCalculator
InvestmentScoreCalculator
RetirementScoreCalculator
ScenarioResilienceScoreCalculator
FinancialHealthPenaltyEvaluator
FinancialHealthRecommendationGenerator
FinancialHealthExplanationBuilder
```

Implementation rules:

- Keep formulas deterministic.
- Avoid embedding thresholds directly in random application code.
- Use decimal for money and ratios.
- Use strongly typed value objects where practical.
- Persist result snapshots.
- Do not recalculate historical score silently.
- Unit test all thresholds.

---

## 30. Open Questions

The following items require future refinement:

1. Final Taiwan-specific benchmark thresholds for household expense categories.
2. Whether insurance cash value can be included in liquidity under specific scenarios.
3. Whether owner-occupied home equity should count toward retirement funding.
4. How to score employer stock concentration if applicable.
5. How to model spouse income interruption.
6. Whether tax drag should be included in investment score or scenario score.
7. Whether score should include behavioral consistency in future versions.

---

## 31. Related Documents

This document depends on or should be cross-referenced with:

- docs/03-Formula.md
- docs/08-CashFlowEngine.md
- docs/10-LoanEngine.md
- docs/11-HomeUpgradeEngine.md
- docs/12-RetirementEngine.md
- docs/13-DecisionEngine.md
- docs/18-KPI.md
- knowledge/assumptions.md
- knowledge/cashflow.md
- knowledge/loan.md
- knowledge/insurance.md
- knowledge/portfolio.md
- knowledge/retirement.md
- knowledge/scoring-model.md
- knowledge/scenario-framework.md
- knowledge/constraint-rules.md
- knowledge/decision-rule-catalog.md
- knowledge/explainability-framework.md

---

## 32. Completion Checklist

This specification is complete when:

- Financial Health Score has category weights.
- Each category has formulas and thresholds.
- Penalty rules are defined.
- Critical override rules are defined.
- Scenario resilience is included.
- API contract is defined.
- Domain model requirements are defined.
- Database persistence requirements are defined.
- Explainability requirements are defined.
- Testing requirements are defined.
- Codex implementation notes are included.

