# PWA Offline Update Storage

## Runtime Contracts

- App shell versioning uses `frontend/sw-version.js`.
- Knowledge cache manifest is generated from static frontend knowledge assets.
- Cache cleanup removes obsolete cache versions during activation.
- Update detection identifies waiting service workers.
- Safe activation is allowed only when local writes are not pending.

## UX States

| State | Meaning |
| --- | --- |
| Offline Indicator | Browser is offline or service worker serves cached assets. |
| Update Available | New service worker is waiting. |
| Apply Update | User can activate the waiting update. |
| Stale Data | Cache version differs from latest known version. |
| Quota Warning | Storage usage approaches quota. |
| Backup Reminder | Local data has not been backed up recently. |

## Test Matrix

- First install.
- Offline reload/navigation.
- Version upgrade.
- Missing cache asset.
- IndexedDB unavailable.
- Quota warning.

## Storage Boundary

Knowledge static cache and user IndexedDB data are separate. Cache cleanup must not delete user IndexedDB records. Backup/restore must operate on IndexedDB stores, not Cache Storage.

## GitHub Pages Subpath

Cache manifest diff reports must preserve `/AtlasEnterprise/` subpath compatibility.
