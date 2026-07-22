import { projectCashFlow } from "./cashflow-projection.js";
import { projectGoalProgress } from "./goal-progress-projection.js";
import { projectNetWorth } from "./net-worth-projection.js";

export function projectFinancialHealth({ assets = [], liabilities = [], incomes = [], expenses = [], goals = [], periodStart, periodEnd, asOfDate } = {}) {
  const netWorth = projectNetWorth({ assets, liabilities });
  const cashFlow = projectCashFlow({ incomes, expenses, periodStart, periodEnd });
  const goalProgress = projectGoalProgress({ goals, assets, liabilities, incomes, expenses, asOfDate });
  const incomeExpenseRatio = cashFlow.totalIncome > 0 ? Number((cashFlow.totalExpense / cashFlow.totalIncome).toFixed(4)) : null;
  const debtAssetRatio = netWorth.totalAssets > 0 ? Number((netWorth.totalLiabilities / netWorth.totalAssets).toFixed(4)) : null;
  const savingsRate = cashFlow.totalIncome > 0 ? Number((cashFlow.netCashFlow / cashFlow.totalIncome).toFixed(4)) : null;
  const score = classifyScore({ netWorth: netWorth.netWorth, incomeExpenseRatio, debtAssetRatio, savingsRate, averageProgress: goalProgress.averageProgress });
  const warnings = [...netWorth.warnings || [], ...cashFlow.warnings || [], ...goalProgress.warnings || []];
  return Object.freeze({
    asOfDate: asOfDate || new Date().toISOString().slice(0, 10),
    score,
    classification: score >= 80 ? "strong" : (score >= 60 ? "stable" : (score >= 40 ? "watch" : "at-risk")),
    metrics: Object.freeze([
      metric("netWorth", netWorth.netWorth, "currency"),
      metric("netCashFlow", cashFlow.netCashFlow, "currency"),
      metric("savingsRate", savingsRate, "ratio"),
      metric("incomeExpenseRatio", incomeExpenseRatio, "ratio"),
      metric("debtAssetRatio", debtAssetRatio, "ratio"),
      metric("averageGoalProgress", goalProgress.averageProgress, "percent"),
    ]),
    netWorth,
    cashFlow,
    goalProgress,
    dataCompleteness: warnings.length ? "incomplete" : "complete",
    warnings,
  });
}

function classifyScore({ netWorth, incomeExpenseRatio, debtAssetRatio, savingsRate, averageProgress }) {
  let score = 50;
  if (netWorth > 0) score += 10;
  if (savingsRate !== null && savingsRate >= 0.2) score += 15;
  if (savingsRate !== null && savingsRate < 0) score -= 20;
  if (incomeExpenseRatio !== null && incomeExpenseRatio <= 0.8) score += 10;
  if (debtAssetRatio !== null && debtAssetRatio <= 0.5) score += 10;
  if (averageProgress >= 50) score += 5;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function metric(id, value, unit) {
  return Object.freeze({ id, value, unit, available: value !== null && value !== undefined && Number.isFinite(Number(value)) });
}
