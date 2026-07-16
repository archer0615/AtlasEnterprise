import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dashboardFixtures = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-snapshots.json"), "utf8"));
const simulatorResults = JSON.parse(await readFile(path.join(root, "simulator", "outputs", "scenario-results.json"), "utf8"));
const resultsByFixture = new Map(simulatorResults.results.map((result) => [result.fixtureId, result]));

const runtimeSnapshots = dashboardFixtures.snapshots.map((snapshot) => {
  const sourceFixtureId = path.basename(snapshot.sourceFixture, ".json");
  const sourceResult = resultsByFixture.get(sourceFixtureId);
  return {
    ...snapshot,
    runtimeBinding: {
      sourceFixtureId,
      simulatorGeneratedAt: simulatorResults.generatedAt,
      score: sourceResult?.score ?? null,
      status: sourceResult?.status ?? null,
      formulaIds: sourceResult?.formulaEvaluation?.formulaIds ?? [],
      scorePolicyVersion: sourceResult?.scoreEvaluation?.policyVersion ?? null,
    },
  };
});

const payload = {
  generatedBy: "dashboard-runtime-generator.v1",
  generatedAt: new Date().toISOString(),
  defaultSnapshotId: dashboardFixtures.defaultSnapshotId,
  snapshots: runtimeSnapshots,
};

await writeFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Generated dashboard runtime bindings for ${runtimeSnapshots.length} snapshots.`);
