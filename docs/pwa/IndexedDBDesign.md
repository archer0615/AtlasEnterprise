# IndexedDB Design

IndexedDB is the local-first persistence mechanism for browser-held user financial data, scenario drafts, calculation snapshots, and application diagnostics.

The canonical store catalog is defined in `docs/database/05-DatabaseDesign.md`.

## Repository Rules

- Repository interfaces live in Application or Domain abstractions.
- Dexie/idb implementations live in Infrastructure.
- Every write validates schema and aggregate invariants.
- Multi-store mutations use one transaction where supported.
- Scenario and calculation snapshots are immutable.
- A storage health check runs on startup.
- Quota errors produce actionable backup guidance.

## Data Boundaries

- Canonical knowledge remains Markdown in `knowledge/**/*.md`.
- Generated static knowledge assets are read-only runtime data.
- User-owned financial data belongs in local IndexedDB stores.
- Cache Storage must not hold user financial records, backup files, or private diagnostics.

## Operational Checks

- Validate database open, schema version, required stores, and available quota on startup.
- Record local diagnostic events for migration failures and repository write failures.
- Provide backup or export guidance before any operation that may risk data loss.
