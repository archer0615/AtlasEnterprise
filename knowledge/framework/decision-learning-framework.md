# Decision Learning Framework

Version: 1.0

## Purpose
Defines how Project Atlas continuously improves recommendations by learning from historical decisions and their outcomes while preserving deterministic business rules and explainability.

## Objectives
- Measure recommendation effectiveness.
- Compare predicted versus actual outcomes.
- Identify recurring decision patterns.
- Improve future recommendations without violating governance.

## Design Principles
- Business rules remain authoritative.
- Learning never overrides hard constraints.
- Every learned insight is auditable.
- Models are versioned and reproducible.

## Learning Sources
- Decision History
- Decision Audit
- Execution Plans
- Goal Reviews
- Scenario Comparisons
- User Feedback
- Financial Outcomes

## Learning Pipeline
1. Collect decision outcomes.
2. Validate data quality.
3. Compare predicted vs actual results.
4. Identify patterns.
5. Generate insights.
6. Review governance rules.
7. Publish new learning version.

## Outcome Metrics
- Recommendation Accepted
- Recommendation Executed
- Goal Achieved
- Time to Completion
- Net Worth Impact
- Cash Flow Improvement
- Liquidity Change
- User Satisfaction

## Learning Categories
### Recommendation Quality
Evaluate acceptance and execution rates.

### Prediction Accuracy
Compare forecast values with realized outcomes.

### Rule Effectiveness
Measure which rules consistently improve outcomes.

### Scenario Accuracy
Evaluate baseline versus alternative scenarios.

## Feedback Model
Supported feedback:
- Helpful
- Not Helpful
- Too Conservative
- Too Aggressive
- Already Completed
- Ignore

## Learning Outputs
- Insight ID
- Pattern
- Confidence
- Supporting Evidence
- Suggested Rule Review
- Suggested Metric Update

## Business Rules
- Historical decisions remain immutable.
- Learning suggestions require governance approval.
- Rule changes create new rule versions.
- All learning references audit records.

## Explainability
Every learning insight records:
- Source decisions
- Sample size
- Confidence score
- Supporting KPIs
- Suggested improvement

## Integration
Consumes:
- Decision History Framework
- Decision Audit Framework
- Goal Review Framework
- Recommendation Priority Framework
- Financial Projection Framework

Produces:
- Decision Engine tuning inputs
- Analytics
- Governance reports
- Dashboard insights

## KPIs
- Prediction Accuracy
- Recommendation Success Rate
- Goal Achievement Rate
- Rule Improvement Rate
- Learning Coverage
- Feedback Participation

## Testing
- Historical replay
- Rule revision impact
- Prediction variance
- Sparse data
- Conflicting feedback
- Large decision datasets

## Future Enhancements
- AI-assisted pattern discovery
- Reinforcement learning (governed)
- Household-level learning
- Cross-user anonymized benchmarking
