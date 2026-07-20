# Knowledge Explorer and Global Search

## Generated Inputs

- Generated index: `frontend/knowledge/index.json`.
- Search index: `frontend/knowledge/search-index.json`.
- Document JSON: `frontend/knowledge/documents/*.json`.

## Search Scope

Search covers title, heading, keyword, catalog, entity, rule, command, and event text when present in generated document metadata.

## Runtime Behaviors

- Ranking weights title, keyword, category, heading, then body/summary.
- Highlight output records matched tokens.
- Filters support category-level narrowing.
- Heading anchors are generated from document headings.
- Recent searches are de-duplicated and capped.
- Related documents and backlinks are derived from shared metadata and explicit links.
- Relationship graph contains document nodes and link edges.

## Command Palette

Ctrl/Cmd+K should expose:

- Navigation commands.
- Knowledge Search commands.
- App commands such as export, backup, validation, and scenario actions.

## Validation Targets

- Offline index loading.
- Keyboard operation.
- Screen reader labels.
- Mobile layout.
- Query latency.
- Memory growth.
