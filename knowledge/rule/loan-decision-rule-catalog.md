# Loan Decision Rule Catalog

Version: 1.0

## Purpose
Defines the canonical business rules used by Project Atlas to evaluate borrowing decisions, refinancing, early repayment, and debt restructuring.

## Scope
Supported decisions:
- New mortgage
- Home upgrade loan
- Personal loan
- Mortgage refinancing
- Equity release
- Early repayment
- Debt consolidation

## Rule Categories

### LDR-001 Liquidity Protection (Critical)
Post-loan liquidity must remain above the minimum threshold defined by the Liquidity Framework.

### LDR-002 Emergency Fund Preservation (Critical)
Emergency fund coverage must remain compliant after loan funding.

### LDR-003 Affordability Validation (Critical)
Monthly debt obligations must satisfy affordability limits defined in the IPS.

### LDR-004 Debt Capacity
Total borrowing must not exceed approved Risk Capacity and debt policies.

### LDR-005 Cash Flow Sustainability
Projected free cash flow must remain positive under baseline assumptions.

### LDR-006 Interest Rate Stress Test
Validate repayment ability under configurable interest-rate increase scenarios.

### LDR-007 Income Shock Test
Evaluate repayment ability under temporary income reduction scenarios.

### LDR-008 Goal Protection
Loan decisions must not compromise mandatory financial goals.

### LDR-009 Early Repayment Optimization
Recommend early repayment only when the financial benefit exceeds alternative capital allocation opportunities.

### LDR-010 Refinancing Evaluation
Recommend refinancing when lifetime borrowing cost is reduced after fees and constraints.

## Decision Inputs
- Loan amount
- Interest rate
- Loan term
- Monthly payment
- Household income
- Free cash flow
- Existing liabilities
- Net Worth
- Financial Health Score
- Liquidity Score
- Risk Capacity
- Market assumptions

## Outputs
- Recommended action
- Loan affordability result
- Stress-test result
- Monthly cash-flow impact
- Net-worth impact
- Risk summary
- Explainability report

## Decision Sequence
1. Validate hard constraints.
2. Verify affordability.
3. Validate liquidity.
4. Execute stress tests.
5. Compare alternatives.
6. Rank recommendations.
7. Produce explainable output.

## Business Rules
- Hard constraints override optimization.
- Mandatory goals have priority over discretionary borrowing.
- Refinancing requires positive lifetime benefit.
- All recommendations are reproducible from identical inputs.

## Explainability
Each decision records:
- Triggered rules
- Failed rules
- Input assumptions
- Constraint evaluation
- Alternative options
- Expected financial impact

## KPIs
- Debt-to-Income Ratio
- Debt Service Coverage Ratio
- Loan-to-Value Ratio
- Monthly Debt Burden
- Interest Cost Savings
- Loan Sustainability Score

## Integration
Consumes:
- Loan Engine
- Cash Flow Engine
- Liquidity Framework
- Net Worth Framework
- Financial Ratio Framework
- Risk Budget Framework
- Financial Projection Framework

Produces:
- Decision Engine
- House Decision Framework
- Dashboard
- Scenario Engine

## Testing
- First mortgage
- Mortgage refinance
- Personal loan
- Early repayment
- Debt consolidation
- High interest-rate environment
- Income reduction

## Future Enhancements
- Tax-aware loan optimization
- AI borrowing recommendations
- Multi-loan optimization
- Country-specific lending rules

## Phase 2 Executable Specification

### Loan Decision Rule Evaluation Contract

| Field | Requirement |
|---|---|
| Aggregate | LoanDecisionEvaluation |
| Identity | evaluationId |
| Scope | tenantId, householdId, scenarioId |
| Inputs | loanRequest, borrowerProfile, liquiditySnapshot, cashFlowProjection, marketAssumptionSet, policyVersion |
| Outputs | decision, failedRules, triggeredRules, rankedAlternatives, explainabilityReport |
| Determinism | Same inputs and rule versions must produce the same decision result. |

### Required Commands

| Command | Purpose |
|---|---|
| EvaluateLoanDecisionRules | Evaluate all catalog rules for a loan request. |
| RejectLoanDecision | Persist hard-constraint rejection and failed rules. |
| EscalateLoanDecisionReview | Route borderline results to manual review. |
| RankLoanAlternatives | Rank repayment, refinance, and restructuring alternatives. |
| ReplayLoanDecisionEvaluation | Rebuild the decision result from stored inputs and rule versions. |

### Domain Events

| Event | Trigger |
|---|---|
| LoanDecisionRulesEvaluated | Rule execution completes. |
| LoanDecisionRejected | Critical rule failure blocks the decision. |
| LoanDecisionReviewEscalated | Result requires manual review. |
| LoanAlternativeRanked | Alternatives are scored and ordered. |
| LoanDecisionEvaluationReplayed | Historical decision is reproduced. |

### Validation Rules

1. Every evaluation must reference a policyVersion, marketAssumptionSet, and scenarioId.
2. Critical rules must short-circuit approval but still record all evaluated rule outcomes.
3. Refinancing recommendations must include lifetime cost delta after fees.
4. Early repayment recommendations must compare liquidity impact and opportunity cost.
5. Replay must fail if any referenced rule version or assumption set is missing.

### API Contract

| Endpoint | Method | Purpose |
|---|---|---|
| /api/loan-decisions/evaluations | POST | Execute loan decision rule evaluation. |
| /api/loan-decisions/evaluations/{evaluationId} | GET | Retrieve decision result and explainability output. |
| /api/loan-decisions/evaluations/{evaluationId}/replay | POST | Replay a historical evaluation. |
| /api/loan-decisions/evaluations/{evaluationId}/alternatives | GET | Retrieve ranked alternatives. |

### Testing Matrix

| Scenario | Expected Result |
|---|---|
| Liquidity below threshold | Decision rejected with LDR-001 failure. |
| Refinance benefit after fees is positive | Refinance alternative is eligible. |
| Income shock fails affordability | Stress-test failure is recorded. |
| Mandatory goal is compromised | Decision rejected or escalated. |
| Replay with identical inputs | Same decision, scores, and failed rules are produced. |

### Version History

| Version | Date | Description |
|---|---|---|
| 1.0-p2 | 2026-07-15 | Phase 2 executable specification added. |
