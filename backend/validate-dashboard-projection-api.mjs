import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadDashboardProjection, loadDashboardProjectionCollection } from "./dashboard-projection-service.mjs";

const root = process.cwd();
const contract = await readFile(path.join(root, "backend", "dashboard-projection-api.md"), "utf8");
const runtime = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));
const projectionCollection = await loadDashboardProjectionCollection(root);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const token of ["dashboard-runtime-projection.v1", "/api/v1/dashboard/projections", "scorePolicyVersion", "formulaIds"]) {
  assert(contract.includes(token), `dashboard projection API contract missing ${token}`);
}

assert(runtime.generatedBy === "dashboard-runtime-generator.v1", "runtime dashboard artifact missing generator marker");
assert(projectionCollection.schemaVersion === "dashboard-runtime-projection.v1", "projection collection schemaVersion mismatch");
assert(projectionCollection.projections.length === runtime.snapshots.length, "projection collection count mismatch");
for (const snapshot of runtime.snapshots) {
  const projection = await loadDashboardProjection(snapshot.snapshotId, root);
  assert(projection, `${snapshot.snapshotId} projection not found`);
  assert(projection.score === snapshot.runtimeBinding.score, `${snapshot.snapshotId} projection score mismatch`);
  assert(snapshot.runtimeBinding?.sourceFixtureId, `${snapshot.snapshotId} missing sourceFixtureId`);
  assert(snapshot.runtimeBinding?.scorePolicyVersion, `${snapshot.snapshotId} missing scorePolicyVersion`);
  assert(Array.isArray(snapshot.runtimeBinding?.formulaIds), `${snapshot.snapshotId} formulaIds must be an array`);
}

console.log(`Dashboard projection API validation passed with ${runtime.snapshots.length} runtime projections.`);
