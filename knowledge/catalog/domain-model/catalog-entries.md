# Domain Model Catalog Entries

## Purpose
This split document isolates the domain model entry index from the parent Domain Model Catalog while preserving the parent as the canonical source of truth.

## Source
- Parent specification: [Domain Model Catalog](../domain-model-catalog.md)

## Entry Contract
Each domain model entry identifies its domain, bounded context, aggregate ownership, repository mapping, command mapping, service dependencies, database mapping, API resources, DTOs, security, audit, lifecycle, version, and consumers.

## Catalog Entries

| Domain Model | Aggregate | Repositories | Application Services | Domain Services | Database Tables | API Resources | DTO |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Identity | User, Household | UserRepository, HouseholdRepository | UserApplicationService | DecisionService | users, households | /api/v1/users, /api/v1/households | UserDto, HouseholdDto |
| Financial Profile | FinancialProfile, Household | HouseholdRepository | BlueprintApplicationService, DashboardApplicationService | CashFlowService | households, cash_flow_items | /api/v1/blueprint, /api/v1/dashboard | BlueprintDto, DashboardDto |
| Assets | AssetPortfolio | AssetRepository, PortfolioRepository | PortfolioApplicationService, DashboardApplicationService | PortfolioService, AllocationService | assets, portfolios, holdings | /api/v1/portfolios | PortfolioDto |
| Liabilities | LiabilityPortfolio, Loan | LiabilityRepository, LoanRepository | LoanApplicationService, DashboardApplicationService | LoanService | liabilities, loans, loan_payments | /api/v1/loans | LoanDto |
| Goals | GoalPlan | GoalRepository | GoalApplicationService, BlueprintApplicationService | RetirementService, CashFlowService | goals | /api/v1/goals | GoalDto |
| Portfolio | AssetPortfolio | PortfolioRepository, AssetRepository | PortfolioApplicationService | PortfolioService, AllocationService | portfolios, holdings | /api/v1/portfolios | PortfolioDto |
| Property | Property | PropertyRepository | BlueprintApplicationService, DashboardApplicationService | PortfolioService | properties, property_valuations | /api/v1/properties | PropertyDto |
| Loan | Loan | LoanRepository | LoanApplicationService | LoanService | loans, loan_payments | /api/v1/loans | LoanDto |

## Usage Rules
- Use this document as a navigation and ownership index for cataloged domain models.
- Use the parent catalog for the complete field-level contract and repeated control statements.
- Do not introduce domain models, aggregates, APIs, DTOs, repositories, or services that are not present in the parent catalog.
