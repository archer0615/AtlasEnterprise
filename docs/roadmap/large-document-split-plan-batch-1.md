# Large Document Split Plan - Batch 1

## Purpose

This plan identifies the first oversized knowledge documents that should be split when the repository moves from broad canonical catalogs toward smaller, maintainable implementation references.

## Split Candidates

| Priority | File | Approx. Size KB | Suggested Split Axis |
| ---: | --- | ---: | --- |
| 1 | `knowledge/catalog/system-module-catalog.md` | 1044.1 | Module family or bounded context |
| 2 | `knowledge/framework/automation-framework.md` | 1025.0 | Trigger, workflow, policy, audit, and execution sections |
| 3 | `knowledge/catalog/service-catalog.md` | 981.9 | Application service, domain service, infrastructure service |
| 4 | `knowledge/framework/scheduler-framework.md` | 899.8 | Schedule model, execution, retry, monitoring, governance |
| 5 | `knowledge/framework/background-job-framework.md` | 843.9 | Job model, queue, retry, worker, observability |

## Batch 1 Recommendation

Start with `system-module-catalog.md` because it is the largest catalog and likely acts as an index for other catalogs. Split it into smaller files only after extracting a stable table of contents and confirming whether frontend search depends on the current single-file path.

## Guardrails

- Preserve canonical meaning and headings during split.
- Update cross references in the new files.
- Rebuild `frontend/knowledge/` after the split.
- Verify `index.json`, `search-index.json`, and generated document count.
- Avoid renaming unrelated files in the same batch.
