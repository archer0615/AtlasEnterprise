# Recommendation Identity and Scoring

## Purpose

This split document isolates Recommendation identity, scoring, rationale, explainability, risk, benefit, cost, confidence, and assignment fields from the canonical `knowledge/entity/Recommendation.md` parent.

## Canonical Parent

- Parent: `knowledge/entity/Recommendation.md`
- Entity: Recommendation
- Domain: Decision and recommendation workflows

## Covered Sections

- Document Control
- Entity Overview
- RecommendationId, HouseholdId, DecisionId, ScenarioId, GoalIds
- RecommendationType, Priority, RecommendationScore, Status
- Rationale, ExplainabilityRef, RiskAssessment
- ExpectedBenefit, Cost, Confidence
- ExpirationAt, AssignedUserId, FollowUpActionId

## Scoring Rules

- RecommendationScore, Priority, Confidence, RiskAssessment, ExpectedBenefit, and Cost must be explainable.
- Recommendation must preserve GoalIds and scenario evidence used during generation.
- Expired recommendations must not be executed without refresh or reapproval.
