# Codex Persistence Rules — IndexedDB

- Use Dexie or idb only in Infrastructure.
- Use UUID strings.
- Persist record envelopes with schemaVersion and aggregateVersion.
- Add indexes only for defined query requirements.
- Implement transactional repositories.
- Implement migration tests from every released schema.
- Implement export/import contract tests.
- Never use localStorage for authoritative financial data.
