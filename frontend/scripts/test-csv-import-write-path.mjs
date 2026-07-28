import assert from "node:assert/strict";
import { commitCsvImport } from "../src/application/import/csv-import-application-service.js";

function createAtomicRepository() {
  const records = [];
  return {
    records,
    async createManyAtomic(incoming) {
      if (incoming.some((record) => records.some((existing) => recordKey(existing) === recordKey(record)))) {
        throw new Error("duplicate id");
      }
      records.push(...incoming);
      return incoming;
    },
  };
}

function recordKey(record) {
  return record.id || record.positionId || record.policyId;
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

const insuranceCsv = [
  "entityType,id,ownerId,name,householdId,providerName,coverageType,coverageAmount,premiumAmount,premiumFrequency,currency,status,beneficiarySummary,effectiveDate",
  "insurance,insurance-write-1,owner-1,CSV Insurance,household-1,Atlas Life,life,3000000,2500,monthly,TWD,active,Family,2026-07-28",
].join("\n");
const insuranceRepository = createAtomicRepository();
const insuranceCommit = await commitCsvImport(insuranceCsv, {
  ownerId: "owner-1",
  repositories: { insurance: insuranceRepository },
  clock: { now: () => new Date("2026-07-28T00:00:00.000Z") },
});

assert.equal(insuranceCommit.accepted, true);
assert.equal(insuranceCommit.writeCount, 1);
assert.equal(insuranceRepository.records[0].policyId, "insurance-write-1");

const multiEntityCsv = [
  "entityType,id,ownerId,name,liabilityType,incomeType,expenseType,goalType,currency,outstandingBalance,asOfDate,status,frequency,amount,startDate,occurrenceDate,targetAmount,currentAmount,targetDate,priority,householdId,providerName,coverageType,coverageAmount,premiumAmount,premiumFrequency,beneficiarySummary,effectiveDate",
  "liability,liability-write-1,owner-1,CSV Liability,loan,,,,TWD,5000,2026-07-27,active,,,,,,,,,,,,,,,,",
  "income,income-write-1,owner-1,CSV Income,,salary,,,TWD,,2026-07-27,active,monthly,120000,2026-07-27,2026-07-27,,,,,,,,,,,,",
  "expense,expense-write-1,owner-1,CSV Expense,,,food,,TWD,,2026-07-27,active,monthly,30000,2026-07-27,2026-07-27,,,,,,,,,,,,",
  "goal,goal-write-1,owner-1,CSV Goal,,,,emergency-fund,TWD,,2026-07-27,active,,,2026-07-27,,100000,1000,2027-07-27,high,,,,,,,,",
  "insurance,insurance-write-2,owner-1,CSV Insurance,,,,,TWD,,2026-07-28,active,,,,,,,,,household-1,Atlas Life,life,3000000,2500,monthly,Family,2026-07-28",
].join("\n");
const multiCommitInput = {};
const multiCommit = await commitCsvImport(multiEntityCsv, {
  ownerId: "owner-1",
  repositories: {
    liability: createAtomicRepository(),
    income: createAtomicRepository(),
    expense: createAtomicRepository(),
    goal: createAtomicRepository(),
    insurance: createAtomicRepository(),
  },
  unitOfWork: {
    async createManyAtomic(groupedRecords) {
      Object.assign(multiCommitInput, groupedRecords);
      return groupedRecords;
    },
  },
  clock: { now: () => new Date("2026-07-27T00:00:00.000Z") },
});

assert.equal(multiCommit.accepted, true);
assert.equal(multiCommit.writeCount, 5);
assert.deepEqual(Object.keys(multiCommitInput).sort(), ["expense", "goal", "income", "insurance", "liability"]);
assert(multiCommit.records.some((item) => item.entityType === "liability" && item.record.id === "liability-write-1"));
assert(multiCommit.records.some((item) => item.entityType === "income" && item.record.id === "income-write-1"));
assert(multiCommit.records.some((item) => item.entityType === "expense" && item.record.id === "expense-write-1"));
assert(multiCommit.records.some((item) => item.entityType === "goal" && item.record.id === "goal-write-1"));
assert(multiCommit.records.some((item) => item.entityType === "insurance" && item.record.policyId === "insurance-write-2"));

console.log("CSV import write path tests passed.");
