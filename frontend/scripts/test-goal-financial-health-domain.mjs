import { strict as assert } from "node:assert";
import { canTransitionGoal, getAllowedGoalTransitions, transitionGoal } from "../src/domain/goal/goal-lifecycle.js";
import { normalizeGoal, validateGoal, validateGoalDependency } from "../src/domain/goal/goal-validation.js";
import { projectFinancialHealth } from "../src/runtime/financial-health-projection.js";
import { projectGoalProgress } from "../src/runtime/goal-progress-projection.js";

const context = { now: () => new Date("2026-07-22T00:00:00.000Z"), createId: () => "goal-id" };
const goal = normalizeGoal({ ownerId: "owner-1", name: "Emergency Fund", goalType: "emergency-fund", targetAmount: "600000", currentAmount: "150000", currency: "TWD", targetDate: "2026-12-31" }, context);

assert.equal(validateGoal(goal).length, 0);
assert.equal(validateGoal({ ...goal, name: "" })[0].code, "ATLAS_GOAL_NAME_REQUIRED");
assert.equal(validateGoal({ ...goal, goalType: "invalid" })[0].code, "ATLAS_GOAL_TYPE_INVALID");
assert.equal(validateGoal({ ...goal, targetAmount: 0 })[0].code, "ATLAS_GOAL_TARGET_INVALID");
assert.equal(validateGoal({ ...goal, currentAmount: -1 })[0].code, "ATLAS_GOAL_CURRENT_AMOUNT_INVALID");
assert.equal(validateGoal({ ...goal, currency: "JPY" })[0].code, "ATLAS_GOAL_CURRENCY_INVALID");
assert.equal(validateGoal({ ...goal, targetDate: "2026-01-01", startDate: "2026-07-22" })[0].code, "ATLAS_GOAL_DATE_RANGE_INVALID");
assert.equal(validateGoal({ ...goal, status: "unknown" })[0].code, "ATLAS_GOAL_STATUS_INVALID");
assert.equal(validateGoalDependency({ ...goal, parentGoalId: "missing" }, null)[0].code, "ATLAS_GOAL_PARENT_INVALID");
assert.equal(validateGoalDependency({ ...goal, parentGoalId: "parent" }, { id: "parent", ownerId: "other", status: "active" })[0].code, "ATLAS_GOAL_PARENT_INVALID");
assert.equal(validateGoalDependency({ ...goal, parentGoalId: "parent" }, { id: "parent", ownerId: "owner-1", status: "active" }, ["goal-id"])[0].code, "ATLAS_GOAL_DEPENDENCY_CYCLE");

assert.deepEqual(getAllowedGoalTransitions("draft"), ["active", "archived", "cancelled"]);
assert.equal(canTransitionGoal({ currentStatus: "draft", targetStatus: "active" }).allowed, true);
assert.equal(canTransitionGoal({ currentStatus: "completed", targetStatus: "active" }).allowed, false);
assert.equal(transitionGoal({ ...goal, status: "draft" }, "active", context).record.status, "active");
assert.equal(transitionGoal({ ...goal, status: "completed" }, "active", context).ok, false);

const input = {
  goals: [goal, { ...goal, id: "closed", status: "archived", currentAmount: 999999 }],
  assets: [{ ownerId: "owner-1", status: "active", currency: "TWD", currentValue: 1000000 }],
  liabilities: [{ ownerId: "owner-1", status: "active", currency: "TWD", outstandingBalance: 300000 }],
  incomes: [{ id: "income", ownerId: "owner-1", status: "active", currency: "TWD", amount: 100000, frequency: "monthly", startDate: "2026-07-01" }],
  expenses: [{ id: "expense", ownerId: "owner-1", status: "active", currency: "TWD", amount: 70000, frequency: "monthly", startDate: "2026-07-01" }],
  periodStart: "2026-07-01",
  periodEnd: "2026-07-31",
  asOfDate: "2026-07-22",
};
const before = JSON.stringify(input);
const progress = projectGoalProgress(input);
assert.equal(progress.goalCount, 1);
assert.equal(progress.averageProgress, 25);
const health = projectFinancialHealth(input);
assert.equal(health.netWorth.netWorth, 700000);
assert.equal(health.cashFlow.netCashFlow, 30000);
assert.equal(health.metrics.some((metric) => metric.id === "savingsRate" && metric.value === 0.3), true);
assert.equal(JSON.stringify(input), before);

console.log("Goal and financial health domain tests passed.");
