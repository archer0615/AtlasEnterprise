# Asset Liability Runtime

## Purpose
Add a local-first vertical slice for Asset, Liability, and Net Worth without backend, cloud sync, authentication, or fixture fallback in user mode.

## Canonical Specification
The slice uses existing Atlas concepts for Asset, Liability, User ownership, Currency, Money, Audit, Repository, Command, Domain Event, and Validation Rule.

## Ownership
`createCurrentOwnerProvider()` resolves the current owner from settings and falls back to `default-user` as the existing local profile owner.

## Runtime Contracts
Asset and liability contracts define the MVP property sets, commands, and event names in domain modules.

## Commands
Application services expose create, update, archive, restore, get, and list commands for assets and liabilities.

## Validation
Pure validation modules enforce name, owner, type, currency, numeric amount, date, status, and archived update restrictions.

## Repository
Repository contracts document required operations. IndexedDB repositories return cloned immutable records and isolate data by owner.

## IndexedDB Schema
Database version is `4`. Stores added: `assets` and `liabilities`. Asset indexes: ownerId, status, assetType, currency, valuationDate, updatedAt. Liability indexes: ownerId, status, liabilityType, currency, asOfDate, updatedAt.

## Application Services
Services resolve current owner, validate command input, enforce duplicate-name and ownership rules, persist through repositories, and write audit evidence.

## Feature Controllers
The current browser integration is wired through the existing runtime shell and dedicated asset/liability inputs. Feature folder extraction can follow without schema change.

## Feature Views
Views render list, empty state, archive/restore action, validation feedback, currency, value, balance, and net worth.

## Net Worth Projection
`projectNetWorth()` computes total assets, total liabilities, and net worth as `totalAssets - totalLiabilities`; archived and inactive records are excluded.

## Dashboard Integration
The local data panel shows user data directly and does not convert runtime errors into demo fixture values.

## Backup and Restore
Plain and encrypted backup payloads include `assets` and `liabilities`. Legacy backup payloads without those collections remain valid.

## Audit
Create, update, archive, and restore commands save sanitized audit evidence with entity type, entity ID, owner ID, operation, timestamp, and result.

## Security
No complete record, backup payload, passphrase, or sensitive note is logged. Data stays in IndexedDB and backup exports.

## Offline Behavior
Service worker shell coverage includes new runtime modules. IndexedDB remains the local data source and is not cached by the service worker.

## Dependency Direction
UI calls application services; services call domain validation and repositories; repositories call IndexedDB; runtime projection stays DOM independent.

## Illegal Dependencies
Views must not access IndexedDB, repositories must not access DOM, and domain/runtime modules must not import fixtures or browser globals.
