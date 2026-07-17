> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Recommendation Evaluation Execution and Audit

## Purpose
This split document isolates recommendation evaluation pipeline, commands, state machine, API, persistence, audit, and testing from the parent Recommendation Evaluation specification.

## Source
- Parent specification: [Recommendation Evaluation](../recommendation-evaluation.md)

## Evaluation Pipeline
The pipeline collects inputs, validates, normalizes, evaluates rules, checks goal alignment, runs financial/risk/scenario/portfolio/simulation/optimization analysis, scores, ranks, selects recommendations, and writes audit records.

## Execution Surfaces
Execution includes state machine transitions, commands, domain events, repository queries, application service orchestration, Future Cloud Architecture APIs, DTOs, PWA Runtime Mapping / Future Cloud Mapping, cache, security, and audit.

## Audit
Evaluation audit records source inputs, scoring version, ranking result, constraint output, selected recommendation, operator, and correlation identifier.

## Testing
Testing covers scoring, constraints, ranking, validation, API, persistence, explainability, performance, concurrency, and replay.

