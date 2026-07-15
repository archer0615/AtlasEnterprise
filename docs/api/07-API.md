# Project Atlas Enterprise
# docs/api/07-API.md

Version: 2.0  
Status: Approved Application API  
Runtime: In-Process TypeScript

## 1. Purpose

Atlas v1 has no required network REST API. This document defines stable Application Use Cases that act as the internal API between Presentation and Domain/Application layers.

## 2. Architecture

```text
React UI
  ↓ commands and queries
Application Use Cases
  ↓
Domain Aggregates and Engines
  ↓
Repository Interfaces
  ↓
IndexedDB Adapters
```

## 3. Application API Standards

- Commands mutate state and return explicit results.
- Queries do not mutate state.
- DTOs are serializable TypeScript objects.
- Zod validates external input and imported data.
- Domain errors use stable error codes.
- Cancellation is supported for long simulations.
- Use cases are independent of React and IndexedDB.
- Every simulation response includes trace, formula versions, rule versions, and warnings.

## 4. Core Use Cases

### Identity and Household
- CreateLocalUserProfile
- UpdateUserPreferences
- CreateHousehold
- AddHouseholdMember
- UpdateHouseholdMember

### Financial Data
- CreateAsset
- UpdateAsset
- CreateLiability
- CreateIncomeSource
- CreateExpenseItem
- CalculateCurrentFinancialPosition

### Portfolio
- CreatePortfolio
- AddPosition
- UpdatePosition
- CalculateAssetAllocation
- GenerateRebalancePlan

### Loan and Property
- CreateLoan
- GenerateRepaymentSchedule
- EvaluateEarlyRepayment
- CreateProperty
- CreateHomeUpgradePlan

### Scenario
- CreateScenario
- CreateScenarioVersion
- SimulateScenario
- CompareScenarios
- ArchiveScenario

### Retirement and Decision
- CreateRetirementPlan
- ProjectRetirement
- EvaluateDecision
- GenerateRecommendation
- RecordDecisionOutcome

### Data Portability
- ExportEncryptedBackup
- ValidateBackup
- ImportBackup
- MigrateImportedData
- ResetLocalData

## 5. Standard Result

```ts
type ApplicationResult<T> =
  | {
      success: true;
      data: T;
      warnings: ApplicationWarning[];
      traceId: string;
    }
  | {
      success: false;
      errors: ApplicationError[];
      traceId: string;
    };
```

## 6. Error Families

- VALIDATION_*
- NOT_FOUND_*
- CONFLICT_*
- STORAGE_*
- MIGRATION_*
- BACKUP_*
- CALCULATION_*
- RULE_*
- SECURITY_*
- OFFLINE_*

## 7. Future REST Compatibility

Use-case DTOs shall be designed so a future ASP.NET Core adapter can expose equivalent endpoints without changing Domain logic. Network endpoint contracts are deferred to the cloud phase.

## 8. Security

- No client secrets.
- No JWT in v1.
- No remote login in v1.
- Sensitive data remains local.
- Backup encryption derives keys from a user passphrase.
- Imported files are treated as untrusted input.

## Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 2026-07-09 | REST API draft |
| 2.0 | 2026-07-11 | Converted to in-process Application API |
