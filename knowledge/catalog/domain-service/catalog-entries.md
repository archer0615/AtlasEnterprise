# Domain Service Catalog Entries

## Purpose
This split document isolates domain service definitions from the parent Domain Service Catalog.

## Source
- Parent specification: [Domain Service Catalog](../domain-service-catalog.md)

## Service Entries
- DecisionService
- CashFlowService
- PortfolioService
- LoanService
- RetirementService
- ScenarioService
- ScoringService
- ExplainabilityService
- RiskService
- AllocationService

## Entry Contract
Each domain service entry preserves business purpose, owned calculations, validation behavior, input/output contracts, aggregate dependencies, rule dependencies, engine dependencies, and side-effect boundaries.

