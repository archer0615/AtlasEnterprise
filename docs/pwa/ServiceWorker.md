# Service Worker Specification

The service worker provides offline startup, versioned shell caching, safe static asset handling, and update detection for the Atlas Enterprise PWA.

## Responsibilities

- Cache the versioned application shell.
- Serve cached assets offline.
- Detect new deployments.
- Never cache personal exports, imported files, or sensitive runtime data.
- Avoid intercepting browser-local IndexedDB operations.

## Lifecycle

| Phase | Behavior |
| --- | --- |
| Install | Cache immutable build assets and required static shell files. |
| Activate | Remove obsolete named caches and claim the current cache version when safe. |
| Fetch | Use cache-first for hashed assets and network-first or stale-while-revalidate for safe static metadata. |
| Update | Notify the user and reload only after user approval when unsaved work exists. |

## Safety Rules

- Cache names must include the application build version.
- User financial data, backup files, imported files, and private diagnostics must not enter Cache Storage.
- The service worker must preserve offline startup even when the network is unavailable.
- Update activation must coordinate with the PWA update strategy and local data migration flow.
