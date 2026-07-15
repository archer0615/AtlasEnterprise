# Project Atlas Enterprise v1.0

Project Atlas / LifeOS is a personal life-finance decision-support system. It is not a bookkeeping app.

The system should support long-term decisions:
- 2027 repayment of ordinary mortgage portion
- 2031+ home upgrade
- Whether to sell or keep the current home
- Car purchase timing and financing
- Retirement readiness
- Investment and cash-flow stress testing

## Current implementation direction

The repository is being organized as a static-first PWA knowledge application.

- Source knowledge lives in `knowledge/**/*.md`.
- Runtime knowledge data is generated into `frontend/knowledge/`.
- The frontend reads static JSON files and does not require a backend database.
- The PWA shell lives in `frontend/`.

## Repository navigation

- `knowledge/` contains canonical domain, rule, engine, framework, and supporting Markdown knowledge.
- `docs/` contains product specifications, PWA implementation notes, database design, API notes, roadmap, and governance reports.
- `frontend/` contains the static PWA shell and generated knowledge JSON consumed at runtime.
- `frontend/knowledge/` is generated output; update `knowledge/**/*.md` first, then rebuild.
- `backend/`, `database/`, `ai/`, and `simulator/` are reserved implementation areas documented by their local README files.

## Validation commands

- `npm run build:knowledge`
- `npm run validate:pwa`
- `npm run build`
