# Message Contract Diagrams and Edge Cases

Source: [Message Contract Catalog](../message-contract-catalog.md)

This split document isolates message flow diagrams and message-contract failure conditions from the canonical message contract catalog. It keeps the parent catalog authoritative while making messaging relationships, delivery boundaries, and consistency risks easier to review independently.

## Mermaid

### Message Flow

```mermaid
flowchart TD
  CMD[Command] --> EVT[Domain Event]
  EVT --> OUT[Outbox Message]
  OUT --> BUS[Message Bus]
  BUS --> IN[Inbox Message]
  IN --> CON[Consumer]
```

### Producer Consumer Diagram

```mermaid
flowchart LR
  PROD[Producer] --> MSG[Message Contract]
  MSG --> C1[Projection Consumer]
  MSG --> C2[Workflow Consumer]
  MSG --> C3[Notification Consumer]
```

### Outbox Flow

```mermaid
sequenceDiagram
  participant App
  participant Outbox
  participant Bus
  App->>Outbox: append message after commit
  Outbox->>Bus: publish message
```

### Inbox Flow

```mermaid
sequenceDiagram
  participant Bus
  participant Inbox
  participant Consumer
  Bus->>Inbox: deliver message
  Inbox->>Consumer: process once
  Consumer-->>Inbox: record result
```

### Saga Messaging

```mermaid
flowchart TD
  M1[Message] --> SAGA[Saga Step]
  SAGA --> CMD[Next Command]
  CMD --> M2[Next Message]
```

### Workflow Messaging

```mermaid
flowchart TD
  MSG[Message] --> WF[Workflow]
  WF --> STEP[Workflow Step]
  STEP --> OUT[Outgoing Message]
```

## Edge Case Pattern

Message edge cases cover incomplete or conflicting mappings across message name, category, producer, consumer, command, event, payload, header, metadata, schema, version, correlation, causation, tenant, Household, serialization, compression, encryption, ordering, retry, dead letter, idempotency, validation, audit, and security concerns.

## Edge Case Coverage

- Message edge cases 1-50 share the same canonical failure condition: one or more message contract mappings are incomplete or conflicting.
- Each edge case must be evaluated against producer, consumer, command, event, schema, version, payload, headers, metadata, serialization, correlation, causation, ordering, idempotency, retry, dead letter, audit, security, and performance consistency.
- The parent catalog keeps the numbered edge case inventory; this split file provides the independent checklist used to interpret those repeated cases.
