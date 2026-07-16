# Optimization Engine Solver and Validation

Source: ../optimization-engine-framework.md

# Solver Strategy

- Solver selection must match objective shape, constraint type, variable count, and performance target.
- Deterministic solvers are preferred for replayable financial decisions.
- Stochastic solvers require seed strategy and replay policy.
- Heuristic solvers must expose limitations and confidence.
- Solver failure must return controlled failure with reason.
- Solver infeasibility must return constraint evidence and remediation hints.

# Convergence Strategy

- Convergence criteria must be explicit when solver is iterative.
- Termination criteria must prevent unbounded execution.
- Improvement threshold must be defined when score stabilizes.
- Time limit must be defined for API-facing or workflow-facing optimizations.
- Candidate exhaustion must be recorded when exhaustive search is used.
- Non-convergence must be a controlled outcome.

# Replay Strategy

- Replay must use captured Optimization Snapshot.
- Replay must use the same objective version, constraint version, solver version, assumptions, dependency versions, and seed when applicable.
- Replay must record differences between original and replay result.
- Replay must not mutate production state unless wrapped in an approved recovery process.
- Replay must be audited.

# Validation Rules

- Optimization Name is required.
- Optimization Category is required.
- Optimization Owner is required.
- Objective is required.
- Objective Function is required.
- Optimization Variables are required.
- Constraints are required.
- Hard Constraints must be identified.
- Soft Constraints must define penalty rules.
- Priority Rules are required when ranking is used.
- Inputs are required.
- Outputs are required.
- Scenario dependency version is required when scenario is used.
- Simulation dependency version is required when simulation is used.
- Calculation dependency version is required when calculation is used.
- Projection dependency version is required when projection is used.
- Rule Engine dependency version is required when rules are used.
- Execution Strategy is required.
- Solver Strategy is required.
- Search Strategy is required.
- Termination Criteria is required.
- Convergence Criteria is required for iterative solvers.
- Validation policy is required.
- Business Rules are required.
- Optimization Version is required.
- Replay policy is required for decision-impacting optimization.
- Traceability policy is required.
- Audit policy is required.
- Performance target is required.
- Security policy is required.
- TenantId is required for tenant-scoped optimization.
- HouseholdId is required for household-scoped optimization.
- Authorization must be evaluated before protected inputs are read.
- Variable bounds must be validated.
- Constraint compatibility must be validated.
- Objective direction must be validated.
- Candidate solutions must be validated against hard constraints.
- Infeasible output must include violated constraints.
- Result output must include score.
- Result output must include selected candidate or infeasibility state.
- Result output must include trace reference.
- Replay must validate all referenced versions are available.
- Optimization cache use must include versioned cache key when applicable.

# Business Rules

- Optimization Engine is the canonical execution model for governed Atlas optimizations.
- Calculation Engine owns formula execution used by optimization.
- Simulation Engine owns simulation dependencies used by optimization.
- Projection Engine owns projection dependencies used by optimization.
- Rule Engine owns rule evaluation used by optimization.
- Decision Engine owns decision outcomes that consume optimization results.
- Recommendation Engine consumes optimization outputs only through approved priority and explanation rules.
- Optimization must not silently change objective function.
- Optimization must not silently change constraints.
- Optimization must not silently change assumptions.
- Optimization must not silently change solver strategy.
- Optimization must not silently change variable bounds.
- Optimization results must include objective identity.
- Optimization results must include selected candidate or infeasibility state.
- Optimization results must include score when scored.
- Optimization results must include constraint outcomes.
- Optimization results must include version metadata.
- Optimization results must include trace reference.
- Hard constraint violations must make candidate infeasible.
- Soft constraint violations must apply penalty or trade-off explanation.
- Penalty weights must be versioned.
- Priority rules must be versioned.
- Tie-breakers must be explicit.
- Infeasible optimization must return violated constraints and reason.
- Non-converged optimization must return controlled outcome.
- Best candidate must not be presented as guaranteed outcome.
- Optimization output must not be displayed without authorization.
- Optimization output must not be exported without authorization.
- Optimization output must not cross tenant boundaries.
- Optimization output must not cross household boundaries without permission.
- Optimization cache must include TenantId and HouseholdId when scoped.
- Optimization cache must include optimization version and input hash.
- Long-running optimization must support progress tracking.
- Long-running optimization must support cancellation policy.
- Batch optimization must use bounded batches.
- Parallel optimization must preserve deterministic behavior when deterministic mode is active.
- Parallel optimization must not exceed resource policy.
- Solver warnings must be surfaced to consumers.
- Validation failures must be controlled outcomes.
- Replay must not emit user notifications unless explicitly approved.
- Replay must not create false business mutation audit.
- Audit must include CorrelationId.
- Audit must include CausationId when triggered by command, event, workflow, job, scheduler, or automation.
- Trace must avoid raw secrets.
- Trace must minimize PII.
- Results used by dashboards must expose generated time.
- Results used by reports must preserve lineage.
- Results used by analytics must preserve objective and scenario metadata.
- Results used by recommendations must include explanation and confidence where applicable.
- Results used by decisions must preserve decision dependency metadata.
- Optimization SLA must match API, workflow, scheduler, or background job requirements.
- Optimization failures must be observable.
- Optimization performance metrics must be recorded for governed optimizations.
- Optimization Engine Framework conflicts are resolved by this document unless Calculation Engine, Simulation Engine, Projection Engine, Rule Engine, Scenario Framework, Security, Audit, Compliance, Data Governance, Tenant, or legal rules impose stricter controls.
