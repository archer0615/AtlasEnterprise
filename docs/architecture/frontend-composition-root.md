# Frontend Composition Root

## Purpose
`frontend/src/main.js` is the browser entry point. It delegates bootstrap, context creation, lifecycle control, and fatal error handling to `frontend/src/app/`.

## Current Problem
The previous entry point mixed DOM lookup, event registration, rendering, IndexedDB access, backup, restore, PWA state, knowledge search, scenario commands, and dashboard orchestration.

## Composition Root
`bootstrapApplication()` builds the application context, initializes the lifecycle, and returns an application handle with `dispose()` and `isInitialized()`.

## Application Context
`buildApplicationContext()` owns shared services, DOM registry, listener registry, and feature controller construction.

## Dependency Direction
`main -> app -> feature controllers -> feature views -> shared UI utilities`.

## Feature Boundaries
Feature folders exist for dashboard, scenario, decision, knowledge, loan, portfolio, backup, profile, navigation, and PWA.

## Lifecycle
`createApplicationLifecycle()` prevents duplicate initialization, supports disposal, and allows reinitialization.

## DOM Registry
Required DOM failures use `ATLAS_REQUIRED_ELEMENT_MISSING` with feature, element ID, selector, and initialization phase.

## Error Handling
Application errors use explicit Atlas runtime codes and avoid logging backup content, passphrases, encryption keys, or profile details.

## Feature Communication
Feature-to-feature coordination stays callback based through controllers. No event bus, global mutable store, or dependency injection framework was introduced.

## Testing Strategy
Bootstrap, DOM registry, listener registry, lifecycle, and feature integration are covered by focused frontend scripts.

## Illegal Dependencies
Views do not import repositories, IndexedDB runtime, runtime projection, or feature-specific services.
