> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.

# Architecture

## Recommended Structure

```text
frontend/
  src/
  knowledge/
docs/
knowledge/
simulator/
backend/
database/
ai/
```

## PWA v1 Layers

- Domain: entities, value objects, enums, domain rules
- Application: use cases, calculators, simulators, decision services
- Infrastructure: Browser Runtime, IndexedDB Runtime, service worker, static Knowledge JSON
- Repository Pattern: repository interfaces with IndexedDB adapters
- Presentation: GitHub Pages Static PWA

Financial engines must be deterministic and executable in the Local Calculation Runtime.

## Future Architecture

- `backend/`, `database/`, and cloud adapters are Future Architecture only.
- Future Cloud Architecture may add hosted APIs, cloud persistence, or sync after a separate ADR.
- Future Architecture must not be required for GitHub Pages, Static PWA startup, Browser Runtime calculation, Offline First dashboards, IndexedDB scenarios, or Knowledge JSON loading.