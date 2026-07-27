import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const runtime = await readFile(path.join(root, "frontend", "src", "indexeddb-runtime.js"), "utf8");
const positionScope = await readFile(path.join(root, "docs", "roadmap", "v1.2-position-persistence-test-scope.md"), "utf8");
const positionAdr = await readFile(path.join(root, "docs", "architecture", "ADR-v1.2-001-position-persistence.md"), "utf8");
const backupAdr = await readFile(path.join(root, "docs", "architecture", "ADR-v1.2-002-backup-schema-versioning.md"), "utf8");
const runtimeBoundary = await readFile(path.join(root, "frontend", "scripts", "validate-runtime-boundaries.mjs"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

const requiredScopeRows = [
  "Repository Contract",
  "Migration Chain",
  "Backup Export",
  "Restore Dry Run",
  "Owner Isolation",
  "Runtime Boundary",
  "Projection Compatibility",
];

for (const row of requiredScopeRows) {
  assert(positionScope.includes(row), `Position test scope is missing ${row}`);
}

assert(positionAdr.includes("Store name: `positions`"), "Position ADR does not name the positions store");
assert(positionAdr.includes("positionId"), "Position ADR does not require positionId");
assert(positionAdr.includes("ownerId"), "Position ADR does not require ownerId");
assert(positionAdr.includes("householdId"), "Position ADR does not require householdId");
assert(positionAdr.includes("portfolioId"), "Position ADR does not require portfolioId");
assert(positionAdr.includes("No migration may be added without backup and restore E2E coverage."), "Position ADR is missing migration backup gate");
assert(backupAdr.includes("Any backup payload change must introduce an explicit backup schema version"), "Backup ADR does not gate payload changes");

assert(runtime.includes("positions: \"positions\""), "Runtime does not expose positions store metadata after executable migration coverage");
assert(runtime.includes("indexedDbPositionRepository"), "Position repository is missing after repository contract coverage");
assert(runtime.includes("[stores.positions]"), "Position backup allowlist is missing after backup schema version gate");
assert(runtime.includes("positions: await getAll(stores.positions)"), "Position backup export is missing after backup compatibility coverage");
assert(runtime.includes("atlas-pwa-runtime-backup.v2"), "Backup schema v2 is missing after positions payload acceptance");

assert(runtimeBoundary.includes("Runtime Boundary Validation"), "Runtime boundary validation must remain executable");
assert(packageJson.scripts["test:position-persistence-gates"] === "node frontend/scripts/test-position-persistence-gates.mjs", "Position gate test script is not registered");
assert(packageJson.scripts["validate:runtime-boundaries"], "Runtime boundary validation script is not registered");
assert(packageJson.scripts["test:backup-restore-e2e"], "Backup restore E2E script is not registered");
assert(packageJson.scripts["validate:backup-security"], "Backup security validation script is not registered");
assert(packageJson.scripts["test:position-indexeddb-migration"], "Position IndexedDB migration script is not registered");
assert(packageJson.scripts["validate:feature"], "Feature validation script is not registered");

console.log("Position persistence gate tests passed.");
