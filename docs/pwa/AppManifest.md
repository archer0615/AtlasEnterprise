# Web App Manifest Specification

The manifest defines install behavior, display mode, icon metadata, theme colors, and static deployment paths for the Atlas Enterprise PWA.

## Required Fields

```json
{
  "name": "Project Atlas",
  "short_name": "Atlas",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#111827",
  "background_color": "#111827",
  "icons": []
}
```

## Rules

- Paths must work under the GitHub repository base path.
- Icons shall include maskable variants.
- Manifest changes require install and upgrade tests.
- No user or financial data may be embedded.
- The manifest must remain static and must not depend on runtime user state.

## Validation

- Confirm `start_url` and `scope` resolve correctly from the deployed base path.
- Confirm standalone display mode launches without browser navigation chrome.
- Confirm theme and background colors match the application shell.
- Confirm missing icons fail visibly during validation rather than during release.
