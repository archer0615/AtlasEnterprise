# Withdrawal Rule Catalog

Version: 1.0

## Purpose
Defines the canonical withdrawal rules used by Project Atlas. These rules are consumed by the Decision Engine, Retirement Engine, and Cash Flow Engine to generate explainable withdrawal recommendations.

## Rule Categories

### WR-001 Cash Before Assets
Priority: Critical

Use available operating cash before liquidating investment assets.

### WR-002 Preserve Emergency Reserve
Priority: Critical

Emergency reserve must never be reduced below the minimum required threshold unless an emergency event is explicitly identified.

### WR-003 Income First
Priority: High

Use recurring income sources (salary, pension, dividends, coupons, rental income) before selling growth assets.

### WR-004 Tax Efficient Order
Priority: High

When multiple withdrawal sources exist, prefer the sequence with the lowest estimated tax impact.

### WR-005 Rebalancing Driven Withdrawal
Priority: High

When withdrawals are required, preferentially sell overweight asset classes to improve allocation.

### WR-006 Avoid Selling Depressed Assets
Priority: High

Avoid selling materially undervalued or heavily declined growth assets if alternative funding sources are available.

### WR-007 Goal Protection
Priority: Critical

Assets reserved for higher-priority financial goals cannot be withdrawn for discretionary spending.

### WR-008 Liquidity Protection
Priority: Critical

Maintain minimum liquidity coverage after every withdrawal.

### WR-009 Withdrawal Rate Guardrail
Priority: High

Recommended withdrawals must remain within the sustainable withdrawal policy defined by the Investment Policy Statement.

### WR-010 Market Stress Adjustment
Priority: High

Reduce discretionary withdrawals during severe market declines according to Scenario Engine guidance.

## Decision Inputs
- Cash balance
- Cash Reserve Framework
- Liquidity Framework
- Asset Allocation
- Risk Capacity
- Life Stage
- Financial Health Score
- Goal Prioritization
- Market Scenario

## Outputs
- Recommended withdrawal amount
- Funding sources
- Asset sales (if any)
- Expected allocation after withdrawal
- Rule evaluation results

## Rule Evaluation Order
1. Validate hard constraints.
2. Verify liquidity.
3. Preserve emergency reserve.
4. Protect mandatory goals.
5. Select optimal funding source.
6. Validate sustainable withdrawal rate.
7. Produce explainability report.

## Explainability
Each recommendation includes:
- Triggered rules
- Skipped rules
- Constraint violations
- Funding order
- Sustainability assessment

## KPIs
- Sustainable Withdrawal Rate
- Liquidity Coverage Ratio
- Emergency Reserve Coverage
- Portfolio Longevity
- Goal Funding Impact

## Testing
- Monthly retirement withdrawals
- Major medical expense
- Market crash
- High inflation
- Large discretionary purchase
- Multiple simultaneous goals

## Future Enhancements
- Dynamic tax optimization
- Household withdrawal coordination
- AI-assisted withdrawal sequencing
- Jurisdiction-specific withdrawal rules
