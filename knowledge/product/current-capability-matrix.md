# Current Capability Matrix

Document Path: knowledge/product/current-capability-matrix.md
Document Type: Atlas Enterprise Canonical Specification
Version: 2.4
Status: Canonical Specification
Domain: Product Capability
Bounded Context: Product
Owner: Project Atlas
Source of Truth: Atlas Product Capability Source of Truth
Last Updated: 2026-07-20

## Purpose

Maps the current product capabilities to implementation state, fixture support, canonical knowledge, and known gaps.

## Status Legend

- Implemented: supported by runtime code.
- Fixture-backed: supported by checked-in fixture data.
- Documented: covered by canonical or roadmap documentation.
- Gap: not yet complete or not yet canonical.

## Capability Matrix

| Capability | Implemented | Fixture-backed | Documented | Canonical Knowledge | Known Gap |
| --- | --- | --- | --- | --- | --- |
| Static-first PWA shell | Yes | N/A | Yes | Gap | Product-level PWA runtime specification pending. |
| Service worker offline cache | Yes | Yes | Yes | Gap | Cache invalidation and recovery rules need canonical product spec. |
| Generated knowledge browser | Yes | Yes | Yes | Yes | Source hierarchy now defined; search quality tuning remains future work. |
| Decision dashboard | Yes | Yes | Yes | Yes | Runtime snapshot contract needs direct field-level traceability. |
| Scenario switching | Yes | Yes | Yes | Yes | UI labels need encoding cleanup in fixture-backed views. |
| Simulator fixture validation | Yes | Yes | Yes | Yes | Formula coverage still needs amortization and refinancing depth. |
| Recommendation lifecycle | Partial | Yes | Yes | Yes | Runtime output now validates execution trace fields; UI execution controls remain staged. |
| Goal lifecycle and funding | Partial | Yes | Yes | Yes | End-to-end workflow now documented; runtime integration remains staged. |
| Portfolio allocation and reporting | Partial | Yes | Yes | Yes | Dashboard/reporting contract now validates portfolio runtime traceability; interactive reporting workflow remains staged. |
| Loan and mortgage analysis | Partial | Yes | Yes | Yes | Amortization, prepayment, refinancing fee, rate shock, and no-savings boundary fixtures are covered; production-grade UI workflow remains staged. |
| Automation workflows | Partial | N/A | Yes | Yes | Runtime scheduling and approval behavior needs implementation traceability. |
| Rule governance | Partial | N/A | Yes | Yes | Lifecycle, conflict handling, and rule test matrix added in this batch. |
| IndexedDB runtime adapters | Yes | N/A | Yes | Yes | Repository coverage is implemented for current dashboard workflows; broader aggregate adapters remain staged. |
| Backup import and export | Partial | Yes | Yes | Yes | JSON backup preview, validation, checksum, dry run, staging restore, encrypted backup repository methods, passphrase UI, encrypted export, encrypted import preview, scenario/recommendation/settings/audit backup coverage, conflict policy UI, migration preview UI, executable v2-to-current migration, multi-store restore audit report, restore controls, and backup restore E2E validation exist; backup minimization rules remain staged. |
| Local data reset and repair | Partial | Yes | Yes | Yes | Offline repair, reset controls, migration lock, coordination messages, and scenario optimistic version checks exist; merge UI remains Phase 2 work. |
| Scenario templates | Yes | Yes | Yes | Yes | Template application and saving are implemented for local scenario workflow; production-grade template governance remains staged. |
| Deployment validation | Yes | N/A | Yes | Yes | Deployment artifact manifest is static until hosting output paths are generated. |

## Governance

- New capabilities must map to at least one canonical `knowledge/**` document.
- Fixture-backed capabilities must name the fixture source and validation command.
- Runtime-only behavior must be promoted into `knowledge/product/**` or domain knowledge before it is considered canonical.
- Known gaps must remain visible until implementation, fixture, documentation, and validation are aligned.
- Capability status must be updated when `package.json` validation coverage, frontend controls, simulator output, or generated knowledge assets change.
- Partial status means the current repository has a visible implementation or fixture path, but at least one roadmap exit criterion is not yet met.

## Validation Mapping

| Capability Area | Primary Evidence | Validation Command |
| --- | --- | --- |
| PWA shell and offline cache | `frontend/sw.js`, `frontend/manifest.webmanifest`, `frontend/knowledge/document-assets.json` | `npm run validate:pwa`, `npm run validate:offline` |
| Dashboard snapshots | `frontend/fixtures/dashboard-snapshots.json`, `frontend/src/dashboard-model.js` | `npm run validate:frontend`, `npm run validate:dashboard-drift` |
| Simulator runtime | `simulator/fixtures/`, `simulator/outputs/scenario-results.json` | `npm run simulator:run`, `npm run validate:simulator` |
| Formula and score policy | `simulator/scripts/formula-contract.mjs`, `simulator/config/score-policy.json` | `npm run validate:formula-registry`, `npm run validate:score-policy` |
| Backup and IndexedDB runtime | `frontend/src/indexeddb-runtime.js`, `docs/architecture/pwa-repository-interface.md` | `npm run validate:frontend`, `npm run test:local-repositories`, `npm run test:backup-restore-e2e` |
| Deployment readiness | `deployment/artifact-manifest.json`, `scripts/validate-deployment.mjs` | `npm run validate:deployment` |

## Next Roadmap Focus

1. Finish Phase 2 data safety by adding backup data minimization and sensitive field masking rules.
2. Replace fixture-backed recommendation status and dashboard runtime bindings with formula-backed application service output.
3. Add field-level dashboard metric traceability from every visible card to formula IDs, source fixture IDs, and canonical knowledge paths.
4. Promote static deployment artifact manifest generation into the build or release packaging flow.

## Related Specifications

- `knowledge/governance/knowledge-source-of-truth.md`
- `knowledge/product/dashboard-snapshot-contract.md`
- `knowledge/workflow/decision-workflow.md`
- `knowledge/workflow/goal-workflow.md`
- `knowledge/workflow/portfolio-workflow.md`
- `knowledge/workflow/loan-workflow.md`
- `knowledge/workflow/automation-workflow.md`
- `knowledge/product/pwa-runtime-capability.md`
- `knowledge/product/offline-cache-and-local-state.md`
- `knowledge/product/encrypted-backup-spec.md`
- `knowledge/product/import-version-migration.md`
- `knowledge/product/multi-tab-conflict-control.md`
