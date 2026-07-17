> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.

> **PWA v1 Architecture Amendment (2026-07-11):** ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, Multi-device Sync, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content is Future Optional Architecture only. Atlas v1 uses GitHub Pages, Static PWA, Browser Runtime, Offline-first behavior, IndexedDB Persistence, Local Calculation Runtime, in-process TypeScript Application Use Cases, and IndexedDB Repository Adapters. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# Codex Architecture Rules — Atlas PWA

1. Target React + TypeScript + Vite Static PWA on GitHub Pages.
2. Do not create a required .NET, ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, or Multi-device Sync dependency for v1.
3. Treat Future Cloud Architecture as optional adapters only.
4. Keep Domain and Application code browser-framework independent.
5. Use repository interfaces and IndexedDB Repository Adapters.
6. Use HashRouter for GitHub Pages.
7. Never place secrets or real financial data in the repository.
8. Backup, restore, schema migration, offline operation, and traceability are MVP requirements.
9. Preserve optional future RemoteRepository and Future Cloud Architecture adapter compatibility without changing Domain meaning.
10. Do not alter Atlas business concepts to fit IndexedDB.
