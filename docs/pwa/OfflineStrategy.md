# Offline Strategy

Atlas Enterprise must treat offline usage as a first-class runtime mode. Core knowledge browsing, local household data review, scenario comparison, and decision explanation flows should remain usable without a network connection.

## Core Offline Flows

- View and edit household financial data.
- Run formulas and deterministic engines.
- Create, compare, and review scenarios.
- Generate local decisions and explanations from available data.
- Export a local backup.

## Network Boundaries

- Network-only features must be visibly marked.
- Network-only failures must not block application startup.
- Cached static knowledge may be used offline when it matches the installed build version.
- User financial data must remain in local storage and must not depend on server availability.

## Error Handling

The UI must distinguish application offline state from storage errors, migration failures, quota limits, and corrupt local data. Offline messaging should identify which actions remain available and which actions require connectivity.
