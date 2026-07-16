# Goal Governance and Testing

## Purpose

This split document isolates Goal governance, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/Goal.md` parent.

## Covered Sections

- Cache Strategy
- Security
- Audit
- Performance
- Example JSON
- Mermaid
- Testing
- Edge Cases
- Version History

## Governance Rules

- Goal audit records must preserve lifecycle, progress, priority, review, dependency, and conflict changes.
- Goal security must enforce User access scope and GoalPlan ownership boundaries.
- Goal read models may include related summaries but cannot mutate referenced entities.
- Goal performance validation must include search, summary, history, progress, and dashboard usage.

## Testing Focus

- Identity immutability and User scope.
- ParentGoalId cycle prevention.
- Progress recalculation boundaries.
- Review cadence transitions.
- Archive, restore, deletion, and history traceability.
