# Database

The active architecture does not require a Future Architecture server database. Atlas Enterprise is organized as a static-first PWA knowledge application, with canonical knowledge stored in Markdown and runtime content generated as static assets.

## Current Role

- Document future persistence options without making them runtime requirements.
- Preserve database design references for domain modeling, ERD review, and possible backend expansion.
- Support local-first storage decisions through `docs/database/` and `docs/pwa/IndexedDBDesign.md`.

## Boundaries

- Do not add a required database to the PWA shell.
- Do not treat generated frontend knowledge JSON as canonical source data.
- Do not duplicate canonical Markdown knowledge into database migration files unless an architecture decision requires it.

## Reference Documents

- `docs/database/05-DatabaseDesign.md`
- `docs/database/06-ERD.md`
- `docs/pwa/IndexedDBDesign.md`
- `knowledge/framework/database-governance-framework.md`
