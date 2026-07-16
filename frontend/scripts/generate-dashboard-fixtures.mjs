import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dashboardMetricFormulaIds } from "../../simulator/scripts/formula-contract.mjs";

const root = process.cwd();
const fixturePaths = [
  path.join(root, "frontend", "fixtures", "dashboard-snapshot.json"),
  path.join(root, "frontend", "fixtures", "dashboard-snapshots.json"),
];

export function attachMetricFormulaIds(snapshot) {
  const metricFormulaIds = dashboardMetricFormulaIds[snapshot.snapshotId];
  if (!metricFormulaIds) return snapshot;
  return {
    ...snapshot,
    schemaVersion: "dashboard-snapshot.v2",
    metrics: snapshot.metrics.map((metric, index) => ({
      ...metric,
      formulaIds: metricFormulaIds[index],
    })),
  };
}

export function generateDashboardFixturePayload(payload) {
  return Array.isArray(payload.snapshots)
    ? {
        ...payload,
        generatedBy: "dashboard-fixture-generator.v1",
        snapshots: payload.snapshots.map(attachMetricFormulaIds),
      }
    : attachMetricFormulaIds(payload);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const fixturePath of fixturePaths) {
    const payload = JSON.parse(await readFile(fixturePath, "utf8"));
    const nextPayload = generateDashboardFixturePayload(payload);
    await writeFile(fixturePath, `${JSON.stringify(nextPayload, null, 2)}\n`, "utf8");
  }

  console.log("Generated dashboard fixture formula bindings.");
}
