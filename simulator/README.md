# Simulator

The simulator directory is reserved for scenario, projection, stress-test, and decision comparison tooling. It should use the canonical formulas, assumptions, and engine documents before introducing executable simulation logic.

Simulator work must align with Atlas v1 Browser Runtime, Local Calculation Runtime, Scenario and Decision Runtime, and Offline-first dashboard workflows. It must not introduce a required ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, or Multi-device Sync dependency.

## Scope

- Compare long-term scenarios such as mortgage repayment, home upgrade timing, car purchase timing, retirement readiness, and investment stress tests.
- Exercise projection, optimization, calculation, and rule-engine behavior against sample inputs.
- Produce auditable outputs that can be traced back to assumptions, formulas, and rule versions.

## Boundaries

- Simulator output is analytical support, not canonical financial advice.
- Simulation assumptions must be explicit and must not silently override `knowledge/supporting/` or `docs/specification/` sources.
- Scenario logic should remain deterministic for the same inputs and versioned assumptions.
- Simulator tooling must not modify Business Rules, Formula definitions, Entity meaning, Calculation semantics, or fixture expected results as part of architecture alignment.

## Reference Documents

- `docs/specification/03-Formula.md`
- `docs/specification/08B-CashFlowEngine-Formula.md`
- `knowledge/engine/simulation-engine-framework.md`
- `knowledge/supporting/market-assumptions.md`
- `knowledge/supporting/taiwan-financial-assumptions.md`

## Fixture Design

- [Scenario simulator fixture design](fixtures/scenario-fixture-design.md)
- [Mortgage prepayment baseline fixture](fixtures/mortgage-prepayment-baseline-2026.json)
- [Home upgrade 2031 baseline fixture](fixtures/home-upgrade-2031-baseline.json)
- [Retirement readiness stress fixture](fixtures/retirement-readiness-stress.json)
- [Loan refinancing rate shock fixture](fixtures/loan-refinancing-rate-shock.json)
- [Investment drawdown stress fixture](fixtures/investment-drawdown-stress.json)
