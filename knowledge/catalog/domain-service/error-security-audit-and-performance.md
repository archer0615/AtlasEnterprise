# Domain Service Error, Security, Audit, and Performance

## Purpose
This split document isolates Domain Service error handling, caller-provided security context, audit capture, and deterministic performance constraints from the parent Domain Service Catalog.

## Source
- Parent specification: [Domain Service Catalog](../domain-service-catalog.md)

## Error Catalog Scope
Domain Service errors cover validation, rule mapping, engine dependency, aggregate snapshot, authorization context, deterministic calculation, timeout, cache, concurrency, or audit failure.

| Error Code Range | Meaning | Blocking | Retry |
|---|---|---|---|
| DS-ERR-001 through DS-ERR-040 | Domain Service errors covering validation, rule mapping, engine dependency, aggregate snapshot, authorization context, deterministic calculation, timeout, cache, concurrency, or audit failure. | Yes | Retry only when input snapshot and version context are unchanged. |

## Security
- Authorization is provided by caller and preserved through service execution, logging, caching, and audit metadata.
- Permission is provided by caller and preserved through service execution, logging, caching, and audit metadata.
- Tenant Isolation is provided by caller and preserved through service execution, logging, caching, and audit metadata.
- Household Isolation is provided by caller and preserved through service execution, logging, caching, and audit metadata.

## Audit
- Invocation is mandatory in event publishing and consumption audit records.
- CorrelationId is captured by caller with service name, input hash, output hash, rule version, formula version, assumption version, and execution time.
- CausationId is captured by caller with service name, input hash, output hash, rule version, formula version, assumption version, and execution time.
- Version is captured by caller with service name, input hash, output hash, rule version, formula version, assumption version, and execution time.
- History is captured by caller with service name, input hash, output hash, rule version, formula version, assumption version, and execution time.

## Performance
- Latency uses deterministic input hashes, bounded calculations, versioned rules, local caching when permitted, and observable execution metrics.
- Throughput uses deterministic input hashes, bounded calculations, versioned rules, local caching when permitted, and observable execution metrics.
- Caching uses deterministic input hashes, bounded calculations, versioned rules, local caching when permitted, and observable execution metrics.
- Parallel Execution uses deterministic input hashes, bounded calculations, versioned rules, local caching when permitted, and observable execution metrics.
- Retry uses deterministic input hashes, bounded calculations, versioned rules, local caching when permitted, and observable execution metrics.
