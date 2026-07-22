const frequencyMonths = new Map([
  ["one-time", 0],
  ["monthly", 1],
  ["quarterly", 3],
  ["semiannual", 6],
  ["annual", 12],
]);

export function projectCashFlow({ incomes = [], expenses = [], periodStart, periodEnd } = {}) {
  const start = new Date(periodStart || new Date().toISOString().slice(0, 10));
  const end = new Date(periodEnd || periodStart || new Date().toISOString().slice(0, 10));
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return Object.freeze({ periodStart, periodEnd, totalIncome: 0, totalExpense: 0, netCashFlow: 0, incomeCount: 0, expenseCount: 0, incomeOccurrences: [], expenseOccurrences: [], currency: "N/A", dataCompleteness: "error", warnings: ["Invalid projection period"] });
  }
  const incomeOccurrences = incomes.flatMap((record) => expandOccurrences(record, start, end, "income")).filter(Boolean);
  const expenseOccurrences = expenses.flatMap((record) => expandOccurrences(record, start, end, "expense")).filter(Boolean);
  const currencies = new Set([...incomeOccurrences, ...expenseOccurrences].map((item) => item.currency).filter(Boolean));
  const totalIncome = incomeOccurrences.reduce((total, item) => total + item.amount, 0);
  const totalExpense = expenseOccurrences.reduce((total, item) => total + item.amount, 0);
  return Object.freeze({
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10),
    totalIncome,
    totalExpense,
    netCashFlow: totalIncome - totalExpense,
    incomeCount: incomes.filter(isActive).length,
    expenseCount: expenses.filter(isActive).length,
    incomeOccurrences,
    expenseOccurrences,
    currency: currencies.size === 1 ? [...currencies][0] : "MULTI",
    dataCompleteness: currencies.size > 1 ? "incomplete-currency-conversion" : "complete",
    warnings: currencies.size > 1 ? ["Multiple currencies are not converted"] : [],
  });
}

function expandOccurrences(record, periodStart, periodEnd, recordType) {
  if (!isActive(record)) return [];
  const amount = Number(record.amount);
  if (!Number.isFinite(amount)) return [];
  const frequency = record.frequency || "one-time";
  const firstDate = new Date(record.occurrenceDate || record.startDate);
  const endDate = record.endDate ? new Date(record.endDate) : periodEnd;
  if (Number.isNaN(firstDate.getTime()) || Number.isNaN(endDate.getTime())) return [];
  if (frequency === "one-time") {
    return firstDate >= periodStart && firstDate <= periodEnd ? [occurrence(record, firstDate, amount, recordType)] : [];
  }
  const stepMonths = frequencyMonths.get(frequency);
  if (!stepMonths) return [];
  const occurrences = [];
  const cursor = new Date(firstDate);
  while (cursor <= periodEnd && cursor <= endDate && occurrences.length < 370) {
    if (cursor >= periodStart) occurrences.push(occurrence(record, cursor, amount, recordType));
    cursor.setMonth(cursor.getMonth() + stepMonths);
  }
  return occurrences;
}

function occurrence(record, date, amount, recordType) {
  return Object.freeze({ id: record.id, name: record.name, recordType, date: date.toISOString().slice(0, 10), amount, currency: record.currency });
}

function isActive(record) {
  return record?.status !== "archived" && record?.status !== "inactive";
}
