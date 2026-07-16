import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contract = await readFile(path.join(root, "backend", "dashboard-projection-api.md"), "utf8");
const runtime = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const token of ["dashboard-runtime-projection.v1", "/api/v1/dashboard/projections", "scorePolicyVersion", "formulaIds"]) {
  assert(contract.includes(token), `dashboard projection API contract missing ${token}`);
}

assert(runtime.generatedBy === "dashboard-runtime-generator.v1", "runtime dashboard artifact missing generator marker");
for (const snapshot of runtime.snapshots) {
  assert(snapshot.runtimeBinding?.sourceFixtureId, `${snapshot.snapshotId} missing sourceFixtureId`);
  assert(snapshot.runtimeBinding?.scorePolicyVersion, `${snapshot.snapshotId} missing scorePolicyVersion`);
  assert(Array.isArray(snapshot.runtimeBinding?.formulaIds), `${snapshot.snapshotId} formulaIds must be an array`);
}

console.log(`Dashboard projection API validation passed with ${runtime.snapshots.length} runtime projections.`);
