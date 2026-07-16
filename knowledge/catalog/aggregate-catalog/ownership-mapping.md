# Aggregate Catalog Ownership Mapping

## Purpose
This split document isolates ownership matrices and cross-aggregate mappings from the parent Aggregate Catalog.

## Source
- Parent specification: [Aggregate Catalog](../aggregate-catalog.md)

## Mapping Tables
- Aggregate Ownership Matrix
- Entity-to-Aggregate Mapping
- Command-to-Aggregate Mapping
- Event-to-Aggregate Mapping
- Repository-to-Aggregate Mapping
- Table-to-Aggregate Mapping

## Interaction Rules
Cross-aggregate interaction rules must preserve transaction boundaries, command ownership, event ownership, repository ownership, persistence ownership, API ownership, security boundary, and audit boundary.

