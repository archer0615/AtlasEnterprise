> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.

# Development Rules

## Priorities
1. Financial correctness
2. Explicit assumptions
3. Unit tests
4. Clear domain boundaries
5. Simple API
6. Simple UI

## Rules
- Use `Future Cloud Architecture adapter`.
- Use `decimal` for money.
- Support TWD and USD.
- FX rate is manual in v1.
- Controllers must be thin.
- Financial rules must not be hard-coded inside controllers.
- All calculators require xUnit tests.

## Do Not Build in v1
- Authentication
- Multi-user support
- Bank API integration
- Brokerage API integration
- Live market data
- Complex mobile UI
