# PWA Repository Interface

## Status

Accepted for Atlas v1 PWA Runtime.

## Purpose

This document defines the Atlas v1 Browser Runtime repository boundary. It follows `docs/architecture/ADR-001-static-local-first-pwa.md` and does not redefine Domain meaning, Business Rules, Formula, Entity, or Calculation behavior.

## Repository Interface Principle

Repository Interfaces remain technology-neutral. Atlas v1 uses Browser IndexedDB Persistence through replaceable adapters.

## PWA v1 Adapters

| Repository Boundary | PWA v1 Adapter | Runtime |
| --- | --- | --- |
| Settings Repository | IndexedDB settings adapter | Browser Runtime |
| Scenario Repository | IndexedDB scenario adapter | Browser Runtime |
| Backup Repository | JSON export/import adapter over IndexedDB | Browser Runtime |
| Migration Repository | IndexedDB metadata adapter | Browser Runtime |

## Future Cloud Mapping

ASP.NET Core, PostgreSQL, EF Core, SQL Server, Remote API, Authentication Server, and Multi-device Sync are Future Optional Architecture only. They may provide future repository adapters, but they are not required by Atlas v1 and must not change existing Domain meaning.

## Invariants

- Core PWA features must run without backend startup.
- Scenario runtime data must persist locally in IndexedDB.
- Export/import backup must be local and user-controlled.
- Backup restore must require explicit user confirmation before replacing local runtime data.
- IndexedDB migration metadata must be tracked locally in the Browser Runtime.
- Repository adapters must not turn REST contracts into IndexedDB APIs.
- Generated Knowledge JSON remains a build artifact and must not be manually maintained.
