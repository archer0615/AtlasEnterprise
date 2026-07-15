# knowledge/explainability-framework.md

# Atlas Decision Explainability Framework
Version: 1.0
Status: Product Specification

## 1. Purpose

The Explainability Framework defines how every recommendation produced by the Atlas Decision Engine is explained, audited and reproduced.

Explainability never changes a decision. It explains how the decision was produced.

---

## 2. Objectives

- Build user trust
- Provide deterministic explanations
- Support regulatory and audit requirements
- Enable AI-generated natural language from structured evidence
- Allow every score to be traced back to source data

---

## 3. Architecture

```
Input Data
    ↓
Domain Engines
    ↓
KPIs
    ↓
Financial Ratios
    ↓
Risk Framework
    ↓
Decision Matrix
    ↓
Scoring Model
    ↓
Recommendation
    ↓
Explainability Layer
```

---

## 4. Principles

1. Deterministic
2. Evidence-based
3. Version-controlled
4. Human-readable
5. Machine-readable
6. Reproducible

---

## 5. Explanation Pipeline

1. Collect execution context
2. Capture assumption versions
3. Capture formula versions
4. Capture KPI outputs
5. Capture ratio outputs
6. Capture risk outputs
7. Capture scoring details
8. Generate structured explanation
9. Render natural-language explanation

---

## 6. Decision Explanation Object

```
DecisionExplanation
├── DecisionId
├── ScenarioId
├── Summary
├── Recommendation
├── DecisionScore
├── ConfidenceScore
├── CategoryScores
├── ReasonCodes
├── PositiveFactors
├── NegativeFactors
├── TradeOffs
├── RiskFactors
├── SupportingKPIs
├── SupportingRatios
├── SupportingRules
├── SupportingFormulas
├── SupportingAssumptions
├── SensitivityAnalysis
├── AuditTrail
├── Versions
└── GeneratedAt
```

---

## 7. Reason Codes

Reason codes are immutable identifiers.

Example format:

- CF001 Positive Cash Flow
- LIQ001 Healthy Emergency Fund
- DEBT001 DTI Within Policy
- INV001 Portfolio Diversified
- RET001 Retirement Funding Adequate
- HOME001 Housing Affordable

The UI translates reason codes into localized text.

---

## 8. Score Decomposition

Every recommendation exposes:

- Overall score
- Category score
- KPI contribution
- Bonus items
- Penalty items
- Hard-rule triggers

No score may be returned without decomposition.

---

## 9. Trade-off Analysis

Each recommendation includes:

Benefits
- Increased retirement readiness
- Higher long-term net worth

Costs
- Lower short-term liquidity
- Higher mortgage payment

Trade-off Summary
- Explain why the benefits outweigh the costs.

---

## 10. Sensitivity Analysis

Support scenario perturbation for:

- Interest rate
- Inflation
- Salary growth
- Investment return
- Property appreciation

Output:

- Baseline score
- Updated score
- Score delta
- Dominant affected KPIs

---

## 11. Confidence Score

Decision Score measures quality of the decision.

Confidence Score measures certainty of the recommendation.

Suggested inputs:

- Data completeness
- Assumption stability
- Market uncertainty
- Scenario complexity
- Missing information

Scale:

0–100

---

## 12. Evidence Chain

Every explanation supports drill-down:

Decision
→ Category
→ KPI
→ Financial Ratio
→ Formula
→ Raw Data

This chain must be navigable through APIs.

---

## 13. Audit Trail

Persist:

- Decision Version
- Workflow Version
- Formula Version
- Assumption Version
- Risk Version
- Matrix Version
- Scoring Version
- Execution Timestamp
- Trace Identifier

Historical results must remain reproducible.

---

## 14. AI Explanation Rules

LLMs must never invent evidence.

Generation workflow:

Structured Evidence
→ Reason Codes
→ Template
→ Natural Language

All generated text must be supported by structured evidence.

---

## 15. API Model

GET /api/decisions/{decisionId}/explanation

Response sections:

- Summary
- Recommendation
- Decision Score
- Confidence Score
- Reason Codes
- Positive Factors
- Negative Factors
- Trade-offs
- Sensitivity
- Supporting KPIs
- Supporting Ratios
- Audit Information
- Version Information

---

## 16. Dashboard Requirements

Display:

- Decision Score
- Confidence Score
- Top Reasons
- Top Risks
- Trade-offs
- Sensitivity Summary
- Version Badge
- Audit Availability

---

## 17. Governance

- Explanation models are versioned independently.
- Reason codes are immutable.
- Every explanation references calculation versions.
- Historical explanations are never overwritten.

---

## 18. Phase 2 Executable Specification

### Command Coverage

| Command | Actor | Input | Output | Audit |
|---------|-------|-------|--------|-------|
| GenerateDecisionExplanation | DecisionApplicationService | DecisionId, ScenarioId, ExplanationVersion | DecisionExplanation | Required |
| RegenerateHistoricalExplanation | AdministrationApplicationService | DecisionId, Version Set | ReproducedExplanation | Required |
| PublishReasonCode | GovernanceApplicationService | ReasonCodeDefinition | ReasonCodePublished | Required |
| ValidateExplanationEvidence | ExplainabilityService | DecisionExplanation | EvidenceValidationResult | Required |

### Domain Events

| Event | Trigger | Consumers |
|-------|---------|-----------|
| DecisionExplanationGenerated | Explanation created for a decision | Dashboard, Audit, Reporting |
| ReasonCodePublished | New immutable reason code registered | Decision Engine, UI Localization |
| ExplanationEvidenceValidated | Evidence chain passes validation | Audit, Compliance |
| ExplanationValidationFailed | Evidence chain is incomplete or inconsistent | Alert, Administration |

### Repository Contract

| Repository | Responsibility | Required Operations |
|------------|----------------|---------------------|
| ExplanationRepository | Persist explanation snapshots | Save, GetByDecisionId, GetByTraceId |
| ReasonCodeRepository | Store immutable reason code catalog | Publish, GetActive, GetByCode |
| EvidenceRepository | Store evidence chain references | SaveChain, GetChain, ValidateChain |

### API Contract

| Endpoint | Method | Purpose | Permission |
|----------|--------|---------|------------|
| /api/v1/decisions/{decisionId}/explanation | GET | Retrieve current explanation | Decision:Read |
| /api/v1/decisions/{decisionId}/explanation/replay | POST | Reproduce historical explanation | Audit:Replay |
| /api/v1/reason-codes | GET | Retrieve reason code catalog | Decision:Read |
| /api/v1/explanations/{traceId}/evidence | GET | Retrieve evidence chain | Audit:Read |

### Validation Rules

| Rule ID | Rule | Failure |
|---------|------|---------|
| EXP-VR-001 | Every explanation must reference DecisionId and ScenarioId. | Reject generation |
| EXP-VR-002 | Every score must include decomposition. | Reject generation |
| EXP-VR-003 | Every reason code must exist in the immutable catalog. | Reject generation |
| EXP-VR-004 | Every natural-language statement must map to structured evidence. | Mark unsupported |
| EXP-VR-005 | Historical replay must use the original version set. | Reject replay |

### Consistency Matrix

| Artifact | Source | Consumer | Consistency Check |
|----------|--------|----------|-------------------|
| DecisionExplanation | Decision Engine | Dashboard | DecisionId and score match source decision |
| ReasonCode | Governance | UI | Code exists and localized label is available |
| EvidenceChain | Formula, KPI, Ratio, Rule | Audit | Every referenced version is resolvable |
| SensitivityResult | Scenario Engine | Decision Review | Baseline scenario equals original scenario |

### Testing Matrix

| Test | Expected Result |
|------|-----------------|
| Missing KPI evidence | Explanation generation fails |
| Unknown reason code | Explanation generation fails |
| Historical version replay | Reproduces original score and reason codes |
| Unsupported AI statement | Validation flags statement as unsupported |
| Sensitivity perturbation | Score delta and affected KPIs are returned |

## 19. Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-15 | Phase 2 executable specification added. |
