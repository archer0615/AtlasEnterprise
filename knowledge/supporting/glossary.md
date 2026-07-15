# Glossary

Version: 1.0 Project: Atlas -- Life Financial Decision Operating System

------------------------------------------------------------------------

# Purpose

本文件提供 Project Atlas 的名詞索引（Glossary）。

與 terminology.md 不同：

-   terminology：定義正式 Domain Language。
-   glossary：提供快速查閱與一致理解。

所有文件、API、資料庫、程式碼、測試案例及 AI Agent 均應參考本文件。

------------------------------------------------------------------------

# A

## Asset

可帶來經濟價值的資產。

## Asset Allocation

投資組合於各資產類別的配置比例。

------------------------------------------------------------------------

# B

## Blueprint

人生財務藍圖，為所有決策的最高層策略。

## Burn Rate

每月淨現金流消耗速度。

------------------------------------------------------------------------

# C

## Cash Flow

一定期間內所有收入與支出的流動。

## Cash Flow Engine

負責模擬、分析及預測現金流。

## CAGR

Compound Annual Growth Rate，年化複合成長率。

------------------------------------------------------------------------

# D

## Decision Engine

根據規則、公式及 Scenario 產生決策建議。

## Debt Service Ratio (DSR)

每月債務支出占每月收入比例。

------------------------------------------------------------------------

# E

## Emergency Fund

緊急預備金。

## Expense

支出。

------------------------------------------------------------------------

# F

## FCN

Fixed Coupon Note，固定配息結構型商品。

## Financial Independence

被動收入足以支應生活支出。

## Free Cash Flow

Income - Expense。

------------------------------------------------------------------------

# H

## Holding

投資組合中的單一持有資產。

------------------------------------------------------------------------

# I

## Income

收入。

## IPS

Investment Policy Statement，投資政策聲明。

------------------------------------------------------------------------

# K

## KPI

Key Performance Indicator，關鍵績效指標。

------------------------------------------------------------------------

# L

## Life Goal

人生目標。

## Life Event

人生重大事件。

## Liquidity

流動性。

## LTV

Loan To Value，貸款成數。

------------------------------------------------------------------------

# M

## Mortgage

房屋貸款。

------------------------------------------------------------------------

# N

## Net Worth

Assets - Liabilities。

------------------------------------------------------------------------

# P

## Passive Income

非勞務型且可持續取得的收入。

## Portfolio

完整投資組合。

## Property

不動產資產。

------------------------------------------------------------------------

# R

## Rebalance

調整資產配置至目標比例。

## Retirement

退休階段。

## Risk Score

Atlas 用於量化整體風險的評分。

------------------------------------------------------------------------

# S

## Safe Withdrawal Rate

退休資產可持續提領率。

## Scenario

在指定假設下的完整財務模擬。

------------------------------------------------------------------------

# T

## Tax

稅務。

## Timeline

人生事件時間軸。

------------------------------------------------------------------------

# W

## Withdrawal

由投資資產提領現金。

------------------------------------------------------------------------

# Abbreviations

  Abbreviation   Meaning
  -------------- -----------------------------
  IPS            Investment Policy Statement
  KPI            Key Performance Indicator
  DSR            Debt Service Ratio
  LTV            Loan To Value
  ROI            Return on Investment
  CAGR           Compound Annual Growth Rate
  FCN            Fixed Coupon Note

------------------------------------------------------------------------

# Related Documents

-   knowledge/terminology.md
-   docs/specification/04-DomainModel.md
-   docs/api/07-API.md
-   docs/13-DecisionEngine.md

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Glossary Entry Contract

| Field | Required | Description |
|-------|----------|-------------|
| TermId | Yes | Stable term identifier |
| Term | Yes | Display term |
| Definition | Yes | Canonical quick definition |
| Language | Yes | Locale or language code |
| Domain | No | Related business domain |
| RelatedTerminologyId | No | Link to formal domain language definition |
| Status | Yes | Draft, Active, Deprecated, Archived |
| Version | Yes | Immutable entry version |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishGlossaryEntry | KnowledgeApplicationService | GlossaryEntryPublished |
| UpdateGlossaryEntry | KnowledgeApplicationService | GlossaryEntryUpdated |
| DeprecateGlossaryEntry | KnowledgeApplicationService | GlossaryEntryDeprecated |
| ValidateGlossaryConsistency | KnowledgeApplicationService | GlossaryConsistencyValidated |

## Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GlossaryEntryPublished | New term available | Documentation, AI Agent |
| GlossaryEntryUpdated | Term definition version updated | Documentation, Search |
| GlossaryEntryDeprecated | Term no longer preferred | Documentation, Governance |
| GlossaryConsistencyViolationDetected | Glossary conflicts with terminology | Governance |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GLS-VR-001 | Active glossary entry must have term and definition. | Reject publish |
| GLS-VR-002 | Glossary must not contradict terminology.md. | Reject publish |
| GLS-VR-003 | Abbreviation entries must define full expansion. | Reject publish |
| GLS-VR-004 | Deprecated terms must retain historical definition. | Reject deletion |
| GLS-VR-005 | Duplicate active term in same language is not allowed. | Reject publish |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/knowledge/glossary | GET | Search glossary entries | Knowledge:Read |
| /api/v1/knowledge/glossary | POST | Publish glossary entry | Knowledge:Write |
| /api/v1/knowledge/glossary/{termId} | GET | Retrieve glossary entry | Knowledge:Read |
| /api/v1/knowledge/glossary/validate | POST | Validate glossary consistency | Knowledge:Admin |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Duplicate active term | Publish fails |
| Missing abbreviation expansion | Publish fails |
| Terminology conflict | Consistency violation emitted |
| Deprecated term read | Historical definition remains available |
| Glossary search | Matching active entries are returned |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |

------------------------------------------------------------------------

# Phase 2 Executable Specification

## Glossary Entry Contract

| Field | Required | Description |
|-------|----------|-------------|
| TermId | Yes | Stable term identifier |
| Term | Yes | Display term |
| Definition | Yes | Canonical quick definition |
| Language | Yes | Locale or language code |
| Domain | No | Related business domain |
| RelatedTerminologyId | No | Link to formal domain language definition |
| Status | Yes | Draft, Active, Deprecated, Archived |
| Version | Yes | Immutable entry version |

## Commands

| Command | Actor | Output |
|---------|-------|--------|
| PublishGlossaryEntry | KnowledgeApplicationService | GlossaryEntryPublished |
| UpdateGlossaryEntry | KnowledgeApplicationService | GlossaryEntryUpdated |
| DeprecateGlossaryEntry | KnowledgeApplicationService | GlossaryEntryDeprecated |
| ValidateGlossaryConsistency | KnowledgeApplicationService | GlossaryConsistencyValidated |

## Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| GlossaryEntryPublished | New term available | Documentation, AI Agent |
| GlossaryEntryUpdated | Term definition version updated | Documentation, Search |
| GlossaryEntryDeprecated | Term no longer preferred | Documentation, Governance |
| GlossaryConsistencyViolationDetected | Glossary conflicts with terminology | Governance |

## Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| GLS-VR-001 | Active glossary entry must have term and definition. | Reject publish |
| GLS-VR-002 | Glossary must not contradict terminology.md. | Reject publish |
| GLS-VR-003 | Abbreviation entries must define full expansion. | Reject publish |
| GLS-VR-004 | Deprecated terms must retain historical definition. | Reject deletion |
| GLS-VR-005 | Duplicate active term in same language is not allowed. | Reject publish |

## API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/knowledge/glossary | GET | Search glossary entries | Knowledge:Read |
| /api/v1/knowledge/glossary | POST | Publish glossary entry | Knowledge:Write |
| /api/v1/knowledge/glossary/{termId} | GET | Retrieve glossary entry | Knowledge:Read |
| /api/v1/knowledge/glossary/validate | POST | Validate glossary consistency | Knowledge:Admin |

## Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Duplicate active term | Publish fails |
| Missing abbreviation expansion | Publish fails |
| Terminology conflict | Consistency violation emitted |
| Deprecated term read | Historical definition remains available |
| Glossary search | Matching active entries are returned |

# Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
