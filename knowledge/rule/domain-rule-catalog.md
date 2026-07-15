# Domain Rule Catalog

## Purpose

The domain rule catalog defines the rule categories used by Atlas Enterprise to keep decision behavior deterministic, explainable, versioned, auditable, and executable through AREL.

## Categories

| Category | Purpose |
| --- | --- |
| Validation Rules | Confirm that input data is complete, well-formed, and acceptable before processing. |
| Constraint Rules | Enforce hard limits, invariants, policy boundaries, and impossible-state prevention. |
| Decision Rules | Select outcomes or recommendations from domain facts and decision context. |
| Scoring Rules | Convert qualitative and quantitative signals into comparable scores. |
| Eligibility Rules | Determine whether a user, household, asset, liability, scenario, or goal qualifies for an action. |
| Financial Rules | Apply financial assumptions, ratios, thresholds, cash-flow checks, and Taiwan-specific constraints. |

## Governance Requirements

- Rules must be deterministic for the same input facts and rule version.
- Rules must be versioned so historical decisions can be reconstructed.
- Rules must be explainable with rule name, matched condition, input facts, and produced outcome.
- Rules must be auditable through execution records and decision traces.
- Rules must be executable through AREL when they participate in runtime evaluation.

## Rule Metadata

Each governed rule should define:

- Rule identifier
- Rule category
- Rule version
- Effective date
- Owning domain or bounded context
- Input facts
- Output value or decision
- Explanation template
- Audit requirements

## Runtime Relationship

Domain rules are referenced by decision workflows, scoring models, recommendation logic, financial checks, and policy enforcement. A runtime rule should avoid hidden side effects and should return explicit outcomes that can be logged, explained, tested, and replayed.
