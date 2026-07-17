> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses GitHub Pages, Static PWA, Browser Runtime, Offline-first behavior, IndexedDB Persistence, Local Calculation Runtime, and IndexedDB Repository Adapters. Future Optional Architecture must not be required for v1.

# Roadmap

## Phase 1 Repository Baseline

Align entry points, architecture decisions, validation scripts, and governance documents around ADR-001 Static Local First PWA.

## Phase 2 Static PWA Foundation

Implement React + TypeScript + Vite Static PWA on GitHub Pages with service worker and offline-first validation.

## Phase 3 Browser Domain/Application Runtime

Keep Domain and Application layers browser-side, framework-independent, and independent from concrete IndexedDB APIs.

## Phase 4 IndexedDB Persistence

Implement Repository Interfaces, IndexedDB Repository Adapters, export/import backup, and schema migration.

## Phase 5 Calculation Runtime

Implement loan, investment, cash flow, retirement, and home upgrade calculators in the Local Calculation Runtime.

## Phase 6 Scenario and Decision Runtime

Support optimistic, base, conservative, and stress scenarios with IndexedDB Runtime persistence.
Compare options and produce structured decision outputs in the Browser Runtime.

## Phase 7 Dashboard Workflow

Implement Offline-first dashboards and scenario forms backed by Browser Runtime and IndexedDB Runtime.

## Phase 8 Backup and Migration

Implement export/import backup and released-schema migration validation.

## Phase 9 GitHub Pages Deployment

Validate static assets, manifest, service worker, Knowledge JSON, offline cache, and deployment artifact.

## Future Cloud Phase

ASP.NET Core, PostgreSQL, EF Core, Server REST API, Cloud Database, Authentication Server, Multi-device Sync, hosted APIs, cloud persistence, sync, and AI-assisted explanations are Future Optional Architecture only.