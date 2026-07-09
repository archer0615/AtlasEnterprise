# Rebalancing Framework

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
