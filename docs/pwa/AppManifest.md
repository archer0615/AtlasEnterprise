# Web App Manifest Specification

Required fields:

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

Rules:

- Paths must work under the GitHub repository base path.
- Icons shall include maskable variants.
- Manifest changes require install and upgrade tests.
- No user or financial data may be embedded.
