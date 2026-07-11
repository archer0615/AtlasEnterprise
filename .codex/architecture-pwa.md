> **PWA v1 Architecture Amendment (2026-07-11):** Any PostgreSQL, EF Core, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase mapping. Atlas v1 uses in-process TypeScript Application Use Cases and IndexedDB repositories. Domain names, business rules, validation rules, formulas, events, and state machines remain authoritative.

# Codex Architecture Rules — Atlas PWA

1. Target React + TypeScript + Vite static PWA.
2. Do not create a required .NET server for v1.
3. Do not implement PostgreSQL or EF Core for v1.
4. Keep Domain and Application code browser-framework independent.
5. Use repository interfaces and IndexedDB adapters.
6. Use HashRouter for GitHub Pages.
7. Never place secrets or real financial data in the repository.
8. Backup, restore, migration, offline operation, and traceability are MVP requirements.
9. Preserve optional future RemoteRepository and ASP.NET Core adapter compatibility.
10. Do not alter Atlas business concepts to fit IndexedDB.
