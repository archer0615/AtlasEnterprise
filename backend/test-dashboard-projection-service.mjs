import { loadDashboardProjection, loadDashboardProjectionCollection } from "./dashboard-projection-service.mjs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const collection = await loadDashboardProjectionCollection();
assert(collection.schemaVersion === "dashboard-runtime-projection.v1", "projection collection schemaVersion mismatch");
assert(collection.defaultSnapshotId, "projection collection missing defaultSnapshotId");
assert(collection.projections.length === 5, "projection collection must include five projections");

const defaultProjection = await loadDashboardProjection(collection.defaultSnapshotId);
assert(defaultProjection, "default projection must be loadable");
assert(defaultProjection.schemaVersion === "dashboard-runtime-projection.v1", "default projection schemaVersion mismatch");
assert(Number.isFinite(defaultProjection.score), "default projection score must be numeric");
assert(defaultProjection.formulaIds.length > 0, "default projection formulaIds must not be empty");

const missingProjection = await loadDashboardProjection("missing-dashboard-snapshot");
assert(missingProjection === null, "missing projection must return null");

console.log(`Dashboard projection service tests passed with ${collection.projections.length} projections.`);
