import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { dryRunCsvImport } from "../src/domain/import/csv-import-dry-run.js";

const root = process.cwd();
async function fixture(name) {
  return readFile(path.join(root, "frontend", "fixtures", name), "utf8");
}

const validFixtures = [
  "csv-import-assets-valid.csv",
  "csv-import-liabilities-valid.csv",
  "csv-import-mixed-valid.csv",
  "csv-import-positions-valid.csv",
  "csv-import-insurance-valid.csv",
];
for (const name of validFixtures) {
  const result = dryRunCsvImport(await fixture(name), { ownerId: "owner-1" });
  assert.equal(result.accepted, true, `${name} should be accepted`);
  assert.equal(result.writeCount, 0, `${name} must not write`);
}

const formula = dryRunCsvImport(await fixture("csv-import-formula-injection.csv"), { ownerId: "owner-1" });
assert.equal(formula.accepted, false);
assert(formula.errors.some((error) => error.code === "FORMULA_INJECTION"));

const duplicate = dryRunCsvImport(await fixture("csv-import-duplicate-ids.csv"), { ownerId: "owner-1" });
assert.equal(duplicate.accepted, false);
assert(duplicate.errors.some((error) => error.code === "DUPLICATE_ID"));

const invalidPositionQuantity = dryRunCsvImport([
  "entityType,id,ownerId,householdId,portfolioId,assetId,quantity,marketValue,currency,status,updatedAt",
  "position,position-zero,owner-1,household-1,portfolio-1,asset-1,0,100,TWD,active,2026-07-27T00:00:00.000Z",
].join("\n"), { ownerId: "owner-1" });
assert.equal(invalidPositionQuantity.accepted, false);
assert(invalidPositionQuantity.errors.some((error) => error.code === "ATLAS_POSITION_QUANTITY_INVALID"));

const unsupportedPositionColumn = dryRunCsvImport([
  "entityType,id,ownerId,householdId,portfolioId,assetId,quantity,marketValue,currency,status,updatedAt,brokerAccount",
  "position,position-extra,owner-1,household-1,portfolio-1,asset-1,1,100,TWD,active,2026-07-27T00:00:00.000Z,external-1",
].join("\n"), { ownerId: "owner-1" });
assert.equal(unsupportedPositionColumn.accepted, false);
assert(unsupportedPositionColumn.errors.some((error) => error.code === "UNSUPPORTED_COLUMN" && error.field === "brokerAccount"));

console.log("CSV import fixture tests passed.");
