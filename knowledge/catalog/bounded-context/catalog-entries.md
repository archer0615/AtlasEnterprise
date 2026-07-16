# Bounded Context Catalog Entries

## Purpose
This split document isolates bounded context ownership entries from the parent Bounded Context Catalog while preserving the parent as the canonical source of truth.

## Source
- Parent specification: [Bounded Context Catalog](../bounded-context-catalog.md)

## Entry Contract
Each bounded context entry identifies its domain language boundary, aggregate ownership, repository ownership, application service ownership, API ownership, database ownership, integration boundary, published language, authorization, audit, security, performance, scalability, and version.

## Catalog Entries

| Bounded Context | Purpose | Owned Aggregates | Owned Repositories | Owned Application Services | API Ownership | Database Ownership |
| --- | --- | --- | --- | --- | --- | --- |
| Identity | Authentication and accounts. | User, Household | UserRepository, HouseholdRepository | UserApplicationService | /api/v1/users, /api/v1/households | users, households |
| Financial Profile | User financial data. | FinancialProfile, Household, GoalPlan | HouseholdRepository, GoalRepository | BlueprintApplicationService, DashboardApplicationService, GoalApplicationService | /api/v1/blueprint, /api/v1/goals, /api/v1/dashboard | households, cash_flow_items, goals |
| Investment | Portfolio and IPS. | AssetPortfolio | AssetRepository, PortfolioRepository | PortfolioApplicationService | /api/v1/portfolios | assets, portfolios, holdings |
| Cash Flow | Income and expenses. | Household, Loan, Policy | HouseholdRepository, LoanRepository | DashboardApplicationService, BlueprintApplicationService | /api/v1/dashboard | cash_flow_items, loan_payments |
| Loan | Mortgages and loans. | Loan, LiabilityPortfolio | LoanRepository, LiabilityRepository | LoanApplicationService | /api/v1/loans | loans, loan_payments, liabilities |
| Property | Real estate. | Property | PropertyRepository | BlueprintApplicationService, DashboardApplicationService | /api/v1/properties | properties, property_valuations |
| Retirement | Retirement planning. | RetirementPlan, GoalPlan, Scenario | GoalRepository, ScenarioRepository | BlueprintApplicationService, ScenarioApplicationService, GoalApplicationService | /api/v1/goals, /api/v1/scenarios | goals, scenarios |
| Decision | Decision engine. | DecisionSession, Recommendation, Scenario | DecisionRepository, ScenarioRepository | DecisionApplicationService | /api/v1/decisions, /api/v1/recommendations | decisions, recommendations |
| Scenario | Simulation. | Scenario, DecisionSession | ScenarioRepository, DecisionRepository | ScenarioApplicationService, AdministrationApplicationService | /api/v1/scenarios | scenarios, scenario_results |
| Reporting | Reports. | Household, Scenario, DecisionSession, AssetPortfolio, Loan, Policy | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | ReportApplicationService | /api/v1/reports | report_views, audit_log |
| Platform | Configuration, Policy, Audit. | Configuration, Notification, Policy, Scenario | AuditRepository, NotificationRepository, ScenarioRepository | AdministrationApplicationService, NotificationApplicationService | /api/v1/administration, /api/v1/audit, /api/v1/notifications | configuration, notifications, audit_log |

## Usage Rules
- Use this document to find which bounded context owns a model, repository, service, API, or database surface.
- Cross-context access must still use API, Domain Event, read model, or published language contracts from the parent catalog.
- Do not infer direct mutation rights across bounded contexts from shared aggregate names.
