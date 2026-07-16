# Simulation Engine Replay and Validation

Source: ../simulation-engine-framework.md

# Replay Strategy

- Replay must use captured Simulation Snapshot.
- Replay must use the same simulation model version.
- Replay must use the same scenario version.
- Replay must use the same assumptions, market assumptions, formula versions, projection versions, and rule versions.
- Replay must use the same random seed when stochastic output must be reproduced.
- Replay must record differences between original and replay results.
- Replay must not mutate production state unless wrapped in an approved recovery process.
- Replay must be audited.

# Traceability Strategy

- Trace must include simulation name, version, session, scenario, actor, TenantId, HouseholdId, inputs, variables, parameters, assumptions, market assumptions, dependencies, seed, iterations, calculation outputs, projection outputs, result metrics, comparison metrics, warnings, and validation outcomes.
- Trace may store iteration summaries instead of every iteration when full trace would exceed policy.
- Full iteration trace must be available for high-risk decision-impacting simulations when required by policy.
- Trace must avoid raw secrets and unnecessary PII.

# Validation Rules

- Simulation Name is required.
- Simulation Category is required.
- Simulation Owner is required.
- Scenario is required.
- Scenario version is required.
- Inputs are required.
- Outputs are required.
- Variables are required when scenario varies values.
- Parameters are required.
- Assumptions are required when model uses assumptions.
- Market assumptions are required when model uses market data.
- Calculation dependency versions are required.
- Projection dependency versions are required when projections are used.
- Optimization dependency versions are required when optimization is used.
- Rule Engine dependency versions are required when rules are used.
- Execution Strategy is required.
- Iteration count is required for iterative simulations.
- Random seed strategy is required for stochastic simulations.
- Deterministic mode must be declared.
- Replay strategy is required for decision-impacting simulations.
- Traceability policy is required.
- Validation policy is required.
- Business Rules are required.
- Simulation Version is required.
- Audit policy is required.
- Performance target is required.
- Security policy is required.
- TenantId is required for tenant-scoped simulation.
- HouseholdId is required for household-scoped simulation.
- Authorization must be evaluated before protected inputs are read.
- Input units must be validated.
- Output units must be declared.
- Time horizon must be declared.
- Scenario compatibility must be validated before comparison.
- Parameter ranges must be validated.
- Variable ranges must be validated.
- Distribution parameters must be validated.
- Iteration count must be bounded.
- CPU and memory limits must be declared for long-running simulations.
- Simulation failure must produce controlled error class.
- Simulation output must include generated time.
- Simulation output must include model version.
- Simulation output must include scenario version.
- Simulation output must include trace reference.
- Replay must validate all referenced versions are available.
- Comparison must validate compatible assumptions and model versions.
- Simulation cache use must include versioned cache key when applicable.

# Business Rules

- Simulation Engine is the canonical execution model for governed Atlas simulations.
- Scenario Framework owns scenario definition and lifecycle.
- Simulation Engine owns model execution, variable expansion, parameter handling, iteration, trace, replay, and comparison behavior.
- Calculation Engine owns formula execution used by simulations.
- Projection Engine owns projection dependencies used by simulations.
- Optimization Engine owns optimization dependencies used by simulations.
- Rule Engine owns rule evaluation used by simulations.
- Decision Engine owns decision outcomes that consume simulation results.
- Simulations must not silently change scenario inputs.
- Simulations must not silently change assumptions.
- Simulations must not silently change market assumptions.
- Simulations must not silently change model version.
- Simulations must not silently change formula version.
- Simulations must not silently change random seed when deterministic replay is required.
- Simulation results must include scenario identity.
- Simulation results must include generated time.
- Simulation results must include version metadata.
- Simulation results must include trace reference.
- Simulation results used by recommendations must include confidence or reliability metadata.
- Simulation comparisons must use compatible time horizons.
- Simulation comparisons must use compatible metric definitions.
- Simulation comparisons must use compatible model versions or declare version difference.
- Monte Carlo simulations must record seed strategy.
- Monte Carlo simulations must record iteration count.
- Monte Carlo simulations must record distribution model.
- Sensitivity simulations must record variable ranges.
- Stress tests must record stress definition.
- What-if simulations must record delta from baseline.
- Baseline simulations must reference approved current assumptions.
- Worst-case simulations must not be presented as prediction without context.
- Best-case simulations must not be presented as guarantee.
- Simulation output must not be displayed without authorization.
- Simulation output must not be exported without authorization.
- Simulation output must not cross tenant boundaries.
- Simulation output must not cross household boundaries without permission.
- Simulation cache must include TenantId and HouseholdId when scoped.
- Simulation cache must include simulation version and input hash.
- Long-running simulations must support progress tracking.
- Long-running simulations must support cancellation policy.
- Batch simulations must use bounded batches.
- Parallel simulations must preserve determinism when deterministic mode is active.
- Parallel simulations must not exceed resource policy.
- Simulation warnings must be surfaced to consumers.
- Simulation validation failures must be controlled outcomes.
- Simulation replay must not emit user notifications unless explicitly approved.
- Simulation replay must not create false business mutation audit.
- Simulation audit must include CorrelationId.
- Simulation audit must include CausationId when triggered by command, event, workflow, job, scheduler, or automation.
- Simulation trace must avoid raw secrets.
- Simulation trace must minimize PII.
- Simulation results used by dashboards must expose staleness or generated time.
- Simulation results used by reports must preserve lineage.
- Simulation results used by analytics must preserve aggregation and scenario metadata.
- Simulation results used by optimization must preserve objective input metadata.
- Simulation results used by decisions must preserve decision dependency metadata.
- Simulation SLA must match API, workflow, scheduler, or background job requirements.
- Simulation failures must be observable.
- Simulation performance metrics must be recorded for governed simulations.
- Simulation Engine Framework conflicts are resolved by this document unless Scenario Framework, Calculation Engine, Projection Engine, Optimization Engine, Rule Engine, Security, Audit, Compliance, Data Governance, Tenant, or legal rules impose stricter controls.
