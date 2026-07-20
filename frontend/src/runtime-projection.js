export const runtimeProjectionSchema = "atlas-enterprise.runtime-projection.v1";

export function parseMoney(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const normalized = String(value ?? "").replace(/[,\s]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formatMoney(value, currency = "TWD") {
  const amount = parseMoney(value);
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value) {
  const ratio = Number(value);
  return Number.isFinite(ratio) ? `${(ratio * 100).toFixed(1)}%` : "N/A";
}

export function createRuntimeProjection(input = {}) {
  const assets = Array.isArray(input.assets) ? input.assets : [];
  const liabilities = Array.isArray(input.liabilities) ? input.liabilities : [];
  const income = Array.isArray(input.income) ? input.income : [];
  const expenses = Array.isArray(input.expenses) ? input.expenses : [];
  const goals = Array.isArray(input.goals) ? input.goals : [];
  const portfolio = Array.isArray(input.portfolio) ? input.portfolio : [];
  const scenarios = Array.isArray(input.scenarios) ? input.scenarios : [];
  const decisions = Array.isArray(input.decisions) ? input.decisions : [];

  const assetTotal = assets.reduce((total, item) => total + parseMoney(item.value), 0);
  const liabilityTotal = liabilities.reduce((total, item) => total + parseMoney(item.balance), 0);
  const monthlyIncome = income.reduce((total, item) => total + parseMoney(item.monthlyAmount), 0);
  const monthlyExpense = expenses.reduce((total, item) => total + parseMoney(item.monthlyAmount), 0);
  const monthlyCashFlow = monthlyIncome - monthlyExpense;
  const debtRatio = monthlyIncome > 0 ? liabilityTotal / (monthlyIncome * 12) : null;
  const portfolioValue = portfolio.reduce((total, item) => total + parseMoney(item.marketValue), 0);
  const goalFundingTarget = goals.reduce((total, item) => total + parseMoney(item.targetAmount), 0);
  const goalFundingCurrent = goals.reduce((total, item) => total + parseMoney(item.currentAmount), 0);

  return {
    schema: runtimeProjectionSchema,
    version: 1,
    generatedAt: input.generatedAt || "deterministic",
    timezone: input.timezone || "Asia/Taipei",
    currency: input.currency || "TWD",
    dataSourceMode: input.dataSourceMode || "user",
    netWorth: assetTotal - liabilityTotal,
    assetSummary: { count: assets.length, total: assetTotal },
    liabilitySummary: { count: liabilities.length, total: liabilityTotal },
    cashFlowSummary: { monthlyIncome, monthlyExpense, monthlyCashFlow },
    debtLoanSummary: { debtRatio, liabilityTotal },
    portfolioSummary: { count: portfolio.length, total: portfolioValue },
    goalSummary: {
      count: goals.length,
      targetAmount: goalFundingTarget,
      currentAmount: goalFundingCurrent,
      fundingRatio: goalFundingTarget > 0 ? goalFundingCurrent / goalFundingTarget : null,
    },
    financialHealth: scoreFinancialHealth({ monthlyCashFlow, liabilityTotal, assetTotal, goalFundingTarget, goalFundingCurrent }),
    scenarioSummary: { count: scenarios.length, active: scenarios.filter((item) => item.status !== "archived").length },
    decisionRecommendationSummary: {
      count: decisions.length,
      accepted: decisions.filter((item) => item.decision === "accepted").length,
      deferred: decisions.filter((item) => item.decision === "deferred").length,
      rejected: decisions.filter((item) => item.decision === "rejected").length,
    },
  };
}

function scoreFinancialHealth({ monthlyCashFlow, liabilityTotal, assetTotal, goalFundingTarget, goalFundingCurrent }) {
  let score = 50;
  if (monthlyCashFlow > 0) score += 15;
  if (assetTotal > liabilityTotal) score += 20;
  if (goalFundingTarget > 0 && goalFundingCurrent / goalFundingTarget >= 0.5) score += 15;
  return Math.max(0, Math.min(100, score));
}

export function createDashboardDataSourceState({ userProjection, demoSnapshot, error } = {}) {
  if (error) {
    return { mode: "error", indicator: "Projection error", snapshot: demoSnapshot || null, error: String(error.message || error) };
  }
  if (userProjection && hasUserProjectionData(userProjection)) {
    return { mode: "user", indicator: "User Data", projection: userProjection };
  }
  if (demoSnapshot) {
    return { mode: "demo", indicator: "Demo Data", snapshot: demoSnapshot };
  }
  return { mode: "empty", indicator: "Empty State", snapshot: null };
}

function hasUserProjectionData(projection) {
  return Boolean(
    projection.assetSummary?.count
      || projection.liabilitySummary?.count
      || projection.cashFlowSummary?.monthlyIncome
      || projection.goalSummary?.count
      || projection.portfolioSummary?.count,
  );
}
