import assert from "node:assert/strict";
import { commitCsvImport } from "../src/application/import/csv-import-application-service.js";

function createAtomicRepository() {
  const records = [];
  return {
    records,
    async createManyAtomic(incoming) {
      if (incoming.some((record) => records.some((existing) => existing.id === record.id))) {
        throw new Error("duplicate id");
      }
      records.push(...incoming);
      return incoming;
    },
  };
}

const validCsv = [
  "entityType,id,ownerId,name,assetType,currency,currentValue,valuationDate,status",
  "asset,asset-write-1,owner-1,CSV Write Asset,cash,TWD,1000,2026-07-27,active",
].join("\n");

const assetRepository = createAtomicRepository();
const auditEntries = [];
const success = await commitCsvImport(validCsv, {
  ownerId: "owner-1",
  repositories: { asset: assetRepository },
  auditRepository: { async save(entry) { auditEntries.push(entry); } },
  clock: { now: () => new Date("2026-07-27T00:00:00.000Z") },
});

assert.equal(success.accepted, true);
assert.equal(success.schema, "atlas-enterprise.csv-import-commit.v1");
assert.equal(success.writeCount, 1);
assert.equal(assetRepository.records.length, 1);
assert.equal(auditEntries.length, 1);
assert.equal(auditEntries[0].action, "csv-import-commit");

const unsafeCsv = [
  "entityType,id,ownerId,name,assetType,currency,currentValue,valuationDate,status",
  "asset,asset-write-2,owner-1,=HYPERLINK(\"http://bad\"),cash,TWD,1000,2026-07-27,active",
].join("\n");
const blocked = await commitCsvImport(unsafeCsv, {
  ownerId: "owner-1",
  repositories: { asset: assetRepository },
});

assert.equal(blocked.accepted, false);
assert.equal(blocked.writeCount, 0);
assert(blocked.errors.some((item) => item.code === "FORMULA_INJECTION"));
assert.equal(assetRepository.records.length, 1);

const missingAtomic = await commitCsvImport(validCsv, {
  ownerId: "owner-1",
  repositories: { asset: { async create() {} } },
});

assert.equal(missingAtomic.accepted, false);
assert.equal(missingAtomic.writeCount, 0);
assert(missingAtomic.errors.some((item) => item.code === "MISSING_ATOMIC_REPOSITORY"));

const positionCsv = [
  "entityType,id,ownerId,name,householdId,portfolioId,assetId,quantity,unitCost,marketValue,currency,status",
  "position,position-write-1,owner-1,CSV Position,household-1,portfolio-1,asset-1,4,25,100,TWD,active",
].join("\n");
const positionRepository = createAtomicRepository();
const positionCommit = await commitCsvImport(positionCsv, {
  ownerId: "owner-1",
  repositories: { position: positionRepository },
  clock: { now: () => new Date("2026-07-27T00:00:00.000Z") },
});

assert.equal(positionCommit.accepted, true);
assert.equal(positionCommit.writeCount, 1);
assert.equal(positionRepository.records[0].positionId, "position-write-1");

console.log("CSV import write path tests passed.");
