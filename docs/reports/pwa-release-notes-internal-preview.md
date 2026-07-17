# Atlas PWA Internal Preview Release Notes

## Release Type

Internal preview.

## Architecture

Atlas v1 is a Static-first, Local-first GitHub Pages PWA.

## Included Runtime Capabilities

- Static Knowledge JSON generated from canonical Markdown.
- Browser Runtime dashboard shell.
- Offline-first app shell and Knowledge asset cache.
- IndexedDB settings, scenario, backup, and migration repositories.
- Scenario create, delete, reset, export, preview, confirm, and import workflow.
- GitHub Pages project-path compatible asset loading.

## Validation

- Repository validation passes.
- PWA validation passes.
- Offline validation passes.
- Browser workflow validation passes.
- Visual regression screenshot validation passes.
- Preview smoke validation passes.

## Not Included

- ASP.NET Core Runtime.
- PostgreSQL Runtime.
- EF Core Runtime.
- Server REST API dependency.
- Authentication Server dependency.
- Multi-device Sync.

These remain Future Optional Architecture.

## Known Preview Limits

- Backup preview shows scenario counts and replacement counts, not full per-field diffs.
- Scenario validation is intentionally minimal.
- Visual regression validates generated screenshot presence and size, not pixel-level baseline drift.
