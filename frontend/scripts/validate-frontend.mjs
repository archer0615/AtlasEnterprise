import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = await readFile(path.join(frontendRoot, "index.html"), "utf8");
const main = await readFile(path.join(frontendRoot, "src", "main.js"), "utf8");
const dashboardModel = await readFile(path.join(frontendRoot, "src", "dashboard-model.js"), "utf8");
const styles = await readFile(path.join(frontendRoot, "src", "styles.css"), "utf8");
const dashboard = JSON.parse(await readFile(path.join(frontendRoot, "fixtures", "dashboard-snapshot.json"), "utf8"));
const dashboards = JSON.parse(await readFile(path.join(frontendRoot, "fixtures", "dashboard-snapshots.json"), "utf8"));

assert(html.includes('id="metricGrid"'), "dashboard metric grid is missing");
assert(html.includes('id="scenarioList"'), "dashboard scenario list is missing");
assert(html.includes('id="actionList"'), "dashboard action list is missing");
assert(html.includes('id="dashboardSwitcher"'), "dashboard switcher is missing");
assert(html.includes("搜尋文件、決策、情境"), "search placeholder must be readable Traditional Chinese");
assert(html.includes("選擇文件以檢視"), "empty document state must be readable Traditional Chinese");

assert(!main.includes("�"), "main.js contains replacement characters");
assert(main.includes('from "./dashboard-model.js"'), "dashboard model import is missing");
assert(dashboardModel.includes("legacySnapshotIdKeys"), "dashboard persistence migration keys are missing");
assert(main.includes("找不到符合條件的文件。"), "empty search result text is missing");
assert(main.includes("文件載入失敗。"), "document load failure text is missing");
assert(main.includes('fetch("/fixtures/dashboard-snapshots.json"'), "dashboard fixture collection fetch is missing");
assert(dashboardModel.includes("atlas.dashboard.snapshotId"), "dashboard local persistence key is missing");
new Function(dashboardModel.replaceAll("export const", "const").replaceAll("export function", "function"));

assert(styles.includes(".dashboard-prototype"), "dashboard prototype styles are missing");
assert(styles.includes(".dashboard-switcher"), "dashboard switcher styles are missing");
assert(styles.includes("@media (max-width: 860px)"), "responsive media query is missing");
assert(dashboard.metrics.length === 4, "dashboard fixture must expose four metrics");
assert(dashboard.label, "dashboard fixture must expose a label");
assert(dashboard.scenarios.length >= 3, "dashboard fixture must expose at least three scenarios");
assert(dashboard.actions.length >= 3, "dashboard fixture must expose at least three actions");
assert(dashboards.snapshots.length >= 3, "dashboard fixture collection must expose at least three snapshots");
for (const snapshot of dashboards.snapshots) {
  assert(snapshot.snapshotId, "dashboard snapshot missing snapshotId");
  assert(snapshot.label, `${snapshot.snapshotId} missing label`);
  assert(snapshot.sourceFixture, `${snapshot.snapshotId} missing sourceFixture`);
  assert(snapshot.metrics.length === 4, `${snapshot.snapshotId} must expose four metrics`);
}

console.log("Frontend validation passed.");
