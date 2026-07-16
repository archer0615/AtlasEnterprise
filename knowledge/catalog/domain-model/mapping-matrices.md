# Domain Model Mapping Matrices

## Purpose
This split document isolates cross-cutting mapping matrices from the parent Domain Model Catalog so readers can inspect domain ownership, persistence mapping, API exposure, and service coordination without scanning the full catalog.

## Source
- Parent specification: [Domain Model Catalog](../domain-model-catalog.md)

## Matrix Scope
The parent catalog keeps the full authoritative matrices. This document summarizes the same mapping concerns for independent review and navigation.

## Domain Hierarchy
| Domain | Bounded Context | Module | Model Type |
|---|---|---|---|
| Identity | Identity | Identity | Core Domain |
| Financial Profile | Financial Planning | Profile | Core Domain |
| Assets | Portfolio | Portfolio | Core Domain |
| Liabilities | Liability | Loan | Core Domain |
| Goals | Financial Planning | Goal | Core Domain |
| Portfolio | Portfolio | Portfolio | Core Domain |
| Property | Property | Property | Core Domain |
| Loan | Liability | Loan | Core Domain |
| Retirement | Financial Planning | Retirement | Core Domain |
| Scenario | Decision Intelligence | Scenario | Core Domain |
| Decision | Decision Intelligence | Decision | Core Domain |
| Reporting | Platform | Report | Supporting Domain |
| Platform | Platform | Platform | Supporting Domain |

## Persistence and API Mapping
| Domain Model | Repository | Database | API | DTO |
|---|---|---|---|---|
| Identity | UserRepository, HouseholdRepository | users, households | /api/v1/users, /api/v1/households | UserDto, HouseholdDto |
| Financial Profile | HouseholdRepository | households, cash_flow_items | /api/v1/blueprint, /api/v1/dashboard | BlueprintDto, DashboardDto |
| Assets | AssetRepository, PortfolioRepository | assets, portfolios, holdings | /api/v1/portfolios | PortfolioDto |
| Liabilities | LiabilityRepository, LoanRepository | liabilities, loans, loan_payments | /api/v1/loans | LoanDto |
| Goals | GoalRepository | goals | /api/v1/goals | GoalDto |
| Portfolio | PortfolioRepository, AssetRepository | portfolios, holdings | /api/v1/portfolios | PortfolioDto |
| Property | PropertyRepository | properties, property_valuations | /api/v1/properties | PropertyDto |
| Loan | LoanRepository | loans, loan_payments | /api/v1/loans | LoanDto |
| Retirement | GoalRepository, ScenarioRepository | goals, scenarios | /api/v1/goals, /api/v1/scenarios | RetirementDto, ScenarioDto |
| Scenario | ScenarioRepository | scenarios, scenario_results | /api/v1/scenarios | ScenarioDto, ScenarioResultDto |
| Decision | DecisionRepository, ScenarioRepository | decisions, recommendations | /api/v1/decisions, /api/v1/recommendations | DecisionDto, RecommendationDto |
| Reporting | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | report_views, audit_log | /api/v1/reports | ReportDto, ExportDto |
| Platform | AuditRepository, NotificationRepository, ScenarioRepository | configuration, notifications, audit_log | /api/v1/administration, /api/v1/notifications | AdministrationDto, NotificationDto |

## Service and Event Mapping
| Domain Model | Command | Domain Event | Application Service | Domain Service |
|---|---|---|---|---|
| Identity | Identity commands and access queries | Identity and access events | UserApplicationService | DecisionService |
| Financial Profile | RecordIncome, RecordExpense | SalaryReceived, BonusReceived, ExpenseRecorded, PassiveIncomeReceived | BlueprintApplicationService, DashboardApplicationService | CashFlowService |
| Assets | CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio | PortfolioCreated, SecurityPurchased, SecuritySold, PortfolioRebalanced, DividendDistributed | PortfolioApplicationService, DashboardApplicationService | PortfolioService, AllocationService |
| Liabilities | CreateLoan, RecordLoanPayment, RefinanceLoan | LoanCreated, LoanPaymentMade, LoanRefinanced, LoanClosed | LoanApplicationService, DashboardApplicationService | LoanService |
| Goals | UpdateRetirementPlan | RetirementPlanUpdated, RetirementGoalReached, RetirementWithdrawalStarted | GoalApplicationService, BlueprintApplicationService | RetirementService, CashFlowService |
| Scenario | EvaluateScenario, ReplayScenario | ScenarioEvaluated, RuleEvaluated, HardConstraintTriggered, ScoreAdjusted, SnapshotCreated, ReplayCompleted | ScenarioApplicationService | ScenarioService, ScoringService, RiskService |
| Decision | AcceptRecommendation, RejectRecommendation, EvaluateScenario | RecommendationGenerated, DecisionAccepted, DecisionRejected, ScenarioEvaluated | DecisionApplicationService | DecisionService, ScoringService, ExplainabilityService |
| Reporting | Report generation commands from catalog-aligned handlers | Report source events through read models | ReportApplicationService | ExplainabilityService, ScenarioService, PortfolioService, LoanService |
| Platform | ReplayScenario | SnapshotCreated, ReplayCompleted | AdministrationApplicationService, NotificationApplicationService | ExplainabilityService, ScenarioService |

## Usage Rules
- Use the parent Domain Model Catalog as the source of truth for complete matrices.
- Use this split document when validating repository, database, API, DTO, command, event, and service alignment across domain models.
- Keep matrix values synchronized with parent catalog entries when future split workers update catalog ownership.
