import assert from "node:assert/strict";
import { normalizeScenario } from "../src/domain/scenario/scenario-normalization.js";
import { validateScenario } from "../src/domain/scenario/scenario-validation.js";
import { transitionScenario } from "../src/domain/scenario/scenario-status.js";
import { normalizeDecision } from "../src/domain/decision/decision-normalization.js";
import { validateDecision } from "../src/domain/decision/decision-validation.js";
import { transitionDecision } from "../src/domain/decision/decision-state-machine.js";

const now = () => new Date("2026-07-24T00:00:00.000Z");

const scenario = normalizeScenario({
  ownerId: "owner-1",
  name: " Baseline ",
  type: "cashflow",
  assumptions: { incomeChangePercent: 5, expenseChangePercent: -3 },
  projectionHorizon: { start: "2026-07-01", end: "2026-12-31" },
}, { now, createId: () => "scenario-1" });
assert.equal(scenario.name, "Baseline");
assert.deepEqual(validateScenario(scenario, { persisted: true }), []);
assert.equal(validateScenario({ ...scenario, assumptions: { customFormula: 1 } })[0].code, "ATLAS_SCENARIO_ASSUMPTION_INVALID");
assert.equal(validateScenario({ ...scenario, assumptions: { incomeChangePercent: Infinity } })[0].code, "ATLAS_SCENARIO_ASSUMPTION_INVALID");
assert.equal(transitionScenario(scenario, "active", { now }).ok, true);
assert.equal(transitionScenario({ ...scenario, status: "archived" }, "active", { now }).ok, false);

const decision = normalizeDecision({
  ownerId: "owner-1",
  title: "Select scenario",
  type: "scenario-selection",
  scenarioId: "scenario-1",
}, { now, createId: () => "decision-1" });
assert.deepEqual(validateDecision(decision, { persisted: true }), []);
assert.equal(validateDecision({ ...decision, type: "unknown" })[0].code, "ATLAS_DECISION_TYPE_INVALID");
assert.equal(transitionDecision({ currentStatus: "draft", targetStatus: "under-review", decision }).allowed, false);
assert.equal(transitionDecision({ currentStatus: "draft", targetStatus: "under-review", decision, context: { rationale: "Reviewed user rationale." } }).allowed, true);
assert.equal(transitionDecision({ currentStatus: "completed", targetStatus: "committed", decision, context: { rationale: "No." } }).allowed, false);

console.log("Scenario and decision domain tests passed.");
