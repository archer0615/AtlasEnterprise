# Repository Ownership and Integration Matrices

## Purpose
This split document isolates repository ownership, persistence mapping, service integration, command, event, API, cache, and projection matrices from the parent Repository Catalog while preserving the parent as the canonical full specification.

## Source
- Parent specification: [Repository Catalog](../repository-catalog.md)

## Split Scope
- Repository Ownership Matrix
- Aggregate Repository Matrix
- Entity Repository Matrix
- Repository Database Matrix
- Repository EF Entity Matrix
- Repository Application Service Matrix
- Repository Domain Service Matrix
- Repository Command Matrix
- Repository Domain Event Matrix
- Repository API Matrix
- Repository Cache Matrix
- Repository Projection Matrix

## Ownership and Persistence

| Repository | Aggregate | Persistence Owner | Unit of Work |
|---|---|---|---|
| UserRepository | User | User | Required |
| HouseholdRepository | Household | Household | Required |
| AssetRepository | AssetPortfolio | AssetPortfolio | Required |
| LiabilityRepository | LiabilityPortfolio | LiabilityPortfolio | Required |
| GoalRepository | GoalPlan | GoalPlan | Required |
| PortfolioRepository | AssetPortfolio | AssetPortfolio | Required |
| LoanRepository | Loan | Loan | Required |
| PropertyRepository | Property | Property | Required |
| ScenarioRepository | Scenario | Scenario | Required |
| DecisionRepository | DecisionSession | DecisionSession | Required |
| NotificationRepository | Notification | Notification | Required |
| AuditRepository | Audit | Audit | Required |

## Aggregate, Entity, and Database Mapping

| Repository | Aggregate | Entity | Tables |
|---|---|---|---|
| UserRepository | User | User | users |
| HouseholdRepository | Household | Household | households |
| AssetRepository | AssetPortfolio | Asset | assets |
| LiabilityRepository | LiabilityPortfolio | Liability | liabilities |
| GoalRepository | GoalPlan | Goal | goals |
| PortfolioRepository | AssetPortfolio | Portfolio, Holding | portfolios, holdings |
| LoanRepository | Loan | Mortgage | loans, loan_payments |
| PropertyRepository | Property | Property | properties, property_valuations |
| ScenarioRepository | Scenario | Scenario | scenarios, scenario_results |
| DecisionRepository | DecisionSession | Decision, Recommendation | decisions, recommendations |
| NotificationRepository | Notification | Notification | notifications |
| AuditRepository | Audit | Audit | audit_log, command_history, event_history |

All repository database mappings target PostgreSQL in the `atlas` schema. EF entity mappings align with the aggregate/entity rows above.

## Service Integration

| Repository | Application Service | Domain Service |
|---|---|---|
| UserRepository | UserApplicationService | DecisionService |
| HouseholdRepository | BlueprintApplicationService | CashFlowService |
| AssetRepository | PortfolioApplicationService | PortfolioService |
| LiabilityRepository | LoanApplicationService | LoanService |
| GoalRepository | BlueprintApplicationService | RetirementService |
| PortfolioRepository | PortfolioApplicationService | AllocationService |
| LoanRepository | LoanApplicationService | LoanService |
| PropertyRepository | BlueprintApplicationService | PortfolioService |
| ScenarioRepository | ScenarioApplicationService | ScenarioService |
| DecisionRepository | DecisionApplicationService | DecisionService |
| NotificationRepository | NotificationApplicationService | ExplainabilityService |
| AuditRepository | AdministrationApplicationService | ExplainabilityService |

## Command and Event Integration

| Repository | Commands | Domain Events |
|---|---|---|
| UserRepository | User, Household commands through ownership validation | Identity and ownership events |
| HouseholdRepository | RecordIncome, RecordExpense | SalaryReceived, BonusReceived, ExpenseRecorded, PassiveIncomeReceived |
| AssetRepository | CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio | PortfolioCreated, SecurityPurchased, SecuritySold, PortfolioRebalanced, DividendDistributed |
| LiabilityRepository | CreateLoan, RecordLoanPayment, RefinanceLoan | LoanCreated, LoanPaymentMade, LoanRefinanced, LoanClosed |
| GoalRepository | UpdateRetirementPlan | RetirementPlanUpdated, RetirementGoalReached, RetirementWithdrawalStarted |
| PortfolioRepository | CreatePortfolio, BuySecurity, SellSecurity, RebalancePortfolio | PortfolioCreated, SecurityPurchased, SecuritySold, PortfolioRebalanced, DividendDistributed |
| LoanRepository | CreateLoan, RecordLoanPayment, RefinanceLoan | LoanCreated, LoanPaymentMade, LoanRefinanced, LoanClosed |
| PropertyRepository | PurchaseHome, SellHome, UpdatePropertyValue | HomePurchased, HomeSold, HomeValueUpdated, HomeUpgradeStarted, HomeUpgradeCompleted |
| ScenarioRepository | EvaluateScenario, ReplayScenario | ScenarioEvaluated, RuleEvaluated, HardConstraintTriggered, ScoreAdjusted, SnapshotCreated, AssumptionVersionLoaded, FormulaVersionLoaded, ReplayCompleted |
| DecisionRepository | AcceptRecommendation, RejectRecommendation | RecommendationGenerated, DecisionAccepted, DecisionRejected |
| NotificationRepository | Notification delivery commands from catalog-aligned handlers | DecisionAccepted, DecisionRejected, RecommendationGenerated |
| AuditRepository | All catalog commands | All catalog domain events |

## API, Cache, and Projection Control
Repository API, cache, and projection matrices are catalog-aligned for every repository. Each repository requires Household scope, authorization, cache, projection, and audit control.

## Extraction Rationale
This split separates integration-heavy repository matrices from method definitions and persistence rules. Readers can identify repository ownership, table mapping, service dependencies, command handling, event relationships, and API/cache/projection controls without scanning the full method catalog.

## Preservation Rule
Do not remove or rewrite the parent Repository Catalog body from this split. This child document is a navigation and ownership slice for the existing canonical content.
