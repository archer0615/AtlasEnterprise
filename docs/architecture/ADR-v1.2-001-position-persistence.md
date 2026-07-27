# ADR-v1.2-001: Position Persistence

## Status

Accepted for planning, not approved for runtime implementation.

## Context

Position has canonical knowledge coverage under `knowledge/entity/position/**`, but the current PWA runtime does not persist position-level holdings. v1.1 intentionally deferred Position persistence because it requires schema, migration, backup, restore, owner isolation, and rollback decisions.

## Decision

Position persistence may only proceed after a dedicated implementation batch proves all persistence gates. The accepted architecture direction is local-first IndexedDB persistence with owner-scoped records and no external brokerage, market data, trading, or cloud dependency.

Required store shape:

- Store name: `positions`
- Required indexes: `ownerId`, `portfolioId`, `assetType`, `updatedAt`
- Required ownership fields: `positionId`, `ownerId`, `householdId`, `portfolioId`
- Required valuation fields: `quantity`, `unitCost`, `marketValue`, `currency`, `valuationDate`
- Required audit fields: `createdAt`, `updatedAt`, `version`

## Constraints

- No migration may be added without backup and restore E2E coverage.
- No market price API may be required.
- No broker integration may be added.
- No automated trade execution may be implied.
- Portfolio projections must continue to work when no Position records exist.
- Backup export must include Position records only after backup schema versioning is accepted.

## Consequences

Position persistence remains blocked for runtime until ADR-v1.2-002 backup schema versioning is accepted and tests exist. This ADR narrows the architecture but does not authorize code changes.

## Required Validation Before Runtime

- `npm run test:backup-restore-e2e`
- `npm run validate:backup-security`
- `npm run test:local-repositories`
- `npm run validate:runtime-boundaries`
- `npm run validate:feature`
