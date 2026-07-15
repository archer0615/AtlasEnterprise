# Net Worth Framework

Version: 1.0

## Purpose
Defines the enterprise standard for calculating, tracking and analyzing net worth within Project Atlas. This framework is the single source of truth for all asset, liability and equity calculations.

## Objectives
- Standardize net worth calculations.
- Provide historical trend analysis.
- Support decision simulations.
- Supply consistent metrics to all engines.

## Formula

Net Worth =
Total Assets
- Total Liabilities

## Asset Categories
### Liquid Assets
- Cash
- Checking accounts
- Savings
- Money market funds

### Investment Assets
- Stocks
- ETFs
- Mutual funds
- Bonds
- Structured products

### Real Assets
- Primary residence
- Investment property
- Vehicles
- Precious metals

### Retirement Assets
- Pension
- Retirement accounts

### Other Assets
- Business equity
- Collectibles
- Other IPS-approved assets

## Liability Categories
- Mortgage
- Personal loans
- Margin loans
- Credit card balances
- Tax liabilities
- Other obligations

## Valuation Rules
- Market-traded assets use latest market value.
- Property uses configurable valuation model.
- Liabilities use outstanding principal plus accrued obligations.
- Unsupported assets require manual valuation.

## Inputs
- Asset inventory
- Liability inventory
- Market prices
- Exchange rates
- Property valuations
- Loan balances

## Derived Metrics
- Net Worth
- Investable Net Worth
- Liquid Net Worth
- Housing Equity
- Debt Ratio
- Asset Growth Rate
- Net Worth CAGR

## Snapshot Model
Each snapshot stores:
- Date
- Total Assets
- Total Liabilities
- Net Worth
- Category breakdown
- Valuation source

## Business Rules
- Every asset belongs to exactly one category.
- Every liability belongs to exactly one category.
- Historical snapshots are immutable.
- Valuation changes are fully auditable.

## Decision Engine Integration
Consumed by:
- Financial Health Score
- House Decision Framework
- Retirement Engine
- Scenario Engine
- Dashboard
- Capital Allocation Framework

## Explainability
Each calculation reports:
- Asset totals
- Liability totals
- Category contributions
- Valuation assumptions
- Historical comparison

## KPIs
- Net Worth
- Net Worth Growth
- Liquid Net Worth
- Investable Assets
- Debt-to-Net-Worth Ratio
- Asset Allocation by Category

## Testing
- Single asset household
- Multi-property household
- Negative net worth
- Multi-currency portfolio
- Rapid market movement
- Historical restatement protection

## Future Enhancements
- Real-time valuation feeds
- Household consolidation
- Predictive net worth forecasting
- AI anomaly detection

## Phase 2 Executable Specification

### Net Worth Snapshot Contract

| Field | Requirement |
|---|---|
| Aggregate | NetWorthSnapshot |
| Identity | snapshotId |
| Scope | tenantId, householdId, asOfDate |
| Inputs | assets, liabilities, prices, FX rates, property valuations, loan balances |
| Outputs | totalAssets, totalLiabilities, netWorth, liquidNetWorth, investableNetWorth, categoryBreakdown |
| Immutability | Published snapshots are immutable and corrections require restatement snapshots. |

### Required Commands

| Command | Purpose |
|---|---|
| CalculateNetWorthSnapshot | Calculate a point-in-time net worth snapshot. |
| PublishNetWorthSnapshot | Freeze a validated snapshot for reporting. |
| ReconcileNetWorthInputs | Compare source inputs against calculated totals. |
| RestateNetWorthSnapshot | Correct historical valuation with audit trail. |
| EvaluateNetWorthThresholds | Evaluate thresholds for alerts and decision rules. |
| ReplayNetWorthCalculation | Rebuild snapshot from stored inputs and valuation versions. |

### Domain Events

| Event | Trigger |
|---|---|
| NetWorthSnapshotCalculated | Snapshot calculation completes. |
| NetWorthSnapshotPublished | Snapshot is frozen for reporting. |
| NetWorthInputsReconciled | Source input reconciliation completes. |
| NetWorthSnapshotRestated | Historical snapshot correction is published. |
| NetWorthThresholdEvaluated | Threshold evaluation completes. |
| NetWorthCalculationReplayed | Historical calculation is reproduced. |

### Validation Rules

1. Every asset and liability must belong to exactly one category.
2. Snapshot totals must equal category sum totals after currency conversion.
3. Liquid net worth must exclude self-use real estate and illiquid assets unless explicitly configured.
4. Published snapshots cannot be overwritten.
5. Restatement must reference the original snapshot and correction reason.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/net-worth/snapshots/calculate | POST | Calculate snapshot. |
| /api/net-worth/snapshots/{snapshotId}/publish | POST | Publish snapshot. |
| /api/net-worth/snapshots/{snapshotId} | GET | Retrieve snapshot. |
| /api/net-worth/snapshots/{snapshotId}/reconcile | POST | Reconcile inputs. |
| /api/net-worth/snapshots/{snapshotId}/restate | POST | Restate snapshot. |
| /api/net-worth/snapshots/{snapshotId}/replay | POST | Replay calculation. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| Multi-currency assets | Converted totals match FX version. |
| Negative net worth | Snapshot publishes with negative result and no calculation failure. |
| Missing category | Validation fails. |
| Restate published snapshot | New restatement snapshot is created. |
| Replay snapshot | Net worth and category totals match original output. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
