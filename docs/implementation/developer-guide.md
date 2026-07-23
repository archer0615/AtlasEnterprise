# Developer Guide

## Layering

- Domain: contracts, status catalogs, normalization, validation.
- Runtime: pure calculations, projections, comparisons, scheduling, automation, notification generation.
- Application: owner resolution, repository orchestration, audit writes.
- Repository: technology-neutral persistence contracts.
- Infrastructure: IndexedDB adapters and browser persistence boundaries.
- Feature: UI controllers and views.

## Local Validation

```powershell
npm run validate:quick
npm run validate:feature
npm run validate:full
```

## Runtime Constraints

Runtime code must not import DOM, IndexedDB, fixtures, or feature modules.
