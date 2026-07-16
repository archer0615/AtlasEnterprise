# Portfolio Workflow

Document Path: knowledge/workflow/portfolio-workflow.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Portfolio Management
Bounded Context: Portfolio
Owner: Project Atlas
Source of Truth: Atlas Portfolio Workflow Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the end-to-end workflow for portfolio construction, allocation, monitoring, rebalancing, stress testing, and reporting.

## Scope

- Portfolio setup and ownership.
- Holdings and position synchronization.
- Target allocation and risk-budget assignment.
- Drift detection, performance measurement, and rebalancing.
- Scenario and stress testing.
- Reporting and recommendation generation.

## Inputs

- Portfolio, asset, and position records.
- Investment policy and risk capacity.
- Market assumptions and benchmark definitions.
- Goal funding needs and liquidity constraints.
- Tax, fee, and transaction assumptions.

## Workflow Stages

1. Validate portfolio identity, owner, account scope, and holdings completeness.
2. Classify assets and positions by type, liquidity, risk, and valuation source.
3. Load investment policy, target allocation, risk budget, and constraints.
4. Calculate current allocation, concentration, performance, and drift.
5. Evaluate goal funding impact, liquidity needs, and scenario sensitivity.
6. Generate rebalance candidates with trade-offs, taxes, fees, and constraints.
7. Score recommendations and require approval for material changes.
8. Persist portfolio snapshot, assumptions, and recommendation evidence.
9. Monitor execution, failed actions, and post-trade drift.
10. Produce dashboard, report, and audit outputs.

## Outputs

- Portfolio snapshot and holdings summary.
- Allocation, drift, performance, and risk metrics.
- Rebalancing recommendation and execution status.
- Stress test and scenario sensitivity results.
- Audit identifiers and source assumptions.

## Governance And Testing

- Valuation and return calculations must use versioned market data and formula references.
- Rebalancing must respect risk budget, liquidity, tax, and transaction constraints.
- Tests must cover missing holdings, stale prices, allocation drift, rebalance suppression, trade approval, and post-trade validation.

## Related Specifications

- `knowledge/entity/Portfolio.md`
- `knowledge/entity/Position.md`
- `knowledge/supporting/portfolio.md`
- `knowledge/supporting/portfolio-lifecycle.md`
- `knowledge/framework/asset-allocation-framework.md`
- `knowledge/framework/rebalancing-framework.md`
- `knowledge/framework/portfolio-performance-framework.md`
