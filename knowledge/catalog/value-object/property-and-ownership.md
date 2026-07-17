> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Property and Ownership

Source: ../value-object-catalog.md

This split document preserves the canonical content from the parent catalog for focused review. The parent catalog remains the source of record.

# Property Catalog

| Value Object | Name | Type | Nullable | Default | Description | Validation | Business Meaning | JSON Name | PWA Runtime Mapping / Future Cloud Mapping | API Usage | Searchable | Sortable | Indexed | Encrypted | Auditable |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Money | Amount | Catalog type | No unless owner permits | None | Amount property for Money. | Required and type-safe. | Part of Money value equality. | amount | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Money | Currency | Catalog type | No unless owner permits | None | Currency property for Money. | Required and type-safe. | Part of Money value equality. | currency | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Currency | CurrencyCode | Catalog type | No unless owner permits | None | CurrencyCode property for Currency. | Required and type-safe. | Part of Currency value equality. | currencyCode | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Percentage | Value | Catalog type | No unless owner permits | None | Value property for Percentage. | Required and type-safe. | Part of Percentage value equality. | value | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| InterestRate | Rate | Catalog type | No unless owner permits | None | Rate property for InterestRate. | Required and type-safe. | Part of InterestRate value equality. | rate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| InterestRate | Compounding | Catalog type | No unless owner permits | None | Compounding property for InterestRate. | Required and type-safe. | Part of InterestRate value equality. | compounding | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | Line1 | Catalog type | No unless owner permits | None | Line1 property for Address. | Required and type-safe. | Part of Address value equality. | line1 | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | Line2 | Catalog type | No unless owner permits | None | Line2 property for Address. | Required and type-safe. | Part of Address value equality. | line2 | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | City | Catalog type | No unless owner permits | None | City property for Address. | Required and type-safe. | Part of Address value equality. | city | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | Region | Catalog type | No unless owner permits | None | Region property for Address. | Required and type-safe. | Part of Address value equality. | region | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | PostalCode | Catalog type | No unless owner permits | None | PostalCode property for Address. | Required and type-safe. | Part of Address value equality. | postalCode | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Address | Country | Catalog type | No unless owner permits | None | Country property for Address. | Required and type-safe. | Part of Address value equality. | country | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| DateRange | StartDate | Catalog type | No unless owner permits | None | StartDate property for DateRange. | Required and type-safe. | Part of DateRange value equality. | startDate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| DateRange | EndDate | Catalog type | No unless owner permits | None | EndDate property for DateRange. | Required and type-safe. | Part of DateRange value equality. | endDate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Allocation | Items | Catalog type | No unless owner permits | None | Items property for Allocation. | Required and type-safe. | Part of Allocation value equality. | items | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| Allocation | TotalPercentage | Catalog type | No unless owner permits | None | TotalPercentage property for Allocation. | Required and type-safe. | Part of Allocation value equality. | totalPercentage | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| RiskScore | Score | Catalog type | No unless owner permits | None | Score property for RiskScore. | Required and type-safe. | Part of RiskScore value equality. | score | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| RiskScore | Level | Catalog type | No unless owner permits | None | Level property for RiskScore. | Required and type-safe. | Part of RiskScore value equality. | level | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| CashFlowItem | Amount | Catalog type | No unless owner permits | None | Amount property for CashFlowItem. | Required and type-safe. | Part of CashFlowItem value equality. | amount | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| CashFlowItem | Category | Catalog type | No unless owner permits | None | Category property for CashFlowItem. | Required and type-safe. | Part of CashFlowItem value equality. | category | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| CashFlowItem | Date | Catalog type | No unless owner permits | None | Date property for CashFlowItem. | Required and type-safe. | Part of CashFlowItem value equality. | date | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| CashFlowItem | Direction | Catalog type | No unless owner permits | None | Direction property for CashFlowItem. | Required and type-safe. | Part of CashFlowItem value equality. | direction | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| TaxRate | Rate | Catalog type | No unless owner permits | None | Rate property for TaxRate. | Required and type-safe. | Part of TaxRate value equality. | rate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| TaxRate | Jurisdiction | Catalog type | No unless owner permits | None | Jurisdiction property for TaxRate. | Required and type-safe. | Part of TaxRate value equality. | jurisdiction | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| InflationRate | Rate | Catalog type | No unless owner permits | None | Rate property for InflationRate. | Required and type-safe. | Part of InflationRate value equality. | rate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| InflationRate | AssumptionVersion | Catalog type | No unless owner permits | None | AssumptionVersion property for InflationRate. | Required and type-safe. | Part of InflationRate value equality. | assumptionVersion | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| LoanTerm | Months | Catalog type | No unless owner permits | None | Months property for LoanTerm. | Required and type-safe. | Part of LoanTerm value equality. | months | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| LoanTerm | StartDate | Catalog type | No unless owner permits | None | StartDate property for LoanTerm. | Required and type-safe. | Part of LoanTerm value equality. | startDate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |
| LoanTerm | MaturityDate | Catalog type | No unless owner permits | None | MaturityDate property for LoanTerm. | Required and type-safe. | Part of LoanTerm value equality. | maturityDate | Owned column or JSON field | Request, response, event payload, projection | Conditional | Conditional | Conditional | Conditional | Through owner |

# Ownership Matrix

| Value Object | Aggregate | Entity | Repository | DTO |
|---|---|---|---|---|
| Money | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Goal, Portfolio, Holding, Property, Mortgage, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Currency | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Portfolio, Holding, Property, Mortgage, Scenario, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Percentage | AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario, DecisionSession, Policy | Portfolio, Holding, Goal, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| InterestRate | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| Address | Property, Household | Property, Household | Owner Repository | Command, Event, API, Projection DTO |
| DateRange | Policy, Scenario, GoalPlan, Loan, Property | Policy, Scenario, Goal, Mortgage, Property | Owner Repository | Command, Event, API, Projection DTO |
| Allocation | AssetPortfolio, GoalPlan, Scenario | Portfolio, Holding, Goal, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| RiskScore | Scenario, DecisionSession, AssetPortfolio, Policy | Scenario, Decision, Recommendation, Portfolio, Policy | Owner Repository | Command, Event, API, Projection DTO |
| CashFlowItem | Household, Scenario, Loan, Policy | Household, Scenario, Mortgage, Policy | Owner Repository | Command, Event, API, Projection DTO |
| TaxRate | Scenario, DecisionSession, GoalPlan | Scenario, Decision, Goal | Owner Repository | Command, Event, API, Projection DTO |
| InflationRate | Scenario, GoalPlan, RetirementPlan | Scenario, Goal | Owner Repository | Command, Event, API, Projection DTO |
| LoanTerm | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |

# Value Object Aggregate Matrix

| Value Object | Aggregate | Entity | Repository | DTO |
|---|---|---|---|---|
| Money | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Goal, Portfolio, Holding, Property, Mortgage, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Currency | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Portfolio, Holding, Property, Mortgage, Scenario, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Percentage | AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario, DecisionSession, Policy | Portfolio, Holding, Goal, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| InterestRate | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| Address | Property, Household | Property, Household | Owner Repository | Command, Event, API, Projection DTO |
| DateRange | Policy, Scenario, GoalPlan, Loan, Property | Policy, Scenario, Goal, Mortgage, Property | Owner Repository | Command, Event, API, Projection DTO |
| Allocation | AssetPortfolio, GoalPlan, Scenario | Portfolio, Holding, Goal, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| RiskScore | Scenario, DecisionSession, AssetPortfolio, Policy | Scenario, Decision, Recommendation, Portfolio, Policy | Owner Repository | Command, Event, API, Projection DTO |
| CashFlowItem | Household, Scenario, Loan, Policy | Household, Scenario, Mortgage, Policy | Owner Repository | Command, Event, API, Projection DTO |
| TaxRate | Scenario, DecisionSession, GoalPlan | Scenario, Decision, Goal | Owner Repository | Command, Event, API, Projection DTO |
| InflationRate | Scenario, GoalPlan, RetirementPlan | Scenario, Goal | Owner Repository | Command, Event, API, Projection DTO |
| LoanTerm | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |

# Value Object Entity Matrix

| Value Object | Aggregate | Entity | Repository | DTO |
|---|---|---|---|---|
| Money | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Goal, Portfolio, Holding, Property, Mortgage, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Currency | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Portfolio, Holding, Property, Mortgage, Scenario, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Percentage | AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario, DecisionSession, Policy | Portfolio, Holding, Goal, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| InterestRate | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| Address | Property, Household | Property, Household | Owner Repository | Command, Event, API, Projection DTO |
| DateRange | Policy, Scenario, GoalPlan, Loan, Property | Policy, Scenario, Goal, Mortgage, Property | Owner Repository | Command, Event, API, Projection DTO |
| Allocation | AssetPortfolio, GoalPlan, Scenario | Portfolio, Holding, Goal, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| RiskScore | Scenario, DecisionSession, AssetPortfolio, Policy | Scenario, Decision, Recommendation, Portfolio, Policy | Owner Repository | Command, Event, API, Projection DTO |
| CashFlowItem | Household, Scenario, Loan, Policy | Household, Scenario, Mortgage, Policy | Owner Repository | Command, Event, API, Projection DTO |
| TaxRate | Scenario, DecisionSession, GoalPlan | Scenario, Decision, Goal | Owner Repository | Command, Event, API, Projection DTO |
| InflationRate | Scenario, GoalPlan, RetirementPlan | Scenario, Goal | Owner Repository | Command, Event, API, Projection DTO |
| LoanTerm | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |

# Value Object Repository Matrix

| Value Object | Aggregate | Entity | Repository | DTO |
|---|---|---|---|---|
| Money | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Goal, Portfolio, Holding, Property, Mortgage, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Currency | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Portfolio, Holding, Property, Mortgage, Scenario, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Percentage | AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario, DecisionSession, Policy | Portfolio, Holding, Goal, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| InterestRate | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| Address | Property, Household | Property, Household | Owner Repository | Command, Event, API, Projection DTO |
| DateRange | Policy, Scenario, GoalPlan, Loan, Property | Policy, Scenario, Goal, Mortgage, Property | Owner Repository | Command, Event, API, Projection DTO |
| Allocation | AssetPortfolio, GoalPlan, Scenario | Portfolio, Holding, Goal, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| RiskScore | Scenario, DecisionSession, AssetPortfolio, Policy | Scenario, Decision, Recommendation, Portfolio, Policy | Owner Repository | Command, Event, API, Projection DTO |
| CashFlowItem | Household, Scenario, Loan, Policy | Household, Scenario, Mortgage, Policy | Owner Repository | Command, Event, API, Projection DTO |
| TaxRate | Scenario, DecisionSession, GoalPlan | Scenario, Decision, Goal | Owner Repository | Command, Event, API, Projection DTO |
| InflationRate | Scenario, GoalPlan, RetirementPlan | Scenario, Goal | Owner Repository | Command, Event, API, Projection DTO |
| LoanTerm | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |

# Value Object DTO Matrix

| Value Object | Aggregate | Entity | Repository | DTO |
|---|---|---|---|---|
| Money | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Goal, Portfolio, Holding, Property, Mortgage, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Currency | Household, AssetPortfolio, LiabilityPortfolio, Loan, Property, GoalPlan | Asset, Liability, Portfolio, Holding, Property, Mortgage, Scenario, Policy | Owner Repository | Command, Event, API, Projection DTO |
| Percentage | AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario, DecisionSession, Policy | Portfolio, Holding, Goal, Scenario, Decision, Recommendation, Policy | Owner Repository | Command, Event, API, Projection DTO |
| InterestRate | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| Address | Property, Household | Property, Household | Owner Repository | Command, Event, API, Projection DTO |
| DateRange | Policy, Scenario, GoalPlan, Loan, Property | Policy, Scenario, Goal, Mortgage, Property | Owner Repository | Command, Event, API, Projection DTO |
| Allocation | AssetPortfolio, GoalPlan, Scenario | Portfolio, Holding, Goal, Scenario | Owner Repository | Command, Event, API, Projection DTO |
| RiskScore | Scenario, DecisionSession, AssetPortfolio, Policy | Scenario, Decision, Recommendation, Portfolio, Policy | Owner Repository | Command, Event, API, Projection DTO |
| CashFlowItem | Household, Scenario, Loan, Policy | Household, Scenario, Mortgage, Policy | Owner Repository | Command, Event, API, Projection DTO |
| TaxRate | Scenario, DecisionSession, GoalPlan | Scenario, Decision, Goal | Owner Repository | Command, Event, API, Projection DTO |
| InflationRate | Scenario, GoalPlan, RetirementPlan | Scenario, Goal | Owner Repository | Command, Event, API, Projection DTO |
| LoanTerm | Loan, LiabilityPortfolio, Scenario | Mortgage, Liability, Scenario | Owner Repository | Command, Event, API, Projection DTO |

