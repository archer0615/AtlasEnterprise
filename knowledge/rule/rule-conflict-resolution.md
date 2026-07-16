# Rule Conflict Resolution

Document Path: knowledge/rule/rule-conflict-resolution.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Rule Governance
Bounded Context: Rule
Owner: Project Atlas
Source of Truth: Atlas Rule Conflict Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines how Atlas detects, ranks, resolves, audits, and tests conflicts between rules.

## Conflict Types

| Type | Description |
| --- | --- |
| Output conflict | Two rules produce incompatible outcomes for the same facts. |
| Priority conflict | Rules apply to the same decision but have unclear precedence. |
| Constraint conflict | A recommendation satisfies one rule but violates another hard constraint. |
| Version conflict | Multiple effective versions match the same execution context. |
| Scope conflict | Rules from different bounded contexts claim ownership of the same decision. |
| Explanation conflict | Rule outcome and explanation disagree or omit the decisive factor. |

## Resolution Order

1. Hard constraints override scoring and preference rules.
2. Security, permission, compliance, and tenant-boundary rules override domain recommendations.
3. More specific bounded-context rules override generic platform rules.
4. Newer effective versions override older versions only when replay is not required.
5. Domain owner approval is required when two active rules remain incompatible.
6. Unresolved conflicts must suppress automated execution and produce review output.

## Required Conflict Record

- Conflict identifier.
- Rule identifiers and versions.
- Input facts and execution context.
- Conflict type.
- Resolution decision.
- Approver or automated policy.
- User-visible explanation.
- Audit and replay reference.

## Testing

- Every high-impact rule must include at least one conflict test.
- Rule changes must test known adjacent rules in the same bounded context.
- Automated execution must be blocked when a conflict has no deterministic resolution.
- Historical replay must preserve the original conflict resolution policy.

## Related Specifications

- `knowledge/rule/rule-lifecycle-framework.md`
- `knowledge/rule/domain-rule-catalog.md`
- `knowledge/rule/decision-rule-catalog.md`
- `knowledge/supporting/constraint-rules.md`
- `knowledge/security/permission-framework.md`
