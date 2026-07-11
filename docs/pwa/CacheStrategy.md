# Cache Strategy

| Resource | Strategy |
|---|---|
| Hashed JS/CSS/assets | Cache-first |
| index.html | Network-first with cached fallback |
| manifest/icons | Stale-while-revalidate |
| Knowledge content bundled with app | Versioned cache |
| User financial data | Never use Cache Storage |
| Backup files | Never cache |
| Third-party API responses | Disabled by default |

Every cache name includes application build version.
