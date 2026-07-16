# Knowledge Source of Truth

Document Path: knowledge/governance/knowledge-source-of-truth.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Canonical Specification
Domain: Knowledge Governance
Bounded Context: Knowledge
Owner: Project Atlas
Source of Truth: Atlas Knowledge Governance Source of Truth
Last Updated: 2026-07-16

## Purpose

Defines which knowledge documents are canonical, how legacy references are handled, and how product, implementation, and generated artifacts trace back to source specifications.

## Source Hierarchy

1. `knowledge/**` is the canonical specification corpus.
2. `docs/knowledge/**` is legacy reference material unless a document explicitly states otherwise.
3. `docs/roadmap/**` records plans, audits, migration notes, and validation evidence.
4. `frontend/knowledge/**` is generated output and must not be edited as source.
5. Runtime code and fixtures must cite or map back to canonical `knowledge/**` files when they define durable product behavior.

## Canonical Rules

- Every canonical document must include a correct `Document Path` when it has a document-control block.
- Parent documents define overview, ownership, navigation, and source-of-truth scope.
- Child documents carry concrete rules, contracts, workflows, matrices, acceptance criteria, and test expectations.
- Legacy documents may remain for historical comparison, but must not override canonical `knowledge/**` content.
- Generated artifacts must be rebuilt from source documents after canonical knowledge changes.

## Legacy Reference Handling

- `docs/knowledge/entity/*.md` remains legacy reference material for Asset, Household, Liability, Loan, and Mortgage.
- Any difference between `docs/knowledge/entity/*.md` and `knowledge/entity/*.md` resolves in favor of `knowledge/entity/*.md`.
- Legacy content may be migrated only through a new canonical patch under `knowledge/**`.

## Traceability

Each product capability should map to:

- Canonical knowledge document.
- Runtime implementation or fixture.
- Validation command or audit report.
- Known gaps or planned follow-up.

## Governance

- Path changes require updating `Document Path`, Related Specifications, and generated knowledge artifacts.
- New domains require a parent specification and at least one governance/testing section.
- Cross-document duplication must identify the canonical owner before content is copied or split.

## Testing

- `npm run build:knowledge` must pass after source changes that affect generated knowledge.
- `npm run validate` must pass before local commit.
- `git diff --check` must pass; line-ending warnings are acceptable on Windows when no whitespace errors are reported.

## Related Specifications

- `docs/roadmap/domain-coverage-audit-2026-07-16.md`
- `docs/roadmap/semantic-quality-review-2026-07-16.md`
- `docs/roadmap/product-spec-alignment-audit-2026-07-16.md`
- `docs/roadmap/archive-2026-07-16-knowledge-split.md`
