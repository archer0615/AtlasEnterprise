# PWA Knowledge Architecture Audit

## Scope

- Source ADR: `docs/architecture/ADR-001-static-local-first-pwa.md`
- Scanned scope: `knowledge/**/*.md`, `docs/knowledge/**/*.md`
- Mode: analysis only; no Knowledge, Domain, Business Rule, Formula, Calculation, Entity, fixture, or runtime code files were modified.

## Summary

- 掃描檔案數: 633
- 命中文件數: 338

| Category | Count |
| --- | ---: |
| B. Future Cloud Mapping | 119 |
| C. Technology-neutral Contract | 198 |
| D. Historical / Legacy | 6 |
| E. Unclear | 15 |
| A. PWA v1 conflict | 0 |

## Classification Rules

- A. PWA v1 衝突: 明確要求 v1 必須依賴 Server、EF Core、PostgreSQL 或 Remote API。
- B. Future Cloud Mapping: 內容是合理的未來 Cloud/API/Database mapping，主要需要 Future Optional Architecture 標示一致化。
- C. Technology-neutral Contract: 內容是 Domain、Repository、API Contract、Integration Contract、Security/Auth contract 或 Persistence Abstraction，不要求 v1 server runtime。
- D. Historical / Legacy: `docs/knowledge/**` legacy reference 或已明確標示 legacy 的內容。
- E. Unclear: 語意無法可靠判定，需要人工確認。

## Conflict List

- No A-class PWA v1 conflicts found in scanned scope.

## File Findings

### knowledge/api/api-governance-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# API Governance Fra...
  - Line 15: Document Path: knowledge/api/api-governance-framework.md
  - Line 33: - knowledge/repository-catalog.md

### knowledge/api/api-governance/standards-and-contracts.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# API Governance Sta...
  - Line 10: API standards cover resource naming, URI shape, HTTP method usage, response contract, request contract, media type, content negotiation, API version strategy, Future Cloud Architecture Endpoint Standard, command API stan...

### knowledge/catalog/bounded-context-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Bounded Context Ca...
  - Line 29: - knowledge/repository-catalog.md
  - Line 41: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/command-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Command Catalog
  - Line 29: - knowledge/repository-catalog.md
  - Line 41: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/command/api-workflow-and-automation-mapping.md
- Category: B. Future Cloud Mapping
- 命中標題: # API Mapping
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Command API, Workf...
  - Line 9: | Command | Future Cloud Architecture Endpoint | HTTP Method | Request DTO | Response DTO |
  - Line 11: | RecordIncome | /api/v1/commands/record-income | POST | RecordIncomeRequest | CommandResult |

### knowledge/catalog/domain-model-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Domain Model Catal...
  - Line 31: - knowledge/repository-catalog.md
  - Line 41: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/domain-model/catalog-entries.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Domain Model Catal...
  - Line 10: Each domain model entry identifies its domain, bounded context, aggregate ownership, repository mapping, command mapping, service dependencies, PWA Runtime Mapping / Future Cloud Mapping, API resources, DTOs, security, a...
  - Line 14: | Domain Model | Aggregate | Repositories | Application Services | Domain Services | Database Tables | API Resources | DTO |

### knowledge/catalog/domain-model/executable-specification.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Domain Model Execu...
  - Line 10: Executable specification coverage includes Consistency Test, Mapping Test, Repository Test, API Mapping Test, Performance Test, and Phase 2 Executable Specification Addendum sections.
  - Line 13: Use this split document when validating that Domain, Subdomain, Bounded Context, Aggregate, Entity, Value Object, Enumeration, Repository, Domain Service, Application Service, Command, Domain Event, Read Model, Projectio...

### knowledge/catalog/entity-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Entity Catalog
  - Line 36: - knowledge/repository-catalog.md
  - Line 46: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/entity/security-audit-performance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Entity Security, A...
  - Line 15: - Cross-entity reads must be mediated by the appropriate repository, application service, projection, or API boundary.
  - Line 45: - Consistency tests should verify that Entity Catalog, Aggregate Catalog, Repository Catalog, Command Catalog, Domain Event Catalog, API mapping, and PWA Runtime Mapping / Future Cloud Mapping remain aligned.

### knowledge/catalog/enumeration-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Enumeration Catalo...
  - Line 8: - [Enumeration database, API, and validation] (enumeration/database-api-and-validation.md)
  - Line 29: - knowledge/repository-catalog.md

### knowledge/catalog/enumeration/catalog-entries.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Enumeration Catalo...
  - Line 13: Each enumeration entry preserves enum name, values, descriptions, owning module, API serialization, PWA Runtime Mapping / Future Cloud Mapping, default behavior, and deprecation rules.

### knowledge/catalog/enumeration/database-api-and-validation.md
- Category: B. Future Cloud Mapping
- 命中標題: # PWA Runtime Mapping
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Enumeration Databa...
  - Line 7: # PWA Runtime Mapping
  - Line 9: - PWA Runtime Mapping / Future Cloud Mapping rule 1 enforces string value stability, check constraints, conversion, OpenAPI schema, DTO validation, backward compatibility, and deterministic serialization.

### knowledge/catalog/enumeration/state-and-rule-model.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Enumeration State ...
  - Line 17: - PWA Runtime Mapping / Future Cloud Mapping
  - Line 18: - Future Cloud Mapping

### knowledge/catalog/repository-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Repository Catalog
  - Line 3: - [Repository catalog entries] (repository/catalog-entries.md)
  - Line 4: - [Repository method catalog] (repository/method-catalog.md)

### knowledge/catalog/repository/ownership-and-integration-matrices.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Repository Ownersh...
  - Line 4: This split document isolates repository ownership, persistence mapping, service integration, command, event, API, cache, and projection matrices from the parent Repository Catalog while preserving the parent as the canon...
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/system-module-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module Cata...
  - Line 30: - knowledge/repository-catalog.md
  - Line 45: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/system-modules/administration.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Ad...
  - Line 23: Description: Administration aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/audit.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Au...
  - Line 23: Description: Audit aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/automation.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Au...
  - Line 23: Description: Automation aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/blueprint.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Bl...
  - Line 23: Description: Blueprint aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/cash-flow-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Ca...
  - Line 23: Description: Cash Flow Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/configuration.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Co...
  - Line 23: Description: Configuration aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/dashboard.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Da...
  - Line 23: Description: Dashboard aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/decision-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - De...
  - Line 23: Description: Decision Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/feature-flag.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Fe...
  - Line 23: Description: Feature Flag aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/home-upgrade-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Ho...
  - Line 23: Description: Home Upgrade Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/identity.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Id...
  - Line 21: Purpose: Authentication and user management.
  - Line 23: Description: Identity aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.

### knowledge/catalog/system-modules/integration.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - In...
  - Line 23: Description: Integration aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/investment-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - In...
  - Line 23: Description: Investment Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/ips.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - IP...
  - Line 23: Description: IPS aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/loan-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Lo...
  - Line 23: Description: Loan Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/notification.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - No...
  - Line 23: Description: Notification aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/policy.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Po...
  - Line 23: Description: Policy aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/reporting.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Re...
  - Line 23: Description: Reporting aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/retirement-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Re...
  - Line 23: Description: Retirement Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/system-modules/scenario-engine.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# System Module - Sc...
  - Line 23: Description: Scenario Engine aligns bounded context, aggregates, entities, repositories, commands, events, services, APIs, workflows, integrations, database objects, and operational controls.
  - Line 25: Non Responsibilities: No hidden cross-module mutation, no uncataloged aggregate ownership, no direct database ownership outside module, no bypass of API or service contracts.

### knowledge/catalog/value-object-catalog.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Catal...
  - Line 29: - knowledge/repository-catalog.md
  - Line 37: - docs/database/05-DatabaseDesign.md

### knowledge/catalog/value-object/catalog-entries.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Catal...
  - Line 13: Each value object entry preserves name, purpose, fields, constraints, examples, owning aggregates, services, PWA Runtime Mapping / Future Cloud Mapping, DTO mapping, and error behavior.

### knowledge/catalog/value-object/identity-construction-and-serialization.md
- Category: B. Future Cloud Mapping
- 命中標題: # Equality Rules
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Ident...
  - Line 82: # PWA Runtime Mapping
  - Line 84: - PWA Runtime Mapping / Future Cloud Mapping rule 1 enforces immutable construction, value equality, owner persistence, deterministic serialization, API compatibility, and catalog-aligned validation.

### knowledge/catalog/value-object/lifecycle-and-mapping-rules.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Lifec...
  - Line 15: - PWA Runtime Mapping / Future Cloud Mapping
  - Line 16: - Future Cloud Mapping

### knowledge/catalog/value-object/property-and-ownership.md
- Category: B. Future Cloud Mapping
- 命中標題: # Property Catalog
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Prope...
  - Line 9: | Value Object | Name | Type | Nullable | Default | Description | Validation | Business Meaning | JSON Name | PWA Runtime Mapping / Future Cloud Mapping | API Usage | Searchable | Sortable | Indexed | Encrypted | Auditab...
  - Line 43: | Value Object | Aggregate | Entity | Repository | DTO |

### knowledge/catalog/value-object/security-audit-and-performance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Secur...
  - Line 10: - Encryption is applied through owner Entity, DTO, API, repository, and PWA Runtime Mapping / Future Cloud Mapping when the Value Object contains sensitive data.
  - Line 11: - Masking is applied through owner Entity, DTO, API, repository, and PWA Runtime Mapping / Future Cloud Mapping when the Value Object contains sensitive data.

### knowledge/catalog/value-object/validation-and-mapping.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Value Object Valid...
  - Line 13: Mapping covers Future Cloud Mapping owned types, scalar conversions, JSON serialization, API DTO representation, database column precision, and migration compatibility.

### knowledge/engine/projection-engine-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Projection Engine ...
  - Line 20: - knowledge/repository-catalog.md
  - Line 24: - knowledge/database-governance-framework.md

### knowledge/entity/action-plan/governance-and-testing.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ActionPlan Governa...
  - Line 5: This split document isolates ActionPlan repository, API, persistence, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `knowledge/entity/ActionPlan.md` parent.
  - Line 9: - Repository

### knowledge/entity/ActionPlan.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ActionPlan Entity ...
  - Line 31: - knowledge/repository-catalog.md
  - Line 85: - ActionPlanRepository loads ActionPlan records and history without cascading cross-aggregate changes.

### knowledge/entity/asset/governance-and-verification.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Asset Governance a...
  - Line 13: - Asset access requires authentication, authorization, permission checks, tenant isolation when tenancy exists, and household isolation in all cases.
  - Line 22: - Consistency verification must check catalog alignment, aggregate ownership, repository responsibility, API governance, PWA Runtime Mapping / Future Cloud Mapping, security controls, audit completeness, and final consis...

### knowledge/entity/asset/property-and-lifecycle-rules.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Asset Property and...
  - Line 18: - Monetary values such as `AcquisitionCost`, `CostBasis`, `BookValue`, `CurrentValue`, and `EstimatedValue` must use Money and Currency semantics and must not use Future Cloud Mapping money type.

### knowledge/entity/Decision.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Entity Sp...
  - Line 36: - knowledge/repository-catalog.md
  - Line 62: - Publish decision events through DecisionSession and DecisionRepository.

### knowledge/entity/decision/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision API and P...
  - Line 4: This split document isolates Decision commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Decision Entity Specification.

### knowledge/entity/execution-plan/governance-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ExecutionPlan Gove...
  - Line 9: - Repository
  - Line 14: - PWA Runtime Mapping / Future Cloud Mapping

### knowledge/entity/ExecutionPlan.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# ExecutionPlan Enti...
  - Line 33: - knowledge/repository-catalog.md
  - Line 63: Aggregate Root: No. ExecutionPlan is not listed as an Atlas aggregate root in the current Entity Catalog. It is a catalog-approved execution record managed through Decision execution behavior and ExecutionPlanningApplica...

### knowledge/entity/Goal.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Entity Specif...
  - Line 32: - knowledge/repository-catalog.md
  - Line 66: Aggregate Root: Yes for the Goal entity specification surface. Atlas Entity Catalog maps Goal to the GoalPlan aggregate and GoalPlan aggregate root; therefore Goal mutations are loaded and committed through GoalRepositor...

### knowledge/entity/Household.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Household Entity S...
  - Line 19: | Source of Truth | Entity Catalog, Aggregate Catalog, Repository Catalog |
  - Line 21: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/household/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Household API and ...
  - Line 4: This split document isolates Household commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Household Entity Specificatio...

### knowledge/entity/Liability.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Liability Entity S...
  - Line 20: | Source of Truth | Entity Catalog, Aggregate Catalog, Repository Catalog, Command Catalog, Domain Event Catalog |
  - Line 22: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/liability/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Liability API and ...
  - Line 4: This split document isolates Liability commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping schema, Future Cloud Mapping, and cache strategy from the parent ...
  - Line 16: Persistence covers liabilities table mapping, constraints, indexes, Future Cloud Mapping precision mapping, cache keys, and invalidation after payment, balance adjustment, payoff, archive, restore, or delete.

### knowledge/entity/Loan.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Loan Entity Specif...
  - Line 25: | Source of Truth | Entity Catalog, Aggregate Catalog, Command Catalog, Domain Event Catalog, Repository Catalog |
  - Line 27: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/loan/persistence-and-verification.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Loan Persistence a...
  - Line 5: This split document isolates Loan PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping Fluent API, cache strategy, security, audit, observability, performance, examples, diagrams, te...
  - Line 13: - Loan persistence maps through LoanRepository and database tables such as `loans` and `mortgages` when Mortgage is mapped separately.

### knowledge/entity/Mortgage.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Mortgage Entity Sp...
  - Line 22: | Source of Truth | Entity Catalog, Aggregate Catalog, Command Catalog, Domain Event Catalog, Repository Catalog |
  - Line 24: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/mortgage/error-migration-consistency.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Mortgage Error, Mi...
  - Line 15: - Repository errors must not hide aggregate ownership violations or cross-household access attempts.
  - Line 16: - Calculation errors from amortization, refinance, affordability, projection, or cash flow logic must remain outside Mortgage repository ownership.

### knowledge/entity/mortgage/persistence-and-api.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Mortgage Persisten...
  - Line 4: This split document isolates Mortgage commands, events, repository, services, Future Cloud Architecture API, DTO, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache stra...
  - Line 16: Persistence includes mortgage or loan-backed tables, repository query methods, Future Cloud Mapping, amortization cache invalidation, and consistency verification.

### knowledge/entity/Notification.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Notification Entit...
  - Line 36: - knowledge/repository-catalog.md
  - Line 81: - NotificationRepository loads Notification aggregate only.

### knowledge/entity/notification/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Notification API a...
  - Line 4: This split document isolates Notification commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Notification Entity Specif...

### knowledge/entity/portfolio-entity/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Portfolio API and ...
  - Line 4: This split document isolates Portfolio commands, events, repository, services, Future Cloud Architecture API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache st...
  - Line 13: Persistence covers portfolio table mapping, indexes, constraints, Future Cloud Mapping, optimistic concurrency, cache invalidation, and projection refresh.

### knowledge/entity/Portfolio.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Portfolio Entity S...
  - Line 22: | Source of Truth | Entity Catalog, Aggregate Catalog, Command Catalog, Domain Event Catalog, Repository Catalog |
  - Line 24: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/Position.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Position Entity Sp...
  - Line 22: | Source of Truth | Entity Catalog, Aggregate Catalog, Command Catalog, Domain Event Catalog, Repository Catalog |
  - Line 24: | Related Specifications | knowledge/entity-catalog.md; knowledge/aggregate-catalog.md; knowledge/domain-model-catalog.md; knowledge/bounded-context-catalog.md; knowledge/value-object-catalog.md; knowledge/enumeration-ca...

### knowledge/entity/position/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Position API and P...
  - Line 4: This split document isolates Position commands, events, repository, services, Future Cloud Architecture API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping DDL, Future Cloud Mapping, and cache str...
  - Line 13: Persistence covers position table mapping, indexes, constraints, Future Cloud Mapping precision, optimistic concurrency, cache invalidation, and portfolio projection refresh.

### knowledge/entity/Recommendation.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Ent...
  - Line 35: - knowledge/repository-catalog.md
  - Line 85: Repository: RecommendationRepository for Recommendation aggregate read and write operations where catalog-approved persistence is required; DecisionRepository remains command owner for AcceptRecommendation and RejectReco...

### knowledge/entity/recommendation/governance-and-testing.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Gov...
  - Line 11: - PWA Runtime Mapping / Future Cloud Mapping
  - Line 12: - Future Cloud Mapping Schema

### knowledge/entity/Scenario.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Scenario Entity Sp...
  - Line 36: - knowledge/repository-catalog.md
  - Line 65: Persistence Owner: ScenarioRepository.

### knowledge/entity/scenario/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Scenario API and P...
  - Line 4: This split document isolates Scenario commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent Scenario Entity Specification.

### knowledge/entity/User.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# User Entity Specif...
  - Line 33: - Repository: UserRepository.
  - Line 100: | Name | Type | Nullable | Default | Description | Validation | Business Meaning | Example | PWA Runtime Mapping / Future Cloud Mapping | JSON Name | API Usage | Searchable | Sortable | Indexed | Encrypted | Auditable |

### knowledge/entity/user/api-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# User API and Persi...
  - Line 4: This split document isolates User commands, events, repository, services, API, DTOs, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, and cache strategy from the parent User Entity Specification.

### knowledge/framework/backup-recovery-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Atlas Enterprise Specification
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# backup-recovery-fr...
  - Line 3: > **PWA v1 Architecture Amendment (2026-07-11):** Any Future Cloud Mapping, Future Cloud Mapping, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase...
  - Line 30: - Future Cloud Mapping

### knowledge/framework/data-governance-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Data Governance Fr...
  - Line 20: - knowledge/repository-catalog.md
  - Line 35: - docs/database/05-DatabaseDesign.md

### knowledge/framework/database-governance-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Database Governanc...
  - Line 5: Document Name: Database Governance Framework
  - Line 6: Document Path: knowledge/framework/database-governance-framework.md

### knowledge/framework/goal-execution-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Execution
  - Line 333: # Repository
  - Line 335: IGoalExecutionRepository persists execution aggregate, plan, steps, logs, metrics, state history, retry history, rollback history, operator history, and projections.

### knowledge/framework/goal-execution/governance-and-testing.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Execution Gov...
  - Line 5: This split document isolates Goal Execution repository, services, API, DTO, persistence, cache, security, audit, performance, examples, diagrams, testing, edge cases, version history, and Phase 2 addenda from the canonic...
  - Line 9: - Repository

### knowledge/framework/scenario-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Project Atlas — Scenario Framework
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Project Atlas Scen...
  - Line 3: > **PWA v1 Architecture Amendment (2026-07-11):** Any Future Cloud Mapping, Future Cloud Mapping, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase...
  - Line 41: - API and database design requirements

### knowledge/integration/integration-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Integration Framew...
  - Line 32: - knowledge/repository-catalog.md
  - Line 42: - docs/database/05-DatabaseDesign.md

### knowledge/reporting/decision-dashboard.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Dashboard...
  - Line 408: 1. Dashboard must not mutate Decision state. 2. Dashboard must not mutate Recommendation state. 3. Dashboard must not mutate Goal state. 4. Dashboard must not mutate Portfolio state. 5. Dashboard must not mutate CashFlow...
  - Line 474: # Repository

### knowledge/reporting/decision-reporting.md
- Category: B. Future Cloud Mapping
- 命中標題: # Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Reporting
  - Line 44: Repository owns persistence and queries.
  - Line 535: # Repository

### knowledge/reporting/decision-reporting/governance-and-testing.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Reporting...
  - Line 5: This split document isolates Decision Reporting validation, business rules, repository, services, API, persistence, cache, security, audit, performance, examples, diagrams, testing, and edge cases from the canonical `kno...
  - Line 11: - Repository

### knowledge/reporting/goal-dashboard.md
- Category: B. Future Cloud Mapping
- 命中標題: # Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Dashboard
  - Line 34: Repository owns persistence.
  - Line 389: # Repository

### knowledge/reporting/goal-dashboard/implementation-and-governance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Dashboard Imp...
  - Line 16: - Repository, Domain Service Interaction, Application Service Interaction, API, and DTO
  - Line 17: - PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping Schema, Future Cloud Mapping, and Cache Strategy

### knowledge/reporting/goal-metrics.md
- Category: B. Future Cloud Mapping
- 命中標題: # Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Metrics
  - Line 16: It coordinates GoalPlan metrics with Goal Progress Tracking, Goal Review, Goal Lifecycle, Goal Dependency, Goal Prioritization, Goal Funding, DecisionSession, Recommendation, Scenario, Portfolio, CashFlow, Notification, ...
  - Line 36: Repository owns persistence and query behavior.

### knowledge/reporting/goal-metrics/implementation-and-governance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Metrics Imple...
  - Line 16: - Repository, Domain Service Interaction, Application Service Interaction, API, and DTO
  - Line 17: - PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping Schema, Future Cloud Mapping, and Cache Strategy

### knowledge/reporting/goal-reporting.md
- Category: B. Future Cloud Mapping
- 命中標題: # Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Reporting
  - Line 15: Goal Reporting defines how Atlas creates, updates, generates, refreshes, exports, shares, schedules, archives, restores, deletes, secures, audits, and retains reports for GoalPlan. It coordinates reporting with GoalPlan,...
  - Line 26: Domain Service owns validation and rule enforcement. Repository owns persistence and queries.

### knowledge/reporting/goal-reporting/governance-and-testing.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Reporting Gov...
  - Line 5: This split document isolates Goal Reporting validation, business rules, repository, services, API, persistence, cache, security, audit, performance, examples, diagrams, testing, edge cases, version history, and Phase 2 a...
  - Line 11: - Repository

### knowledge/security/audit-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: # Document Control
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Audit Framework
  - Line 22: - knowledge/repository-catalog.md
  - Line 34: - docs/database/05-DatabaseDesign.md

### knowledge/security/security-framework.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Security Framework
  - Line 4: - [Authentication flows and events] (security-framework/authentication-flows-and-events.md)
  - Line 16: | Source of Truth | Security controls for Authentication, Authorization, Permission, Application Service, Domain Service, Repository, API, DTO, Workflow, Automation, Scheduler, Background Job, Message Contract, Domain Ev...

### knowledge/security/security-framework/threat-validation-and-runtime-controls.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Threat Validation ...
  - Line 11: - API Security protects Future Cloud Architecture APIs with authentication, authorization, permission evaluation, tenant isolation, household isolation, validation, audit correlation, and rate limiting before protected d...
  - Line 14: - Rate Limiting protects APIs, authentication endpoints, integration endpoints, and high-cost queries from excessive traffic.

### knowledge/supporting/decision-analytics.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Analytics
  - Line 41: Repository owns persistence and query.
  - Line 512: # Repository

### knowledge/supporting/decision-evaluation.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Evaluatio...
  - Line 39: Repository owns persistence and query.
  - Line 543: # Repository

### knowledge/supporting/decision-execution.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Execution
  - Line 41: Repository owns persistence and query.
  - Line 417: # Repository

### knowledge/supporting/decision-governance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Governanc...
  - Line 44: Repository owns persistence and queries.
  - Line 351: Exception Rules: No exception for missing authentication.

### knowledge/supporting/decision-insights.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Insights ...
  - Line 31: Decision Insight is modeled as an aggregate root when it has an independent lifecycle, evidence collection, resolution state, audit trail, and repository identity.
  - Line 939: 1. Decision Insight must not redesign Decision. 2. Decision Insight must not modify existing domain ownership. 3. Decision Insight must not introduce a new business concept outside Atlas Catalog. 4. Every insight must re...

### knowledge/supporting/decision-insights/contracts-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Insight C...
  - Line 4: This split document isolates Decision Insight commands, domain events, repository, API, DTO, PWA Runtime Mapping / Future Cloud Mapping, cache, security, audit, performance, examples, diagrams, testing, and edge cases fr...
  - Line 16: Future Cloud Architecture Endpoints, HTTP Methods, Request, Response, Errors, Pagination, Filtering, Sorting, Projection, Insight API, Report API, and Bulk API use Create DTO, Update DTO, Insight DTO, Evidence DTO, Recom...

### knowledge/supporting/decision-lifecycle.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Lifecycle
  - Line 36: Repository owns persistence and query.
  - Line 535: # Repository

### knowledge/supporting/decision-optimization.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Decision Optimizat...
  - Line 43: Repository owns persistence and query.
  - Line 499: # Repository

### knowledge/supporting/financial-health-score.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Financial Health S...
  - Line 8: > **PWA v1 Architecture Amendment (2026-07-11):** Any Future Cloud Mapping, Future Cloud Mapping, JWT, Swagger, server-hosted REST, or mandatory .NET runtime content in this document is classified as a future cloud-phase...
  - Line 1083: The Financial Health Score calculation should be exposed through internal application services and Future Cloud Architecture API endpoints.

### knowledge/supporting/goal-analytics.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Analytics
  - Line 14: It coordinates analytics with GoalPlan, Milestone, Task when tracked, Goal Progress Tracking, Goal Metrics, Goal Review, Goal Dashboard, DecisionSession, Recommendation, Scenario, Portfolio, CashFlow, Notification, User,...
  - Line 33: Repository owns persistence and query behavior.

### knowledge/supporting/goal-conflict-resolution.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Conflict Reso...
  - Line 50: - knowledge/repository-catalog.md
  - Line 61: Catalog Alignment Decision: GoalConflict is not a standalone Aggregate, Entity, or Repository in the current Atlas Catalog. This specification treats conflict data as GoalPlan-owned conflict state plus read model project...

### knowledge/supporting/goal-conflict-resolution/contracts-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Conflict Cont...
  - Line 16: Goal Conflict API contracts are exposed as Goal resource subresources such as `/api/v1/goals/conflicts`, with request and response DTOs preserving evidence, candidate, status, lifecycle, audit, and error code fields.
  - Line 19: Goal Conflict data is stored as GoalPlan-owned conflict state plus read model projections, not as a standalone Aggregate, Entity, or Repository.

### knowledge/supporting/goal-governance.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Governance
  - Line 35: Repository owns persistence and projections.
  - Line 394: # Repository

### knowledge/supporting/goal-insights.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Insights
  - Line 428: # Repository
  - Line 430: IGoalInsightRepository persists insight aggregate, evidence, lifecycle history, mappings, audit, and projections.

### knowledge/supporting/goal-insights/contracts-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Insights Cont...
  - Line 4: This split document isolates Goal Insight commands, events, repository behavior, API, DTO, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, cache, and example contract concerns from the parent Goal Insig...
  - Line 15: ## Repository and Queries

### knowledge/supporting/goal-lifecycle-management.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Lifecycle Man...
  - Line 39: Repository owns persistence and query.
  - Line 532: # Repository

### knowledge/supporting/goal-optimization.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Optimization
  - Line 376: # Repository
  - Line 378: IGoalOptimizationRepository persists optimization aggregate, objectives, constraints, candidates, execution history, approval history, mappings, and projections.

### knowledge/supporting/goal-progress-tracking.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Progress Trac...
  - Line 8: Goal Progress Tracking defines how Atlas measures, updates, validates, persists, exposes, audits, and reports progress for GoalPlan. It coordinates GoalPlan progress with Goal Lifecycle, Goal Dependency, Goal Prioritizat...
  - Line 309: 65. Repository must apply Household filter. 66. Repository must apply Tenant filter when applicable.

### knowledge/supporting/goal-review.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Review
  - Line 468: # Repository
  - Line 471: public interface IGoalReviewRepository

### knowledge/supporting/recommendation-evaluation.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Eva...
  - Line 376: 1. Recommendation Evaluation must not redesign Atlas. 2. Recommendation Evaluation must not change existing domain ownership. 3. Recommendation Evaluation must not create unknown business concepts. 4. Evaluation must ref...
  - Line 414: # Repository

### knowledge/supporting/recommendation-evaluation/execution-and-audit.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Eva...
  - Line 13: Execution includes state machine transitions, commands, domain events, repository queries, application service orchestration, Future Cloud Architecture APIs, DTOs, PWA Runtime Mapping / Future Cloud Mapping, cache, secur...

### knowledge/supporting/recommendation-execution.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Exe...
  - Line 778: # Repository
  - Line 867: ## Future Cloud Architecture Endpoints

### knowledge/supporting/recommendation-execution/contracts-and-persistence.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Exe...
  - Line 4: This split document isolates Recommendation Execution commands, domain events, repository, API, DTO, PWA Runtime Mapping / Future Cloud Mapping, cache, security, audit, performance, examples, diagrams, and tests from the...
  - Line 16: Future Cloud Architecture Endpoints, HTTP Methods, Request, Response, Errors, Pagination, Filtering, Sorting, Projection, Execution API, and Batch API are represented by Create DTO, Update DTO, Execution DTO, Execution P...

### knowledge/supporting/recommendation-lifecycle.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Split Navigation
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Lif...
  - Line 23: 1. Keep Recommendation state deterministic and auditable. 2. Ensure every lifecycle transition has a valid trigger and permission. 3. Preserve ranking, priority, evidence, and business meaning. 4. Coordinate with Decisio...
  - Line 395: # Repository

### knowledge/supporting/recommendation-lifecycle/execution-and-audit.md
- Category: B. Future Cloud Mapping
- 命中標題: ## Purpose
- 衝突理由: Cloud/server/API/database mapping is already framed as future-oriented architecture.
- 建議處理方式: No domain change. Optionally normalize wording to Future Optional Architecture in a controlled batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Lif...
  - Line 4: This split document isolates recommendation lifecycle commands, events, repository, API, persistence, cache, security, audit, and testing concerns from the parent Recommendation Lifecycle specification.
  - Line 16: Recommendation lifecycle APIs expose Future Cloud Architecture Endpoints for lifecycle operations, pagination, filtering, sorting, projection, bulk operations, and lifecycle-specific state actions.

### knowledge/api/api-governance/query-and-mutation-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # API Query and Mutation Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 12: - Caching must not bypass authentication, authorization, permission checks, tenant isolation, household isolation, or protected data boundaries.

### knowledge/api/api-governance/resource-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # API Governance Resource Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 28: Each resource group must define route, application service, domain service, aggregate, commands, queries, DTO, repository, domain events, permissions, audit requirement, idempotency requirement, and error catalog referen...

### knowledge/api/api-governance/rule-catalog-and-flows.md
- Category: C. Technology-neutral Contract
- 命中標題: # API Rule Catalog and Flows
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 14: - REST Architecture
  - Line 16: - Authentication Flow
  - Line 28: The parent framework keeps the flow diagrams for REST Architecture, Request Flow, Authentication Flow, Authorization Flow, Error Flow, and Versioning Flow. This split provides a focused navigation target for those operat...

### knowledge/api/api-governance/security-testing-and-operations.md
- Category: C. Technology-neutral Contract
- 命中標題: # API Governance Security Testing and Operations
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates API authentication, authorization, audit, tracing, performance, caching, rate limiting, OpenAPI, validation, business rules, testing, and edge cases from the parent API Governance Framework.
  - Line 10: API security covers authentication, authorization, permission mapping, audit, correlation identifiers, causation identifiers, tracing, security headers, and field-level protection.

### knowledge/api/api-governance/versioning-and-compatibility.md
- Category: C. Technology-neutral Contract
- 命中標題: # API Versioning and Compatibility
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 21: - Versioning Flow must preserve authentication, authorization, error behavior, audit, correlation, tracing, and observability.

### knowledge/catalog/aggregate-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Aggregate Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 35: - knowledge/repository-catalog.md
  - Line 44: - docs/database/05-DatabaseDesign.md
  - Line 45: - docs/database/06-ERD.md

### knowledge/catalog/aggregate-catalog/governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Aggregate Catalog Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates aggregate governance, lifecycle, repository rules, command/event rules, validation, edge cases, testing, and consistency checks from the parent Aggregate Catalog.
  - Line 10: Governance covers aggregate invariants, aggregate lifecycle, repository rules, command ownership rules, domain event ownership rules, persistence ownership rules, API ownership rules, security boundary, audit boundary, p...
  - Line 16: Testing covers ownership mapping, aggregate invariants, lifecycle transitions, repository behavior, command routing, event routing, concurrency, performance, edge cases, and final consistency matrix checks.

### knowledge/catalog/aggregate-catalog/ownership-mapping.md
- Category: C. Technology-neutral Contract
- 命中標題: # Aggregate Catalog Ownership Mapping
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 14: - Repository-to-Aggregate Mapping
  - Line 18: Cross-aggregate interaction rules must preserve transaction boundaries, command ownership, event ownership, repository ownership, persistence ownership, API ownership, security boundary, and audit boundary.

### knowledge/catalog/aggregate/cross-boundary-rules.md
- Category: C. Technology-neutral Contract
- 命中標題: # Aggregate Cross-Boundary Rules
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 5: This split document isolates cross-aggregate interaction, lifecycle, repository, command, event, persistence, API, security, audit, performance, and concurrency rules from the larger Aggregate Catalog.
  - Line 18: - Repository methods must load and persist the aggregate they own.
  - Line 24: - Archive and delete behavior must follow the owning aggregate, repository, and audit boundary.

### knowledge/catalog/application-service-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Application Service Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 30: - knowledge/repository-catalog.md
  - Line 45: - docs/database/05-DatabaseDesign.md
  - Line 46: - docs/database/06-ERD.md

### knowledge/catalog/application-service/catalog-entries.md
- Category: C. Technology-neutral Contract
- 命中標題: # Application Service Catalog Entries
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 16: | UserApplicationService | User account, household access, and actor context orchestration. | Identity commands and access queries | User, Household access | UserRepository, HouseholdRepository, AuditRepository | Decisio...
  - Line 17: | BlueprintApplicationService | Household blueprint, goals, retirement, property, and planning orchestration. | RecordIncome, RecordExpense, UpdateRetirementPlan, PurchaseHome, SellHome | Goal planning queries | Househol...
  - Line 18: | IPSApplicationService | Insurance and protection planning use case orchestration. | IssuePolicy, PayPremium | Policy and coverage queries | HouseholdRepository, ScenarioRepository, AuditRepository | RiskService, CashFl...

### knowledge/catalog/application-service/coordination-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Application Service Coordination Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Application service coordination covers aggregate orchestration, repository access, domain service delegation, API exposure, workflow participation, scheduler or automation involvement, transaction rules, authorization, ...
  - Line 15: | UserApplicationService | Identity commands and access queries | UserRepository, HouseholdRepository |
  - Line 16: | BlueprintApplicationService | Financial planning blueprint workflows | HouseholdRepository, GoalRepository, CashFlowService, RetirementService |

### knowledge/catalog/application-service/testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Application Service Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Testing coverage includes Unit Test, Integration Test, Workflow Test, Saga Test, Authorization Test, Repository Test, DTO Mapping Test, Performance Test, and Phase 2 Executable Specification Addendum sections.
  - Line 13: Use this split document when validating that Application Services preserve application-layer orchestration, transaction boundaries, authorization boundaries, validation boundaries, repository coordination, domain service...

### knowledge/catalog/bounded-context/catalog-entries.md
- Category: C. Technology-neutral Contract
- 命中標題: # Bounded Context Catalog Entries
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Each bounded context entry identifies its domain language boundary, aggregate ownership, repository ownership, application service ownership, API ownership, database ownership, integration boundary, published language, a...
  - Line 14: | Bounded Context | Purpose | Owned Aggregates | Owned Repositories | Owned Application Services | API Ownership | Database Ownership |
  - Line 16: | Identity | Authentication and accounts. | User, Household | UserRepository, HouseholdRepository | UserApplicationService | /api/v1/users, /api/v1/households | users, households |

### knowledge/catalog/bounded-context/governance.md
- Category: C. Technology-neutral Contract
- 命中標題: # Bounded Context Governance
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Governance covers context ownership, data boundaries, permission mapping, audit ownership, transaction boundaries, API ownership, repository access, and integration rules.

### knowledge/catalog/bounded-context/integrations.md
- Category: C. Technology-neutral Contract
- 命中標題: # Bounded Context Integrations
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates bounded context integration, command, event, repository, API, and message relationships from the parent Bounded Context Catalog.

### knowledge/catalog/bounded-context/ownership-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Bounded Context Ownership Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Bounded context ownership records the domain, aggregate, repository, command, domain event, application service, API, database, workflow, and integration responsibilities for each context.
  - Line 13: | Bounded Context | Domain | Aggregate | Repository | Application Service | API | Database |
  - Line 15: | Identity | Identity | User, Household | UserRepository, HouseholdRepository | UserApplicationService | /api/v1/users, /api/v1/households | users, households |

### knowledge/catalog/command/authorization-validation-and-errors.md
- Category: C. Technology-neutral Contract
- 命中標題: # Command Authorization, Validation, and Errors
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 21: | CMD-VR-001 | Validate command catalog requirement 1. | Command is received. | Contract, ownership, DTO, authorization, idempotency, transaction, repository, event, and audit fields are checked. | Yes | CMD-ERR-001 | Ha...
  - Line 22: | CMD-VR-002 | Validate command catalog requirement 2. | Command is received. | Contract, ownership, DTO, authorization, idempotency, transaction, repository, event, and audit fields are checked. | Yes | CMD-ERR-002 | Ha...
  - Line 23: | CMD-VR-003 | Validate command catalog requirement 3. | Command is received. | Contract, ownership, DTO, authorization, idempotency, transaction, repository, event, and audit fields are checked. | Yes | CMD-ERR-003 | Ha...

### knowledge/catalog/command/flows-and-diagrams.md
- Category: C. Technology-neutral Contract
- 命中標題: # Command Flows and Diagrams
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 94: CMD --> REPO[Repository]
  - Line 104: participant Repository
  - Line 107: Handler->>Repository: Load aggregate

### knowledge/catalog/command/governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Command Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: Testing covers command validation, permission checks, idempotency, aggregate mutation, event emission, repository interaction, concurrency, rollback, and edge cases.

### knowledge/catalog/command/ownership-and-routing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Command Ownership and Routing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates command ownership, routing, service mapping, repository mapping, event mapping, and transaction behavior from the parent Command Catalog.

### knowledge/catalog/domain-event-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Event Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 28: - knowledge/repository-catalog.md
  - Line 40: - docs/database/05-DatabaseDesign.md
  - Line 41: - docs/database/06-ERD.md

### knowledge/catalog/domain-event/matrices-and-delivery.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Event Matrices and Delivery
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Matrices include event classification, event ownership, aggregate event, command event, repository event, projection, workflow, saga, automation, notification, message contract, outbox, inbox, cache invalidation, and sea...

### knowledge/catalog/domain-model/diagrams-and-edge-cases.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Model Diagrams and Edge Cases
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 9: - Authorization is enforced at API, Application Service, Repository, Projection, Report, and DTO boundaries before model data is exposed.
  - Line 10: - Permission is enforced at API, Application Service, Repository, Projection, Report, and DTO boundaries before model data is exposed.
  - Line 11: - Tenant Isolation is enforced at API, Application Service, Repository, Projection, Report, and DTO boundaries before model data is exposed.

### knowledge/catalog/domain-model/governance.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Model Governance
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: Testing covers entity consistency, relationship ownership, command routing, event routing, repository mapping, API mapping, edge cases, and final catalog verification.

### knowledge/catalog/domain-model/mapping-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Model Mapping Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 30: | Domain Model | Repository | Database | API | DTO |
  - Line 32: | Identity | UserRepository, HouseholdRepository | users, households | /api/v1/users, /api/v1/households | UserDto, HouseholdDto |
  - Line 33: | Financial Profile | HouseholdRepository | households, cash_flow_items | /api/v1/blueprint, /api/v1/dashboard | BlueprintDto, DashboardDto |

### knowledge/catalog/domain-model/relationships.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Model Relationships
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Relationships cover aggregate references, entity dependencies, command routing, event publication, repository access, service orchestration, read projections, and reporting dependencies.

### knowledge/catalog/domain-service-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Service Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 30: - knowledge/repository-catalog.md
  - Line 44: - docs/database/05-DatabaseDesign.md
  - Line 45: - docs/database/06-ERD.md

### knowledge/catalog/domain-service/capability-and-calculation-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Service Capability and Calculation Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 22: | DecisionService | Catalog-aligned | DecisionRepository, ScenarioRepository; Money, Percentage, RiskScore; DecisionStatus, RecommendationPriority, RiskLevel; Decision Engine, Rule Engine | Stateless, deterministic, audi...
  - Line 23: | CashFlowService | Catalog-aligned | HouseholdRepository, LoanRepository; Money, CashFlowItem, DateRange; CurrencyCode; Calculation Engine, Projection Engine | Stateless, deterministic, audited, and versioned |
  - Line 24: | PortfolioService | Catalog-aligned | AssetRepository, PortfolioRepository, PropertyRepository; Money, Allocation, Percentage, RiskScore; AssetType, PropertyType, CurrencyCode, RiskLevel; Calculation Engine, Projection ...

### knowledge/catalog/domain-service/matrices-and-dependencies.md
- Category: C. Technology-neutral Contract
- 命中標題: # Domain Service Matrices and Dependencies
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Matrices include service ownership, aggregate, entity, repository, rule, engine, dependency, value object, enumeration, calculation engine, rule engine, projection engine, simulation engine, optimization engine, business...

### knowledge/catalog/entity-catalog/catalog-entries.md
- Category: C. Technology-neutral Contract
- 命中標題: # Entity Catalog Entries
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: Each entity entry preserves identity, aggregate owner, lifecycle, properties, commands, events, repository, API, security, audit, and persistence mapping.

### knowledge/catalog/entity-catalog/governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Entity Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: Testing covers entity mapping, lifecycle transitions, validation rules, command routing, event routing, repository behavior, API behavior, and edge cases.

### knowledge/catalog/entity-catalog/relationships-and-ownership.md
- Category: C. Technology-neutral Contract
- 命中標題: # Entity Relationships and Ownership
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Matrices include entity ownership, entity dependency, entity relationship, command ownership, event ownership, repository mapping, API mapping, and table mapping.
  - Line 13: Entity ownership rules preserve aggregate boundaries, lifecycle ownership, repository ownership, persistence ownership, and projection separation.

### knowledge/catalog/enumeration/mapping-and-compatibility.md
- Category: C. Technology-neutral Contract
- 命中標題: # Enumeration Mapping and Compatibility
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates enumeration API, database, DTO, event, and compatibility mapping from the parent Enumeration Catalog.
  - Line 10: Mapping covers string serialization, database storage, DTO exposure, OpenAPI schema, event payload compatibility, validation, and search indexing.

### knowledge/catalog/enumeration/value-usage-and-reference.md
- Category: C. Technology-neutral Contract
- 命中標題: # Enumeration Value Usage and Reference
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 87: | Enumeration | Aggregate | Entity | Value Object | Repository | DTO | API | Database |
  - Line 89: | GoalStatus | GoalPlan | Goal | Catalog-linked Value Object when applicable | GoalRepository | GoalStatusDto | JSON string | Text with check constraint |
  - Line 90: | DecisionStatus | DecisionSession | Decision, Recommendation | Catalog-linked Value Object when applicable | DecisionRepository | DecisionStatusDto | JSON string | Text with check constraint |

### knowledge/catalog/financial-formula-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Formula Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 78: | `/api/v1/formulas` | GET | List formula definitions. | Formula:Read |
  - Line 79: | `/api/v1/formulas/{formulaId}/versions/{version}` | GET | Retrieve formula version. | Formula:Read |
  - Line 80: | `/api/v1/formulas/evaluate` | POST | Evaluate formula. | Formula:Evaluate |

### knowledge/catalog/message-contract-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Message Contract Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 27: - knowledge/repository-catalog.md
  - Line 40: - docs/api/07-API.md

### knowledge/catalog/repository/catalog-entries.md
- Category: C. Technology-neutral Contract
- 命中標題: # Repository Catalog Entries
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Repository Catalog Entries
  - Line 4: This split document isolates repository definitions from the parent Repository Catalog.
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/repository/governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Repository Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Repository Governance and Testing
  - Line 4: This split document isolates repository governance, validation, security, audit, performance, testing, edge cases, and consistency checks from the parent Repository Catalog.
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/repository/method-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Repository Method Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Repository Method Catalog
  - Line 4: This split document isolates the Complete Repository Methods section from the parent Repository Catalog while preserving the parent document as the canonical full specification.
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/repository/query-and-persistence-rules.md
- Category: C. Technology-neutral Contract
- 命中標題: # Repository Query and Persistence Rules
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Repository Query and Persistence Rules
  - Line 4: This split document isolates repository query, persistence, specification, filtering, sorting, aggregation, projection, and concurrency rules from the parent Repository Catalog.
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/repository/specification-patterns-and-executable-addendum.md
- Category: C. Technology-neutral Contract
- 命中標題: # Repository Specification Patterns and Executable Addendum
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Repository Specification Patterns and Executable Addendum
  - Line 4: This split document isolates repository specification patterns and the Phase 2 executable specification addendum from the parent Repository Catalog.
  - Line 7: - Parent specification: [Repository Catalog] (../repository-catalog.md)

### knowledge/catalog/service-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 27: - knowledge/repository-catalog.md
  - Line 42: - docs/database/05-DatabaseDesign.md
  - Line 43: - docs/database/06-ERD.md

### knowledge/catalog/service-catalog/communication-and-transactions.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service Catalog Communication and Transactions
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 15: | DecisionApplicationService | Application Service | DecisionService, ScoringService, ExplainabilityService, DecisionRepository, ScenarioRepository | API, Workflow, Command Handler | Authorized, observable, audited, and ...
  - Line 16: | ScenarioApplicationService | Application Service | ScenarioService, ScoringService, RiskService, ScenarioRepository, DecisionRepository | API, Scheduler, Workflow | Authorized, observable, audited, and catalog-aligned ...
  - Line 17: | GoalApplicationService | Application Service | GoalRepository, RetirementService, CashFlowService | API, Workflow | Authorized, observable, audited, and catalog-aligned |

### knowledge/catalog/service-catalog/diagrams-testing-edge-cases.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service Catalog Diagrams, Testing, and Edge Cases
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 23: | Layer Diagram | API, application service, domain service, repository, and infrastructure service layering. |
  - Line 33: | Unit Test | Service behavior in isolation with classification, dependency, aggregate, repository, command, event, workflow, background job, scheduler, automation, integration, capability, communication, transaction, se...
  - Line 42: The parent catalog enumerates service edge cases for incomplete or conflicting service name, classification, owner, dependency, aggregate, repository, domain service, application service, command, domain event, workflow,...

### knowledge/catalog/service-catalog/relationship-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service Catalog Relationship Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Service relationship matrices preserve the service source of truth for Aggregate, Repository, Domain Service, Application Service, Command, Domain Event, Workflow, Background Job, Scheduler, Automation, External Integrat...
  - Line 13: Each matrix row keeps the original Service, Category, Dependency, Consumer, Control, Aggregate, Repository, Domain Service, Application Service, Command, Domain Event, Workflow, Background Job, Scheduler, Automation, Ext...
  - Line 18: - Service Repository Matrix

### knowledge/catalog/services/administration-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - AdministrationApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: AuditRepository, ScenarioRepository, NotificationRepository, HouseholdRepository, ScenarioService
  - Line 33: Repository Dependencies: AuditRepository, ScenarioRepository, NotificationRepository, HouseholdRepository, ScenarioService

### knowledge/catalog/services/allocation-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - AllocationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: PortfolioRepository, GoalRepository, ScenarioRepository, Optimization Engine
  - Line 33: Repository Dependencies: PortfolioRepository, GoalRepository, ScenarioRepository, Optimization Engine

### knowledge/catalog/services/audit-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - AuditService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: AuditRepository
  - Line 33: Repository Dependencies: AuditRepository

### knowledge/catalog/services/backup-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - BackupService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: AuditRepository
  - Line 33: Repository Dependencies: AuditRepository

### knowledge/catalog/services/blueprint-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - BlueprintApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: HouseholdRepository, GoalRepository, PropertyRepository, CashFlowService, RetirementService, PortfolioService
  - Line 33: Repository Dependencies: HouseholdRepository, GoalRepository, PropertyRepository, CashFlowService, RetirementService, PortfolioService

### knowledge/catalog/services/cache-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - CacheService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 33: Repository Dependencies: Repositories, Projection handlers
  - Line 41: Consistency Boundary: Aggregate or use case consistency boundary as defined by Command, Repository, Domain Service, or Application Service catalog.

### knowledge/catalog/services/cash-flow-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - CashFlowService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: HouseholdRepository, LoanRepository, Calculation Engine, Projection Engine
  - Line 33: Repository Dependencies: HouseholdRepository, LoanRepository, Calculation Engine, Projection Engine

### knowledge/catalog/services/dashboard-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - DashboardApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: CashFlowService, PortfolioService, LoanService, RetirementService, HouseholdRepository, PortfolioRepository, LoanRepository
  - Line 33: Repository Dependencies: CashFlowService, PortfolioService, LoanService, RetirementService, HouseholdRepository, PortfolioRepository, LoanRepository

### knowledge/catalog/services/decision-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - DecisionApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: DecisionService, ScoringService, ExplainabilityService, DecisionRepository, ScenarioRepository
  - Line 33: Repository Dependencies: DecisionService, ScoringService, ExplainabilityService, DecisionRepository, ScenarioRepository

### knowledge/catalog/services/decision-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - DecisionService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: DecisionRepository, ScenarioRepository, Rule Engine
  - Line 33: Repository Dependencies: DecisionRepository, ScenarioRepository, Rule Engine

### knowledge/catalog/services/email-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - EmailService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: NotificationRepository, ExternalApiService
  - Line 33: Repository Dependencies: NotificationRepository, ExternalApiService

### knowledge/catalog/services/explainability-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ExplainabilityService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: DecisionRepository, ScenarioRepository, NotificationRepository, AuditRepository, Rule Engine
  - Line 33: Repository Dependencies: DecisionRepository, ScenarioRepository, NotificationRepository, AuditRepository, Rule Engine

### knowledge/catalog/services/external-api-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ExternalApiService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 33: Repository Dependencies: Message Contract Catalog, Integration Framework
  - Line 41: Consistency Boundary: Aggregate or use case consistency boundary as defined by Command, Repository, Domain Service, or Application Service catalog.

### knowledge/catalog/services/file-storage-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - FileStorageService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: ReportApplicationService, AuditRepository
  - Line 33: Repository Dependencies: ReportApplicationService, AuditRepository

### knowledge/catalog/services/goal-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - GoalApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: GoalRepository, RetirementService, CashFlowService
  - Line 33: Repository Dependencies: GoalRepository, RetirementService, CashFlowService

### knowledge/catalog/services/ips-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - IPSApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: RiskService, CashFlowService, HouseholdRepository, ScenarioRepository
  - Line 33: Repository Dependencies: RiskService, CashFlowService, HouseholdRepository, ScenarioRepository

### knowledge/catalog/services/loan-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - LoanApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: LoanRepository, LoanService
  - Line 33: Repository Dependencies: LoanRepository, LoanService

### knowledge/catalog/services/loan-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - LoanService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: LoanRepository, LiabilityRepository, Calculation Engine, Optimization Engine, Projection Engine
  - Line 33: Repository Dependencies: LoanRepository, LiabilityRepository, Calculation Engine, Optimization Engine, Projection Engine

### knowledge/catalog/services/notification-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - NotificationApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: NotificationRepository, DecisionRepository, AuditRepository, ExplainabilityService
  - Line 33: Repository Dependencies: NotificationRepository, DecisionRepository, AuditRepository, ExplainabilityService

### knowledge/catalog/services/notification-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - NotificationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: NotificationRepository, EmailService
  - Line 33: Repository Dependencies: NotificationRepository, EmailService

### knowledge/catalog/services/portfolio-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - PortfolioApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: PortfolioRepository, PortfolioService, AllocationService
  - Line 33: Repository Dependencies: PortfolioRepository, PortfolioService, AllocationService

### knowledge/catalog/services/portfolio-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - PortfolioService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: AssetRepository, PortfolioRepository, PropertyRepository, Calculation Engine, Projection Engine
  - Line 33: Repository Dependencies: AssetRepository, PortfolioRepository, PropertyRepository, Calculation Engine, Projection Engine

### knowledge/catalog/services/report-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ReportApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository
  - Line 33: Repository Dependencies: HouseholdRepository, ScenarioRepository, DecisionRepository, PortfolioRepository, LoanRepository, AuditRepository

### knowledge/catalog/services/retirement-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - RetirementService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: GoalRepository, ScenarioRepository, Projection Engine, Simulation Engine, Optimization Engine
  - Line 33: Repository Dependencies: GoalRepository, ScenarioRepository, Projection Engine, Simulation Engine, Optimization Engine

### knowledge/catalog/services/risk-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - RiskService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: ScenarioRepository, PortfolioRepository, Rule Engine, Calculation Engine
  - Line 33: Repository Dependencies: ScenarioRepository, PortfolioRepository, Rule Engine, Calculation Engine

### knowledge/catalog/services/scenario-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ScenarioApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: ScenarioService, ScoringService, RiskService, ScenarioRepository, DecisionRepository
  - Line 33: Repository Dependencies: ScenarioService, ScoringService, RiskService, ScenarioRepository, DecisionRepository

### knowledge/catalog/services/scenario-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ScenarioService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: ScenarioRepository, DecisionRepository, Simulation Engine, Projection Engine, Rule Engine
  - Line 33: Repository Dependencies: ScenarioRepository, DecisionRepository, Simulation Engine, Projection Engine, Rule Engine

### knowledge/catalog/services/scheduler-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - SchedulerService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: AuditRepository, ScenarioApplicationService, AdministrationApplicationService
  - Line 33: Repository Dependencies: AuditRepository, ScenarioApplicationService, AdministrationApplicationService

### knowledge/catalog/services/scoring-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - ScoringService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: ScenarioRepository, DecisionRepository, Rule Engine, Calculation Engine
  - Line 33: Repository Dependencies: ScenarioRepository, DecisionRepository, Rule Engine, Calculation Engine

### knowledge/catalog/services/user-application-service.md
- Category: C. Technology-neutral Contract
- 命中標題: # Service - UserApplicationService
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 25: Non Responsibilities: No uncataloged domain ownership, no bypass of Aggregate or Repository ownership, no hidden transaction boundary, and no unapproved external dependency.
  - Line 27: Dependencies: UserRepository, HouseholdRepository, AuditRepository
  - Line 33: Repository Dependencies: UserRepository, HouseholdRepository, AuditRepository

### knowledge/catalog/system-module/definition-standard.md
- Category: C. Technology-neutral Contract
- 命中標題: # System Module Definition Standard
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 56: - Owned Database Objects
  - Line 73: The catalog uses the definition standard to keep module ownership comparable across Domain, Bounded Context, Aggregate, Entity, Repository, Command, Domain Event, Application Service, Domain Service, Workflow, API, Integ...

### knowledge/catalog/system-module/diagrams-testing-edge-cases.md
- Category: C. Technology-neutral Contract
- 命中標題: # System Module Diagrams, Testing, and Edge Cases
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 26: | Module Layer Diagram | API, application, domain, repository, and infrastructure module layering. |
  - Line 27: | System Architecture Diagram | User, API, system module, service, repository, database, and domain event relationship. |
  - Line 33: | Module Test | Owner, aggregate, entity, repository, command, event, service, API, workflow, integration, database, security, audit, performance, availability, scalability, inbound dependency, and outbound dependency ma...

### knowledge/catalog/system-module/relationship-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # System Module Relationship Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: System Module relationship matrices preserve module mapping across Domain, Bounded Context, Aggregate, Entity, Repository, Command, Domain Event, Application Service, Domain Service, API, Workflow, Integration, and Datab...
  - Line 22: - Repository Module Matrix
  - Line 30: - Database Module Matrix

### knowledge/engine/calculation-engine-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Calculation Engine Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 36: - docs/api/07-API.md
  - Line 120: 5. Calculation Graph resolves formula dependencies, projection dependencies, simulation dependencies, optimization dependencies, rule engine dependencies, and repository data dependencies.
  - Line 147: | Dependencies | Formula, repository, projection, simulation, optimization, rule, decision, scenario, and market dependencies. |

### knowledge/engine/optimization-engine-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Optimization Engine Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: - docs/api/07-API.md
  - Line 170: | Repository | Repository reads needed for source data. |
  - Line 642: | Repository | Source data, query, snapshot time, tenant, household, and lineage are mapped. |

### knowledge/engine/optimization-engine/catalog-and-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Optimization Engine Catalog and Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 33: | Repository | Repository reads needed for source data. |

### knowledge/engine/optimization-engine/operations-and-verification.md
- Category: C. Technology-neutral Contract
- 命中標題: # Optimization Engine Operations and Verification
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 217: | Repository | Source data, query, snapshot time, tenant, household, and lineage are mapped. |

### knowledge/engine/simulation-engine-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Simulation Engine Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 41: - docs/api/07-API.md
  - Line 114: | Simulation Dependency | Upstream calculation, projection, optimization, rule, decision, repository, assumption, or market data dependency. | Must be declared and versioned. |
  - Line 160: | Repository | Repository reads needed for source data. |

### knowledge/engine/simulation-engine/catalog-and-matrices.md
- Category: C. Technology-neutral Contract
- 命中標題: # Simulation Engine Catalog and Matrices
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 29: | Repository | Repository reads needed for source data. |

### knowledge/engine/simulation-engine/operations-and-verification.md
- Category: C. Technology-neutral Contract
- 命中標題: # Simulation Engine Operations and Verification
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 219: | Repository | Source data, query, snapshot time, tenant, household, and lineage are mapped. |

### knowledge/entity/asset/api-and-audit.md
- Category: C. Technology-neutral Contract
- 命中標題: # Asset API and Audit
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: - `/api/v1/assets` is the frontend-facing Asset resource.
  - Line 28: - [API Governance Framework] (../../api/api-governance-framework.md)

### knowledge/entity/goal/identity-and-ownership.md
- Category: C. Technology-neutral Contract
- 命中標題: # Goal Identity and Ownership
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: - Aggregate boundary: GoalPlan ownership through GoalRepository

### knowledge/entity/loan/api-and-audit.md
- Category: C. Technology-neutral Contract
- 命中標題: # Loan API and Audit
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 28: - [API Governance Framework] (../../api/api-governance-framework.md)

### knowledge/entity/loan/property-and-lifecycle-rules.md
- Category: C. Technology-neutral Contract
- 命中標題: # Loan Property and Lifecycle Rules
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 31: - Repository logic must not perform business calculations; LoanService and calculation engine own calculation behavior.

### knowledge/entity/portfolio-entity/commands-and-events.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Commands and Events
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 5: This split document summarizes the command, event, and repository execution boundaries for Portfolio. Portfolio remains owned inside AssetPortfolio, and the parent specification remains the source of truth.
  - Line 9: | Command or Use Case | Catalog Status | Handler Boundary | Repository | Events | Notes |
  - Line 11: | CreatePortfolio | Catalog Command | CreatePortfolioCommandHandler; PortfolioApplicationService | PortfolioRepository | PortfolioCreated | Mutates AssetPortfolio only |

### knowledge/entity/portfolio-entity/service-projections-and-operations.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Service Projections and Operations
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: | PortfolioService | Catalog-aligned | Calculates portfolio value, allocation analysis, and projection input outside repository. |
  - Line 36: | Portfolio detail | tenant:{tenantId}:household:{householdId}:portfolio:{portfolioId}:v{version} | Any AssetPortfolio write | PortfolioRepository |
  - Line 40: | Search cache | tenant:{tenantId}:portfolios:search:{hash} | Any portfolio write in tenant | PortfolioRepository |

### knowledge/entity/position/commands-and-events.md
- Category: C. Technology-neutral Contract
- 命中標題: # Position Commands and Events
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 5: This split document summarizes the command, event, and repository execution boundaries for Position. Position is the business/API synonym for the cataloged Holding entity inside AssetPortfolio. The parent specification r...
  - Line 9: | Command or Use Case | Catalog Status | Handler Boundary | Repository | Events | Notes |
  - Line 11: | BuySecurity | Catalog Command | PortfolioApplicationService | PortfolioRepository | SecurityPurchased | Increases Holding quantity |

### knowledge/entity/position/service-projections-and-operations.md
- Category: C. Technology-neutral Contract
- 命中標題: # Position Service Projections and Operations
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 36: | Position detail | tenant:{tenantId}:portfolio:{portfolioId}:holding:{holdingId}:v{version} | Any Holding write | PortfolioRepository |
  - Line 39: | Search cache | tenant:{tenantId}:holdings:search:{hash} | Any holding write in tenant | PortfolioRepository |
  - Line 45: | Authorization | Actor must have TenantId, HouseholdId, PortfolioId, and permission before repository access. |

### knowledge/framework/automation-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 46: - docs/database/05-DatabaseDesign.md
  - Line 47: - docs/database/06-ERD.md
  - Line 48: - docs/api/07-API.md

### knowledge/framework/automation/matrices-and-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation Matrices and Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: | Automation | Workflow | Scheduler | Background Job | Application Service | Domain Service | Rule Engine | Decision Engine | Command | Domain Event | Notification | Projection | Repository | Message Contract |
  - Line 13: | ScenarioRefreshAutomation | Scenario workflow | ScenarioEvaluationScheduler | ScenarioEvaluationJob | ScenarioApplicationService | ScenarioService, ScoringService | Rule Engine | Decision Engine | EvaluateScenario | Sc...
  - Line 14: | RecommendationRefreshAutomation | Decision workflow | ScenarioEvaluationScheduler | ScenarioEvaluationJob | DecisionApplicationService | DecisionService, ScoringService | Rule Engine | Decision Engine | EvaluateScenari...

### knowledge/framework/automation/operational-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation Operational Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 12: 1. Every automation must define trigger, source, condition, rule engine, decision engine, input, output, execution context, application service, domain service, workflow, scheduler, background job, command, domain event,...
  - Line 13: 2. Automation mappings must remain complete and non-conflicting across trigger, condition, action, workflow, scheduler, job, command, event, message, notification, projection, integration, service, and repository boundar...
  - Line 14: 3. Automation must not bypass Aggregate, Command, Repository, Service, Security, Workflow, Scheduler, or Background Job boundaries.

### knowledge/framework/automation/recovery-and-approvals.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation Recovery and Approvals
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 14: - Retry execution must preserve catalog boundaries for Aggregate, Command, Repository, Service, Workflow, Scheduler, and Background Job.
  - Line 39: - Recovery must not bypass Aggregate, Command, Repository, Service, Security, Workflow, Scheduler, or Background Job boundaries.

### knowledge/framework/automations/backup-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - BackupAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: AuditRepository
  - Line 64: Automation Control 1: BackupAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain servi...
  - Line 65: Automation Control 2: BackupAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain servi...

### knowledge/framework/automations/banking-import-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - BankingImportAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: HouseholdRepository
  - Line 64: Automation Control 1: BankingImportAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domai...
  - Line 65: Automation Control 2: BankingImportAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domai...

### knowledge/framework/automations/brokerage-import-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - BrokerageImportAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: PortfolioRepository, AssetRepository
  - Line 64: Automation Control 1: BrokerageImportAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, dom...
  - Line 65: Automation Control 2: BrokerageImportAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, dom...

### knowledge/framework/automations/cache-refresh-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - CacheRefreshAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: HouseholdRepository, PortfolioRepository
  - Line 64: Automation Control 1: CacheRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain...
  - Line 65: Automation Control 2: CacheRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain...

### knowledge/framework/automations/cleanup-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - CleanupAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: AuditRepository
  - Line 64: Automation Control 1: CleanupAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain serv...
  - Line 65: Automation Control 2: CleanupAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain serv...

### knowledge/framework/automations/decision-review-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - DecisionReviewAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: DecisionRepository
  - Line 64: Automation Control 1: DecisionReviewAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, doma...
  - Line 65: Automation Control 2: DecisionReviewAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, doma...

### knowledge/framework/automations/inbox-process-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - InboxProcessAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: AuditRepository
  - Line 64: Automation Control 1: InboxProcessAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain...
  - Line 65: Automation Control 2: InboxProcessAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domain...

### knowledge/framework/automations/notification-dispatch-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - NotificationDispatchAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: NotificationRepository
  - Line 64: Automation Control 1: NotificationDispatchAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service...
  - Line 65: Automation Control 2: NotificationDispatchAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service...

### knowledge/framework/automations/outbox-publish-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - OutboxPublishAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: AuditRepository
  - Line 64: Automation Control 1: OutboxPublishAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domai...
  - Line 65: Automation Control 2: OutboxPublishAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, domai...

### knowledge/framework/automations/recommendation-refresh-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - RecommendationRefreshAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: DecisionRepository
  - Line 64: Automation Control 1: RecommendationRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application servic...
  - Line 65: Automation Control 2: RecommendationRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application servic...

### knowledge/framework/automations/report-generation-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - ReportGenerationAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: AuditRepository
  - Line 64: Automation Control 1: ReportGenerationAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, do...
  - Line 65: Automation Control 2: ReportGenerationAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, do...

### knowledge/framework/automations/scenario-refresh-automation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Automation - ScenarioRefreshAutomation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 40: Repositories: ScenarioRepository
  - Line 64: Automation Control 1: ScenarioRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, dom...
  - Line 65: Automation Control 2: ScenarioRefreshAutomation preserves trigger mapping, trigger source, condition mapping, rule engine dependency, decision engine dependency, input, output, execution context, application service, dom...

### knowledge/framework/background-job-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 43: - docs/database/05-DatabaseDesign.md
  - Line 44: - docs/database/06-ERD.md
  - Line 45: - docs/api/07-API.md

### knowledge/framework/background-job/diagrams-and-completion.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Diagrams and Completion
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 21: Background job edge cases focus on incomplete or conflicting mappings across trigger, schedule, frequency, input, output, execution owner, application service, domain service, repository, command, domain event, message c...
  - Line 24: The final consistency matrix maps each background job to workflow, scheduler, automation, application service, domain service, repository, command, domain event, and message contract.

### knowledge/framework/background-job/maintenance-jobs.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Maintenance Jobs
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 29: | Repositories | AuditRepository |
  - Line 36: | Dependencies | AdministrationApplicationService; ExplainabilityService; AuditRepository; CleanupMessage |
  - Line 56: | Repositories | AuditRepository |

### knowledge/framework/background-job/matrices-and-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Matrices and Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: | Background Job | Workflow | Scheduler | Automation | Application Service | Domain Service | Repository | Command | Domain Event | Message Contract |
  - Line 13: | ScenarioEvaluationJob | Scenario workflow | Scheduler Framework | Automation Framework | ScenarioApplicationService | ScenarioService, ScoringService, RiskService | ScenarioRepository, DecisionRepository | EvaluateScen...
  - Line 14: | ScenarioReplayJob | Replay workflow | Scheduler Framework | Administration automation | ScenarioApplicationService | ScenarioService | ScenarioRepository, AuditRepository | ReplayScenario | SnapshotCreated, ReplayCompl...

### knowledge/framework/background-job/operational-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Operational Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 12: 1. Every background job must define trigger, schedule, frequency, input, output, execution owner, application service, domain service, repository, command, domain event, message contract, workflow, scheduler, automation,...
  - Line 13: 2. Background job mappings must remain complete and non-conflicting across workflow, scheduler, automation, service, repository, command, event, and message boundaries.
  - Line 14: 3. Background jobs must not bypass repository, service, security, or transaction boundaries.

### knowledge/framework/background-job/validation-and-rules.md
- Category: C. Technology-neutral Contract
- 命中標題: # Background Job Validation and Rules
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: Validation applies when a job is queued, started, retried, resumed, checkpointed, cancelled, failed, or completed. Each validation rule checks the job trigger, owner, schedule, input, output, service dependency, reposito...
  - Line 15: Background job business rules enforce catalog-approved execution. Jobs must not perform hidden domain mutation, bypass application service boundaries, skip repository boundaries, or commit work outside the declared trans...

### knowledge/framework/cache-strategy-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Cache Strategy Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 17: - knowledge/repository-catalog.md
  - Line 24: - knowledge/database-governance-framework.md
  - Line 34: - docs/database/05-DatabaseDesign.md

### knowledge/framework/compliance-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Compliance Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 23: - knowledge/repository-catalog.md
  - Line 36: - docs/database/05-DatabaseDesign.md
  - Line 37: - docs/database/06-ERD.md

### knowledge/framework/data-retention-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # data-retention-framework.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 154: - Encryption at rest

### knowledge/framework/explainability-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # knowledge/explainability-framework.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 241: GET /api/decisions/{decisionId}/explanation
  - Line 305: ### Repository Contract
  - Line 307: | Repository | Responsibility | Required Operations |

### knowledge/framework/feature-flag-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # feature-flag-framework.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 257: | /api/v1/feature-flags | POST | Create flag | Platform:Write |
  - Line 258: | /api/v1/feature-flags/{flagKey} | GET | Retrieve flag | Platform:Read |
  - Line 259: | /api/v1/feature-flags/{flagKey}/rules | PUT | Update targeting rules | Platform:Write |

### knowledge/framework/financial-alert-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Alert Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 209: | /api/v1/alerts | GET | List alerts | Alert:Read |
  - Line 210: | /api/v1/alerts/evaluate | POST | Run alert evaluation | Alert:Evaluate |
  - Line 211: | /api/v1/alerts/{alertId}/acknowledge | POST | Acknowledge alert | Alert:Write |

### knowledge/framework/financial-milestone-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Milestone Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 165: | /api/v1/milestones | GET | List household milestones | Goal:Read |
  - Line 166: | /api/v1/milestones | POST | Create milestone | Goal:Write |
  - Line 167: | /api/v1/milestones/{milestoneId}/evaluate | POST | Evaluate milestone | Goal:Evaluate |

### knowledge/framework/financial-projection-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Projection Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 198: | /api/v1/projections | POST | Generate financial projection | Projection:Evaluate |
  - Line 199: | /api/v1/projections/{projectionId} | GET | Retrieve projection | Projection:Read |
  - Line 200: | /api/v1/projections/{projectionId}/replay | POST | Replay historical projection | Audit:Replay |

### knowledge/framework/financial-ratio-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Ratio Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 151: | /api/v1/ratios/definitions | GET | List ratio definitions | Ratio:Read |
  - Line 152: | /api/v1/ratios/calculate | POST | Calculate ratio values | Ratio:Evaluate |
  - Line 153: | /api/v1/ratios/{ratioId}/history | GET | Retrieve ratio history | Ratio:Read |

### knowledge/framework/goal-funding-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Goal Funding Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 201: | /api/v1/goals/{goalId}/funding-plan | POST | Calculate funding plan | GoalFunding:Evaluate |
  - Line 202: | /api/v1/goals/{goalId}/funding-plan | GET | Retrieve funding plan | GoalFunding:Read |
  - Line 203: | /api/v1/goals/{goalId}/funding/allocate | POST | Allocate funding | GoalFunding:Write |

### knowledge/framework/goal-review-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Goal Review Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 187: | /api/v1/goals/{goalId}/reviews | POST | Execute goal review | GoalReview:Write |
  - Line 188: | /api/v1/goals/{goalId}/reviews | GET | List goal reviews | GoalReview:Read |
  - Line 189: | /api/v1/goals/{goalId}/reviews/schedule | POST | Schedule next review | GoalReview:Write |

### knowledge/framework/house-decision-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # House Decision Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 182: | /api/v1/housing/decisions/evaluate | POST | Evaluate housing decision | HousingDecision:Evaluate |
  - Line 183: | /api/v1/housing/scenarios/compare | POST | Compare housing scenarios | Scenario:Evaluate |
  - Line 184: | /api/v1/housing/decisions/{decisionId} | GET | Retrieve housing decision | HousingDecision:Read |

### knowledge/framework/life-stage-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Life Stage Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 169: | /api/v1/life-stage/evaluate | POST | Evaluate current life stage | LifeStage:Evaluate |
  - Line 170: | /api/v1/life-stage/transition | POST | Transition life stage | LifeStage:Write |
  - Line 171: | /api/v1/life-stage/override | POST | Override recommended stage | LifeStage:Write |

### knowledge/framework/liquidity-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Liquidity Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 188: | /api/v1/liquidity/snapshot | POST | Calculate liquidity snapshot | Liquidity:Evaluate |
  - Line 189: | /api/v1/liquidity/current | GET | Retrieve current liquidity | Liquidity:Read |
  - Line 190: | /api/v1/liquidity/validate-decision | POST | Validate decision impact | Decision:Evaluate |

### knowledge/framework/net-worth-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Net Worth Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 181: | /api/net-worth/snapshots/calculate | POST | Calculate snapshot. |
  - Line 182: | /api/net-worth/snapshots/{snapshotId}/publish | POST | Publish snapshot. |
  - Line 183: | /api/net-worth/snapshots/{snapshotId} | GET | Retrieve snapshot. |

### knowledge/framework/notification-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Notification Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 194: | /api/notifications | POST | Create notification. |
  - Line 195: | /api/notifications/{notificationId} | GET | Retrieve notification state. |
  - Line 196: | /api/notifications/{notificationId}/acknowledge | POST | Acknowledge notification. |

### knowledge/framework/policy-management-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # policy-management-framework.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 269: | /api/policies | POST | Create policy draft. |
  - Line 270: | /api/policies/{policyId}/versions/{version}/submit | POST | Submit for review. |
  - Line 271: | /api/policies/{policyId}/versions/{version}/approve | POST | Approve policy version. |

### knowledge/framework/portfolio-performance-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Performance Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 175: | /api/portfolios/{portfolioId}/performance/calculate | POST | Calculate performance. |
  - Line 176: | /api/portfolios/{portfolioId}/performance/{performanceRunId} | GET | Retrieve performance result. |
  - Line 177: | /api/portfolios/{portfolioId}/performance/{performanceRunId}/publish | POST | Publish snapshot. |

### knowledge/framework/rebalancing-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Rebalancing Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 120: | /api/portfolios/{portfolioId}/rebalancing/evaluate | POST | Evaluate rebalancing need. |
  - Line 121: | /api/portfolios/{portfolioId}/rebalancing/recommendations | POST | Generate recommendation. |
  - Line 122: | /api/rebalancing-recommendations/{recommendationId}/approve | POST | Approve recommendation. |

### knowledge/framework/recommendation-priority-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Recommendation Priority Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 194: | /api/recommendations/{recommendationId}/priority/calculate | POST | Calculate priority. |
  - Line 195: | /api/recommendations/conflicts/resolve | POST | Resolve conflicts. |
  - Line 196: | /api/recommendations/duplicates/merge | POST | Merge duplicates. |

### knowledge/framework/risk-budget-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Risk Budget Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 185: | /api/risk-budgets/calculate | POST | Calculate risk budget. |
  - Line 186: | /api/risk-budgets/{riskBudgetId}/allocate-goals | POST | Allocate budget to goals. |
  - Line 187: | /api/risk-budgets/{riskBudgetId}/validate | POST | Validate constraints. |

### knowledge/framework/scheduler-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 39: - docs/database/05-DatabaseDesign.md
  - Line 40: - docs/database/06-ERD.md
  - Line 41: - docs/api/07-API.md

### knowledge/framework/scheduler/diagrams-and-consistency.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler Diagrams and Consistency
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 75: APP --> REPO[Repository]
  - Line 81: Scheduler edge cases cover incomplete or conflicting mappings across trigger, schedule rule, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution wi...
  - Line 85: | Scheduler | Background Job | Workflow | Automation | Application Service | Domain Service | Repository | Command | Domain Event | Message Contract |

### knowledge/framework/scheduler/matrices-and-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler Matrices and Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: | Scheduler | Background Job | Workflow | Automation | Application Service | Domain Service | Repository | Command | Domain Event | Message Contract |
  - Line 13: | ScenarioEvaluationScheduler | ScenarioEvaluationJob | Scenario workflow | Scenario automation | ScenarioApplicationService | ScenarioService | ScenarioRepository | EvaluateScenario | ScenarioEvaluated | ScenarioEvaluat...
  - Line 14: | ScenarioReplayScheduler | ScenarioReplayJob | Replay workflow | Administration automation | ScenarioApplicationService | ScenarioService | ScenarioRepository, AuditRepository | ReplayScenario | ReplayCompleted | Replay...

### knowledge/framework/scheduler/timing-and-concurrency-policies.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler Timing and Concurrency Policies
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 27: - Retry execution must not bypass Application Service, Domain Service, Command, Repository, or Message Contract boundaries.

### knowledge/framework/schedulers/backup-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - BackupScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: AuditRepository
  - Line 43: Dependencies: BackupJob; AdministrationApplicationService; ExplainabilityService; AuditRepository; BackupCompletedMessage
  - Line 55: Scheduler Control 1: BackupScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurrency poli...

### knowledge/framework/schedulers/banking-import-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - BankingImportScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: HouseholdRepository, AuditRepository
  - Line 43: Dependencies: BankingImportJob; BlueprintApplicationService, DashboardApplicationService; CashFlowService; HouseholdRepository, AuditRepository; BankingTransactionImportedMessage
  - Line 55: Scheduler Control 1: BankingImportScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurren...

### knowledge/framework/schedulers/brokerage-import-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - BrokerageImportScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: PortfolioRepository, AssetRepository, AuditRepository
  - Line 43: Dependencies: BrokerageImportJob; PortfolioApplicationService; PortfolioService, AllocationService; PortfolioRepository, AssetRepository, AuditRepository; PortfolioImportedMessage
  - Line 55: Scheduler Control 1: BrokerageImportScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurr...

### knowledge/framework/schedulers/cache-refresh-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - CacheRefreshScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: HouseholdRepository, PortfolioRepository, LoanRepository
  - Line 43: Dependencies: CacheRefreshJob; DashboardApplicationService; CashFlowService, PortfolioService, LoanService; HouseholdRepository, PortfolioRepository, LoanRepository; CacheRefreshMessage
  - Line 55: Scheduler Control 1: CacheRefreshScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurrenc...

### knowledge/framework/schedulers/cleanup-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - CleanupScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: AuditRepository
  - Line 43: Dependencies: CleanupJob; AdministrationApplicationService; ExplainabilityService; AuditRepository; CleanupMessage
  - Line 55: Scheduler Control 1: CleanupScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurrency pol...

### knowledge/framework/schedulers/inbox-process-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - InboxProcessScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: AuditRepository
  - Line 43: Dependencies: InboxProcessJob; AdministrationApplicationService; ScenarioService; AuditRepository; All consumed messages
  - Line 55: Scheduler Control 1: InboxProcessScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurrenc...

### knowledge/framework/schedulers/notification-dispatch-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - NotificationDispatchScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: NotificationRepository
  - Line 43: Dependencies: NotificationDispatchJob; NotificationApplicationService; ExplainabilityService, DecisionService; NotificationRepository; NotificationRequestedMessage
  - Line 55: Scheduler Control 1: NotificationDispatchScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, co...

### knowledge/framework/schedulers/outbox-publish-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - OutboxPublishScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: AuditRepository
  - Line 43: Dependencies: OutboxPublishJob; AdministrationApplicationService; ExplainabilityService; AuditRepository; All catalog messages
  - Line 55: Scheduler Control 1: OutboxPublishScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurren...

### knowledge/framework/schedulers/projection-refresh-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - ProjectionRefreshScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: ScenarioRepository, PortfolioRepository, LoanRepository
  - Line 43: Dependencies: ProjectionRefreshJob; DashboardApplicationService; ScenarioService, PortfolioService, LoanService; ScenarioRepository, PortfolioRepository, LoanRepository; Projection messages
  - Line 55: Scheduler Control 1: ProjectionRefreshScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concu...

### knowledge/framework/schedulers/report-generation-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - ReportGenerationScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: AuditRepository, ScenarioRepository, DecisionRepository
  - Line 43: Dependencies: ReportGenerationJob; ReportApplicationService; ExplainabilityService, ScenarioService, PortfolioService, LoanService; AuditRepository, ScenarioRepository, DecisionRepository; ReportGenerationRequestedMessag...
  - Line 55: Scheduler Control 1: ReportGenerationScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concur...

### knowledge/framework/schedulers/scenario-evaluation-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - ScenarioEvaluationScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: ScenarioRepository
  - Line 43: Dependencies: ScenarioEvaluationJob; ScenarioApplicationService; ScenarioService; ScenarioRepository; ScenarioEvaluatedMessage
  - Line 55: Scheduler Control 1: ScenarioEvaluationScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, conc...

### knowledge/framework/schedulers/scenario-replay-scheduler.md
- Category: C. Technology-neutral Contract
- 命中標題: # Scheduler - ScenarioReplayScheduler
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 42: Repositories: ScenarioRepository, AuditRepository
  - Line 43: Dependencies: ScenarioReplayJob; ScenarioApplicationService; ScenarioService; ScenarioRepository, AuditRepository; ReplayCompletedMessage
  - Line 55: Scheduler Control 1: ScenarioReplayScheduler preserves trigger, schedule type, cron expression, calendar rule, interval, timezone, misfire policy, catch-up policy, retry policy, timeout policy, execution window, concurre...

### knowledge/integration/integration/architecture-overview.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Architecture Overview
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 9: - REST, webhook, message, file, ETL, import, export, and synchronization patterns.
  - Line 20: - All integration calls require authentication, authorization, retry, timeout, audit, monitoring, and versioning.
  - Line 27: - REST and external API traffic must follow API Governance.

### knowledge/integration/integration/catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 24: Each integration preserves owner, external system, protocol, authentication, data contract, retry policy, timeout, rate limit, error handling, audit, and privacy controls.

### knowledge/integration/integration/credential-and-execution-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Credential and Execution Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 5: This split document summarizes Integration Framework controls for authentication, authorization, encryption, credential references, retry, timeout, compensation, replay, and execution contracts.
  - Line 10: - All integration calls require authentication, authorization, retry, timeout, audit, monitoring, and versioning.

### knowledge/integration/integration/diagrams-and-execution-addendum.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Diagrams and Execution Addendum
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 21: Integration edge cases focus on incomplete or conflicting mapping for source system, target system, protocol, transport, authentication, authorization, encryption, payload, DTO, message contract, API, version, retry, tim...
  - Line 41: The Integration Framework is complete only when every integration maps to source, target, protocol, authentication, retry, timeout, audit, and monitoring. The specification also requires only catalog-approved integration...

### knowledge/integration/integration/governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: Testing covers contract tests, authentication, authorization, retry, timeout, rate limiting, circuit breaker, webhook callback, polling, mapping, and failure recovery.

### knowledge/integration/integration/matrices-and-mappings.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Matrices and Mappings
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 12: | BankingApiIntegration | Banking API | Atlas Integration | DashboardApplicationService, BlueprintApplicationService | CashFlowService | /api/v1/integrations/banking | BankingTransactionImportedMessage | ExpenseRecorded,...
  - Line 13: | BrokerageApiIntegration | Brokerage API | Atlas Integration | PortfolioApplicationService | PortfolioService, AllocationService | /api/v1/integrations/brokerage | PortfolioImportedMessage | PortfolioCreated, SecurityPu...
  - Line 14: | MarketDataIntegration | Market Data Provider | Atlas Integration | PortfolioApplicationService, ScenarioApplicationService | PortfolioService, ScenarioService | /api/v1/integrations/market-data | MarketDataUpdatedMessa...

### knowledge/integration/integration/resilience-and-security.md
- Category: C. Technology-neutral Contract
- 命中標題: # Integration Resilience and Security
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 4: This split document isolates integration authentication, authorization, resilience, retry, timeout, circuit breaker, bulkhead, rate limiting, webhook, callback, and polling strategies from the parent Integration Framewor...

### knowledge/reporting/financial-dashboard-metrics.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Dashboard Metrics
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 182: | /api/v1/dashboard/metrics | GET | Retrieve dashboard metrics | Dashboard:Read |
  - Line 183: | /api/v1/dashboard/metrics/refresh | POST | Refresh metric snapshot | Dashboard:Refresh |
  - Line 184: | /api/v1/dashboard/metrics/{metricId}/history | GET | Retrieve metric history | Dashboard:Read |

### knowledge/reporting/kpi-definitions.md
- Category: C. Technology-neutral Contract
- 命中標題: # knowledge/kpi-definitions.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 267: | /api/v1/kpis | GET | List KPI definitions | KPI:Read |
  - Line 268: | /api/v1/kpis/calculate | POST | Calculate KPI values | KPI:Evaluate |
  - Line 269: | /api/v1/kpis/{kpiId}/history | GET | Retrieve KPI history | KPI:Read |

### knowledge/rule/home-upgrade-rule-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Home Upgrade Rule Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 175: | /api/v1/home-upgrade/rules/evaluate | POST | Evaluate home upgrade rules | HomeUpgrade:Evaluate |
  - Line 176: | /api/v1/home-upgrade/scenarios/rank | POST | Rank feasible scenarios | HomeUpgrade:Evaluate |
  - Line 177: | /api/v1/home-upgrade/rules/{evaluationId}/replay | POST | Replay rule evaluation | Audit:Replay |

### knowledge/rule/loan-decision-rule-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Loan Decision Rule Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 181: | /api/loan-decisions/evaluations | POST | Execute loan decision rule evaluation. |
  - Line 182: | /api/loan-decisions/evaluations/{evaluationId} | GET | Retrieve decision result and explainability output. |
  - Line 183: | /api/loan-decisions/evaluations/{evaluationId}/replay | POST | Replay a historical evaluation. |

### knowledge/security/decision-audit-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Decision Audit Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 106: - Audit Repository

### knowledge/security/permission-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Permission Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 20: | Alignment Sources | Security Framework, API Governance Framework, Application Service Catalog, Domain Service Catalog, Repository Catalog, Command Catalog, Domain Event Catalog, Service Catalog, System Module Catalog, ...
  - Line 24: Permission Framework defines the canonical Atlas permission model. It controls authorization decisions for Security, Authentication, Authorization, Role, Application Service, Domain Service, Repository, Command, Domain E...
  - Line 28: - Applies to every protected Atlas resource, operation, API, command, repository method, workflow step, scheduler job, automation action, background job, message contract, notification action, and audit-visible authoriza...

### knowledge/security/permission-framework/architecture-overview.md
- Category: C. Technology-neutral Contract
- 命中標題: # Permission Architecture Overview
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 13: - Principal receives Claims from authentication.

### knowledge/security/permission-framework/integration-boundaries.md
- Category: C. Technology-neutral Contract
- 命中標題: # Permission Integration Boundaries
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 10: - Permission Framework applies to every protected Atlas resource, operation, API, command, repository method, workflow step, scheduler job, automation action, background job, message contract, notification action, and au...
  - Line 16: - Repository and command access must preserve resource ownership, operation sensitivity, tenant membership, household membership, explicit deny, explicit allow, and default deny.
  - Line 21: - APIs must map endpoints to permissions and preserve authentication, authorization, audit, and observability.

### knowledge/security/permission-framework/permission-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Permission Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 16: - Description: Dashboard:Create requires authentication, authorization, explicit scope, tenant isolation, household isolation when applicable, and audit evidence.
  - Line 24: - Repository: UserRepository
  - Line 31: - API: /api/v1/users

### knowledge/security/permission-framework/permission-governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Permission Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 270: - Authorization must evaluate Permission before Application Service, Domain Service, Repository, Command, Workflow, Scheduler, Automation, Background Job, API, UI, Notification, and Integration execution.
  - Line 294: - Cache hits must avoid repository reads where role and policy versions are current.
  - Line 349: RepositoryCatalog["Repository Catalog"] --> PermissionFramework

### knowledge/security/permission-framework/role-and-matrix-catalog.md
- Category: C. Technology-neutral Contract
- 命中標題: # Role and Matrix Catalog
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 329: | Dashboard:Create | /api/v1/users | authenticated Principal, policy version, scope, audit |
  - Line 330: | Dashboard:Read | /api/v1/households | authenticated Principal, policy version, scope, audit |
  - Line 331: | Dashboard:Update | /api/v1/blueprint | authenticated Principal, policy version, scope, audit |

### knowledge/security/permission-framework/role-matrix-boundary-summary.md
- Category: C. Technology-neutral Contract
- 命中標題: # Role Matrix Boundary Summary
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 44: - Permission Repository Matrix maps permissions to protected repositories.

### knowledge/security/security-framework/authentication-flows-and-events.md
- Category: C. Technology-neutral Contract
- 命中標題: # Authentication Flows and Events
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 1: # Authentication Flows and Events
  - Line 5: ## Authentication Flows
  - Line 7: ### Authentication Flow: ApiBearerTokenFlow

### knowledge/security/security-framework/data-protection-and-isolation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Data Protection and Isolation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: - Encryption protects sensitive data in transit and at rest, including PII, credentials, secrets, and security audit material.
  - Line 14: - Secrets include signing keys, API keys, integration credentials, database credentials, encryption keys, and provider credentials.
  - Line 20: - Secret Management applies the same mandatory controls to signing keys, API keys, integration credentials, database credentials, encryption keys, and provider credentials.

### knowledge/security/security-framework/security-architecture.md
- Category: C. Technology-neutral Contract
- 命中標題: # Security Architecture
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 7: - [Identity and Access Architecture] (security-architecture/identity-and-access-architecture.md) - authentication, authorization, permissions, identity, and token lifecycle.
  - Line 8: - [Secrets, Encryption, and Interface Security] (security-architecture/secrets-encryption-and-interface-security.md) - credential handling, secrets, encryption, keys, API, message, and repository security.
  - Line 9: - [Data Isolation and Threat Controls] (security-architecture/data-isolation-and-threat-controls.md) - database, tenant, household, PII, masking, audit, threat model, and permission mapping controls.

### knowledge/security/security-framework/security-architecture/data-isolation-and-threat-controls.md
- Category: C. Technology-neutral Contract
- 命中標題: # Data Isolation and Threat Controls
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: - Database Security
  - Line 22: - Database access must enforce authenticated Principal, authorization decision, and least privilege.

### knowledge/security/security-framework/security-architecture/identity-and-access-architecture.md
- Category: C. Technology-neutral Contract
- 命中標題: # Identity and Access Architecture
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 11: - Authentication Architecture

### knowledge/security/security-framework/security-architecture/secrets-encryption-and-interface-security.md
- Category: C. Technology-neutral Contract
- 命中標題: # Secrets, Encryption, and Interface Security
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 17: - Repository Security
  - Line 22: - Encryption must protect data in transit, at rest, and across service boundaries where sensitive context moves.
  - Line 25: - Repository controls must prevent secret leakage and preserve audit evidence for security-sensitive changes.

### knowledge/security/security-framework/security-governance-and-testing.md
- Category: C. Technology-neutral Contract
- 命中標題: # Security Governance and Testing
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 52: 1. SEC-BR-001: Atlas security rule 1 requires protected operations to use catalog-approved authentication, authorization, permission owner, audit evidence, isolation checks, and deterministic denial behavior.
  - Line 53: 2. SEC-BR-002: Atlas security rule 2 requires protected operations to use catalog-approved authentication, authorization, permission owner, audit evidence, isolation checks, and deterministic denial behavior.
  - Line 54: 3. SEC-BR-003: Atlas security rule 3 requires protected operations to use catalog-approved authentication, authorization, permission owner, audit evidence, isolation checks, and deterministic denial behavior.

### knowledge/security/security-framework/token-and-credential-lifecycle.md
- Category: C. Technology-neutral Contract
- 命中標題: # Security Token and Credential Lifecycle
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 12: - Encryption Strategy protects sensitive data in transit and at rest where required by the Security Framework.
  - Line 18: - Token, credential, secret, encryption, and key controls must align with Authentication Architecture, Authorization Architecture, Permission Model, Identity Model, API Security, Message Security, Database Security, Audi...

### knowledge/security/tenant-framework.md
- Category: C. Technology-neutral Contract
- 命中標題: # Tenant Framework
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 22: - knowledge/repository-catalog.md
  - Line 35: - docs/database/05-DatabaseDesign.md
  - Line 36: - docs/database/06-ERD.md

### knowledge/supporting/event-driven-architecture.md
- Category: C. Technology-neutral Contract
- 命中標題: # Event Driven Architecture
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 30: - knowledge/repository-catalog.md
  - Line 41: - docs/database/05-DatabaseDesign.md
  - Line 42: - docs/database/06-ERD.md

### knowledge/supporting/fcn.md
- Category: C. Technology-neutral Contract
- 命中標題: # FCN Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 233: | /api/v1/investments/fcn | POST | Create FCN position |
  - Line 234: | /api/v1/investments/fcn/{fcnId} | GET | Retrieve FCN position |
  - Line 235: | /api/v1/investments/fcn/{fcnId}/observations | POST | Record observation |

### knowledge/supporting/financial-dependency-model.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Dependency Model
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 195: | /api/v1/dependencies | POST | Create dependency edge | Dependency:Write |
  - Line 196: | /api/v1/dependencies/graph | GET | Retrieve dependency graph | Dependency:Read |
  - Line 197: | /api/v1/dependencies/validate | POST | Validate dependency graph | Dependency:Evaluate |

### knowledge/supporting/financial-philosophy.md
- Category: C. Technology-neutral Contract
- 命中標題: # Financial Philosophy Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 216: | /api/v1/philosophy/rules | GET | Retrieve active philosophy rules | Governance:Read |
  - Line 217: | /api/v1/philosophy/validate-decision | POST | Validate decision compliance | Decision:Evaluate |
  - Line 218: | /api/v1/philosophy/validate-recommendation | POST | Validate recommendation compliance | Recommendation:Evaluate |

### knowledge/supporting/financial-ratios.md
- Category: C. Technology-neutral Contract
- 命中標題: # knowledge/financial-ratios.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 290: | /api/v1/financial-ratios | GET | Retrieve current canonical ratios | Ratio:Read |
  - Line 291: | /api/v1/financial-ratios/calculate | POST | Calculate canonical ratios | Ratio:Evaluate |
  - Line 292: | /api/v1/scenarios/{scenarioId}/financial-ratios | POST | Calculate scenario ratios | Scenario:Evaluate |

### knowledge/supporting/glossary.md
- Category: C. Technology-neutral Contract
- 命中標題: # Glossary
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 246: -   docs/api/07-API.md
  - Line 298: | /api/v1/knowledge/glossary | GET | Search glossary entries | Knowledge:Read |
  - Line 299: | /api/v1/knowledge/glossary | POST | Publish glossary entry | Knowledge:Write |

### knowledge/supporting/investment-policy.md
- Category: C. Technology-neutral Contract
- 命中標題: # Investment Policy Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 224: | /api/v1/investment-policy | GET | Retrieve active policy | InvestmentPolicy:Read |
  - Line 225: | /api/v1/investment-policy | POST | Publish investment policy | InvestmentPolicy:Write |
  - Line 226: | /api/v1/investment-policy/validate | POST | Validate investment action | InvestmentPolicy:Evaluate |

### knowledge/supporting/life-goals.md
- Category: C. Technology-neutral Contract
- 命中標題: # Life Goals Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 234: | /api/v1/life-goals | POST | Create life goal | Goal:Write |
  - Line 235: | /api/v1/life-goals | GET | List life goals | Goal:Read |
  - Line 236: | /api/v1/life-goals/{goalId} | GET | Retrieve life goal | Goal:Read |

### knowledge/supporting/life-stage-model.md
- Category: C. Technology-neutral Contract
- 命中標題: # Life Stage Model
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 157: | /api/v1/life-stage-models | GET | List active stage models | LifeStage:Read |
  - Line 158: | /api/v1/life-stage-models | POST | Publish stage model | LifeStage:Admin |
  - Line 159: | /api/v1/life-stage-models/classify | POST | Classify life stage | LifeStage:Evaluate |

### knowledge/supporting/loan.md
- Category: C. Technology-neutral Contract
- 命中標題: # Loan Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 235: | /api/loans | POST | Create a loan. |
  - Line 236: | /api/loans/{loanId} | GET | Retrieve loan state. |
  - Line 237: | /api/loans/{loanId}/activate | POST | Activate a validated loan. |

### knowledge/supporting/market-assumptions.md
- Category: C. Technology-neutral Contract
- 命中標題: # knowledge/market-assumptions.md
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 726: GET    /api/market-assumptions/current
  - Line 727: GET    /api/market-assumptions/{id}
  - Line 728: GET    /api/market-assumptions/{id}/asset-classes

### knowledge/supporting/portfolio-lifecycle.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Lifecycle
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 196: | /api/portfolios/{portfolioId}/lifecycle | POST | Initialize lifecycle. |
  - Line 197: | /api/portfolios/{portfolioId}/lifecycle/evaluate-transition | POST | Evaluate transition. |
  - Line 198: | /api/portfolios/{portfolioId}/lifecycle/transition | POST | Execute transition. |

### knowledge/supporting/portfolio-lifecycle/execution-and-validation.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Lifecycle Execution and Validation
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 53: | /api/portfolios/{portfolioId}/lifecycle | POST | Initialize lifecycle. |
  - Line 54: | /api/portfolios/{portfolioId}/lifecycle/evaluate-transition | POST | Evaluate transition. |
  - Line 55: | /api/portfolios/{portfolioId}/lifecycle/transition | POST | Execute transition. |

### knowledge/supporting/portfolio.md
- Category: C. Technology-neutral Contract
- 命中標題: # Portfolio Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 273: | /api/portfolios | POST | Create portfolio. |
  - Line 274: | /api/portfolios/{portfolioId} | GET | Retrieve portfolio state. |
  - Line 275: | /api/portfolios/{portfolioId}/holdings | POST | Add holding. |

### knowledge/supporting/property.md
- Category: C. Technology-neutral Contract
- 命中標題: # Property Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 234: | /api/properties | POST | Add property. |
  - Line 235: | /api/properties/{propertyId} | GET | Retrieve property state. |
  - Line 236: | /api/properties/{propertyId}/valuation | POST | Update valuation. |

### knowledge/supporting/retirement.md
- Category: C. Technology-neutral Contract
- 命中標題: # Retirement Knowledge Base
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 234: | /api/retirement/plans | POST | Create retirement plan. |
  - Line 235: | /api/retirement/plans/{retirementPlanId} | GET | Retrieve plan state. |
  - Line 236: | /api/retirement/plans/{retirementPlanId} | PUT | Update plan. |

### knowledge/supporting/risk-capacity-model.md
- Category: C. Technology-neutral Contract
- 命中標題: # Risk Capacity Model
- 衝突理由: Reference describes contracts, repository abstractions, API/integration terminology, or persistence boundaries rather than a required v1 server runtime.
- 建議處理方式: No architecture migration required unless later wording makes a concrete server dependency mandatory.
- 命中段落:
  - Line 156: | /api/risk-capacity/assessments | POST | Assess risk capacity. |
  - Line 157: | /api/risk-capacity/assessments/{assessmentId} | GET | Retrieve assessment. |
  - Line 158: | /api/risk-capacity/assessments/{assessmentId}/publish | POST | Publish assessment. |

### docs/knowledge/entity/Asset.md
- Category: D. Historical / Legacy
- 命中標題: # Asset Entity Specification
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Legacy Reference
  - Line 33: - Entity Catalog Mapping: Asset -> AssetPortfolio -> PortfolioRepository.
  - Line 34: - The user-facing Asset resource may expose Asset commands, but mutation must occur through AssetPortfolio or Catalog-approved legacy AssetRepository access mapped to AssetPortfolio ownership.

### docs/knowledge/entity/Household.md
- Category: D. Historical / Legacy
- 命中標題: # Household Entity Specification
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Legacy Reference
  - Line 35: - Repository: HouseholdRepository.
  - Line 64: - User: Household must reference one PrimaryUserId. User identity is loaded by UserRepository and not mutated by Household.

### docs/knowledge/entity/Liability.md
- Category: D. Historical / Legacy
- 命中標題: # Liability Entity Specification
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Legacy Reference
  - Line 33: - Entity Catalog Mapping: Liability -> LiabilityPortfolio -> LiabilityRepository.
  - Line 34: - User-facing Liability APIs may expose Liability commands, but mutation must preserve LiabilityPortfolio ownership and LiabilityRepository persistence rules.

### docs/knowledge/entity/Loan.md
- Category: D. Historical / Legacy
- 命中標題: # Loan Entity Specification
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Legacy Reference
  - Line 35: - Repository: LoanRepository.
  - Line 92: | Name | Type | Nullable | Default | Description | Validation | Business Meaning | Example | PWA Runtime Mapping / Future Cloud Mapping | JSON Name | API Usage | Searchable | Sortable | Indexed | Encrypted | Auditable |

### docs/knowledge/entity/Mortgage.md
- Category: D. Historical / Legacy
- 命中標題: # Mortgage Entity Specification
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Legacy Reference
  - Line 21: - Publish mortgage-facing events mapped to LoanRepository and Loan aggregate ownership.
  - Line 32: - Entity Catalog Mapping: Mortgage -> Loan -> LoanRepository.

### knowledge/entity/Asset.md
- Category: D. Historical / Legacy
- 命中標題: ## Split Navigation
- 衝突理由: File is under docs/knowledge legacy reference or explicitly marked legacy.
- 建議處理方式: Keep as historical reference or add clearer superseded-by ADR notice in a later migration batch.
- 命中段落:
  - Line 1: > **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Asset Entity Speci...
  - Line 26: - Related Specifications: knowledge/entity-catalog.md, knowledge/aggregate-catalog.md, knowledge/domain-model-catalog.md, knowledge/bounded-context-catalog.md, knowledge/value-object-catalog.md, knowledge/enumeration-cat...
  - Line 27: - Change Policy: Changes must preserve Catalog names, Aggregate ownership, command/event mappings, repository ownership, security boundaries, and existing financial formula ownership. Catalog conflicts are resolved by ke...

### knowledge/engine/rule-engine-architecture.md
- Category: E. Unclear
- 命中標題: # knowledge/rule-engine-architecture.md
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 28: Rule Repository
  - Line 65: ### Rule Repository

### knowledge/entity/asset/valuation-and-reporting.md
- Category: E. Unclear
- 命中標題: # Asset Valuation and Reporting
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 16: - Money values must use `Money` and `Currency` concepts instead of database-specific money types.

### knowledge/entity/mortgage/scenario-and-refinance-behavior.md
- Category: E. Unclear
- 命中標題: # Mortgage Scenario and Refinance Behavior
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 21: - Amortization calculation belongs to LoanService and calculation engine, not Mortgage repository logic.

### knowledge/entity/portfolio-entity/rules-and-state.md
- Category: E. Unclear
- 命中標題: # Portfolio Rules and State
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 16: AssetPortfolio protects Portfolio, Holding membership, allocation metadata, lifecycle state, version, and ConcurrencyToken. Archived or deleted Portfolio rejects ordinary updates, repository business logic is forbidden, ...

### knowledge/entity/position/rules-and-state.md
- Category: E. Unclear
- 命中標題: # Position Rules and State
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 16: AssetPortfolio is the transaction and concurrency boundary. Quantity cannot be negative, AvailableQuantity cannot exceed Quantity, zero Quantity closes Holding, projection values cannot write source fields, and Portfolio...

### knowledge/entity/recommendation/lifecycle-and-execution.md
- Category: E. Unclear
- 命中標題: # Recommendation Lifecycle and Execution
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 17: - Repository

### knowledge/framework/automation/strategy-and-recovery.md
- Category: E. Unclear
- 命中標題: # Automation Strategy and Recovery
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 33: Automation escalation uses the cataloged automation owner and mapped workflow, scheduler, background job, command, event, message, notification, projection, and repository boundaries. Escalation is required when an autom...

### knowledge/framework/automations/backup-automation/trigger-and-scope.md
- Category: E. Unclear
- 命中標題: # Backup Trigger and Scope
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 13: Backup scope includes database state, configuration, document indexes, generated artifacts, audit evidence, and restore metadata where policy allows.

### knowledge/framework/background-job/execution-strategy.md
- Category: E. Unclear
- 命中標題: # Background Job Execution Strategy
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 14: - Repository Matrix

### knowledge/framework/background-job/governance-and-testing.md
- Category: E. Unclear
- 命中標題: # Background Job Governance and Testing
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 10: Governance covers validation rules, business rules, security, audit, performance, scheduler coordination, automation coordination, workflow coordination, and repository access boundaries.

### knowledge/framework/goal-funding/prioritization-and-reallocation.md
- Category: E. Unclear
- 命中標題: # Goal Funding Prioritization and Reallocation
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 27: - [Capital Allocation Framework] (../../api/capital-allocation-framework.md)

### knowledge/framework/scenario/execution-and-governance.md
- Category: E. Unclear
- 命中標題: # Scenario Execution and Governance
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 12: - Database Design Guidance

### knowledge/supporting/goal-review/execution-and-audit.md
- Category: E. Unclear
- 命中標題: # Goal Review Execution and Audit
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 36: Testing covers unit, integration, validation, performance, state transition, API, repository, audit, cache, security, and edge-case behavior.

### knowledge/supporting/market-assumptions/scenarios-and-governance.md
- Category: E. Unclear
- 命中標題: # Market Assumptions Scenarios and Governance
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 4: This split document isolates scenario overrides, stress assumptions, database/API requirements, dashboard presentation, decision-engine usage, validation, and testing from the parent Market Assumptions specification.
  - Line 13: Governance covers database design, API requirements, validation rules, dashboard presentation, decision-engine usage, testing, implementation instructions, undefined business rules, undefined formulas, and document statu...

### knowledge/supporting/terminology.md
- Category: E. Unclear
- 命中標題: # Terminology
- 衝突理由: Contains architecture/runtime terminology that needs manual review.
- 建議處理方式: Manually confirm whether this is PWA v1, Future Cloud Architecture, or neutral contract language.
- 命中段落:
  - Line 162: -   Domain 名稱與 API、Database、Code 保持一致。
  - Line 186: -   docs/database/05-DatabaseDesign.md
  - Line 187: -   docs/api/07-API.md

## Suggested Migration Batches

- PKA-001: B. Future Cloud Mapping, files=30, risk=Medium
- PKA-002: B. Future Cloud Mapping, files=30, risk=Medium
- PKA-003: B. Future Cloud Mapping, files=30, risk=Medium
- PKA-004: B. Future Cloud Mapping, files=29, risk=Medium
- PKA-005: C. Technology-neutral Contract, files=30, risk=Low
- PKA-006: C. Technology-neutral Contract, files=30, risk=Low
- PKA-007: C. Technology-neutral Contract, files=30, risk=Low
- PKA-008: C. Technology-neutral Contract, files=30, risk=Low
- PKA-009: C. Technology-neutral Contract, files=30, risk=Low
- PKA-010: C. Technology-neutral Contract, files=30, risk=Low
- PKA-011: C. Technology-neutral Contract, files=18, risk=Low
- PKA-012: D. Historical / Legacy, files=6, risk=Low
- PKA-013: E. Unclear, files=15, risk=Medium

## Validation Guidance

- This audit did not modify Knowledge files, so no runtime validation is required for this report-only change.
- If later batches edit Knowledge files, run knowledge index rebuild and PWA/offline validation after edits are approved.