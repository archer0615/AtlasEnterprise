# Decision Reporting Reports and Exports

## Purpose

This split document isolates Decision Reporting report types, report sections, report generation modes, export formats, commands, and domain events from the canonical `knowledge/reporting/decision-reporting.md` parent.

## Covered Sections

- Report Types
- Report Sections
- Reporting Engine
- Export Formats
- State Machine
- Commands
- Domain Events

## Reporting Rules

- Executive, management, operational, compliance, audit, and custom reports must identify their decision evidence source.
- Export formats must preserve auditability, permissions, retention, and versioning.
- Scheduled and batch reports must preserve schedule identity, generation result, failure reason, and export history.
- Real-time and incremental reports must not bypass permission or audit layers.
