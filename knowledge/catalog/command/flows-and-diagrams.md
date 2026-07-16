# Command Flows and Diagrams

Document Path: knowledge/catalog/command/flows-and-diagrams.md

Parent Specification: knowledge/catalog/command-catalog.md

## Purpose

This split document isolates the command flow diagrams from the parent Command Catalog so command request handling, ownership, transaction, saga, and workflow paths can be read independently.

## Source Sections

- Mermaid
- Command Flow
- Aggregate Command Ownership
- Application Service Flow
- Transaction Flow
- Saga Flow
- Workflow Flow

## Command Flow

```mermaid
flowchart TD
  A[Command Request] --> B[Authorization]
  B --> C[Validation]
  C --> D[Idempotency Check]
  D --> E[Load Aggregate]
  E --> F[Execute Handler]
  F --> G[Persist Transaction]
  G --> H[Publish Domain Events]
  H --> I[Audit Command Result]
```

## Aggregate Command Ownership

```mermaid
classDiagram
  class RecordIncome
  class Household
  RecordIncome --> Household : mutates
  class RecordExpense
  RecordExpense --> Household : mutates
  class CreatePortfolio
  class AssetPortfolio
  CreatePortfolio --> AssetPortfolio : mutates
  class BuySecurity
  BuySecurity --> AssetPortfolio : mutates
  class SellSecurity
  SellSecurity --> AssetPortfolio : mutates
  class RebalancePortfolio
  RebalancePortfolio --> AssetPortfolio : mutates
  class CreateLoan
  class Loan
  CreateLoan --> Loan : mutates
  class RecordLoanPayment
  RecordLoanPayment --> Loan : mutates
  class RefinanceLoan
  RefinanceLoan --> Loan : mutates
  class PurchaseHome
  class Property
  PurchaseHome --> Property : mutates
  class SellHome
  SellHome --> Property : mutates
  class UpdatePropertyValue
  UpdatePropertyValue --> Property : mutates
  class IssuePolicy
  class Policy
  IssuePolicy --> Policy : mutates
  class PayPremium
  PayPremium --> Policy : mutates
  class UpdateRetirementPlan
  class RetirementPlan
  UpdateRetirementPlan --> RetirementPlan : mutates
  class EvaluateScenario
  class Scenario
  EvaluateScenario --> Scenario : mutates
  class AcceptRecommendation
  class DecisionSession
  AcceptRecommendation --> DecisionSession : mutates
  class RejectRecommendation
  RejectRecommendation --> DecisionSession : mutates
  class ReplayScenario
  ReplayScenario --> Scenario : mutates
```

## Application Service Flow

```mermaid
flowchart LR
  UI[UI or API] --> APP[Application Service]
  APP --> CMD[Command Handler]
  CMD --> DS[Domain Service]
  CMD --> REPO[Repository]
  REPO --> EVT[Domain Events]
```

## Transaction Flow

```mermaid
sequenceDiagram
  participant Client
  participant Handler
  participant Repository
  participant EventStore
  Client->>Handler: Submit command
  Handler->>Repository: Load aggregate
  Handler->>Repository: Save aggregate
  Handler->>EventStore: Persist events
  Handler-->>Client: CommandResult
```

## Saga Flow

```mermaid
flowchart TD
  S[Saga Step] --> C[Catalog Command]
  C --> E[Domain Event]
  E --> N[Next Saga Step]
  C --> X[Compensation When Catalog Defined]
```

## Workflow Flow

```mermaid
flowchart TD
  W[Workflow] --> A[Authorize]
  A --> V[Validate]
  V --> H[Command Handler]
  H --> R[Result]
  R --> W2[Workflow State]
```

