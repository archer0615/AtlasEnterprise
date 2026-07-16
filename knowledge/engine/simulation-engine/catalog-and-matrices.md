# Simulation Engine Catalog and Matrices

Source: ../simulation-engine-framework.md

# Complete Simulation Catalog

Every simulation capability must use this Enterprise contract.

| Field | Requirement |
| --- | --- |
| Simulation Name | Stable PascalCase name ending with Simulation. |
| Display Name | Human-readable label. |
| Category | Baseline, BestCase, WorstCase, WhatIf, StressTest, MonteCarlo, Sensitivity, ScenarioComparison, Forecast, OptimizationInput, DecisionSupport. |
| Purpose | Why the simulation exists. |
| Business Meaning | Business, financial, decision, recommendation, reporting, or operational meaning. |
| Description | Exact modeled behavior. |
| Inputs | Required source values, units, scope, and classification. |
| Outputs | Result metrics, distributions, comparisons, classification, and consumers. |
| Scenario | Scenario id, version, type, owner, and lifecycle state. |
| Variables | Variable names, ranges, units, distributions, and validation. |
| Parameters | Model parameters, defaults, limits, and version. |
| Assumptions | Assumption set and version. |
| Market Assumptions | Market data, source, time, and version. |
| Calculation Dependency | Calculation names, versions, inputs, and outputs used. |
| Projection Dependency | Projection names, versions, generated time, and staleness. |
| Optimization Dependency | Optimization objective, constraints, solver version, and result status when used. |
| Decision Dependency | Decision state, rule result, or recommendation dependency when used. |
| Rule Engine Dependency | Rule ids, versions, inputs, and outcomes. |
| Repository | Repository reads needed for source data. |
| Application Service | Service orchestrating simulation. |
| Domain Service | Domain service owning domain model behavior. |
| Workflow | Workflow dependency or simulation step. |
| Automation | Automation trigger or action using simulation. |
| Scheduler | Scheduled simulation or refresh. |
| Background Job | Async, batch, replay, or long-running worker. |
| API | API route or DTO exposing simulation. |
| Execution Strategy | Synchronous, asynchronous, batch, scheduled, parallel, deterministic, stochastic, or streaming. |
| Iterations | Iteration count, convergence rule, and sampling method when applicable. |
| Random Seed Strategy | Fixed seed, generated seed, user-supplied seed, or not applicable. |
| Deterministic Mode | Required behavior for replayable runs. |
| Replay Strategy | Snapshot, seed, dependency versions, and comparison behavior. |
| Traceability | Trace fields, intermediate values, iteration summaries, and explanation references. |
| Validation | Input, scenario, parameter, dependency, output, convergence, and tolerance validation. |
| Business Rules | Behavioral rules and invariants. |
| Version | Engine, model, scenario, input schema, output schema, and dependency versions. |
| Audit | Audit record requirements. |
| Performance | SLA, parallelism, memory, CPU, timeout, progress, and cancellation. |
| Security | Authorization, tenant, household, masking, classification, and result access. |
| Example | Minimal valid simulation scenario. |

# Simulation Matrix

| Simulation Category | Primary Purpose | Required Governance |
| --- | --- | --- |
| Baseline | Establish expected outcome from current assumptions. | Scenario version, assumption version, calculation trace. |
| BestCase | Evaluate optimistic assumptions. | Variable bounds, assumption rationale, comparison trace. |
| WorstCase | Evaluate downside assumptions. | Stress parameters, risk thresholds, decision impact. |
| WhatIf | Evaluate user-selected changes. | Input validation, scenario delta, replay snapshot. |
| StressTest | Test adverse financial or market conditions. | Stress definition, threshold, failure classification. |
| MonteCarlo | Evaluate probabilistic outcome distribution. | Seed, distribution model, iteration count, confidence. |
| Sensitivity | Evaluate output response to variable ranges. | Variable ranges, baseline, comparison metrics. |
| ScenarioComparison | Rank multiple scenarios. | Compatibility rules, scoring method, explanation. |
| Forecast | Produce time-based modeled outcomes. | Projection dependency, assumptions, horizon, generated time. |

# Scenario Matrix

| Scenario Type | Simulation Requirement |
| --- | --- |
| Baseline Scenario | Uses current approved assumptions, current household state, and default model version. |
| Alternative Scenario | Records delta from baseline, owner, version, and comparison target. |
| Stress Scenario | Defines adverse variables, thresholds, and failure classification. |
| Goal Scenario | Defines goal target, time horizon, contribution path, and dependency calculations. |
| Retirement Scenario | Defines retirement age, withdrawal policy, return assumptions, and inflation. |
| Housing Scenario | Defines property cost, loan terms, cash reserve, taxes, and risk assumptions. |
| Portfolio Scenario | Defines allocation, return assumptions, volatility, rebalancing, and constraints. |

# Parameter Matrix

| Parameter Type | Required Control |
| --- | --- |
| Time Horizon | Start date, end date, period granularity, and boundary policy. |
| Iteration Count | Minimum, maximum, convergence requirement, and performance limit. |
| Random Seed | Seed source, storage, replay policy, and visibility. |
| Distribution | Distribution type, parameters, source, and version. |
| Confidence Level | Confidence metric, percentile, and interpretation. |
| Stress Level | Severity, variable mapping, and threshold. |
| Sensitivity Range | Min, max, step, and unit. |
| Scenario Weight | Ranking weight, source, and validation. |

# Assumption Matrix

| Assumption Type | Simulation Requirement |
| --- | --- |
| Inflation | Source, effective date, version, scenario mapping, and stress override. |
| Return Rate | Asset class, horizon, market source, version, distribution, and confidence. |
| Volatility | Asset class, source, model version, and distribution. |
| Salary Growth | Household context, scenario, version, and sensitivity range. |
| Expense Growth | Category, inflation mapping, scenario, and version. |
| Tax | Jurisdiction, effective date, rule version, and scenario impact. |
| Life Stage | Model version, household profile, and decision context. |

# Projection Matrix

| Projection Dependency | Simulation Requirement |
| --- | --- |
| Cash Flow Projection | Scenario cashflow path, time series, assumption version, and generated time. |
| Net Worth Projection | Asset and liability path, valuation rules, and scenario version. |
| Portfolio Projection | Allocation, return assumptions, volatility, and market data version. |
| Loan Projection | Amortization, rate path, payment schedule, and scenario inputs. |
| Retirement Projection | Contribution, withdrawal, inflation, and success probability. |

# Calculation Matrix

| Calculation Dependency | Simulation Requirement |
| --- | --- |
| Financial Formula | Formula id, version, precision, rounding, and trace. |
| Score Calculation | Score model version, weights, thresholds, and explanation. |
| Ratio Calculation | Ratio definition, inputs, units, and tolerance. |
| Cash Reserve Calculation | Liquidity target, household context, and risk policy. |
| Goal Funding Calculation | Target amount, contribution path, time horizon, and assumptions. |

# Optimization Matrix

| Optimization Dependency | Simulation Requirement |
| --- | --- |
| Portfolio Optimization | Objective, constraints, solver version, and output allocation. |
| Goal Funding Optimization | Objective, constraints, contribution capacity, and goal priority. |
| Debt Paydown Optimization | Payoff strategy, interest rates, cashflow constraint, and ranking. |
| Cash Reserve Optimization | Liquidity target, opportunity cost, and risk boundary. |

# Decision Matrix

| Decision Dependency | Simulation Requirement |
| --- | --- |
| Scenario Decision | Uses compatible scenario results, comparison metrics, and ranking logic. |
| Recommendation Decision | Uses simulation outcomes, confidence, priority score, and explanation. |
| Risk Decision | Uses stress outcomes, thresholds, score model, and rule version. |
| Eligibility Decision | Uses rule outcomes and simulation-dependent thresholds. |

# Comparison Matrix

| Comparison Type | Required Control |
| --- | --- |
| Baseline vs Alternative | Same time horizon, model version, metric definitions, and assumption compatibility. |
| Best vs Worst | Explicit variable bounds, stress rationale, and output deltas. |
| Multi-Scenario Ranking | Ranking method, weights, tie-breaker, and explainability. |
| Before vs After Recommendation | Source decision, recommendation id, expected impact, and confidence. |
| Simulation vs Actual | Actual source, period alignment, variance, and accuracy review. |
