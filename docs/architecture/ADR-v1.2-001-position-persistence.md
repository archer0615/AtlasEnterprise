# ADR-v1.2-001: Position Persistence

## Status

Accepted for runtime implementation.

## Context

Position has canonical knowledge coverage under `knowledge/entity/position/**`, but the current PWA runtime does not persist position-level holdings. v1.1 intentionally deferred Position persistence because it requires schema, migration, backup, restore, owner isolation, and rollback decisions.

## Decision

Position persistence may only proceed after a dedicated implementation batch proves all persistence gates. The accepted architecture direction is local-first IndexedDB persistence with owner-scoped records and no external brokerage, market data, trading, or cloud dependency.

Required store shape:

- Store name: `positions`
- Required indexes: `ownerId`, `householdId`, `portfolioId`, `assetId`, `status`, `updatedAt`
- Required ownership fields: `positionId`, `ownerId`, `householdId`, `portfolioId`
- Required valuation fields: `quantity`, `unitCost`, `marketValue`, `currency`
- Required audit fields: `updatedAt`

## Constraints

- No migration may be added without backup and restore E2E coverage.
- No market price API may be required.
- No broker integration may be added.
- No automated trade execution may be implied.
- Portfolio projections must continue to work when no Position records exist.
- Backup export must include Position records only after backup schema versioning is accepted.

## Consequences

Position persistence is enabled through a dedicated IndexedDB v7 migration batch. Backup schema v2 includes Position payloads so export, restore dry-run, and restore staging remain schema-explicit.

## Required Validation Before Runtime

- `npm run test:backup-restore-e2e`
- `npm run validate:backup-security`
- `npm run test:local-repositories`
- `npm run test:position-repository-contract`
- `npm run test:position-indexeddb-migration`
- `npm run validate:runtime-boundaries`
- `npm run validate:feature`

## Update 2026-07-27

Position repository contract and IndexedDB migration tests now cover the implemented `positions` IndexedDB store. The runtime exports Position records only through backup schema v2.
