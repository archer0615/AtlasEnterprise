# Project Atlas Enterprise
# docs/specification/00-Vision.md

Version: 2.0  
Status: Approved Architecture Direction  
Architecture: Local-First Static PWA

## 1. Vision

Project Atlas is a **Life Financial Decision Operating System** for long-term, high-impact personal and household financial decisions.

Atlas is not an accounting application, stock trading platform, insurance sales system, or generic budgeting tool. It integrates cash flow, assets, liabilities, property, loans, investment, insurance, retirement, goals, scenarios, and explainable decisions.

## 2. Product Mission

Enable individuals and families to make consistent, rational, traceable financial decisions that improve lifetime resilience, flexibility, and financial freedom.

## 3. Delivery Model

Atlas v1 is delivered as a static, installable, local-first Progressive Web App hosted on GitHub Pages.

The application shall:

- Execute all Domain, Formula, Scenario, KPI, and Decision logic in the browser.
- Persist user data in IndexedDB.
- Remain usable without network access after installation.
- Require no server, database server, login service, or cloud account for the primary workflow.
- Keep financial data on the user's device by default.
- Support encrypted export and restore.
- Preserve an optional future migration path to a .NET 8 API and PostgreSQL.

## 4. Core Principles

1. Decisions before transactions.
2. Cash flow before net worth.
3. Risk before return.
4. Liquidity before optimization.
5. Local data ownership before cloud dependency.
6. Offline capability before remote integration.
7. Every calculation must be deterministic, versioned, and traceable.
8. Every recommendation must be explainable.
9. Domain and Application layers must not depend on React, IndexedDB, or browser-specific APIs.
10. Static hosting must not weaken financial-data security.

## 5. Target Users

Primary: individual or household users operating Atlas on trusted personal devices.

Future: multi-device users, shared households, financial planners, and cloud-assisted users.

## 6. Non-Goals for v1

- No server-side authentication.
- No multi-user collaboration.
- No automatic bank or brokerage synchronization.
- No centralized cloud database.
- No background server jobs.
- No secret API keys embedded in the client.
- No direct securities execution.
- No legal, tax, or licensed-adviser replacement.

## 7. Technology Direction

### v1 Local-First PWA

- React
- TypeScript
- Vite
- Progressive Web App
- Web App Manifest
- Service Worker
- IndexedDB
- Dexie or idb
- Zod
- React Router with HashRouter
- Vitest
- Playwright
- GitHub Actions
- GitHub Pages

### Future Optional Cloud Layer

- .NET 8
- ASP.NET Core REST API
- PostgreSQL
- EF Core
- Authentication and household sharing

The future cloud layer is not required by the v1 Domain Model.

## 8. Success Criteria

- The complete core workflow functions offline.
- User data remains available after browser restart.
- Schema upgrades preserve existing data.
- Backup files can be encrypted, validated, imported, and migrated.
- GitHub Pages deployment is reproducible.
- No personal financial data is committed to the repository.
- A future remote repository implementation can replace IndexedDB without changing Domain logic.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-07-09 | Initial vision |
| 2.0 | 2026-07-11 | Adopted Local-First Static PWA and GitHub Pages |
