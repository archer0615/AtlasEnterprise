# Integration Exchange Strategies

## Purpose
This split document isolates Integration Framework webhook, callback, polling, import, export, ETL, error recovery, and observability strategies.

## Source
- Parent specification: [Integration Framework](../integration-framework.md)

## Webhook Strategy
Webhook handling preserves source authorization, target authorization, protocol safety, retry safety, timeout safety, monitoring, audit, credential handling, versioning, and compatibility. Webhook payloads must pass through integration adapters or anti corruption layers before domain use.

## Callback Strategy
Callbacks preserve the same authorization, protocol, retry, timeout, monitoring, audit, credential, versioning, and compatibility controls as other integrations. Callback processing must remain catalog-approved and must not bypass API Governance, Message Contract Catalog, or Event Driven Architecture boundaries.

## Polling Strategy
Polling must use bounded timeout, retry, monitoring, audit, credential handling, and compatibility controls. Polling is safe only when duplicate handling, version compatibility, and target authorization are preserved.

## Import, Export, and ETL Strategy
Import, export, and ETL flows preserve source authorization, target authorization, protocol safety, retry safety, timeout safety, monitoring, audit, credential handling, versioning, and compatibility.

These flows must route external payloads through adapters, gateways, DTOs, message contracts, audit controls, security controls, retry controls, timeout controls, monitoring controls, and failure controls before they affect Atlas domain state.

## Error Recovery
Integration error recovery can return an integration error, retry, dead-letter, quarantine, or mark the integration degraded according to the failure mode. External dependency failure must not corrupt Aggregate state.

## Observability
Integration observability requires logs, traces, metrics, alerts, health checks, dependency latency, p95 latency, throughput, request hash, response hash, source, target, actor or system actor, CorrelationId, CausationId, and result.

