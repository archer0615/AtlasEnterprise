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
