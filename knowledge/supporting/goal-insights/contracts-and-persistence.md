> **ADR-001 PWA Runtime Alignment:** Atlas v1 uses PWA v1 Runtime, Browser Runtime, and IndexedDB Runtime. Future Cloud Architecture is optional future mapping and must not be required for v1.\r\n\r\n# Goal Insights Contracts and Persistence

## Purpose
This split document isolates Goal Insight commands, events, repository behavior, API, DTO, PWA Runtime Mapping / Future Cloud Mapping, Future Cloud Mapping, cache, and example contract concerns from the parent Goal Insights specification.

## Source
- Parent specification: [Goal Insights](../goal-insights.md)

## Commands
Goal Insight commands include CreateInsight, RefreshInsight, RecalculateInsight, ArchiveInsight, RestoreInsight, DismissInsight, ResolveInsight, DeleteInsight, GenerateInsights, UpdateInsightEvidence, RankInsights, MapInsightRecommendation, MapInsightDecision, ExpireInsight, BulkGenerateInsights, BulkResolveInsights, BulkDismissInsights, PublishInsightNotification, and InvalidateInsightCache.

## Events
Goal Insight events include InsightCreated, InsightUpdated, InsightResolved, InsightDismissed, InsightArchived, InsightRestored, InsightDeleted, InsightGenerated, InsightExpired, InsightRecalculated, InsightRefreshed, InsightRankChanged, InsightSeverityChanged, InsightPriorityChanged, InsightConfidenceChanged, InsightEvidenceChanged, InsightRecommendationMapped, InsightDecisionMapped, InsightNotificationTriggered, InsightCacheInvalidated, and InsightBulkGenerated.

## Repository and Queries
Repository behavior supports interface methods, queries, filtering, sorting, aggregation, projection, and specification-based access. Query results must respect permission and masking context.

## API and DTO
API behavior covers Future Cloud Architecture Endpoints, HTTP methods, request and response contracts, errors, pagination, filtering, sorting, projection, and bulk API use. DTOs include create, update, detail, summary, search, insight, recommendation, evidence, dashboard, and lifecycle shapes.

## Persistence
Persistence covers table, columns, indexes, constraints, foreign keys, unique constraints, check constraints, partition strategy, Future Cloud Mapping schema, and Future Cloud Mapping. Stored data preserves lifecycle state, evidence links, ranking, severity, priority, confidence, expiration, audit metadata, and mapping identifiers.

## Cache
Cache strategy stores insight projections while respecting permission context and invalidates entries when lifecycle, evidence, ranking, severity, priority, confidence, recommendation mapping, decision mapping, or source evidence changes.
