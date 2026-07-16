# Application Service Query Projection

## Purpose
This split document isolates query and projection responsibilities from the parent Application Service Catalog.

## Source
- Parent specification: [Application Service Catalog](../application-service-catalog.md)

## Query Scope
Application service query behavior includes filtering, sorting, pagination, authorization, projection mapping, cache interaction, dashboard summaries, reporting projections, and search surfaces.

## Projection Rules
Query projections must preserve tenant isolation, household isolation, field masking, source timestamps, staleness markers, and source-of-truth references.

