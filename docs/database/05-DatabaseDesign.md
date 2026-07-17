> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Project Atlas Enterprise
# docs/database/05-DatabaseDesign.md

Version: 2.0  
Status: Approved for PWA v1  
Storage Model: IndexedDB Local-First

## 1. Purpose

This document defines Atlas v1 browser persistence. IndexedDB is an Infrastructure concern and must not define Domain boundaries.

## 2. Architecture

```text
React Presentation
        ↓
Application Use Cases
        ↓
Domain Model and Engines
        ↓
Repository Interfaces
        ↓
IndexedDB Repository Implementations
```

No Domain object may import Dexie, IndexedDB, Service Worker, React, or browser APIs.

## 3. Persistence Technology

- IndexedDB is the authoritative local store.
- Dexie or idb may be used as an adapter library.
- localStorage may store only non-sensitive UI preferences and deployment metadata.
- Session storage must not hold authoritative financial data.
- Repository source code and GitHub Pages assets must contain no personal financial records.

## 4. Object Store Catalog

| Store | Key | Main Indexes | Purpose |
|---|---|---|---|
| users | id | updatedAt | Local profile |
| households | id | ownerUserId, updatedAt | Household aggregate |
| householdMembers | id | householdId | Household members |
| goals | id | householdId, status, targetDate | Life goals |
| assets | id | householdId, type, status | Assets |
| liabilities | id | householdId, type, status | Liabilities |
| loans | id | householdId, type, status | Loans and mortgages |
| properties | id | householdId, status | Property aggregates |
| portfolios | id | householdId, status | Portfolios |
| positions | id | portfolioId, assetType | Investment positions |
| incomeSources | id | householdId, type, active | Income |
| expenseItems | id | householdId, type, active | Expenses |
| insurancePolicies | id | householdId, status | Insurance |
| retirementPlans | id | householdId, status | Retirement plans |
| scenarios | id | householdId, type, status | Scenario aggregate |
| scenarioVersions | id | scenarioId, version | Immutable versions |
| calculationResults | id | scenarioVersionId, engine, createdAt | Engine results |
| decisions | id | householdId, scenarioId, status | Decision cases |
| recommendations | id | decisionId, level | Explainable recommendations |
| auditEntries | id | aggregateType, aggregateId, occurredAt | Local audit trail |
| appMetadata | key | - | Schema and application metadata |

## 5. Record Envelope

Every persisted aggregate record shall contain:

```ts
interface PersistedRecord<T> {
  id: string;
  schemaVersion: number;
  aggregateVersion: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  payload: T;
  checksum?: string;
}
```

## 6. Transaction Rules

- One aggregate mutation must complete in one IndexedDB transaction.
- Cross-aggregate workflows use Application Services and compensating actions.
- ScenarioVersion and CalculationResult are immutable after commit.
- Delete operations default to soft delete where decision history depends on the data.
- Import executes in a staging transaction and commits only after validation succeeds.

## 7. Schema Versioning

- IndexedDB schema versions are monotonically increasing integers.
- Each upgrade must be deterministic and idempotent.
- Historical migration functions must never be rewritten after release.
- Migration failure must leave the original database readable.
- A pre-migration backup prompt is required for destructive changes.

## 8. Concurrency

Atlas v1 assumes one active browser context, but shall handle:

- Multiple tabs using BroadcastChannel.
- Optimistic aggregateVersion checks.
- A single migration lock.
- A visible conflict message instead of silent overwrite.

## 9. Data Integrity

- Zod schemas validate records at repository boundaries.
- Domain validation remains authoritative.
- Foreign-key-like relationships are validated by repositories and application services.
- Orphaned child records are detected by integrity checks.
- Checksums are mandatory for exported backup payloads.

## 10. Backup and Restore

Backups shall include:

- backupFormatVersion
- applicationVersion
- databaseSchemaVersion
- exportTimestamp
- encrypted payload
- checksum
- KDF parameters
- encryption parameters

Plaintext export is disabled by default.

## 11. Future Cloud Mapping

The Domain Model shall remain persistence-agnostic. A future RemoteRepository may synchronize with Future Cloud Architecture adapter and Future Cloud Mapping. IndexedDB IDs use UUID-compatible strings to reduce migration friction.

## 12. Definition of Done

- All stores and indexes are declared.
- Repository contracts are covered by contract tests.
- Upgrade tests cover every released schema version.
- Export/import round-trip tests pass.
- Application remains functional offline.
- No sensitive data is stored in build artifacts.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-07-09 | Future Cloud Mapping design |
| 2.0 | 2026-07-11 | Replaced v1 persistence with IndexedDB local-first design |
