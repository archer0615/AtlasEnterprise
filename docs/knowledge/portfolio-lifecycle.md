# Portfolio Lifecycle

Version: 1.0

## Purpose
Defines the complete lifecycle of an investment portfolio within Project Atlas, from creation through retirement and closure.

## Objectives
- Standardize portfolio state transitions.
- Align portfolio behavior with life stages and financial goals.
- Ensure deterministic, auditable investment decisions.

## Lifecycle Phases

### 1. Portfolio Creation
Entry criteria:
- IPS completed
- Risk Capacity evaluated
- Initial funding confirmed

Outputs:
- Strategic Asset Allocation
- Benchmark
- Rebalancing policy

### 2. Accumulation
Primary focus:
- Regular contributions
- Goal funding
- Long-term growth

Key actions:
- Dollar-cost averaging
- Periodic rebalancing
- Performance monitoring

### 3. Expansion
Primary focus:
- Multi-goal investing
- Asset diversification
- Tax efficiency

Triggers:
- Income growth
- Home purchase
- Family expansion

### 4. Consolidation
Primary focus:
- Reduce portfolio risk
- Increase income stability
- Protect accumulated wealth

Triggers:
- Retirement approaching
- Debt reduction
- Lower risk capacity

### 5. Distribution
Primary focus:
- Sustainable withdrawals
- Cash-flow management
- Sequence-of-return risk mitigation

Integrated with:
- Withdrawal Strategy
- Cash Reserve Framework
- Rebalancing Framework

### 6. Legacy / Closure
Primary focus:
- Estate transfer
- Beneficiary planning
- Portfolio termination

## Lifecycle Events
- Portfolio Created
- Contribution
- Withdrawal
- Rebalance
- Asset Added
- Asset Removed
- Goal Linked
- Goal Completed
- Portfolio Archived

## State Machine
Draft
→ Active
→ Accumulation
→ Expansion
→ Consolidation
→ Distribution
→ Closed

Emergency state transitions are allowed after major financial events.

## Decision Engine Integration
Lifecycle affects:
- Asset Allocation
- Goal Prioritization
- Financial Health Score
- Scenario Engine
- Retirement Engine

## KPIs
- Net Asset Value
- Goal Funding Ratio
- Annualized Return
- Allocation Drift
- Withdrawal Sustainability
- Portfolio Longevity

## Business Rules
- Every portfolio has exactly one active lifecycle state.
- Historical transitions are immutable.
- Lifecycle changes require validation events.
- Major transitions generate domain events.

## Explainability
Every transition records:
- Previous state
- New state
- Trigger event
- Supporting rules
- Expected financial impact

## Testing
- New portfolio onboarding
- Multiple goal transitions
- Retirement transition
- Market crash during distribution
- Portfolio closure

## Future Enhancements
- Household portfolio lifecycle
- Multi-currency lifecycle
- AI lifecycle prediction
- Automatic transition recommendations
