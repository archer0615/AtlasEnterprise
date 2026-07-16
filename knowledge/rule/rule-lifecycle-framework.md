# Rule Lifecycle Framework

Document Path: knowledge/rule/rule-lifecycle-framework.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Rule Governance
Bounded Context: Rule
Owner: Project Atlas
Source of Truth: Atlas Rule Lifecycle Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines the lifecycle for authoring, approving, testing, publishing, executing, monitoring, and retiring Atlas rules.

## Lifecycle States

| State | Meaning |
| --- | --- |
| Draft | Rule is being authored and is not executable. |
| Review | Rule is ready for domain, risk, security, and testing review. |
| Approved | Rule has passed review and can be published. |
| Active | Rule can participate in runtime or fixture-backed evaluation. |
| Suspended | Rule is temporarily disabled and must not execute. |
| Deprecated | Rule remains replayable for historical decisions but should not be selected for new decisions. |
| Retired | Rule is archived and only available for audit or replay. |

## Required Metadata

- Rule identifier.
- Rule name and category.
- Version and effective date.
- Owner and bounded context.
- Input facts and output contract.
- Execution mode.
- Explanation template.
- Test cases and acceptance criteria.
- Audit and replay requirements.

## Workflow

1. Author rule with metadata, conditions, outputs, and examples.
2. Validate syntax, required facts, output schema, and deterministic behavior.
3. Review business impact, financial assumptions, security boundary, and audit needs.
4. Add positive, negative, edge, and replay test cases.
5. Approve and publish with an effective date.
6. Execute only when version, effective date, and eligibility match.
7. Monitor hit rate, exceptions, conflicts, overrides, and outcome drift.
8. Suspend, deprecate, or retire when assumptions, policy, or behavior changes.

## Testing

- Syntax validation.
- Determinism test with repeated identical inputs.
- Boundary-value tests.
- Conflict tests against related rules.
- Replay tests for historical decision snapshots.
- Explanation completeness tests.

## Related Specifications

- `knowledge/rule/domain-rule-catalog.md`
- `knowledge/rule/rule-conflict-resolution.md`
- `knowledge/rule/decision-rule-catalog.md`
- `knowledge/supporting/rule-expression-language.md`
- `knowledge/security/audit-framework.md`
