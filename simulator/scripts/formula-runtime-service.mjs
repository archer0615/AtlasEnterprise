import { calculateRecommendationScore, createFormulaEvaluation, deriveRecommendation } from "./formula-contract.mjs";

export function evaluateScenarioFixture(fixture, computeMetrics) {
  const metrics = computeMetrics(fixture);
  const scoreEvaluation = calculateRecommendationScore(fixture, metrics);
  const recommendation = deriveRecommendation(scoreEvaluation, fixture);
  return {
    fixtureId: fixture.fixtureId,
    asOfDate: fixture.asOfDate,
    assumptionVersion: fixture.assumptionVersion,
    formulaVersion: fixture.formulaVersion,
    status: recommendation.status,
    score: scoreEvaluation.score,
    recommendation: {
      status: recommendation.status,
      explanation: recommendation.explanation,
      warningReferences: recommendation.warningReferences,
      source: recommendation.source,
      executionTrace: {
        sourceFixtureId: fixture.fixtureId,
        scorePolicyVersion: scoreEvaluation.policyVersion,
        formulaVersion: fixture.formulaVersion,
      },
    },
    warningCount: fixture.expected.warnings.length,
    metrics,
    generatedFrom: Object.keys(metrics).length ? "fixture-runtime-formula" : "fixture-expected-output",
    formulaEvaluation: createFormulaEvaluation({ fixture, metrics }),
    scoreEvaluation,
  };
}
