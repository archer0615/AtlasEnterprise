# Codex Persistence Rules — IndexedDB

- Atlas v1 persistence is IndexedDB Persistence through Repository Interfaces and IndexedDB Repository Adapters.
- ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, and Multi-device Sync are Future Optional Architecture only.
- Use Dexie or idb only in Infrastructure.
- Use UUID strings.
- Persist record envelopes with schemaVersion and aggregateVersion.
- Add indexes only for defined query requirements.
- Implement transactional repositories.
- Implement migration tests from every released schema.
- Implement export/import contract tests.
- Never use localStorage for authoritative financial data.
- Never make frontend startup or Browser Runtime calculation depend on a server database.
