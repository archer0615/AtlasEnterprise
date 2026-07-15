# Financial Philosophy Knowledge Base

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件定義 Project Atlas 的核心財務哲學。

所有 Blueprint、IPS、Decision Engine、Scenario Engine 與各 Financial
Engine 的商業規則，皆不得違反本文件。

------------------------------------------------------------------------

# Vision

建立一套以人生為中心，而非以投資報酬為中心的財務決策系統。

------------------------------------------------------------------------

# Mission

-   協助重大人生財務決策
-   提高財務安全性
-   建立可持續現金流
-   達成長期人生目標
-   降低不可逆決策風險

------------------------------------------------------------------------

# Core Values

## FP-001 Life First

人生目標高於財富累積。

## FP-002 Cash Flow First

穩定現金流優先於帳面資產成長。

## FP-003 Risk Before Return

先控制風險，再追求報酬。

## FP-004 Optionality

保留未來選擇權，避免降低人生彈性。

## FP-005 Long-term Thinking

以 20～40 年視角規劃重大決策。

## FP-006 Discipline

遵循 Blueprint 與 IPS，而非情緒決策。

## FP-007 Evidence Based

所有建議均應具備資料、公式、假設與規則支持。

------------------------------------------------------------------------

# Financial Hierarchy

1.  Health
2.  Family
3.  Emergency Fund
4.  Cash Flow
5.  Insurance
6.  Debt Management
7.  Investment
8.  Wealth Growth
9.  Legacy

------------------------------------------------------------------------

# Wealth Definition

Atlas 將財富定義為：

-   可持續現金流
-   可自由支配時間
-   財務安全
-   人生選擇權
-   長期目標達成能力

而非僅是資產淨值。

------------------------------------------------------------------------

# Decision Principles

所有重大決策應：

-   比較多個方案
-   評估最壞情境
-   揭露主要假設
-   評估對人生目標影響
-   評估長期現金流

------------------------------------------------------------------------

# Investment Philosophy

-   長期投資
-   分散配置
-   紀律再平衡
-   避免市場預測
-   投資服務現金流

------------------------------------------------------------------------

# Debt Philosophy

-   負債是工具，不是目的。
-   合理負債可提升資本效率。
-   不以零負債作為唯一目標。

------------------------------------------------------------------------

# Retirement Philosophy

退休代表財務自由，而非停止工作。

核心指標為：

-   可持續現金流
-   提領可持續性
-   人生目標完成度

------------------------------------------------------------------------

# Business Rules

## FP-BR-001

所有 Engine 必須遵循本文件。

## FP-BR-002

不得為追求高報酬而破壞財務安全。

## FP-BR-003

重大決策至少模擬 30 年。

## FP-BR-004

Decision Engine 必須提供可解釋原因。

## FP-BR-005

任何建議均需符合 Blueprint 與 IPS。

------------------------------------------------------------------------

# Related Documents

-   docs/specification/00-Vision.md
-   docs/specification/01-Blueprint.md
-   docs/specification/02-IPS.md
-   docs/13-DecisionEngine.md
-   knowledge/life-goals.md
-   knowledge/investment-policy.md
-   knowledge/decision-principles.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Philosophy Rule Contract

| Field | Required | Description |
|-------|----------|-------------|
| PhilosophyRuleId | Yes | Stable rule identifier |
| ValueCode | Yes | FP-001 through FP-007 |
| RuleStatement | Yes | Canonical rule text |
| EnforcementLevel | Yes | Guideline, Warning, HardConstraint |
| AppliesTo | Yes | Engines or workflows governed by the rule |
| EvidenceRequired | Yes | Required evidence for compliance |
| Status | Yes | Active, Deprecated, Retired |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishPhilosophyRule | GovernanceApplicationService | PhilosophyRulePublished |
| ValidateDecisionAgainstPhilosophy | DecisionApplicationService | PhilosophyComplianceValidated |
| ValidateRecommendationAgainstPhilosophy | RecommendationApplicationService | RecommendationComplianceValidated |
| DeprecatePhilosophyRule | GovernanceApplicationService | PhilosophyRuleDeprecated |

## Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| PhilosophyRulePublished | Rule activated | Decision Engine, Rule Engine |
| PhilosophyComplianceValidated | Decision passes validation | Audit, Explainability |
| PhilosophyViolationDetected | Decision violates philosophy | Alert, Decision Review |
| PhilosophyRuleDeprecated | Rule version deprecated | Governance, Audit |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FP-VR-001 | Any recommendation that reduces emergency fund below minimum violates Cash Flow First. | Hard block |
| FP-VR-002 | Any recommendation pursuing return while breaching risk constraints violates Risk Before Return. | Hard block |
| FP-VR-003 | Major decisions must include long-term scenario evidence. | Reject recommendation |
| FP-VR-004 | Recommendation must reference Blueprint or IPS alignment. | Reject recommendation |
| FP-VR-005 | Philosophy rules are versioned and historical versions remain replayable. | Reject overwrite |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/philosophy/rules | GET | Retrieve active philosophy rules | Governance:Read |
| /api/v1/philosophy/validate-decision | POST | Validate decision compliance | Decision:Evaluate |
| /api/v1/philosophy/validate-recommendation | POST | Validate recommendation compliance | Recommendation:Evaluate |
| /api/v1/philosophy/rules/{ruleId}/deprecate | POST | Deprecate rule | Governance:Admin |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Recommendation breaches emergency fund | Hard block returned |
| High-return recommendation exceeds risk budget | Philosophy violation emitted |
| Missing Blueprint alignment | Recommendation validation fails |
| Historical decision replay | Original philosophy rule version is used |
| Long-term scenario missing | Major decision is rejected |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Philosophy Rule Contract

| Field | Required | Description |
|-------|----------|-------------|
| PhilosophyRuleId | Yes | Stable rule identifier |
| ValueCode | Yes | FP-001 through FP-007 |
| RuleStatement | Yes | Canonical rule text |
| EnforcementLevel | Yes | Guideline, Warning, HardConstraint |
| AppliesTo | Yes | Engines or workflows governed by the rule |
| EvidenceRequired | Yes | Required evidence for compliance |
| Status | Yes | Active, Deprecated, Retired |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishPhilosophyRule | GovernanceApplicationService | PhilosophyRulePublished |
| ValidateDecisionAgainstPhilosophy | DecisionApplicationService | PhilosophyComplianceValidated |
| ValidateRecommendationAgainstPhilosophy | RecommendationApplicationService | RecommendationComplianceValidated |
| DeprecatePhilosophyRule | GovernanceApplicationService | PhilosophyRuleDeprecated |

## Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| PhilosophyRulePublished | Rule activated | Decision Engine, Rule Engine |
| PhilosophyComplianceValidated | Decision passes validation | Audit, Explainability |
| PhilosophyViolationDetected | Decision violates philosophy | Alert, Decision Review |
| PhilosophyRuleDeprecated | Rule version deprecated | Governance, Audit |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| FP-VR-001 | Any recommendation that reduces emergency fund below minimum violates Cash Flow First. | Hard block |
| FP-VR-002 | Any recommendation pursuing return while breaching risk constraints violates Risk Before Return. | Hard block |
| FP-VR-003 | Major decisions must include long-term scenario evidence. | Reject recommendation |
| FP-VR-004 | Recommendation must reference Blueprint or IPS alignment. | Reject recommendation |
| FP-VR-005 | Philosophy rules are versioned and historical versions remain replayable. | Reject overwrite |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/philosophy/rules | GET | Retrieve active philosophy rules | Governance:Read |
| /api/v1/philosophy/validate-decision | POST | Validate decision compliance | Decision:Evaluate |
| /api/v1/philosophy/validate-recommendation | POST | Validate recommendation compliance | Recommendation:Evaluate |
| /api/v1/philosophy/rules/{ruleId}/deprecate | POST | Deprecate rule | Governance:Admin |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Recommendation breaches emergency fund | Hard block returned |
| High-return recommendation exceeds risk budget | Philosophy violation emitted |
| Missing Blueprint alignment | Recommendation validation fails |
| Historical decision replay | Original philosophy rule version is used |
| Long-term scenario missing | Major decision is rejected |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
