import { strict as assert } from "node:assert";
import { createGoalApplicationService } from "../src/application/goals/goal-application-service.js";

function memoryRepository() {
  const records = new Map();
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId, query = {}) { return [...records.values()].filter((record) => record.ownerId === ownerId && (query.includeArchived || record.status !== "archived")); },
    async create(record) { records.set(record.id, record); },
    async update(record) { records.set(record.id, record); },
    async archive(id, record) { records.set(id, record); },
    async restore(id, record) { records.set(id, record); },
    async existsByOwnerAndName(ownerId, name, excludeId = "") { return [...records.values()].some((record) => record.ownerId === ownerId && record.id !== excludeId && record.name === name); },
    async countByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId).length; },
    async listByStatus(ownerId, status) { return [...records.values()].filter((record) => record.ownerId === ownerId && record.status === status); },
    async listByTargetDateRange(ownerId, period = {}) { return [...records.values()].filter((record) => record.ownerId === ownerId && record.targetDate >= period.start && record.targetDate <= period.end); },
    async listByParentGoal(ownerId, parentGoalId) { return [...records.values()].filter((record) => record.ownerId === ownerId && record.parentGoalId === parentGoalId); },
  };
}

const ownerProvider = { getCurrentOwner: async () => ({ ownerId: "owner-1" }) };
const auditEntries = [];
const auditRepository = { save: async (entry) => auditEntries.push(entry) };
const clock = { now: () => new Date("2026-07-22T00:00:00.000Z") };
let id = 0;
const ids = { createId: () => `goal-id-${id += 1}` };
const service = createGoalApplicationService({ repository: memoryRepository(), ownerProvider, auditRepository, ...clock, ...ids });

const create = await service.createGoal({ name: "Emergency Fund", goalType: "emergency-fund", targetAmount: 600000, currentAmount: 100000, currency: "TWD", targetDate: "2026-12-31" });
assert.equal(create.ok, true);
assert.equal((await service.listGoals()).length, 1);
assert.equal((await service.createGoal({ name: "Emergency Fund", goalType: "emergency-fund", targetAmount: 600000, currentAmount: 100000, currency: "TWD", targetDate: "2026-12-31" })).ok, false);
assert.equal((await service.activateGoal(create.record.id)).ok, true);
assert.equal((await service.deactivateGoal(create.record.id)).ok, true);
assert.equal((await service.activateGoal(create.record.id)).ok, true);
assert.equal((await service.completeGoal(create.record.id)).ok, true);
assert.equal((await service.activateGoal(create.record.id)).ok, false);
assert.equal((await service.archiveGoal(create.record.id)).ok, true);
assert.equal((await service.restoreGoal(create.record.id)).ok, true);
assert.equal(auditEntries.length, 7);

console.log("Goal and financial health application tests passed.");
