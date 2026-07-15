# Large Document Split Plan - Batch 7

## Purpose

This batch targets mid-sized security, command, module, automation, service, and scheduler documents that remain large enough to slow review and search relevance.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/security/security-framework.md` | 300.9 | Threat model, controls, storage, runtime hardening, validation |
| 2 | `knowledge/catalog/command-catalog.md` | 284.1 | Decision, goal, scenario, portfolio, integration, administration commands |
| 3 | `knowledge/catalog/system-module-catalog.md` | 282.2 | Core domain, engine, integration, reporting, administration modules |
| 4 | `knowledge/framework/automation-framework.md` | 279.7 | Trigger, execution, retry, audit, notification automation |
| 5 | `knowledge/catalog/service-catalog.md` | 253.6 | Application, domain, infrastructure, integration services |

## Batch 7 Recommendation

Start with `security-framework.md` because smaller security controls are easier to review, validate, and link from PWA, permission, audit, and backup documents.

## Guardrails

- Preserve control names and policy terms exactly.
- Keep security requirements separate from implementation examples.
- Add parent-document forwarding links before moving content.
- Rebuild knowledge indexes after each source split.
- Run fixture and PWA validation together through `npm run validate`.

## Related Documents

- [Document Governance Report](document-governance-report-2026-07-15.md)
- [Batch 6 Split Plan](large-document-split-plan-batch-6.md)
- [PWA Visual Validation Report](pwa-visual-validation-report-2026-07-15.md)
