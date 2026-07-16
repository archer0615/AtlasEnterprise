# Application Service Catalog Entries

## Purpose
This split document isolates application service ownership entries from the parent Application Service Catalog while preserving the parent as the canonical source of truth.

## Source
- Parent specification: [Application Service Catalog](../application-service-catalog.md)

## Entry Contract
Each application service entry identifies its use cases, commands, queries, repositories, domain services, aggregates, entities, DTOs, APIs, workflow coordination, transaction boundary, idempotency, retry, timeout, compensation, observability, performance target, caching, and audit.

## Catalog Entries

| Application Service | Use Cases | Commands | Queries | Repositories | Domain Services | Aggregates | DTO | API |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| UserApplicationService | User account, household access, and actor context orchestration. | Identity commands and access queries | User, Household access | UserRepository, HouseholdRepository, AuditRepository | DecisionService | User, Household | UserDto, HouseholdDto | /api/v1/users, /api/v1/households |
| BlueprintApplicationService | Household blueprint, goals, retirement, property, and planning orchestration. | RecordIncome, RecordExpense, UpdateRetirementPlan, PurchaseHome, SellHome | Goal planning queries | HouseholdRepository, GoalRepository, PropertyRepository | CashFlowService, RetirementService, PortfolioService | Household, GoalPlan, RetirementPlan, Property | BlueprintDto, GoalDto, PropertyDto | /api/v1/blueprint, /api/v1/goals, /api/v1/properties |
| IPSApplicationService | Insurance and protection planning use case orchestration. | IssuePolicy, PayPremium | Policy and coverage queries | HouseholdRepository, ScenarioRepository, AuditRepository | RiskService, CashFlowService | Policy, Household, Scenario | PolicyDto, CoverageDto | /api/v1/ips, /api/v1/policies |
| DecisionApplicationService | Decision, recommendation, approval, rejection, and explanation orchestration. | AcceptRecommendation, RejectRecommendation | Decision history queries | DecisionRepository, ScenarioRepository, AuditRepository | DecisionService, ScoringService, ExplainabilityService | DecisionSession, Recommendation, Scenario | DecisionDto, RecommendationDto | /api/v1/decisions, /api/v1/recommendations |
| ScenarioApplicationService | Scenario evaluation, replay, comparison, and projection orchestration. | EvaluateScenario, ReplayScenario | Scenario query and replay query | ScenarioRepository, DecisionRepository, AuditRepository | ScenarioService, ScoringService, RiskService | Scenario, DecisionSession | ScenarioDto, ScenarioResultDto | /api/v1/scenarios |
| DashboardApplicationService | Dashboard read orchestration, cash flow overview, and projection summary. | RecordIncome, RecordExpense, UpdatePropertyValue | Dashboard summary queries | HouseholdRepository, PortfolioRepository, LoanRepository, GoalRepository, ScenarioRepository | CashFlowService, PortfolioService, LoanService, RetirementService | Household, AssetPortfolio, LiabilityPortfolio, GoalPlan, Scenario | DashboardDto, ProjectionSummaryDto | /api/v1/dashboard |
| NotificationApplicationService | Notification delivery, channel routing, and user-facing alert orchestration. | Notification delivery commands from catalog-aligned handlers | Notification inbox queries | NotificationRepository, DecisionRepository, AuditRepository | ExplainabilityService, DecisionService | Notification, DecisionSession, Recommendation | NotificationDto, NotificationPreferenceDto | /api/v1/notifications |
| ReportApplicationService | Report generation, export, and read-only evidence orchestration. | Report generation commands from catalog-aligned handlers | Report queries | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | ExplainabilityService, ScenarioService, PortfolioService, LoanService | Household, Scenario, DecisionSession, AssetPortfolio, Loan, Policy | ReportDto, ExportDto | /api/v1/reports |
| AdministrationApplicationService | Administration, audit, configuration, replay, and operational control orchestration. | ReplayScenario | Audit and configuration queries | AuditRepository, ScenarioRepository, NotificationRepository, HouseholdRepository | ExplainabilityService, ScenarioService | Configuration, Scenario, Notification, Household | AdministrationDto, AuditDto | /api/v1/administration, /api/v1/audit |

## Usage Rules
- Use this document to find the application service boundary for a cataloged use case.
- Application Services coordinate use cases but do not own domain invariants or database tables.
- Write operations keep the parent catalog transaction, consistency, concurrency, idempotency, retry, timeout, compensation, and audit rules.
