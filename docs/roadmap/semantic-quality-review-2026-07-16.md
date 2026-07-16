# Semantic Quality Review - 2026-07-16

## Scope

- Parent and split documents under `knowledge/**`
- Focus areas: path metadata, parent-child consistency, governance/testing depth, cross-reference clarity, and template residue.

## High Risk

- `knowledge/api/api-governance-framework.md` contains template-like rules such as generic numbered rules without enough concrete conditions, limits, examples, or violation handling.
- Several parent documents contain `Document Path` values that do not match their actual categorized paths.
- Some split child files are summary-only and do not yet carry enough concrete rules, matrices, or acceptance criteria.

## Medium Risk

- Some parent documents claim source-of-truth status while child documents contain only broad "covers" descriptions.
- Several `governance-and-testing.md` files have section headings but need stronger test matrices, pass/fail criteria, ownership, and exception handling.
- Related specification links often use old `knowledge/*.md` paths instead of categorized paths.
- Automation framework child files are thinner than the parent file, creating uneven semantic depth.

## Low Risk

- Several child files still read like split notes instead of final specifications.
- Catalog documents contain repeated operational-control wording that reduces review value.
- Split Navigation links are generally usable, but Related Specifications need a consistency pass.

## Recommended Backlog

| Priority | Item | Target |
| --- | --- | --- |
| P0 | Path consistency fix | Align all `Document Path` values with actual file paths. |
| P0 | Cross-reference integrity check | Replace stale Related Specifications paths. |
| P1 | Governance and testing enrichment | Add owner, change flow, test matrix, acceptance criteria, and exception handling. |
| P1 | Template residue cleanup | Replace generic template rules with verifiable rules. |
| P2 | Parent-child semantic contract | Keep parent documents as overview/index and child documents as concrete specifications. |
