# Document Governance Report - 2026-07-15

## Scope

This report summarizes the current project documentation state after Markdown inventory reconciliation, short document enrichment, generated knowledge rebuild, PWA validation, and local Git commits.

## Current State

- Markdown inventory is aligned with actual project Markdown files.
- Knowledge build generates 153 runtime documents from `knowledge/**/*.md`.
- PWA validation passes with the generated knowledge index.
- Search index contains 153 documents, matching the generated document count.
- Knowledge hash validation passes with 0 mismatches.
- Static artifact readability validation passes with 0 malformed generated documents.

## Generated Artifact Governance

- Canonical source files remain under `knowledge/**/*.md`.
- Generated runtime artifacts live under `frontend/knowledge/`.
- `frontend/knowledge/index.json` is the generated document catalog.
- `frontend/knowledge/search-index.json` is the generated search catalog.
- `frontend/knowledge/documents/*.json` contains one generated JSON payload per canonical knowledge Markdown file.
- Generated artifacts are committed because the static PWA reads them directly at runtime.
- The build script clears stale generated document JSON before writing current artifacts.
- PWA validation fails if generated document count, search index count, and index count diverge.

## Category Coverage

| Category | Markdown Files | Approx. Size KB |
| --- | ---: | ---: |
| api | 2 | 474.8 |
| catalog | 16 | 7730.6 |
| engine | 6 | 142.9 |
| entity | 18 | 1113.4 |
| framework | 43 | 3176.8 |
| integration | 1 | 655.7 |
| reporting | 7 | 300.1 |
| rule | 5 | 23.1 |
| security | 5 | 804.8 |
| supporting | 52 | 2415.7 |
| workflow | 1 | 3.8 |

## Large Document Candidates

These files are the strongest candidates for future split planning:

- `knowledge/catalog/system-module-catalog.md`
- `knowledge/framework/automation-framework.md`
- `knowledge/catalog/service-catalog.md`
- `knowledge/framework/scheduler-framework.md`
- `knowledge/framework/background-job-framework.md`
- `knowledge/catalog/domain-model-catalog.md`
- `knowledge/catalog/bounded-context-catalog.md`
- `knowledge/catalog/application-service-catalog.md`
- `knowledge/supporting/event-driven-architecture.md`
- `knowledge/catalog/message-contract-catalog.md`

## Remaining Short Documents

The remaining sub-600 byte Markdown files are all under `.codex/`. They are operational instruction files and should be edited only when `.codex/` write permissions are available or when the instruction policy is intentionally changed.

## Recommended Next Actions

- Split oversized catalog and framework documents by bounded context or component type.
- Add governance metadata to generated indexes only if the frontend needs it.
- Keep generated `frontend/knowledge/` artifacts committed after knowledge source changes.
- Preserve `.codex/` files as policy inputs unless explicitly migrating them into `docs/`.
