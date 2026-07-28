import assert from "node:assert/strict";
import { createInsuranceApplicationService } from "../src/application/insurance/insurance-application-service.js";

function memoryRepository() {
  const records = new Map();
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId); },
    async create(record) { records.set(record.policyId, record); },
    async update(record) { records.set(record.policyId, record); },
    async existsByOwnerAndName(ownerId, name, excludeId = "") { return [...records.values()].some((record) => record.ownerId === ownerId && record.policyId !== excludeId && record.policyName === name); },
  };
}

const auditEntries = [];
const service = createInsuranceApplicationService({
  repository: memoryRepository(),
  ownerProvider: { async getCurrentOwner() { return { ownerId: "owner-1" }; } },
  auditRepository: { async save(entry) { auditEntries.push(entry); } },
  now: () => new Date("2026-07-28T00:00:00.000Z"),
  createId: () => "insurance-policy-app-1",
});

const created = await service.createPolicy({
  householdId: "household-1",
  providerName: "Atlas Life",
  policyName: "Family Protection",
  coverageType: "life",
  coverageAmount: 3000000,
  premiumAmount: 2500,
  status: "active",
});

assert.equal(created.ok, true);
assert.equal(created.record.policyId, "insurance-policy-app-1");
assert.equal(created.event.action, "insurance-policy-created");
assert.equal((await service.listPolicies()).length, 1);

const duplicate = await service.createPolicy({
  householdId: "household-1",
  providerName: "Atlas Life",
  policyName: "Family Protection",
  coverageType: "life",
  coverageAmount: 3000000,
  premiumAmount: 2500,
});
assert.equal(duplicate.ok, false);
assert.equal(duplicate.errors[0].code, "ATLAS_INSURANCE_POLICY_ALREADY_EXISTS");

const updated = await service.updatePolicy("insurance-policy-app-1", { premiumAmount: 2750 });
assert.equal(updated.ok, true);
assert.equal(updated.record.premiumAmount, 2750);
assert.equal(updated.event.action, "insurance-policy-updated");

const cancelled = await service.cancelPolicy("insurance-policy-app-1");
assert.equal(cancelled.ok, true);
assert.equal(cancelled.record.status, "cancelled");
assert.equal(cancelled.event.action, "insurance-policy-cancelled");
assert.equal(auditEntries.length, 3);

console.log("Insurance policy application tests passed.");
