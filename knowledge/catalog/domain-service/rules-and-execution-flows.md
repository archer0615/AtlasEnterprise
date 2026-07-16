# Domain Service Rules and Execution Flows

## Purpose
This split document isolates the rule, flow, and error governance portions of the parent Domain Service Catalog while preserving the parent document as the canonical full specification.

## Source
- Parent specification: [Domain Service Catalog](../domain-service-catalog.md)

## Split Scope
- Transaction Rules
- Consistency Rules
- Validation Rules
- Business Rules
- Error Catalog
- Security
- Audit
- Performance
- Mermaid execution flows
- Edge Cases
- Final Consistency Matrix

## Rule Families
The parent catalog defines rule behavior for service transaction boundaries, consistency expectations, validation requirements, business policy enforcement, security checks, audit traceability, and performance constraints.

## Execution Flow Families
The parent catalog keeps the executable sequence diagrams for Service Dependency Diagram, Domain Service Architecture, Service Collaboration Diagram, Business Flow, Calculation Flow, Decision Flow, Projection Flow, Optimization Flow, and related service orchestration flows.

## Extraction Rationale
This split keeps catalog entries and dependency matrices separate from behavior-heavy material. Domain service readers can review DecisionService, CashFlowService, PortfolioService, LoanService, RetirementService, ScenarioService, ScoringService, ExplainabilityService, RiskService, and AllocationService entries without loading all rule and Mermaid flow sections.

## Preservation Rule
Do not remove or rewrite the parent Domain Service Catalog body from this split. This child document is a navigation and ownership slice for the existing canonical content.
