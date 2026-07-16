# Duplication Review - 2026-07-16

## Scope

Reviewed repeated Markdown headings and recurring specification blocks across `knowledge/` and `docs/`.

## Repeated Heading Hotspots

| Repeated Heading | Count | Risk |
| --- | ---: | --- |
| `# Document Control` | 118 | Boilerplate repeated across canonical and split documents. |
| `# Business Rules` | 99 | Rules may diverge between parent catalogs, entities, and split documents. |
| `# Validation Rules` | 86 | Validation guidance may be duplicated instead of referenced. |
| `# Performance` | 84 | Performance statements are repeated across catalogs and entities. |
| `# Security` | 82 | Security requirements overlap with security framework documents. |
| `# Edge Cases` | 81 | Edge cases are repeated in catalogs, entity specs, and generated split sections. |
| `# Testing` | 81 | Test guidance is duplicated across framework and entity documents. |
| `# Audit` | 81 | Audit guidance overlaps security, reporting, and lifecycle documents. |
| `# Version History` | 80 | Version blocks are repeated in many files. |
| `# Mermaid` | 76 | Diagram sections are repeated and often split-worthy. |

## Repeated Block Hotspots

| Repeated Block | Count | Risk |
| --- | ---: | --- |
| `## Phase 2 Executable Specification Addendum` | 47 | Addendum content can become stale if each file owns its own copy. |
| `# Final Consistency Matrix` | 41 | Matrix format repeats across many domains and should use a standard template. |
| `# Completion Checklist` | 39 | Checklist items can drift across files. |
| `## Phase 2 Executable Specification` | 37 | Repeated phase marker should be governed by a shared convention. |
| Version row `Phase 2 executable specification added.` | 56 total variants | Version history text is duplicated with small format differences. |

## Source-of-Truth Concerns

| Area | Duplicate Pattern | Suggested Resolution |
| --- | --- | --- |
| Entity docs | `knowledge/entity/*.md` and `docs/knowledge/entity/*.md` both describe entities such as Loan, Mortgage, Liability, and Asset. | Treat `knowledge/entity/**` as canonical unless a roadmap item explicitly keeps legacy docs. |
| Security and audit | Security, audit, permission, and governance sections repeat in catalogs, entities, and supporting docs. | Reference `knowledge/security/**` for shared controls and keep only domain-specific deltas locally. |
| Reporting and dashboard | Decision and goal reporting repeat metrics, views, audit, and testing patterns from dashboard/supporting docs. | Split reporting files and centralize reusable reporting conventions. |
| Executable specification addenda | Phase 2 addenda repeat across catalog and framework files. | Convert repeated addendum structure into a standard section template or checklist reference. |

## Recommended Actions

1. Run Worker AE and AF from `next-sub-agent-split-batch-19.md` to reduce entity duplication pressure.
2. Create a source-of-truth note for `docs/knowledge/entity/**` before editing legacy entity files.
3. Standardize repeated `Final Consistency Matrix` and `Completion Checklist` sections before adding more Phase 2 addenda.
