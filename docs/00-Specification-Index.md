# Project Atlas Enterprise Specification Index

Version: v1.0  
Status: Draft Foundation

## Purpose

This document is the master index for every specification contained in Project Atlas.

Project Atlas is a Life Financial Decision Operating System rather than an accounting system, investment tracker, or loan calculator. Every document in this repository exists to support long-term financial decision making.

---

# Repository Structure

```text
ProjectAtlas/
│
├── docs/
├── knowledge/
├── .codex/
├── api/
├── database/
├── assets/
└── tests/
```

---

# Documentation Layers

## Phase 0 – Foundation

| File | Purpose | Depends On | Status |
|------|---------|------------|--------|
|00-Specification-Index.md|Master documentation index|-|In Progress|
|00-Vision.md|Vision, mission, principles|-|Planned|
|01-Blueprint.md|Life & financial blueprint|Vision|Planned|
|02-IPS.md|Investment Policy Statement|Blueprint|Planned|
|03-Formula.md|Financial formulas & definitions|Blueprint, IPS|Planned|
|04-DomainModel.md|DDD domain model|Blueprint|Planned|
|04A-DomainInventory.md|Complete business domain inventory|Domain Model|Planned|
|20-Roadmap.md|Product roadmap|All Foundation|Planned|

---

## Phase 1 – Core Business

- 05-DatabaseDesign.md
- 06-ERD.md
- 07-API.md
- 08-CashFlowEngine.md
- 09-InvestmentEngine.md
- 10-LoanEngine.md
- 11-HomeUpgradeEngine.md
- 12-RetirementEngine.md
- 13-DecisionEngine.md

---

## Phase 2 – Business Scenarios

- 14-Scenario.md
- 15-Dashboard.md
- 16-LifeTimeline.md
- 17-LifeEvents.md
- 18-KPI.md
- 19-Testing.md

---

# knowledge/

Core knowledge documents:

- financial-philosophy.md
- investment-policy.md
- life-goals.md
- cashflow.md
- loan.md
- insurance.md
- property.md
- retirement.md
- taiwan-mortgage.md
- taiwan-tax.md
- terminology.md
- glossary.md
- assumptions.md
- decision-principles.md
- portfolio.md
- fcn.md

---

# .codex/

Codex execution context:

- project.md
- architecture.md
- backend.md
- frontend.md
- database.md
- workflow.md
- testing.md
- ddd.md
- coding-style.md
- naming-convention.md
- financial-rules.md
- decision-rules.md
- ai-context.md
- agent.md

---

# Document Dependency

```text
Vision
  ↓
Blueprint
  ↓
IPS
  ↓
Domain Model
  ↓
Domain Inventory
  ├── Formula
  ├── Database
  ├── API
  ├── Engines
  └── Decision System
```

---

# Completion Criteria

A specification is considered complete only when it includes:

- Purpose
- Scope
- Definitions
- Business Rules
- Decision Rules
- Assumptions
- Constraints
- Traceability
- Future Extension

---

# Governance

All specifications must:

1. Remain technology-independent unless explicitly required.
2. Separate business rules from implementation.
3. Be traceable to business objectives.
4. Be consistent with the Investment Policy Statement.
5. Support deterministic decision engines.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0|2026-07-09|Initial Phase 0 specification index|
