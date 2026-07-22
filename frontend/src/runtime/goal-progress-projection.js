export function projectGoalProgress({ goals = [], assets = [], liabilities = [], incomes = [], expenses = [], asOfDate } = {}) {
  const now = new Date(asOfDate || new Date().toISOString().slice(0, 10));
  const activeGoals = goals.filter((goal) => !["archived", "cancelled"].includes(goal?.status));
  const sourceCurrencies = new Set([...assets, ...liabilities, ...incomes, ...expenses, ...activeGoals].map((item) => item?.currency).filter(Boolean));
  const projections = activeGoals.map((goal) => {
    const targetAmount = Number(goal.targetAmount);
    const currentAmount = Number(goal.currentAmount);
    const percentComplete = targetAmount > 0 ? Math.min(999, Number(((currentAmount / targetAmount) * 100).toFixed(2))) : 0;
    const targetDate = new Date(goal.targetDate);
    const daysRemaining = Number.isNaN(targetDate.getTime()) ? null : Math.ceil((targetDate.getTime() - now.getTime()) / 86400000);
    const remainingAmount = Math.max(0, targetAmount - currentAmount);
    const onTrack = goal.status === "completed" || (percentComplete >= 100) || (daysRemaining === null ? false : daysRemaining >= 0 && percentComplete > 0);
    return Object.freeze({
      goalId: goal.id,
      name: goal.name,
      goalType: goal.goalType,
      status: goal.status,
      currency: goal.currency,
      targetAmount,
      currentAmount,
      remainingAmount,
      percentComplete,
      daysRemaining,
      onTrack,
      dataCompleteness: Number.isFinite(targetAmount) && Number.isFinite(currentAmount) ? "complete" : "incomplete",
    });
  });
  const completed = projections.filter((item) => item.percentComplete >= 100 || item.status === "completed").length;
  return Object.freeze({
    asOfDate: now.toISOString().slice(0, 10),
    goalCount: activeGoals.length,
    completedCount: completed,
    averageProgress: projections.length ? Number((projections.reduce((total, item) => total + item.percentComplete, 0) / projections.length).toFixed(2)) : 0,
    projections: Object.freeze(projections),
    currency: sourceCurrencies.size === 1 ? [...sourceCurrencies][0] : (sourceCurrencies.size === 0 ? "N/A" : "MULTI"),
    dataCompleteness: sourceCurrencies.size > 1 ? "incomplete-currency-conversion" : "complete",
    warnings: sourceCurrencies.size > 1 ? ["Multiple currencies are not converted"] : [],
  });
}
