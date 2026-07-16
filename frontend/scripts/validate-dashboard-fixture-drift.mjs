import { readFile } from "node:fs/promises";
import path from "node:path";
import { generateDashboardFixturePayload } from "./generate-dashboard-fixtures.mjs";

const root = process.cwd();
const fixturePaths = [
  path.join(root, "frontend", "fixtures", "dashboard-snapshot.json"),
  path.join(root, "frontend", "fixtures", "dashboard-snapshots.json"),
];

for (const fixturePath of fixturePaths) {
  const current = await readFile(fixturePath, "utf8");
  const payload = JSON.parse(current);
  const generated = `${JSON.stringify(generateDashboardFixturePayload(payload), null, 2)}\n`;
  if (current !== generated) {
    throw new Error(`${path.relative(root, fixturePath)} is not in sync with dashboard fixture generator`);
  }
}

console.log("Dashboard fixture drift validation passed.");
