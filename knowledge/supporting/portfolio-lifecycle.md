# Portfolio Lifecycle

Version: 1.0

## Split Navigation
- [Portfolio lifecycle states](portfolio-lifecycle/states-and-transitions.md)
- [Portfolio lifecycle execution](portfolio-lifecycle/execution-and-validation.md)

## Purpose
Defines the complete lifecycle of an investment portfolio within Project Atlas, from creation through retirement and closure.

## Objectives
- Standardize portfolio state transitions.
- Align portfolio behavior with life stages and financial goals.
- Ensure deterministic, auditable investment decisions.

## Lifecycle Phases

Detailed lifecycle state criteria and transition rules are maintained in [Portfolio lifecycle states](portfolio-lifecycle/states-and-transitions.md).

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

## Phase 2 Executable Specification

Detailed executable commands, events, API contracts, and tests are maintained in [Portfolio lifecycle execution](portfolio-lifecycle/execution-and-validation.md).

### Portfolio Lifecycle Contract

| Field | Requirement |
|---|---|
| Aggregate | PortfolioLifecycle |
| Identity | portfolioId |
| Scope | tenantId, householdId |
| Required State | currentState, previousState, transitionReason, validationResult, effectiveAt |
| Outputs | transitionDecision, supportingRules, expectedFinancialImpact, auditReference |
| Invariant | A portfolio has exactly one active lifecycle state. |

### Required Commands

| Command | Purpose |
|---|---|
| InitializePortfolioLifecycle | Create lifecycle state for a portfolio. |
| EvaluatePortfolioLifecycleTransition | Validate if transition is allowed. |
| TransitionPortfolioLifecycle | Move portfolio to a new lifecycle state. |
| EmergencyTransitionPortfolioLifecycle | Execute approved emergency transition. |
| ArchivePortfolioLifecycle | Close lifecycle tracking for archived portfolio. |
| ReplayPortfolioLifecycle | Rebuild lifecycle state from transition history. |

### Domain Events

| Event | Trigger |
|---|---|
| PortfolioLifecycleInitialized | Lifecycle tracking starts. |
| PortfolioLifecycleTransitionEvaluated | Transition validation completes. |
| PortfolioLifecycleTransitioned | State changes. |
| PortfolioLifecycleEmergencyTransitioned | Emergency state change is approved. |
| PortfolioLifecycleArchived | Portfolio lifecycle is closed. |
| PortfolioLifecycleReplayed | Historical lifecycle state is reproduced. |

### Validation Rules

1. Transition must include previous state, new state, trigger event, and validation result.
2. Closed portfolios cannot transition except through approved restore workflow.
3. Distribution transition must validate withdrawal and cash reserve dependencies.
4. Emergency transition must record major financial event and approval reference.
5. Replay must produce exactly one active lifecycle state.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/portfolios/{portfolioId}/lifecycle | POST | Initialize lifecycle. |
| /api/portfolios/{portfolioId}/lifecycle/evaluate-transition | POST | Evaluate transition. |
| /api/portfolios/{portfolioId}/lifecycle/transition | POST | Execute transition. |
| /api/portfolios/{portfolioId}/lifecycle/emergency-transition | POST | Execute emergency transition. |
| /api/portfolios/{portfolioId}/lifecycle/replay | POST | Replay lifecycle history. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| New portfolio onboarding | PortfolioLifecycleInitialized is emitted. |
| Accumulation to distribution without retirement validation | Transition is rejected. |
| Emergency transition with approval | Emergency transition event is emitted. |
| Closed portfolio transition | Command is rejected. |
| Replay lifecycle | Current state matches transition history. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
