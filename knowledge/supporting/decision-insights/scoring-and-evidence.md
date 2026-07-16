# Decision Insights Scoring and Evidence

## Purpose
This split document isolates Decision Insight scoring, ranking, evidence collection, recommendation mapping, risk discovery, opportunity discovery, and explainability concerns from the parent Decision Insights specification.

## Source
- Parent specification: [Decision Insights Overview](../decision-insights.md)

## Scoring
Decision Insight scoring calculates severity, priority, confidence, rank, business impact, freshness, and expiration from authorized source data. Scoring must be deterministic for the same source versions, rule versions, formula versions, and permission context.

## Ranking
Ranking orders active insights by severity, priority, confidence score, business impact, risk exposure, target proximity, freshness, and created time. Equal values must produce stable ordering.

## Evidence Collection
Evidence collection records source type, source identifier, source version, collected time, masking state, rule version, formula version, and correlation identifier. Evidence may come from Decision, Recommendation, Goal, Scenario, Portfolio, CashFlow, Risk, Simulation, Workflow, Automation, Notification, Business Calendar, User, and analytics outputs.

## Recommendation Mapping
Recommendation mapping links insight evidence to existing Recommendation records when action is required. Mapping must not create a new Recommendation unless a Recommendation command is explicitly invoked.

## Risk and Opportunity Discovery
Risk discovery identifies material downside, failed execution, governance exceptions, compliance concerns, and forecast deterioration. Opportunity discovery identifies favorable timing, improved execution path, optimization output, and beneficial scenario movement. Both preserve evidence and do not mutate source domains.

## Explainability
Insight explanations describe why the condition was detected, which evidence supports it, how severity and confidence were derived, and which existing Recommendation or Decision action may be relevant.
