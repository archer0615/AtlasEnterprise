import assert from "node:assert/strict";
import { createDecisionApplicationService } from "../src/application/decisions/decision-application-service.js";
import { createScenarioApplicationService } from "../src/application/scenarios/scenario-application-service.js";

function memoryRepository(key = "id") {
  const records = new Map();
  return {
    async create(record) { records.set(record[key] || record.id, record); },
    async update(record) { records.set(record[key] || record.id, record); },
    async save(record) { records.set(record[key] || record.id, record); },
    async getById(id) { return records.get(id); },
    async listByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId); },
  };
}

const ownerProvider = { async getCurrentOwner() { return { ownerId: "owner-1" }; } };
const now = () => new Date("2026-07-24T00:00:00.000Z");
const audits = [];
const auditRepository = { async save(record) { audits.push(record); } };

const scenarioRepository = memoryRepository("id");
const scenarioService = createScenarioApplicationService({ repository: scenarioRepository, ownerProvider, auditRepository, now, createId: () => "scenario-1" });
const createdScenario = await scenarioService.createScenario({ name: "Baseline", type: "baseline" });
assert.equal(createdScenario.ok, true);
assert.equal((await scenarioService.activateScenario("scenario-1")).ok, true);
assert.equal((await scenarioService.archiveScenario("scenario-1")).ok, true);
assert.equal((await scenarioService.updateScenario("scenario-1", { name: "Blocked" })).ok, false);

const decisionRepository = memoryRepository("id");
const recommendationDecisionRepository = memoryRepository("decisionId");
const decisionService = createDecisionApplicationService({ repository: decisionRepository, recommendationDecisionRepository, ownerProvider, auditRepository, now, createId: () => "decision-1" });
const createdDecision = await decisionService.createDecision({ title: "Select baseline", type: "scenario-selection", scenarioId: "scenario-1" });
assert.equal(createdDecision.ok, true);
assert.equal((await decisionService.transitionDecision("decision-1", "under-review", {})).ok, false);
assert.equal((await decisionService.transitionDecision("decision-1", "under-review", { rationale: "Manual rationale." })).ok, true);
assert.equal((await decisionService.recordRecommendationDecision({ decisionId: "recommendation-decision-1", recommendationId: "recommendation-1", disposition: "deferred", rationale: "Manual disposition." })).ok, true);
assert.ok(audits.some((entry) => entry.action === "RecommendationDecisionRecorded"));

console.log("Scenario and decision application tests passed.");
