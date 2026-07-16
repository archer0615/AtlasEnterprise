# Bounded Context Ownership Matrices

## Purpose
This split document isolates ownership and boundary-control matrices from the parent Bounded Context Catalog.

## Source
- Parent specification: [Bounded Context Catalog](../bounded-context-catalog.md)

## Ownership Scope
Bounded context ownership records the domain, aggregate, repository, command, domain event, application service, API, database, workflow, and integration responsibilities for each context.

## Context Ownership
| Bounded Context | Domain | Aggregate | Repository | Application Service | API | Database |
|---|---|---|---|---|---|---|
| Identity | Identity | User, Household | UserRepository, HouseholdRepository | UserApplicationService | /api/v1/users, /api/v1/households | users, households |
| Financial Profile | Financial Profile | FinancialProfile, Household, GoalPlan | HouseholdRepository, GoalRepository | BlueprintApplicationService, DashboardApplicationService, GoalApplicationService | /api/v1/blueprint, /api/v1/goals, /api/v1/dashboard | households, cash_flow_items, goals |
| Investment | Investment | AssetPortfolio | AssetRepository, PortfolioRepository | PortfolioApplicationService | /api/v1/portfolios | assets, portfolios, holdings |
| Cash Flow | Cash Flow | Household, Loan, Policy | HouseholdRepository, LoanRepository | DashboardApplicationService, BlueprintApplicationService | /api/v1/dashboard | cash_flow_items, loan_payments |
| Loan | Loan | Loan, LiabilityPortfolio | LoanRepository, LiabilityRepository | LoanApplicationService | /api/v1/loans | loans, loan_payments, liabilities |
| Property | Property | Property | PropertyRepository | BlueprintApplicationService, DashboardApplicationService | /api/v1/properties | properties, property_valuations |
| Retirement | Retirement | RetirementPlan, GoalPlan, Scenario | GoalRepository, ScenarioRepository | BlueprintApplicationService, ScenarioApplicationService, GoalApplicationService | /api/v1/goals, /api/v1/scenarios | goals, scenarios |
| Decision | Decision | DecisionSession, Recommendation, Scenario | DecisionRepository, ScenarioRepository | DecisionApplicationService | /api/v1/decisions, /api/v1/recommendations | decisions, recommendations |
| Scenario | Scenario | Scenario, DecisionSession | ScenarioRepository, DecisionRepository | ScenarioApplicationService, AdministrationApplicationService | /api/v1/scenarios | scenarios, scenario_results |
| Reporting | Reporting | Household, Scenario, DecisionSession, AssetPortfolio, Loan, Policy | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | ReportApplicationService | /api/v1/reports | report_views, audit_log |
| Platform | Platform | Configuration, Notification, Policy, Scenario | AuditRepository, NotificationRepository, ScenarioRepository | AdministrationApplicationService, NotificationApplicationService | /api/v1/administration, /api/v1/audit, /api/v1/notifications | configuration, notifications, audit_log |

## Boundary Control
| Bounded Context | Mapping Focus | Ownership | Boundary Control |
|---|---|---|---|
| Identity | User, Household, repositories, commands, and identity events | Identity | Published language and ACL when crossing boundary |
| Financial Profile | Financial profile, household, goal plan, cash-flow commands, and planning events | Financial Profile | Published language and ACL when crossing boundary |
| Investment | Asset portfolio, portfolio repositories, trading commands, and portfolio events | Investment | Published language and ACL when crossing boundary |
| Cash Flow | Household, loan, policy, income and expense commands, and payment events | Cash Flow | Published language and ACL when crossing boundary |
| Loan | Loan, liability portfolio, loan repositories, payment and refinance commands | Loan | Published language and ACL when crossing boundary |
| Property | Property repository, purchase/sell/update commands, and home events | Property | Published language and ACL when crossing boundary |
| Retirement | Retirement plan, goal plan, scenario, retirement commands, and scenario events | Retirement | Published language and ACL when crossing boundary |
| Decision | Decision session, recommendation, scenario, acceptance/rejection commands | Decision | Published language and ACL when crossing boundary |
| Scenario | Scenario, decision session, evaluation/replay commands, and replay events | Scenario | Published language and ACL when crossing boundary |
| Reporting | Reporting read models, report commands, source events, and audit repository | Reporting | Published language and ACL when crossing boundary |
| Platform | Configuration, notification, audit, replay commands, and platform events | Platform | Published language and ACL when crossing boundary |

## Usage Rules
- Context ownership must stay aligned with aggregate, repository, command, event, service, API, and database catalogs.
- Boundary crossings use published language and anti-corruption controls defined in the parent catalog.
- The parent Bounded Context Catalog remains authoritative for full matrices and context map details.
