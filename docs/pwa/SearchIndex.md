# Search Index

The static PWA uses a generated search index at `frontend/knowledge/search-index.json`.

## Generation

`frontend/scripts/build-knowledge-index.mjs` reads `knowledge/**/*.md` and generates:

- `frontend/knowledge/index.json`
- `frontend/knowledge/search-index.json`
- `frontend/knowledge/documents/*.json`

## Search Fields

Each search entry includes:

- `id`
- `title`
- `category`
- `path`
- `headings`
- `keywords`
- `terms`

## Runtime Behavior

The frontend loads the search index once with static `fetch`.

Search scoring prioritizes:

- Title matches
- Path matches
- Full generated term matches

The current implementation remains static-only and does not require a backend search service or database.
