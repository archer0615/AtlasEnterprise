# AI Layer

The AI layer contains future decision-support and explanation components for Atlas Enterprise. It should use the canonical knowledge sources in `knowledge/**/*.md` and the specification documents in `docs/specification/` as its primary context.

## Scope

- Generate plain-language explanations for financial decisions, scenarios, goals, and recommendations.
- Assist with summarizing knowledge documents without changing canonical domain behavior.
- Support decision review workflows by exposing assumptions, tradeoffs, risks, and missing inputs.
- Keep model-assisted output separate from deterministic rules, formulas, and auditable calculations.

## Boundaries

- AI output must not replace deterministic AREL rules, financial formulas, or workflow state transitions.
- Any recommendation that affects user decisions must reference the underlying facts, assumptions, and rule outcomes.
- Generated explanations should be reproducible enough for review and should preserve source references where available.

## Integration Notes

- Use `knowledge/` as the canonical domain repository.
- Use `docs/specification/` for product and domain intent.
- Use `knowledge/rule/` and `knowledge/engine/` to distinguish deterministic behavior from narrative assistance.
