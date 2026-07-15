# Rebalancing Framework

## Split Navigation

- [Rebalancing drift and thresholds](rebalancing/drift-and-thresholds.md)
- [Rebalancing execution and validation](rebalancing/execution-and-validation.md)

Version: 1.0

## Purpose
Defines the portfolio rebalancing policy used by Project Atlas.

## Objectives
- Maintain target asset allocation.
- Control portfolio risk.
- Minimize unnecessary trading.
- Improve tax and transaction efficiency.

## Rebalancing Triggers
1. Threshold-based
2. Calendar-based
3. Cash-flow-based
4. Life-event-based
5. Risk-based

## Threshold Rules
- Minor drift: monitor only.
- Moderate drift: rebalance using new cash.
- Major drift: partial rebalance.
- Critical drift: full rebalance subject to constraints.

## Preferred Order
1. Use new contributions.
2. Reinvest distributions.
3. Redirect dividends.
4. Sell overweight assets only when necessary.

## Constraints
- Preserve emergency fund.
- Respect IPS limits.
- Avoid unnecessary taxable events.
- Respect liquidity requirements.

## Decision Inputs
- Current allocation
- Target allocation
- Asset drift
- Market valuation
- Cash position
- Upcoming liabilities

## Explainability
Each recommendation records:
- Trigger
- Drift values
- Selected actions
- Constraints
- Expected allocation after execution

## Testing
- Bull market
- Bear market
- Large cash inflow
- Retirement withdrawal
- Multiple simultaneous drifts

## Future Enhancements
- Tax-aware optimization
- Multi-account optimization
- AI-assisted rebalancing
- Scenario simulation

## Phase 2 Executable Specification

### Rebalancing Recommendation Contract

| Field | Requirement |
|---|---|
| Aggregate | RebalancingRecommendation |
| Identity | recommendationId |
| Scope | tenantId, householdId, portfolioId |
| Inputs | currentAllocation, targetAllocation, drift, cashPosition, constraints, taxAssumptions |
| Outputs | recommendedActions, expectedAllocation, constraintResults, explainabilityReport |
| Invariant | Recommended actions must not violate IPS, liquidity, or emergency fund constraints. |

### Required Commands

| Command | Purpose |
|---|---|
| EvaluateRebalancingNeed | Determine if portfolio drift requires action. |
| GenerateRebalancingRecommendation | Create recommended buy, sell, or cash-flow actions. |
| ApproveRebalancingRecommendation | Approve recommendation for execution. |
| RejectRebalancingRecommendation | Reject recommendation with reason. |
| ExecuteRebalancingRecommendation | Execute approved actions. |
| ReplayRebalancingEvaluation | Rebuild recommendation from stored inputs and policy versions. |

### Domain Events

| Event | Trigger |
|---|---|
| RebalancingNeedEvaluated | Drift evaluation completes. |
| RebalancingRecommendationGenerated | Recommendation is created. |
| RebalancingRecommendationApproved | User or workflow approves recommendation. |
| RebalancingRecommendationRejected | Recommendation is rejected. |
| RebalancingRecommendationExecuted | Approved actions are executed. |
| RebalancingEvaluationReplayed | Historical recommendation is reproduced. |

### Validation Rules

1. Target allocation must be policy-aligned and total 100%.
2. New contributions and distributions must be evaluated before sell actions.
3. Emergency fund and upcoming liabilities must be preserved.
4. Taxable sell actions must include estimated tax and transaction cost.
5. Replay must reference original allocation, price, policy, and assumption versions.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/portfolios/{portfolioId}/rebalancing/evaluate | POST | Evaluate rebalancing need. |
| /api/portfolios/{portfolioId}/rebalancing/recommendations | POST | Generate recommendation. |
| /api/rebalancing-recommendations/{recommendationId}/approve | POST | Approve recommendation. |
| /api/rebalancing-recommendations/{recommendationId}/reject | POST | Reject recommendation. |
| /api/rebalancing-recommendations/{recommendationId}/execute | POST | Execute approved recommendation. |
| /api/rebalancing-recommendations/{recommendationId}/replay | POST | Replay recommendation. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| Minor drift | Monitor-only result is returned. |
| Large cash inflow | New cash is recommended before sells. |
| Emergency fund would be breached | Recommendation is rejected or constrained. |
| Taxable sell action | Estimated tax and cost are included. |
| Replay evaluation | Same actions and constraint results are produced. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
