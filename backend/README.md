# Backend

The current implementation direction is static-first PWA, so the backend is not required for the primary runtime path. This directory is reserved for future server-side services that cannot be handled safely or efficiently by the static frontend.

## Reserved Scope

- Optional API services for sync, shared accounts, or integrations.
- Server-side job processing for workflows that require trusted execution.
- Secure storage adapters if local-first storage is later extended to multi-device scenarios.
- Integration gateways for external financial, calendar, notification, or reporting systems.

## Current Constraint

- Do not introduce a backend dependency for core knowledge browsing, PWA startup, or local scenario work.
- Frontend runtime data should continue to come from static generated artifacts unless a documented architecture decision changes this.
- Backend behavior must align with `docs/api/`, `docs/specification/`, and `knowledge/api/`.

## Implementation Notes

- Keep APIs deterministic, versioned, and auditable.
- Avoid duplicating domain rules that already belong in `knowledge/rule/`.
- Treat local-first behavior as the baseline user experience.
