# Cache Strategy

The PWA cache strategy separates immutable application assets, generated knowledge content, HTML entry points, install metadata, and user-owned financial data.

| Resource | Strategy |
| --- | --- |
| Hashed JS/CSS/assets | Cache-first |
| index.html | Network-first with cached fallback |
| manifest/icons | Stale-while-revalidate |
| Knowledge content bundled with app | Versioned cache |
| User financial data | Never use Cache Storage |
| Backup files | Never cache |
| Third-party API responses | Disabled by default |

## Cache Rules

- Every cache name includes application build version.
- Old application caches may be removed after the new service worker activates.
- Knowledge cache invalidation must follow generated content versioning.
- User financial data belongs in local storage repositories such as IndexedDB, not Cache Storage.
- Backup exports must be generated as user-controlled files and must not be retained by the service worker.

## Validation

- Reload while online and offline.
- Confirm `index.html` falls back to the cached shell.
- Confirm generated knowledge assets resolve from the expected build cache.
- Confirm sensitive local data never appears in Cache Storage.
