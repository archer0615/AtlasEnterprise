import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadDashboardProjectionCollection(root = process.cwd()) {
  const payload = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));
  return {
    schemaVersion: "dashboard-runtime-projection.v1",
    generatedBy: payload.generatedBy,
    generatedAt: payload.generatedAt,
    defaultSnapshotId: payload.defaultSnapshotId,
    projections: payload.snapshots.map(toProjection),
  };
}

export async function loadDashboardProjection(snapshotId, root = process.cwd()) {
  const collection = await loadDashboardProjectionCollection(root);
  return collection.projections.find((projection) => projection.snapshotId === snapshotId) || null;
}

function toProjection(snapshot) {
  return {
    schemaVersion: "dashboard-runtime-projection.v1",
    snapshotId: snapshot.snapshotId,
    sourceFixtureId: snapshot.runtimeBinding.sourceFixtureId,
    score: snapshot.runtimeBinding.score,
    status: snapshot.runtimeBinding.status,
    formulaIds: snapshot.runtimeBinding.formulaIds,
    scorePolicyVersion: snapshot.runtimeBinding.scorePolicyVersion,
    generatedAt: snapshot.runtimeBinding.simulatorGeneratedAt,
  };
}
