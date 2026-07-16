# Consistency Template - 2026-07-16

## Purpose

Standardize repeated `Final Consistency Matrix`, `Completion Checklist`, and Phase 2 addendum sections to reduce drift across large specifications.

## Final Consistency Matrix Template

| Area | Required Check | Status | Evidence |
| --- | --- | --- | --- |
| Ownership | Canonical source and owner are explicit. | Pending | Link to parent specification. |
| Scope | Included and excluded behaviors are stated. | Pending | Section reference. |
| Cross-links | Related specs use relative links and resolve. | Pending | Link check or review note. |
| Governance | Security, audit, retention, and testing are covered or referenced. | Pending | Governance section reference. |
| Generated Artifacts | Generated files are updated only through build scripts. | Pending | Build command output. |

## Completion Checklist Template

- Parent file has `Split Navigation` when child split documents exist.
- Child split documents link back to the canonical parent.
- Canonical behavior remains in the parent unless explicitly migrated.
- Duplicated legacy docs are marked as reference copies or retired.
- `npm run build:knowledge` passes after documentation changes.
- `npm run validate:frontend` passes after generated index updates.

## Phase 2 Addendum Rule

- Use the same addendum title consistently: `## Phase 2 Executable Specification Addendum`.
- Keep generated examples and executable rules in the canonical parent or a named split document.
- Avoid copying the same checklist text into unrelated files; link to this template instead.
