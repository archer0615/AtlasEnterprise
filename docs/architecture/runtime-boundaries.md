# Runtime Boundaries

## Purpose
Runtime boundaries keep UI, application orchestration, runtime logic, repository contracts, IndexedDB infrastructure, generated knowledge, and fixtures from leaking into each other.

## Runtime Layers
Entry, application, feature controller, feature view, runtime logic, repository contract, IndexedDB infrastructure, generated knowledge, fixture, and PWA layers.

## Dependency Direction
`entry -> app -> feature controllers -> feature views -> shared`.
Runtime modules stay feature independent. Repository contracts stay infrastructure independent.

## Entry Boundary
`frontend/src/main.js` imports only the application bootstrap layer.

## Application Boundary
`frontend/src/app/**` builds context, lifecycle, DOM registry, shared services, and controllers. It does not contain domain formulas.

## Feature Boundary
Controllers own feature orchestration. Views render view models and do not import repositories, IndexedDB, runtime projection, decision workbench, knowledge runtime, PWA runtime, or readiness policy.

## View Boundary
Views may use shared formatting and UI helpers. They cannot read fixtures, generated knowledge indexes, backup payloads, repositories, or low-level persistence APIs.

## Runtime Logic Boundary
`runtime-projection.js`, `decision-workbench.js`, `knowledge-explorer.js`, `pwa-offline-state.js`, `readiness-policy.js`, and `dashboard-model.js` stay DOM independent and feature independent.

## Repository Boundary
`frontend/src/repositories/**` documents required operations, input/output contracts, and expected error contracts without importing IndexedDB or UI.

## IndexedDB Boundary
Raw IndexedDB APIs remain inside `frontend/src/indexeddb-runtime.js` compatibility facade and `frontend/src/infrastructure/indexeddb/**`. No schema, object store, backup format, or restore semantic change was made.

## Generated Knowledge Boundary
Browser runtime reads `frontend/knowledge/**` generated artifacts. Canonical `knowledge/**` stays build-time input only.

## Fixture Boundary
Fixtures are test/demo data only. User mode must not silently fall back to fixture data after runtime errors.

## PWA Boundary
The service worker does not import feature modules. PWA feature code communicates through runtime adapters and user-visible state only.

## Error Boundary
Errors use Atlas codes for persistence, runtime data, user input, PWA runtime, backup, and restore. Sensitive content such as passphrases, keys, raw backup payloads, complete profile data, and raw object store dumps must not be logged.

## Illegal Dependencies
Views to repositories, views to runtime modules, runtime modules to features, shared modules to features, production modules to scripts, browser runtime to canonical knowledge, and service worker to features are illegal.

## Validation Rules
`npm run validate:runtime-boundaries` scans `frontend/src/**/*.js` for illegal imports, circular imports, DOM leakage in runtime logic, fixture imports, Node-only script imports, and service-worker feature imports.
