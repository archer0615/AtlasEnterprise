# Application Service Coordination Matrices

## Purpose
This split document isolates application service coordination matrices from the parent Application Service Catalog.

## Source
- Parent specification: [Application Service Catalog](../application-service-catalog.md)

## Coordination Scope
Application service coordination covers aggregate orchestration, repository access, domain service delegation, API exposure, workflow participation, scheduler or automation involvement, transaction rules, authorization, DTO mapping, and repository coordination.

## Service Ownership
| Application Service | Primary Responsibility | Typical Collaborators |
|---|---|---|
| UserApplicationService | Identity commands and access queries | UserRepository, HouseholdRepository |
| BlueprintApplicationService | Financial planning blueprint workflows | HouseholdRepository, GoalRepository, CashFlowService, RetirementService |
| IPSApplicationService | Investment policy and portfolio-facing use cases | PortfolioRepository, AssetRepository, PortfolioService, AllocationService |
| DecisionApplicationService | Recommendation acceptance and rejection workflows | DecisionRepository, ScenarioRepository, DecisionService, ScoringService, ExplainabilityService |
| ScenarioApplicationService | Scenario evaluation and replay workflows | ScenarioRepository, ScenarioService, ScoringService, RiskService |
| DashboardApplicationService | Read-model dashboard coordination | HouseholdRepository, PortfolioRepository, LoanRepository |
| NotificationApplicationService | Notification request orchestration | NotificationRepository |
| ReportApplicationService | Report generation and export coordination | AuditRepository and catalog-aligned read-model repositories |
| AdministrationApplicationService | Administrative replay and configuration workflows | AuditRepository, ScenarioRepository |

## Aggregate and Repository Coordination
| Application Service | Aggregates | Repositories | Domain Services |
|---|---|---|---|
| UserApplicationService | User, Household | UserRepository, HouseholdRepository | DecisionService |
| BlueprintApplicationService | FinancialProfile, Household, GoalPlan, Property | HouseholdRepository, GoalRepository, PropertyRepository | CashFlowService, RetirementService, PortfolioService |
| IPSApplicationService | AssetPortfolio | AssetRepository, PortfolioRepository | PortfolioService, AllocationService |
| DecisionApplicationService | DecisionSession, Recommendation, Scenario | DecisionRepository, ScenarioRepository | DecisionService, ScoringService, ExplainabilityService |
| ScenarioApplicationService | Scenario | ScenarioRepository | ScenarioService, ScoringService, RiskService |
| DashboardApplicationService | Household, AssetPortfolio, Loan, Property | HouseholdRepository, PortfolioRepository, LoanRepository, PropertyRepository | CashFlowService, PortfolioService, LoanService |
| NotificationApplicationService | Notification | NotificationRepository | ExplainabilityService |
| ReportApplicationService | Household, Scenario, DecisionSession, AssetPortfolio, Loan, Policy | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | ExplainabilityService, ScenarioService, PortfolioService, LoanService |
| AdministrationApplicationService | Configuration, Scenario | AuditRepository, ScenarioRepository | ScenarioService, ExplainabilityService |

## API and Workflow Coordination
| Application Service | API Surface | Workflow Role |
|---|---|---|
| UserApplicationService | /api/v1/users, /api/v1/households | Identity workflow |
| BlueprintApplicationService | /api/v1/blueprint | Planning workflow |
| IPSApplicationService | /api/v1/portfolios | Portfolio workflow |
| DecisionApplicationService | /api/v1/decisions, /api/v1/recommendations | Decision workflow |
| ScenarioApplicationService | /api/v1/scenarios | Scenario workflow |
| DashboardApplicationService | /api/v1/dashboard | Dashboard projection workflow |
| NotificationApplicationService | /api/v1/notifications | Notification workflow |
| ReportApplicationService | /api/v1/reports | Report workflow |
| AdministrationApplicationService | /api/v1/administration | Administration workflow |

## Execution Rules
- Application services coordinate use cases and must not own domain invariants.
- Transactions remain scoped to aggregate and repository coordination documented in the parent catalog.
- Authorization, DTO mapping, validation, audit, observability, and performance rules remain governed by the parent Application Service Catalog.
