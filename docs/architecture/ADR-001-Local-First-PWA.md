# ADR-001 — Adopt Local-First Static PWA

Status: Accepted  
Date: 2026-07-11

## Context

Atlas v1 is a personal financial decision system requiring privacy, offline operation, low hosting cost, and simple deployment.

## Decision

Use React + TypeScript + Vite as a static PWA hosted on GitHub Pages. Execute Domain and Engine logic in-browser. Persist data in IndexedDB. Provide encrypted backup and restore. Keep repository interfaces compatible with a future remote implementation.

## Consequences

Positive: no server operations, low cost, offline access, local ownership, simple release path.

Negative: browser storage can be cleared, multi-device sync is unavailable, no secure client-side secrets, background work is limited, data recovery depends on backups.

## Guardrails

- No secrets in client bundles.
- No sensitive data in Git.
- No Domain dependency on browser infrastructure.
- Backup and migration are MVP capabilities.
- Future cloud support is additive.
