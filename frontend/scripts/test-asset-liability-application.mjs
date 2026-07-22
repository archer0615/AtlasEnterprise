import { strict as assert } from "node:assert";
import { createAssetApplicationService } from "../src/application/assets/asset-application-service.js";
import { createLiabilityApplicationService } from "../src/application/liabilities/liability-application-service.js";

function memoryRepository() {
  const records = new Map();
  return {
    async getById(id) { return records.get(id) || null; },
    async listByOwner(ownerId) { return [...records.values()].filter((record) => record.ownerId === ownerId); },
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
const ids = { createId: () => `id-${id += 1}` };

const assetService = createAssetApplicationService({ repository: memoryRepository(), ownerProvider, auditRepository, ...clock, ...ids });
const liabilityService = createLiabilityApplicationService({ repository: memoryRepository(), ownerProvider, auditRepository, ...clock, ...ids });

const assetResult = await assetService.createAsset({ name: "Cash", assetType: "cash", currency: "TWD", currentValue: 1000, valuationDate: "2026-07-22" });
assert.equal(assetResult.ok, true);
assert.equal((await assetService.listAssets()).length, 1);
assert.equal((await assetService.createAsset({ name: "Cash", assetType: "cash", currency: "TWD", currentValue: 1000, valuationDate: "2026-07-22" })).ok, false);
assert.equal((await assetService.archiveAsset(assetResult.record.id)).ok, true);
assert.equal((await assetService.restoreAsset(assetResult.record.id)).ok, true);

const liabilityResult = await liabilityService.createLiability({ name: "Loan", liabilityType: "loan", currency: "TWD", outstandingBalance: 300, asOfDate: "2026-07-22" });
assert.equal(liabilityResult.ok, true);
assert.equal((await liabilityService.listLiabilities()).length, 1);
assert.equal(auditEntries.length, 4);

console.log("Asset and liability application tests passed.");
