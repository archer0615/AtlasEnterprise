import { strict as assert } from "node:assert";
import { createExpenseApplicationService } from "../src/application/expenses/expense-application-service.js";
import { createIncomeApplicationService } from "../src/application/incomes/income-application-service.js";

function memoryRepository() {
  const records = new Map();
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId); },
    async listEffectiveWithin(ownerId, period = {}) { return [...records.values()].filter((record) => record.ownerId === ownerId && (!period.status || record.status === period.status)); },
    async create(record) { records.set(record.id, record); },
    async update(record) { records.set(record.id, record); },
    async archive(id, record) { records.set(id, record); },
    async restore(id, record) { records.set(id, record); },
    async existsByOwnerAndName(ownerId, name, excludeId = "") { return [...records.values()].some((record) => record.ownerId === ownerId && record.id !== excludeId && record.name === name); },
    async countByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId).length; },
  };
}

const ownerProvider = { getCurrentOwner: async () => ({ ownerId: "owner-1" }) };
const auditEntries = [];
const auditRepository = { save: async (entry) => auditEntries.push(entry) };
const clock = { now: () => new Date("2026-07-22T00:00:00.000Z") };
let id = 0;
const ids = { createId: () => `cashflow-id-${id += 1}` };

const incomeService = createIncomeApplicationService({ repository: memoryRepository(), ownerProvider, auditRepository, ...clock, ...ids });
const expenseService = createExpenseApplicationService({ repository: memoryRepository(), ownerProvider, auditRepository, ...clock, ...ids });

const incomeResult = await incomeService.createIncome({ name: "Salary", incomeType: "salary", amount: 100000, currency: "TWD", frequency: "monthly", startDate: "2026-07-01" });
assert.equal(incomeResult.ok, true);
assert.equal((await incomeService.listIncomes()).length, 1);
assert.equal((await incomeService.createIncome({ name: "Salary", incomeType: "salary", amount: 100000, currency: "TWD", frequency: "monthly", startDate: "2026-07-01" })).ok, false);
assert.equal((await incomeService.archiveIncome(incomeResult.record.id)).ok, true);
assert.equal((await incomeService.restoreIncome(incomeResult.record.id)).ok, true);

const expenseResult = await expenseService.createExpense({ name: "Rent", expenseType: "housing", amount: 30000, currency: "TWD", frequency: "monthly", startDate: "2026-07-01" });
assert.equal(expenseResult.ok, true);
assert.equal((await expenseService.listExpenses()).length, 1);
assert.equal(auditEntries.length, 4);

console.log("Income, expense, and cashflow application tests passed.");
