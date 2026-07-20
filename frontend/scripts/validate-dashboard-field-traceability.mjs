import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const runtimeSnapshots = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));
const traceability = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-field-traceability.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(traceability.schema === "dashboard-field-traceability.v1", "dashboard field traceability schema is unsupported");
assert(traceability.formulaSources && typeof traceability.formulaSources === "object", "formulaSources mapping is missing");

let checkedMetrics = 0;
for (const snapshot of runtimeSnapshots.snapshots) {
  assert(snapshot.sourceFixture, `${snapshot.snapshotId} missing sourceFixture`);
  for (const metric of snapshot.metrics || []) {
    checkedMetrics += 1;
    assert(metric.label, `${snapshot.snapshotId} metric missing label`);
    assert(Array.isArray(metric.formulaIds) && metric.formulaIds.length > 0, `${snapshot.snapshotId}/${metric.label} missing formulaIds`);
    for (const formulaId of metric.formulaIds) {
      const sources = traceability.formulaSources[formulaId];
      assert(Array.isArray(sources) && sources.length > 0, `${formulaId} missing canonical knowledge sources`);
      for (const source of sources) {
        assert(source.startsWith("knowledge/"), `${formulaId} source must be canonical knowledge path: ${source}`);
      }
    }
  }
}

assert(checkedMetrics >= 1, "no dashboard metrics were checked");

console.log(`Dashboard field traceability validation passed with ${checkedMetrics} metrics.`);
