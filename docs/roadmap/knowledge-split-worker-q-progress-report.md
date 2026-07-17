> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Knowledge Split Worker Q Progress Report

## Scope

- Parent catalogs updated only in Split Navigation.
- Original parent catalog body content was not removed.
- New child documents were added under the existing catalog split directories.
- No frontend/knowledge files, package files, lockfiles, or commits were changed.

## Files Added

- knowledge/catalog/value-object/property-and-ownership.md
- knowledge/catalog/value-object/identity-construction-and-serialization.md
- knowledge/catalog/domain-event/delivery-integration-matrices.md
- knowledge/catalog/domain-event/ordering-replay-and-versioning.md
- knowledge/catalog/enumeration/value-usage-and-reference.md
- knowledge/catalog/enumeration/database-api-and-validation.md
- knowledge/catalog/command/api-workflow-and-automation-mapping.md
- knowledge/catalog/command/authorization-validation-and-errors.md

## Files Updated

- knowledge/catalog/value-object-catalog.md
- knowledge/catalog/domain-event-catalog.md
- knowledge/catalog/enumeration-catalog.md
- knowledge/catalog/command-catalog.md

## Split Rationale

- Value Object split separates property and ownership matrices from identity, construction, validation, and serialization rules so implementers can review model shape separately from behavior constraints.
- Domain Event split separates delivery integration matrices from ordering, replay, retry, versioning, and compatibility rules so event consumers can focus on routing or operational guarantees independently.
- Enumeration split separates value usage/reference matrices from database, Future Cloud Mapping, API, and validation mapping rules so API and persistence readers can use a smaller focused document.
- Command split separates API/workflow/automation mapping from authorization, validation, business rules, idempotency, concurrency, audit, and errors so command routing and command controls can be reviewed independently.

## Verification

- Confirmed each parent catalog retains its original body and only Split Navigation was extended.
- Confirmed all new child documents include source attribution and copied canonical sections from the corresponding parent catalog.
- Confirmed no disallowed paths were modified.
