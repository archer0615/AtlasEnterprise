# Financial Dependency Model

Version: 1.0

## Purpose
Defines how Project Atlas models financial dependencies between people, assets, liabilities, goals and income sources. The model enables the Decision Engine to evaluate cascading impacts before recommending actions.

## Objectives
- Represent financial dependency relationships.
- Prevent recommendations that break critical dependencies.
- Support explainable scenario analysis.
- Enable deterministic impact propagation.

## Dependency Types

### Person Dependency
Examples:
- Spouse
- Children
- Parents
- Other dependents

### Income Dependency
Examples:
- Salary
- Business income
- Rental income
- Dividend income
- Pension

### Asset Dependency
Examples:
- Primary residence
- Investment portfolio
- Emergency fund
- Retirement account

### Liability Dependency
Examples:
- Mortgage
- Personal loan
- Margin loan

### Goal Dependency
Examples:
- Retirement depends on investment funding.
- Home upgrade depends on equity and liquidity.
- Education funding depends on long-term savings.

## Relationship Types
- Requires
- Supports
- Blocks
- Reduces
- Enhances
- Replaces

## Dependency Levels
- Critical
- High
- Medium
- Low

## Core Entities
- Person
- Household
- Income Source
- Asset
- Liability
- Goal
- Portfolio
- Cash Flow
- Insurance Policy

## Dependency Graph Rules
- Directed graph.
- No circular mandatory dependencies.
- Critical dependencies must be validated before decisions.
- Historical dependency changes are auditable.

## Decision Process
1. Build dependency graph.
2. Validate required dependencies.
3. Detect conflicts.
4. Simulate proposed action.
5. Measure downstream impacts.
6. Generate recommendation.

## Business Rules
- Mandatory goals cannot lose required funding.
- Emergency Fund always has critical priority.
- Removing an income source recalculates dependent goals.
- Selling an asset updates all linked scenarios.

## Outputs
- Dependency graph
- Dependency health score
- Blocking dependencies
- Impact summary
- Recommended mitigation actions

## Explainability
Every recommendation reports:
- Affected entities
- Dependency chain
- Critical blockers
- Assumptions
- Expected downstream effects

## KPIs
- Dependency Health Score
- Critical Dependency Count
- Goal Dependency Coverage
- Funding Dependency Ratio
- Household Dependency Index

## Integration
Consumes:
- Goal Prioritization
- Capital Allocation Framework
- Liquidity Framework
- Financial Health Score
- Life Stage Model

Produces:
- Decision Engine
- Scenario Engine
- Recommendation Engine
- Dashboard

## Testing
- Single-income household
- Dual-income household
- Income loss
- Home purchase
- Retirement transition
- Multiple dependent goals

## Future Enhancements
- Household dependency optimization
- AI dependency analysis
- Predictive dependency mapping
- Multi-generational financial planning

## Phase 2 Executable Specification

### Dependency Edge Contract

| Field | Required | Description |
|-------|----------|-------------|
| DependencyId | Yes | Stable dependency identifier |
| SourceEntityId | Yes | Entity that creates the dependency |
| SourceEntityType | Yes | Person, IncomeSource, Asset, Liability, Goal, Portfolio, CashFlow, InsurancePolicy |
| TargetEntityId | Yes | Entity affected by the dependency |
| TargetEntityType | Yes | Dependent entity type |
| RelationshipType | Yes | Requires, Supports, Blocks, Reduces, Enhances, Replaces |
| DependencyLevel | Yes | Critical, High, Medium, Low |
| EffectiveFrom | Yes | Start date |
| EffectiveTo | No | End date when dependency expires |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateDependencyEdge | DependencyApplicationService | DependencyEdgeCreated |
| UpdateDependencyLevel | DependencyApplicationService | DependencyLevelUpdated |
| RemoveDependencyEdge | DependencyApplicationService | DependencyEdgeRemoved |
| ValidateDependencyGraph | DependencyApplicationService | DependencyGraphValidated |
| SimulateDependencyImpact | ScenarioApplicationService | DependencyImpactSimulated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| DependencyEdgeCreated | New relationship registered | Decision Engine, Scenario Engine |
| DependencyGraphValidated | Graph validation completed | Decision Engine, Audit |
| DependencyConflictDetected | Blocking or circular dependency found | Alert, Recommendation Engine |
| DependencyImpactSimulated | Proposed action impact calculated | Explainability, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FDM-VR-001 | Critical dependencies must have active source and target entities. | Reject graph |
| FDM-VR-002 | Mandatory dependency cycles are not allowed. | Reject graph |
| FDM-VR-003 | A blocked target cannot be recommended until blocker is resolved. | Block recommendation |
| FDM-VR-004 | Historical dependency changes must be retained. | Reject overwrite |
| FDM-VR-005 | Dependency level changes require audit reason. | Reject command |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/dependencies | POST | Create dependency edge | Dependency:Write |
| /api/v1/dependencies/graph | GET | Retrieve dependency graph | Dependency:Read |
| /api/v1/dependencies/validate | POST | Validate dependency graph | Dependency:Evaluate |
| /api/v1/dependencies/impact | POST | Simulate downstream impact | Scenario:Evaluate |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Circular mandatory dependency | Graph validation fails |
| Income source removed | Dependent goals recalculate |
| Emergency fund dependency breached | Recommendation is blocked |
| Asset sale simulation | Linked scenarios update impact summary |
| Dependency level change | Audit reason is required |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

## Phase 2 Executable Specification

### Dependency Edge Contract

| Field | Required | Description |
|-------|----------|-------------|
| DependencyId | Yes | Stable dependency identifier |
| SourceEntityId | Yes | Entity that creates the dependency |
| SourceEntityType | Yes | Person, IncomeSource, Asset, Liability, Goal, Portfolio, CashFlow, InsurancePolicy |
| TargetEntityId | Yes | Entity affected by the dependency |
| TargetEntityType | Yes | Dependent entity type |
| RelationshipType | Yes | Requires, Supports, Blocks, Reduces, Enhances, Replaces |
| DependencyLevel | Yes | Critical, High, Medium, Low |
| EffectiveFrom | Yes | Start date |
| EffectiveTo | No | End date when dependency expires |
| TraceId | Yes | Audit trace |

### Commands

| Command | Actor | Output |
|---------|-------|--------|
| CreateDependencyEdge | DependencyApplicationService | DependencyEdgeCreated |
| UpdateDependencyLevel | DependencyApplicationService | DependencyLevelUpdated |
| RemoveDependencyEdge | DependencyApplicationService | DependencyEdgeRemoved |
| ValidateDependencyGraph | DependencyApplicationService | DependencyGraphValidated |
| SimulateDependencyImpact | ScenarioApplicationService | DependencyImpactSimulated |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| DependencyEdgeCreated | New relationship registered | Decision Engine, Scenario Engine |
| DependencyGraphValidated | Graph validation completed | Decision Engine, Audit |
| DependencyConflictDetected | Blocking or circular dependency found | Alert, Recommendation Engine |
| DependencyImpactSimulated | Proposed action impact calculated | Explainability, Dashboard |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FDM-VR-001 | Critical dependencies must have active source and target entities. | Reject graph |
| FDM-VR-002 | Mandatory dependency cycles are not allowed. | Reject graph |
| FDM-VR-003 | A blocked target cannot be recommended until blocker is resolved. | Block recommendation |
| FDM-VR-004 | Historical dependency changes must be retained. | Reject overwrite |
| FDM-VR-005 | Dependency level changes require audit reason. | Reject command |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/dependencies | POST | Create dependency edge | Dependency:Write |
| /api/v1/dependencies/graph | GET | Retrieve dependency graph | Dependency:Read |
| /api/v1/dependencies/validate | POST | Validate dependency graph | Dependency:Evaluate |
| /api/v1/dependencies/impact | POST | Simulate downstream impact | Scenario:Evaluate |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Circular mandatory dependency | Graph validation fails |
| Income source removed | Dependent goals recalculate |
| Emergency fund dependency breached | Recommendation is blocked |
| Asset sale simulation | Linked scenarios update impact summary |
| Dependency level change | Audit reason is required |

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
