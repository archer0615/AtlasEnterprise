# Domain Service Capability and Calculation Matrices

## Purpose
This split document isolates the business capability, calculation, validation, decision, projection, optimization, and simulation matrices from the parent Domain Service Catalog while preserving the parent as the canonical full specification.

## Source
- Parent specification: [Domain Service Catalog](../domain-service-catalog.md)

## Split Scope
- Business Capability Matrix
- Calculation Matrix
- Validation Matrix
- Decision Matrix
- Projection Matrix
- Optimization Matrix
- Simulation Matrix

## Business Capability Matrix

| Domain Service | Mapping | Dependency | Control |
|---|---|---|---|
| DecisionService | Catalog-aligned | DecisionRepository, ScenarioRepository; Money, Percentage, RiskScore; DecisionStatus, RecommendationPriority, RiskLevel; Decision Engine, Rule Engine | Stateless, deterministic, audited, and versioned |
| CashFlowService | Catalog-aligned | HouseholdRepository, LoanRepository; Money, CashFlowItem, DateRange; CurrencyCode; Calculation Engine, Projection Engine | Stateless, deterministic, audited, and versioned |
| PortfolioService | Catalog-aligned | AssetRepository, PortfolioRepository, PropertyRepository; Money, Allocation, Percentage, RiskScore; AssetType, PropertyType, CurrencyCode, RiskLevel; Calculation Engine, Projection Engine | Stateless, deterministic, audited, and versioned |
| LoanService | Catalog-aligned | LoanRepository, LiabilityRepository; Money, InterestRate, LoanTerm, DateRange; LoanType, CurrencyCode; Calculation Engine, Optimization Engine, Projection Engine | Stateless, deterministic, audited, and versioned |
| RetirementService | Catalog-aligned | GoalRepository, ScenarioRepository; Money, Percentage, InflationRate, DateRange; GoalStatus, CurrencyCode, RiskLevel; Projection Engine, Simulation Engine, Optimization Engine | Stateless, deterministic, audited, and versioned |
| ScenarioService | Catalog-aligned | ScenarioRepository, DecisionRepository; Money, Percentage, DateRange, InflationRate, RiskScore; ScenarioStatus, RiskLevel; Simulation Engine, Projection Engine, Rule Engine | Stateless, deterministic, audited, and versioned |
| ScoringService | Catalog-aligned | ScenarioRepository, DecisionRepository; Percentage, RiskScore, Money; RiskLevel, RecommendationPriority; Rule Engine, Calculation Engine | Stateless, deterministic, audited, and versioned |
| ExplainabilityService | Catalog-aligned | DecisionRepository, ScenarioRepository, NotificationRepository, AuditRepository; RiskScore, Percentage, Money; DecisionStatus, RecommendationPriority, RiskLevel; Rule Engine | Stateless, deterministic, audited, and versioned |
| RiskService | Catalog-aligned | ScenarioRepository, PortfolioRepository; RiskScore, Money, Percentage, DateRange; RiskLevel, RecommendationPriority; Rule Engine, Calculation Engine | Stateless, deterministic, audited, and versioned |
| AllocationService | Catalog-aligned | PortfolioRepository, GoalRepository, ScenarioRepository; Allocation, Percentage, RiskScore, Money; AssetType, RiskLevel, RecommendationPriority; Optimization Engine, Calculation Engine | Stateless, deterministic, audited, and versioned |

## Responsibility Matrices

| Matrix | Services Covered | Responsibility Focus |
|---|---|---|
| Calculation Matrix | DecisionService, CashFlowService, PortfolioService, LoanService, RetirementService, ScenarioService, ScoringService, ExplainabilityService, RiskService, AllocationService | Decision outcome comparison, cash flow calculation, portfolio analysis, loan/refinance calculation, retirement projection, scenario replay, score calculation, explanation assembly, risk calculation, allocation optimization |
| Validation Matrix | DecisionService, CashFlowService, PortfolioService, LoanService, RetirementService, ScenarioService, ScoringService, ExplainabilityService, RiskService, AllocationService | Invalid status, currency, allocation total, loan term, missing assumption or rule version, missing decision history, invalid coverage input, and invalid percentage total |
| Decision Matrix | DecisionService, ScenarioService, ScoringService, ExplainabilityService, RiskService | Recommendation acceptance/rejection, scenario evaluation support, score-based decision support, decision rationale, and risk-based decision support |
| Projection Matrix | CashFlowService, PortfolioService, LoanService, RetirementService, ScenarioService | Cash flow, portfolio, loan payoff, retirement, and scenario projection responsibilities |
| Optimization Matrix | LoanService, RetirementService, AllocationService, DecisionService | Refinance comparison, retirement savings target optimization, allocation optimization, and recommendation ordering |
| Simulation Matrix | RetirementService, ScenarioService, RiskService | Retirement path simulation, scenario path simulation, and risk scenario input support |

## Engine Dependencies
- Decision Engine supports DecisionService recommendation ordering and decision outcome comparison.
- Calculation Engine supports CashFlowService, PortfolioService, LoanService, ScoringService, RiskService, and AllocationService responsibilities.
- Projection Engine supports CashFlowService, PortfolioService, LoanService, RetirementService, and ScenarioService responsibilities.
- Simulation Engine supports RetirementService and ScenarioService responsibilities.
- Optimization Engine supports LoanService, RetirementService, and AllocationService responsibilities.
- Rule Engine supports DecisionService, ScenarioService, ScoringService, ExplainabilityService, RiskService, and risk simulation input support.

## Extraction Rationale
This split separates capability and computational responsibility matrices from broader dependency, rule, and testing sections. It gives service readers a compact view of which service owns each calculation, projection, optimization, simulation, validation, and decision responsibility.

## Preservation Rule
Do not remove or rewrite the parent Domain Service Catalog body from this split. This child document is a navigation and ownership slice for the existing canonical content.
