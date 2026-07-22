import { strict as assert } from "node:assert";
import { normalizeExpense, validateExpense } from "../src/domain/expense/expense-validation.js";
import { normalizeIncome, validateIncome } from "../src/domain/income/income-validation.js";
import { projectCashFlow } from "../src/runtime/cashflow-projection.js";

const context = { now: () => new Date("2026-07-22T00:00:00.000Z"), createId: () => "fixed-id" };
const income = normalizeIncome({ ownerId: "owner-1", name: "Salary", incomeType: "salary", amount: "100000", currency: "TWD", frequency: "monthly", startDate: "2026-07-01" }, context);
const expense = normalizeExpense({ ownerId: "owner-1", name: "Rent", expenseType: "housing", amount: "30000", currency: "TWD", frequency: "monthly", startDate: "2026-07-01" }, context);

assert.equal(validateIncome(income).length, 0);
assert.equal(validateExpense(expense).length, 0);
assert.equal(validateIncome({ ...income, name: "" })[0].code, "ATLAS_INCOME_NAME_REQUIRED");
assert.equal(validateIncome({ ...income, incomeType: "invalid" })[0].code, "ATLAS_INCOME_TYPE_INVALID");
assert.equal(validateIncome({ ...income, amount: -1 })[0].code, "ATLAS_INCOME_AMOUNT_INVALID");
assert.equal(validateIncome({ ...income, frequency: "hourly" })[0].code, "ATLAS_INCOME_FREQUENCY_INVALID");
assert.equal(validateIncome({ ...income, endDate: "2026-06-30" })[0].code, "ATLAS_INCOME_DATE_RANGE_INVALID");
assert.equal(validateExpense({ ...expense, expenseType: "invalid" })[0].code, "ATLAS_EXPENSE_TYPE_INVALID");
assert.equal(validateExpense({ ...expense, amount: Number.NaN })[0].code, "ATLAS_EXPENSE_AMOUNT_INVALID");

const input = {
  incomes: [income, { ...income, id: "bonus", frequency: "one-time", occurrenceDate: "2026-07-15", amount: 5000 }, { ...income, id: "archived", status: "archived", amount: 9999 }],
  expenses: [expense],
  periodStart: "2026-07-01",
  periodEnd: "2026-08-31",
};
const before = JSON.stringify(input);
const projection = projectCashFlow(input);
assert.equal(projection.totalIncome, 205000);
assert.equal(projection.totalExpense, 60000);
assert.equal(projection.netCashFlow, 145000);
assert.equal(projection.incomeOccurrences.length, 3);
assert.equal(projection.expenseOccurrences.length, 2);
assert.equal(JSON.stringify(input), before);

console.log("Income, expense, and cashflow domain tests passed.");
