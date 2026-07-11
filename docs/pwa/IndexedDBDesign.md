# IndexedDB Design

The canonical store catalog is defined in `docs/05-DatabaseDesign.md`.

## Repository Rules

- Repository interfaces live in Application or Domain abstractions.
- Dexie/idb implementations live in Infrastructure.
- Every write validates schema and aggregate invariants.
- Multi-store mutations use one transaction where supported.
- Scenario and calculation snapshots are immutable.
- A storage health check runs on startup.
- Quota errors produce actionable backup guidance.
