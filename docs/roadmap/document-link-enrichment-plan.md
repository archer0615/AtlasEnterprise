# Document Link Enrichment Plan

## Purpose

This plan defines how to add useful cross-document links without turning the knowledge repository into a fragile web of manual references.

## Current State

- Knowledge source coverage is complete: 153 Markdown source files are represented by 153 generated JSON documents.
- Existing Markdown link usage is minimal.
- The frontend search experience currently relies on generated indexes rather than manual cross-links.

## Recommended Link Targets

| Source Area | Link Targets |
| --- | --- |
| `README.md` | PWA docs, roadmap reports, generated artifact governance |
| `docs/pwa/` | `frontend/README.md`, PWA validation docs, service worker docs |
| `docs/roadmap/` | governance reports, split plans, filename plans |
| `knowledge/entity/` | domain model catalog, entity catalog, related rules |
| `knowledge/framework/` | engine docs, rule docs, reporting docs |
| `knowledge/supporting/` | assumptions, formulas, Taiwan-specific references |

## Link Rules

- Prefer links from short overview documents to canonical detailed documents.
- Avoid adding many links inside generated or oversized catalog files until after split work.
- Use relative Markdown links from authored Markdown files.
- Rebuild `frontend/knowledge/` after adding links under `knowledge/`.
- Validate generated document count and PWA validation after link changes.

## Batch 1

- Add navigation links from `README.md` to key roadmap reports.
- Add links from PWA overview docs to validation and generated artifact governance.
- Add links from split plans to document governance report.
