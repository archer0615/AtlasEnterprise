# Service Catalog Communication and Transactions

Document Path: knowledge/catalog/service-catalog/communication-and-transactions.md

Parent Specification: knowledge/catalog/service-catalog.md

# Purpose

This split document summarizes the communication and transaction portions of the Service Catalog. It keeps the service interaction rules readable while preserving the parent catalog as the canonical source.

# Communication Matrix

| Service | Category | Dependency | Consumer | Control |
|---|---|---|---|---|
| DecisionApplicationService | Application Service | DecisionService, ScoringService, ExplainabilityService, DecisionRepository, ScenarioRepository | API, Workflow, Command Handler | Authorized, observable, audited, and catalog-aligned |
| ScenarioApplicationService | Application Service | ScenarioService, ScoringService, RiskService, ScenarioRepository, DecisionRepository | API, Scheduler, Workflow | Authorized, observable, audited, and catalog-aligned |
| GoalApplicationService | Application Service | GoalRepository, RetirementService, CashFlowService | API, Workflow | Authorized, observable, audited, and catalog-aligned |
| PortfolioApplicationService | Application Service | PortfolioRepository, PortfolioService, AllocationService | API, Workflow | Authorized, observable, audited, and catalog-aligned |
| LoanApplicationService | Application Service | LoanRepository, LoanService | API, Workflow | Authorized, observable, audited, and catalog-aligned |
| DashboardApplicationService | Application Service | CashFlowService, PortfolioService, LoanService, RetirementService, HouseholdRepository, PortfolioRepository, LoanRepository | API, Query Handler | Authorized, observable, audited, and catalog-aligned |
| UserApplicationService | Application Service | UserRepository, HouseholdRepository, AuditRepository | API | Authorized, observable, audited, and catalog-aligned |
| BlueprintApplicationService | Application Service | HouseholdRepository, GoalRepository, PropertyRepository, CashFlowService, RetirementService, PortfolioService | API, Workflow | Authorized, observable, audited, and catalog-aligned |
| IPSApplicationService | Application Service | RiskService, CashFlowService, HouseholdRepository, ScenarioRepository | API, Workflow | Authorized, observable, audited, and catalog-aligned |
| NotificationApplicationService | Application Service | NotificationRepository, DecisionRepository, AuditRepository, ExplainabilityService | API, Background Job | Authorized, observable, audited, and catalog-aligned |
| ReportApplicationService | Application Service | HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository | API, Background Job | Authorized, observable, audited, and catalog-aligned |
| AdministrationApplicationService | Application Service | AuditRepository, ScenarioRepository, NotificationRepository, HouseholdRepository, ScenarioService | API, Scheduler | Authorized, observable, audited, and catalog-aligned |
| DecisionService | Domain Service | DecisionRepository, ScenarioRepository, Rule Engine | Application Service, Command Handler | Authorized, observable, audited, and catalog-aligned |
| ScoringService | Domain Service | ScenarioRepository, DecisionRepository, Rule Engine, Calculation Engine | ScenarioService, DecisionService | Authorized, observable, audited, and catalog-aligned |
| CashFlowService | Domain Service | HouseholdRepository, LoanRepository, Calculation Engine, Projection Engine | Application Service, Domain Service | Authorized, observable, audited, and catalog-aligned |
| RetirementService | Domain Service | GoalRepository, ScenarioRepository, Projection Engine, Simulation Engine, Optimization Engine | Application Service, Domain Service | Authorized, observable, audited, and catalog-aligned |
| AllocationService | Domain Service | PortfolioRepository, GoalRepository, ScenarioRepository, Optimization Engine | PortfolioApplicationService, ScenarioService | Authorized, observable, audited, and catalog-aligned |
| ExplainabilityService | Domain Service | DecisionRepository, ScenarioRepository, NotificationRepository, AuditRepository, Rule Engine | Application Service, ReportApplicationService | Authorized, observable, audited, and catalog-aligned |
| PortfolioService | Domain Service | AssetRepository, PortfolioRepository, PropertyRepository, Calculation Engine, Projection Engine | Application Service, Domain Service | Authorized, observable, audited, and catalog-aligned |
| LoanService | Domain Service | LoanRepository, LiabilityRepository, Calculation Engine, Optimization Engine, Projection Engine | LoanApplicationService, DashboardApplicationService | Authorized, observable, audited, and catalog-aligned |
| ScenarioService | Domain Service | ScenarioRepository, DecisionRepository, Simulation Engine, Projection Engine, Rule Engine | ScenarioApplicationService, AdministrationApplicationService | Authorized, observable, audited, and catalog-aligned |
| RiskService | Domain Service | ScenarioRepository, PortfolioRepository, Rule Engine, Calculation Engine | IPSApplicationService, ScenarioApplicationService | Authorized, observable, audited, and catalog-aligned |
| EmailService | Infrastructure Service | NotificationRepository, ExternalApiService | NotificationApplicationService | Authorized, observable, audited, and catalog-aligned |
| NotificationService | Infrastructure Service | NotificationRepository, EmailService | NotificationApplicationService | Authorized, observable, audited, and catalog-aligned |
| FileStorageService | Infrastructure Service | ReportApplicationService, AuditRepository | ReportApplicationService | Authorized, observable, audited, and catalog-aligned |
| AuditService | Infrastructure Service | AuditRepository | All Application Services | Authorized, observable, audited, and catalog-aligned |
| SchedulerService | Infrastructure Service | AuditRepository, ScenarioApplicationService, AdministrationApplicationService | Scheduler | Authorized, observable, audited, and catalog-aligned |
| BackupService | Infrastructure Service | AuditRepository | AdministrationApplicationService | Authorized, observable, audited, and catalog-aligned |
| CacheService | Infrastructure Service | Repositories, Projection handlers | Application Services, Query Handlers | Authorized, observable, audited, and catalog-aligned |
| ExternalApiService | Infrastructure Service | Message Contract Catalog, Integration Framework | Application Services, Infrastructure Services | Authorized, observable, audited, and catalog-aligned |

# Transaction Matrix

The transaction matrix uses the same service, category, dependency, consumer, and control structure as the communication matrix. Each transaction boundary must remain authorized, observable, audited, and catalog-aligned.

# Control Summary

- Service communication must follow catalog-approved dependencies and consumers.
- Transaction behavior must align with service category and ownership.
- Application Services, Domain Services, and Infrastructure Services retain distinct responsibility boundaries.
- All communication and transaction paths remain observable and auditable.
