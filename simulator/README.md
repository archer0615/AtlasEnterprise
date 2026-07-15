# Simulator

The simulator directory is reserved for scenario, projection, stress-test, and decision comparison tooling. It should use the canonical formulas, assumptions, and engine documents before introducing executable simulation logic.

## Scope

- Compare long-term scenarios such as mortgage repayment, home upgrade timing, car purchase timing, retirement readiness, and investment stress tests.
- Exercise projection, optimization, calculation, and rule-engine behavior against sample inputs.
- Produce auditable outputs that can be traced back to assumptions, formulas, and rule versions.

## Boundaries

- Simulator output is analytical support, not canonical financial advice.
- Simulation assumptions must be explicit and must not silently override `knowledge/supporting/` or `docs/specification/` sources.
- Scenario logic should remain deterministic for the same inputs and versioned assumptions.

## Reference Documents

- `docs/specification/03-Formula.md`
- `docs/specification/08B-CashFlowEngine-Formula.md`
- `knowledge/engine/simulation-engine-framework.md`
- `knowledge/supporting/market-assumptions.md`
- `knowledge/supporting/taiwan-financial-assumptions.md`
