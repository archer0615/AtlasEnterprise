# Command Ownership and Routing

## Purpose
This split document isolates command ownership, routing, service mapping, repository mapping, event mapping, and transaction behavior from the parent Command Catalog.

## Source
- Parent specification: [Command Catalog](../command-catalog.md)

## Routing
Command routing maps API endpoints to application services, aggregate commands, domain services, repositories, domain events, permissions, and audit records.

## Ownership Rules
Commands must mutate only the owning aggregate boundary and coordinate cross-aggregate work through events, workflows, or application orchestration.

