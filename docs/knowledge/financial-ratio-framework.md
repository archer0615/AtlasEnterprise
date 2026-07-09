# Financial Ratio Framework

Version: 2.0

## Purpose
Defines the enterprise framework governing all financial ratios used by Project Atlas. Unlike `financial-ratios.md`, which is the canonical ratio catalog, this framework specifies lifecycle, governance, calculation standards, ownership, validation, versioning, and engine integration.

## Relationship to financial-ratios.md
- financial-ratios.md = Ratio Catalog (what ratios exist)
- financial-ratio-framework.md = Governance Framework (how ratios are defined, maintained, calculated, versioned, validated, and consumed)

## Framework Scope
- Ratio taxonomy
- Naming standards
- Formula governance
- Version control
- Calculation timing
- Data quality
- Validation
- Engine ownership
- Explainability
- API exposure

## Ratio Lifecycle
Draft
→ Review
→ Approved
→ Active
→ Deprecated
→ Archived

## Naming Standard
FR-{DOMAIN}-{NUMBER}

Examples:
- FR-LIQ-001
- FR-DEBT-002
- FR-RET-001

## Formula Governance
Every ratio must define:
- Stable ID
- Business definition
- Formula
- Inputs
- Units
- Assumptions
- Thresholds
- Version
- Owner Engine

## Calculation Rules
- Deterministic
- Reproducible
- Time-stamped
- Assumption-version aware
- Currency normalized

## Data Validation
Validate:
- Missing inputs
- Negative values
- Currency consistency
- Date alignment
- Duplicate records

## Engine Consumers
- Financial Health Score
- Decision Engine
- Dashboard
- Scenario Engine
- Cash Flow Engine
- Investment Engine
- Loan Engine
- Retirement Engine

## Explainability
Each calculated ratio records:
- Formula version
- Input values
- Output value
- Threshold evaluation
- Source entities

## Business Rules
- Ratio IDs are immutable.
- Formula changes require version increments.
- Historical values are never recalculated using newer formulas.
- All engines consume canonical ratio definitions.

## KPIs
- Ratio calculation success rate
- Validation error rate
- Formula version coverage
- Data completeness

## Future Enhancements
- Custom user ratios
- AI anomaly detection
- Country-specific ratio packs
