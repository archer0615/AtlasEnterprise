import { calculateRecommendationScore, createFormulaEvaluation } from "./formula-contract.mjs";

export function evaluateScenarioFixture(fixture, computeMetrics) {
  const metrics = computeMetrics(fixture);
  const scoreEvaluation = calculateRecommendationScore(fixture, metrics);
  return {
    fixtureId: fixture.fixtureId,
    asOfDate: fixture.asOfDate,
    assumptionVersion: fixture.assumptionVersion,
    formulaVersion: fixture.formulaVersion,
    status: fixture.expected.recommendation.status,
    score: scoreEvaluation.score,
    recommendation: {
      status: fixture.expected.recommendation.status,
      explanation: fixture.expected.recommendation.explanation,
      warningReferences: fixture.expected.recommendation.warningReferences || [],
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
