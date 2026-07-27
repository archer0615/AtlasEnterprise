import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const draft = await readFile(path.join(root, "docs", "roadmap", "v1.2-backup-schema-v2-draft.md"), "utf8");
const compatibilityTest = await readFile(path.join(root, "frontend", "scripts", "test-backup-schema-compatibility.mjs"), "utf8");

const v2Fixture = {
  schema: "atlas-pwa-runtime-backup.v2",
  databaseVersion: 7,
  schemaCapabilities: ["positions"],
  scenarios: [],
  positions: [
    {
      positionId: "position-v2-1",
      ownerId: "owner-1",
      householdId: "household-1",
      portfolioId: "portfolio-1",
      assetId: "asset-1",
      quantity: 10,
      marketValue: 1000,
    },
  ],
};

assert.equal(v2Fixture.schema, "atlas-pwa-runtime-backup.v2");
assert(Array.isArray(v2Fixture.positions));
assert(v2Fixture.positions.every((position) => position.positionId && position.ownerId && position.householdId && position.portfolioId));
assert(draft.includes("atlas-pwa-runtime-backup.v2"), "Backup schema v2 draft must name plaintext v2 schema");
assert(draft.includes("positions"), "Backup schema v2 draft must describe positions capability");
assert(draft.includes("v2 | v1 | Rejected before mutation"), "Backup schema v2 draft must preserve v1 forward rejection");
assert(compatibilityTest.includes("atlas-pwa-runtime-backup.v2"), "Backup compatibility test must include future v2 rejection fixture");

console.log("Backup schema v2 fixture tests passed.");
