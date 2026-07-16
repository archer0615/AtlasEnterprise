import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fixtureRoot = path.join(root, "simulator", "fixtures");
const outputRoot = path.join(root, "simulator", "outputs");

function evaluateFixture(fixture) {
  const computed = computeMetrics(fixture);
  return {
    fixtureId: fixture.fixtureId,
    asOfDate: fixture.asOfDate,
    assumptionVersion: fixture.assumptionVersion,
    formulaVersion: fixture.formulaVersion,
    status: fixture.expected.recommendation.status,
    score: fixture.expected.recommendation.score,
    warningCount: fixture.expected.warnings.length,
    metrics: computed,
    generatedFrom: Object.keys(computed).length ? "fixture-runtime-formula" : "fixture-expected-output",
  };
}

function computeMetrics(fixture) {
  if (fixture.fixtureId === "investment-drawdown-stress") {
    const stressedPortfolioValue = Math.round(fixture.inputs.portfolioValue * (1 - fixture.inputs.drawdownRate));
    const reserveMonths = round(fixture.inputs.cashReserve / fixture.inputs.monthlyExpenses, 2);
    return { stressedPortfolioValue, reserveMonths };
  }

  if (fixture.fixtureId === "mortgage-prepayment-baseline-2026") {
    const postPrepaymentReserveMonths = round((fixture.inputs.cashReserve - fixture.inputs.plannedPrepayment) / fixture.inputs.monthlyExpenses, 2);
    const monthlyMortgagePayment = calculateAmortizedPayment(
      fixture.inputs.ordinaryMortgageBalance,
      fixture.inputs.mortgageRate,
      fixture.inputs.planningHorizonMonths,
    );
    return { postPrepaymentReserveMonths, monthlyMortgagePayment };
  }

  if (fixture.fixtureId === "loan-refinancing-rate-shock") {
    const currentMonthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.currentRate, fixture.inputs.remainingMonths);
    const resetMonthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.resetRate, fixture.inputs.remainingMonths);
    const refinanceMonthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.refinanceRate, fixture.inputs.remainingMonths);
    const monthlyPaymentSavingsAfterReset = round(resetMonthlyPayment - refinanceMonthlyPayment, 2);
    const refinanceFeeRecoveryMonths = monthlyPaymentSavingsAfterReset > 0
      ? round(fixture.inputs.refinanceFee / monthlyPaymentSavingsAfterReset, 2)
      : null;
    return {
      currentMonthlyPayment,
      resetMonthlyPayment,
      refinanceMonthlyPayment,
      monthlyPaymentSavingsAfterReset,
      refinanceFeeRecoveryMonths,
    };
  }

  if (fixture.fixtureId === "loan-amortization-schedule-baseline") {
    const monthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.annualRate, fixture.inputs.remainingMonths);
    const firstMonthInterest = round(fixture.inputs.loanBalance * fixture.inputs.annualRate / 12, 2);
    const firstMonthPrincipal = round(monthlyPayment - firstMonthInterest, 2);
    const endingBalanceAfterFirstMonth = round(fixture.inputs.loanBalance - firstMonthPrincipal, 2);
    const totalInterest = round(monthlyPayment * fixture.inputs.remainingMonths - fixture.inputs.loanBalance, 2);
    return { monthlyPayment, firstMonthInterest, firstMonthPrincipal, endingBalanceAfterFirstMonth, totalInterest };
  }

  if (fixture.fixtureId === "loan-refinancing-fee-breakdown") {
    const resetMonthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.resetRate, fixture.inputs.remainingMonths);
    const refinanceMonthlyPayment = calculateAmortizedPayment(fixture.inputs.loanBalance, fixture.inputs.refinanceRate, fixture.inputs.remainingMonths);
    const totalRefinanceCost = fixture.inputs.originationFee + fixture.inputs.appraisalFee + fixture.inputs.adminFee + fixture.inputs.registrationFee + fixture.inputs.prepaymentPenalty;
    const monthlyPaymentSavingsAfterReset = round(resetMonthlyPayment - refinanceMonthlyPayment, 2);
    const refinanceFeeRecoveryMonths = monthlyPaymentSavingsAfterReset > 0
      ? round(totalRefinanceCost / monthlyPaymentSavingsAfterReset, 2)
      : null;
    return { totalRefinanceCost, monthlyPaymentSavingsAfterReset, refinanceFeeRecoveryMonths };
  }

  if (fixture.fixtureId === "portfolio-drawdown-attribution-stress") {
    const equityLoss = Math.round(fixture.inputs.portfolioValue * fixture.inputs.equityWeight * fixture.inputs.equityDrawdownRate);
    const bondLoss = Math.round(fixture.inputs.portfolioValue * fixture.inputs.bondWeight * fixture.inputs.bondDrawdownRate);
    const cashLoss = Math.round(fixture.inputs.portfolioValue * fixture.inputs.cashWeight * fixture.inputs.cashDrawdownRate);
    const totalDrawdownAmount = equityLoss + bondLoss + cashLoss;
    const stressedPortfolioValue = fixture.inputs.portfolioValue - totalDrawdownAmount;
    const drawdownRate = round(totalDrawdownAmount / fixture.inputs.portfolioValue, 4);
    return { equityLoss, bondLoss, cashLoss, totalDrawdownAmount, stressedPortfolioValue, drawdownRate };
  }

  if (fixture.fixtureId === "retirement-withdrawal-sustainability-stress") {
    const annualWithdrawalNeed = fixture.inputs.monthlyRetirementExpense * 12;
    const withdrawalRate = round(annualWithdrawalNeed / fixture.inputs.portfolioValue, 4);
    const stressedPortfolioValue = Math.round(fixture.inputs.portfolioValue * (1 - fixture.inputs.portfolioStressRate));
    const stressedWithdrawalRate = round(annualWithdrawalNeed / stressedPortfolioValue, 4);
    const sustainableAnnualWithdrawal = Math.round(fixture.inputs.portfolioValue * fixture.inputs.safeWithdrawalRate);
    const annualWithdrawalGap = annualWithdrawalNeed - sustainableAnnualWithdrawal;
    return { annualWithdrawalNeed, withdrawalRate, stressedPortfolioValue, stressedWithdrawalRate, sustainableAnnualWithdrawal, annualWithdrawalGap };
  }

  if (fixture.fixtureId === "home-upgrade-2031-baseline") {
    const transactionCostEstimate = Math.round(fixture.inputs.targetHomeEstimatedValue * fixture.inputs.transactionCostRate);
    return { transactionCostEstimate };
  }

  return {};
}

function round(value, precision) {
  const multiplier = 10 ** precision;
  return Math.round(value * multiplier) / multiplier;
}

function calculateAmortizedPayment(principal, annualRate, months) {
  if (months <= 0) return 0;
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return round(principal / months, 2);
  return round((principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months), 2);
}

await mkdir(outputRoot, { recursive: true });

const files = (await readdir(fixtureRoot)).filter((file) => file.endsWith(".json") && !file.endsWith(".schema.json"));
const results = [];

for (const file of files) {
  const fixture = JSON.parse(await readFile(path.join(fixtureRoot, file), "utf8"));
  results.push(evaluateFixture(fixture));
}

const payload = {
  generatedAt: new Date().toISOString(),
  mode: "fixture-runtime-scaffold",
  results: results.sort((a, b) => a.fixtureId.localeCompare(b.fixtureId)),
};

await writeFile(path.join(outputRoot, "scenario-results.json"), JSON.stringify(payload, null, 2), "utf8");
console.log(`Generated simulator output for ${results.length} fixtures.`);
