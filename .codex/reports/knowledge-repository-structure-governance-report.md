# Atlas Repository Structure Governance Report

## Executive Assessment

Repository structure decision is approved. Migration Readiness is Ready for Repository Structure Migration Batch S1. Phase 2 remains paused until S10 Repository Validation passes.

## Approved Manual Structure Decision

| Policy | Decision |
|---|---|
| Canonical Knowledge Root | knowledge/ |
| Project Documentation Root | docs/ |
| Codex Control Root | .codex/ |
| Legacy Knowledge Root | docs/knowledge/ |
| Pipeline Report Root | .codex/reports/ |
| PWA Knowledge Source | knowledge/ |
| PWA Publication Strategy | BUILD_COPY_FROM_KNOWLEDGE |
| GitHub Pages Strategy | VITE_GITHUB_ACTIONS_DIST |
| Knowledge Consolidation | MERGE_DOCS_KNOWLEDGE_INTO_KNOWLEDGE |
| Application Architecture | STATIC_FIRST_PWA |
| Runtime Database Requirement | NO_REQUIRED_RUNTIME_DATABASE |
| Runtime Content Source | BUILD_TIME_GENERATED_STATIC_ASSETS |
| Migration Strategy | PHYSICAL_MOVE_WITH_REFERENCE_REPAIR |
| Permanent Mirror Policy | Not allowed |
| Symlink Policy | Not allowed |
| Reference Repair Policy | REFERENCE_REPAIR_REQUIRED |
| Phase 2 Resume Policy | Resume only after S10 Repository Validation passes |

## Knowledge Consolidation Governance

- `knowledge/` is the only canonical Atlas knowledge root.
- `docs/knowledge/` is a legacy source and must be merged into `knowledge/` through controlled migration batches.
- Canonical files already under `knowledge/entity/` must not be overwritten by duplicate legacy files.
- Legacy duplicate files must be marked Superseded or moved only when they represent distinct specifications.
- After migration, reference repair, manifest rebuild, PWA publication validation, and repository validation pass, `docs/knowledge/` is removable.
- Permanent mirrors, symlinks, and manually maintained duplicate Markdown copies are not allowed.

## Static-first PWA Governance

- The project should target a static-first PWA architecture.
- Runtime must not require a backend database for knowledge publication.
- `knowledge/` Markdown is transformed at build time into static assets such as JSON indexes, bundled Markdown, or pre-rendered content.
- The generated PWA should be served from `dist/` through Vite and GitHub Actions Pages deployment.
- HashRouter remains the preferred routing strategy for GitHub Pages.
- Service Worker cache should provide offline support for generated assets.
- IndexedDB is optional browser-local cache only and must not be treated as a required DB dependency.
- Runtime must not depend on repository raw paths such as `docs/knowledge/**` or `knowledge/**`.

## Batch S1 Readiness

| Check | Result |
|---|---|
| S1 MOVE Entries | 13 |
| Missing Source Path | 0 |
| Existing Target Path | 0 |
| Manifest Source | Exists |
| Manifest Target | Does not exist |
| Ready for S1 | Yes |

## Static PWA Implementation Gap

- `frontend/` currently contains only `README.md`.
- No Vite PWA source tree is present yet.
- Static PWA implementation should be planned for S7 or an independent PWA Publication Batch.
- The implementation should generate `dist/` from static assets and must not require a backend database.
- Generated content should be loaded from build artifacts such as `public/knowledge/index.json`, document JSON payloads, and a client-side search index.

## Duplicate Specification Groups

- Asset, Household, Liability, Loan, Mortgage: knowledge/entity/<Entity>.md is Canonical; docs/knowledge duplicates are Superseded.
- Remaining duplicate groups: resolved by existing migration mapping or RELATED_BUT_DISTINCT classification; no manual decisions remain.

## Migration Risk Assessment

| Metric | Value |
|---|---:|
| Actual Markdown Count | 214 |
| Migration Mapping Entries | 214 |
| MOVE | 178 |
| SUPERSEDE | 5 |
| Manual Decision Required | 0 |
| Legacy Reference Repair | 464 |
| Target Path Conflict | 0 |
| Target Path Case Conflict | 0 |
| Canonical Subject Conflict | 0 |
| Missing Target Path | 0 |
| Missing Rollback Path | 0 |
| Missing Reference Repair Mapping | 0 |

## Migration Readiness

Ready
