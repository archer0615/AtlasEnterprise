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
    warningCount: fixture.expected.warnings.length,
    metrics,
    generatedFrom: Object.keys(metrics).length ? "fixture-runtime-formula" : "fixture-expected-output",
    formulaEvaluation: createFormulaEvaluation({ fixture, metrics }),
    scoreEvaluation,
  };
}
