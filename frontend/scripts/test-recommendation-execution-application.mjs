import { strict as assert } from "node:assert";
import { createActionPlanApplicationService } from "../src/application/execution/action-plan-application-service.js";
import { createExecutionPlanApplicationService } from "../src/application/execution/execution-plan-application-service.js";
import { createRecommendationApplicationService } from "../src/application/recommendations/recommendation-application-service.js";

function memoryRepository() {
  const records = new Map();
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId, query = {}) { return [...records.values()].filter((record) => record.ownerId === ownerId && (query.includeArchived || record.status !== "archived")); },
    async create(record) { records.set(record.id, record); },
    async update(record) { records.set(record.id, record); },
    async archive(id, record) { records.set(id, record); },
    async restore(id, record) { records.set(id, record); },
  };
}

const auditEntries = [];
const auditRepository = { save: async (entry) => auditEntries.push(entry) };
const ownerProvider = { getCurrentOwner: async () => ({ ownerId: "owner-1" }) };
const clock = { now: () => new Date("2026-07-23T00:00:00.000Z") };
let id = 0;
const ids = { createId: () => `runtime-id-${id += 1}` };

const recommendationRepository = memoryRepository();
const recommendationService = createRecommendationApplicationService({ repository: recommendationRepository, ownerProvider, auditRepository, ...clock, ...ids });
const created = await recommendationService.createRecommendation({
  title: "Stabilize monthly cash flow",
  type: "cashflow",
  priority: "critical",
  ruleReferences: ["REC-CASHFLOW-NEGATIVE"],
  constraintReferences: ["CONSTRAINT-CASHFLOW"],
  recommendationDate: "2026-07-23",
});
assert.equal(created.ok, true);
assert.equal((await recommendationService.listRecommendations()).length, 1);
assert.equal((await recommendationService.reviewRecommendation(created.record.id, "accepted")).ok, true);
assert.equal((await recommendationService.archiveRecommendation(created.record.id)).ok, true);
assert.equal((await recommendationService.restoreRecommendation(created.record.id)).ok, true);

const accepted = { ...(await recommendationRepository.getById(created.record.id)), status: "accepted" };
const executionRepository = memoryRepository();
const executionService = createExecutionPlanApplicationService({ repository: executionRepository, auditRepository, ...clock, ...ids });
const execution = await executionService.createFromRecommendation(accepted, { status: "committed", decisionId: "decision-1" });
assert.equal(execution.ok, true);
assert.equal((await executionService.updateExecutionPlan({ ...execution.record, status: "ready" })).ok, true);

const actionRepository = memoryRepository();
const actionService = createActionPlanApplicationService({ repository: actionRepository, auditRepository, ...clock, ...ids });
const actions = await actionService.createFromExecutionPlan(execution.record);
assert.equal(actions.ok, true);
assert.equal(actions.records.length, 3);
assert.equal(auditEntries.length, 8);

console.log("Recommendation and execution application tests passed.");
