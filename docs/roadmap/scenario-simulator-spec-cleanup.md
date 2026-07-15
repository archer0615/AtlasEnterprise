# Scenario Simulator Specification Cleanup

## Purpose

This cleanup plan defines how to prepare the existing scenario, cash-flow, loan, home upgrade, retirement, and decision documents for a usable scenario simulator.

## Simulator Responsibilities

- Build a baseline household financial path.
- Compare alternative scenarios such as early mortgage repayment, home upgrade timing, car purchase timing, and retirement timing.
- Execute deterministic cash-flow, loan, investment, home upgrade, and retirement calculations.
- Produce comparable KPIs, warnings, and recommendations.
- Preserve assumptions and formula versions for reproducibility.

## Required Inputs

- Household profile
- Assets and liquidity
- Liabilities and mortgage terms
- Income and expenses
- Goals and planning horizon
- Scenario assumptions
- Taiwan mortgage, tax, and market assumptions

## Required Outputs

- Scenario score
- Cash-flow timeline
- Liquidity status
- Debt sustainability
- Goal readiness
- Retirement readiness
- Risk and warning list
- Recommendation and explanation

## Cleanup Tasks

| Priority | Task |
| ---: | --- |
| 1 | Align scenario terms across `knowledge/workflow/decision-workflow.md` and `knowledge/framework/scenario-framework.md`. |
| 2 | Confirm Cash Flow Engine inputs and outputs are sufficient for dashboard summaries. |
| 3 | Define shared KPI names used by dashboard, scenario comparison, and recommendation outputs. |
| 4 | Mark cloud/backend-only content as future phase where it appears in simulator paths. |
| 5 | Create a small fixture scenario for frontend prototyping. |

## Guardrails

- Do not make AI output the source of deterministic calculations.
- Do not introduce server-only requirements for v1.
- Keep scenario snapshots immutable after execution.
- Preserve audit fields for formula version, assumption version, and execution timestamp.
