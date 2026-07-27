# CSV Import Canonical Specification

Document Path: knowledge/supporting/csv-import.md
Document Type: Atlas Enterprise Canonical Specification
Version: 1.0
Status: Planning
Domain: Import/Export
Bounded Context: Local Data Operations
Owner: Product Knowledge

## Purpose

CSV Import defines local-only data intake for supported Atlas entities. It is a controlled data operation with dry-run validation, deterministic mapping, audit evidence, and no network dependency.

## Supported Initial Entities

Initial mapping is limited to:

- Asset
- Liability
- Income
- Expense
- Goal

Policy and Position imports require their own accepted specification and ADR before inclusion.

## Import Modes

| Mode | Behavior |
| --- | --- |
| DryRun | Parse and validate without writing data. |
| AppendOnly | Create valid new records and reject duplicates. |
| ReplaceById | Replace records only when id, ownerId, and entity type match. |

Partial import behavior must be explicit. The default is dry-run first, then all-or-nothing write for accepted rows.

## Required Columns

Every CSV row requires:

- entityType
- id
- ownerId
- name
- amount or value
- currency
- effectiveDate

Entity-specific columns must be ignored unless listed in the accepted mapping table for that entity.

## Validation Rules

- CSV parser must reject formula injection prefixes in exported error reports.
- entityType must be allowlisted.
- id and ownerId must be stable non-empty strings.
- Numeric fields must be finite and non-negative unless a future entity spec permits otherwise.
- currency must match supported currency codes.
- Unknown columns are reported as warnings in dry-run.
- Duplicate rows are reported before writes.
- Malformed rows block the import.

## Error Report

Dry-run returns:

- importId
- rowNumber
- entityType
- field
- severity
- message
- proposedAction

Error reports must be renderable with escaped text only.

## Audit

Every import attempt records importId, operator, timestamp, mode, row count, accepted count, rejected count, checksum, result, and correlationId.

## Implementation Gate

Runtime implementation requires:

- Parser selection.
- Fixture CSV files.
- Malformed CSV tests.
- Security audit.
- Backup compatibility review.
- Accessibility coverage for error reports.
