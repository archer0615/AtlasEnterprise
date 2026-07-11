# Service Worker Specification

## Responsibilities

- Cache the versioned application shell.
- Serve cached assets offline.
- Detect new deployments.
- Never cache personal exports, imported files, or sensitive runtime data.
- Avoid intercepting browser-local IndexedDB operations.

## Lifecycle

Install → cache immutable build assets.  
Activate → remove obsolete named caches.  
Fetch → cache-first for hashed assets; network-first or stale-while-revalidate for safe static metadata.  
Update → notify the user and reload only after user approval when unsaved work exists.
