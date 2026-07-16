# Optimization Engine Catalog and Matrices

Source: ../optimization-engine-framework.md

# Complete Optimization Catalog

Every optimization capability must use this Enterprise contract.

| Field | Requirement |
| --- | --- |
| Optimization Name | Stable PascalCase name ending with Optimization. |
| Display Name | Human-readable label. |
| Category | Portfolio, GoalFunding, DebtPaydown, CashReserve, TaxAware, RiskReduction, CashFlow, ScenarioRanking, RecommendationRanking, MultiObjective, Operational. |
| Purpose | Why the optimization exists. |
| Business Meaning | Business, financial, decision, recommendation, reporting, or operational meaning. |
| Description | Exact optimized behavior. |
| Objective | Target outcome and objective direction. |
| Objective Function | Formula, scoring model, or ranking expression and version. |
| Optimization Variables | Variables, bounds, units, granularity, and ownership. |
| Constraints | Full constraint set. |
| Hard Constraints | Mandatory constraints that candidate solutions must satisfy. |
| Soft Constraints | Preferred constraints scored through penalties or trade-offs. |
| Penalty Rules | Penalty formulas, weights, and thresholds. |
| Priority Rules | Priority model, ranking rule, and tie-breakers. |
| Inputs | Required source values, units, scope, and classification. |
| Outputs | Selected solution, ranked candidates, scores, classification, and consumers. |
| Scenario Dependency | Scenario id, version, lifecycle, and compatibility. |
| Simulation Dependency | Simulation id, version, generated time, and confidence when used. |
| Calculation Dependency | Calculation names, versions, inputs, and outputs used. |
| Projection Dependency | Projection names, versions, generated time, and staleness. |
| Decision Dependency | Decision state, rule result, or recommendation dependency when used. |
| Rule Engine Dependency | Rule ids, versions, inputs, and outcomes. |
| Repository | Repository reads needed for source data. |
| Application Service | Service orchestrating optimization. |
| Domain Service | Domain service owning domain optimization behavior. |
| Workflow | Workflow dependency or optimization step. |
| Automation | Automation trigger or action using optimization. |
| Scheduler | Scheduled optimization or refresh. |
| Background Job | Async, batch, replay, or long-running worker. |
| API | API route or DTO exposing optimization. |
| Execution Strategy | Synchronous, asynchronous, batch, scheduled, parallel, deterministic, heuristic, or interactive. |
| Solver Strategy | Exact solver algorithm, version, and deterministic policy. |
| Search Strategy | Exhaustive, greedy, branch-and-bound, dynamic programming, heuristic, stochastic, rule-guided, or multi-pass. |
| Termination Criteria | Iteration limit, time limit, convergence, candidate exhaustion, feasibility, or threshold. |
| Convergence Criteria | Score tolerance, stability window, improvement threshold, or not applicable. |
| Validation | Input, objective, variable, constraint, dependency, output, feasibility, and tolerance validation. |
| Business Rules | Behavioral rules and invariants. |
| Version | Engine, model, objective, solver, constraint, input schema, output schema, and scoring versions. |
| Replay | Snapshot, seed if applicable, dependency versions, and result comparison behavior. |
| Traceability | Trace fields, candidates, scores, penalties, constraint outcomes, and explanation references. |
| Audit | Audit record requirements. |
| Performance | SLA, parallelism, memory, CPU, timeout, progress, and cancellation. |
| Security | Authorization, tenant, household, masking, classification, and result access. |
| Example | Minimal valid optimization scenario. |

# Optimization Matrix

| Optimization Category | Primary Objective | Required Governance |
| --- | --- | --- |
| Portfolio | Balance return, risk, allocation, and constraints. | Objective version, allocation bounds, risk model, solver trace. |
| GoalFunding | Achieve goals within capacity and priority. | Goal priority, contribution capacity, constraints, recommendation trace. |
| DebtPaydown | Minimize interest or payoff time. | Loan terms, cashflow constraints, strategy, calculation trace. |
| CashReserve | Balance liquidity and opportunity cost. | Reserve policy, risk boundary, household context, trade-off trace. |
| TaxAware | Reduce tax impact under policy constraints. | Jurisdiction, tax rule version, assumption version, trace. |
| RiskReduction | Reduce risk while preserving goal feasibility. | Risk model, thresholds, constraints, explanation. |
| CashFlow | Improve surplus, stability, or runway. | Cashflow projection, constraints, assumptions, scenario. |
| ScenarioRanking | Rank scenarios by objective and policy. | Comparable scenarios, scoring method, tie-breakers. |
| RecommendationRanking | Rank recommendations by impact and priority. | Priority model, confidence, explanation, audit. |
| MultiObjective | Balance competing objectives. | Weighting, trade-off matrix, penalty rules, explainability. |

# Objective Matrix

| Objective | Direction | Required Metadata |
| --- | --- | --- |
| Maximize Net Worth | Maximize | Time horizon, valuation method, assumptions, currency. |
| Improve Cash Flow | Maximize | Period, income, expense, recurring obligations, volatility. |
| Minimize Interest | Minimize | Loan terms, payoff strategy, cashflow capacity, fees. |
| Reduce Risk | Minimize | Risk model, thresholds, score version, constraints. |
| Achieve Goals Sooner | Minimize time | Goal targets, priority, contribution capacity, dependencies. |
| Maximize Recommendation Utility | Maximize | Priority score, confidence, impact, effort, risk. |
| Balance Liquidity | Multi-objective | Reserve target, opportunity cost, risk tolerance. |

# Constraint Matrix

| Constraint Type | Behavior | Required Control |
| --- | --- | --- |
| Hard Constraint | Candidate must satisfy. | Violation makes candidate infeasible. |
| Soft Constraint | Candidate may violate with penalty. | Penalty rule and weight required. |
| Budget Constraint | Limits contribution, payment, allocation, or spending. | Currency, period, and source required. |
| Risk Constraint | Limits volatility, drawdown, concentration, or score. | Risk model and threshold required. |
| Time Constraint | Limits horizon, deadline, or execution time. | Date boundary and timezone policy required. |
| Policy Constraint | Enforces business or governance rule. | Rule id and version required. |
| Tenant Constraint | Enforces tenant scope. | TenantId required. |
| Household Constraint | Enforces household scope. | HouseholdId required. |

# Variable Matrix

| Variable Type | Required Control |
| --- | --- |
| Allocation Variable | Asset class, min, max, step, current value, and constraint set. |
| Contribution Variable | Goal, amount range, cadence, capacity, and priority. |
| Payment Variable | Liability, amount range, cadence, interest, and payoff rule. |
| Reserve Variable | Target level, min, max, liquidity class, and risk boundary. |
| Scenario Variable | Scenario delta, unit, range, and compatibility. |
| Recommendation Variable | Action candidate, impact, effort, confidence, and suppression rule. |

# Scenario Matrix

| Scenario Dependency | Optimization Requirement |
| --- | --- |
| Baseline Scenario | Uses current approved assumptions and current household state. |
| Alternative Scenario | Records delta, objective effect, and comparison target. |
| Stress Scenario | Applies hard safety constraints and risk thresholds. |
| Goal Scenario | Uses target, deadline, priority, and contribution capacity. |
| Portfolio Scenario | Uses allocation, risk, return, constraints, and market assumptions. |

# Simulation Matrix

| Simulation Dependency | Optimization Requirement |
| --- | --- |
| Monte Carlo Result | Confidence, percentile, seed, model version, and outcome distribution. |
| Stress Test Result | Failure threshold, downside metric, and risk classification. |
| Sensitivity Result | Variable sensitivity, output range, and robustness signal. |
| Scenario Comparison | Comparable results, ranking method, and confidence. |

# Calculation Matrix

| Calculation Dependency | Optimization Requirement |
| --- | --- |
| Financial Formula | Formula id, version, precision, rounding, and trace. |
| Score Calculation | Score model version, weights, thresholds, and explanation. |
| Cash Flow Calculation | Period, currency, surplus, obligations, and tolerance. |
| Risk Calculation | Risk model, thresholds, inputs, and score version. |
| Goal Funding Calculation | Target, contribution, horizon, and assumptions. |

# Projection Matrix

| Projection Dependency | Optimization Requirement |
| --- | --- |
| Cash Flow Projection | Time series, generated time, assumptions, and staleness. |
| Net Worth Projection | Asset and liability trajectory, valuation method, and scenario. |
| Portfolio Projection | Return path, allocation, risk, and market data version. |
| Goal Projection | Goal progress, funding gap, deadline, and contribution path. |

# Decision Matrix

| Decision Dependency | Optimization Requirement |
| --- | --- |
| Eligibility Decision | Hard constraint source and rule trace. |
| Recommendation Decision | Ranking objective, priority score, confidence, and explanation. |
| Risk Decision | Risk threshold, score, and override policy. |
| Scenario Decision | Scenario ranking and tie-breaker. |

# Trade-off Matrix

| Trade-off | Required Explanation |
| --- | --- |
| Return vs Risk | Expected return change, risk score change, constraint effect. |
| Liquidity vs Investment | Reserve change, opportunity cost, risk effect. |
| Debt Paydown vs Goal Funding | Interest saved, goal delay or acceleration, cashflow effect. |
| Short Term Cash Flow vs Long Term Net Worth | Period surplus, long-term value, confidence. |
| Optimal Score vs Constraint Violation | Penalty, violated soft constraint, alternative candidate. |
