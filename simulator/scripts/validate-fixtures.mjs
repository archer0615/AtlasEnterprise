import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const fixtureRoot = path.join(root, "simulator", "fixtures");
const frontendDashboardFixture = path.join(root, "frontend", "fixtures", "dashboard-snapshot.json");
const frontendDashboardFixtures = path.join(root, "frontend", "fixtures", "dashboard-snapshots.json");
const simulatorSchema = JSON.parse(await readFile(path.join(fixtureRoot, "scenario-fixture.schema.json"), "utf8"));
const dashboardSchema = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-snapshot.schema.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertReferenceExists(reference, fixtureId) {
  const target = path.join(root, reference);
  const info = await stat(target).catch(() => null);
  assert(info?.isFile(), `${fixtureId} references missing file: ${reference}`);
}

function assertSchemaMinimum(schema, value, label) {
  for (const field of schema.required || []) {
    assert(Object.hasOwn(value, field), `${label} missing schema-required field: ${field}`);
  }
}

function assertTolerances(fixture, file) {
  assert(fixture.tolerances && typeof fixture.tolerances === "object", `${file} missing tolerances`);
  assert(Number.isFinite(fixture.tolerances.currency), `${file} missing numeric currency tolerance`);
  assert(Number.isFinite(fixture.tolerances.ratio), `${file} missing numeric ratio tolerance`);
  assert(fixture.tolerances.currency >= 0, `${file} currency tolerance must be non-negative`);
  assert(fixture.tolerances.ratio >= 0, `${file} ratio tolerance must be non-negative`);
}

const fixtureFiles = (await readdir(fixtureRoot)).filter((file) => file.endsWith(".json") && !file.endsWith(".schema.json"));
assert(fixtureFiles.length > 0, "simulator fixtures must include at least one JSON file");
const fixtureIds = new Set();

for (const file of fixtureFiles) {
  const fullPath = path.join(fixtureRoot, file);
  const fixture = JSON.parse(await readFile(fullPath, "utf8"));
  assertSchemaMinimum(simulatorSchema, fixture, file);
  assert(!fixtureIds.has(fixture.fixtureId), `duplicate fixtureId: ${fixture.fixtureId}`);
  fixtureIds.add(fixture.fixtureId);
  assert(fixture.fixtureId, `${file} missing fixtureId`);
  assert(fixture.name, `${file} missing name`);
  assert(fixture.asOfDate, `${file} missing asOfDate`);
  assert(fixture.assumptionVersion, `${file} missing assumptionVersion`);
  assert(fixture.formulaVersion, `${file} missing formulaVersion`);
  assert(fixture.question, `${file} missing question`);
  assert(fixture.inputs && typeof fixture.inputs === "object", `${file} missing inputs`);
  assert(fixture.expected && typeof fixture.expected === "object", `${file} missing expected`);
  assert(fixture.expected.recommendation?.status, `${file} missing expected recommendation status`);
  assert(Number.isFinite(fixture.expected.recommendation?.score), `${file} missing expected recommendation score`);
  assert(fixture.expected.recommendation?.explanation, `${file} missing expected recommendation explanation`);
  assert(Array.isArray(fixture.references), `${file} missing references`);
  assertTolerances(fixture, file);

  for (const reference of fixture.references) {
    await assertReferenceExists(reference, fixture.fixtureId);
  }
}

const dashboard = JSON.parse(await readFile(frontendDashboardFixture, "utf8"));
assertSchemaMinimum(dashboardSchema, dashboard, "dashboard fixture");
assert(dashboard.snapshotId, "dashboard fixture missing snapshotId");
assert(dashboard.asOfDate, "dashboard fixture missing asOfDate");
assert(dashboard.sourceFixture, "dashboard fixture missing sourceFixture");
await assertReferenceExists(dashboard.sourceFixture, dashboard.snapshotId);
assert(Array.isArray(dashboard.metrics) && dashboard.metrics.length > 0, "dashboard fixture missing metrics");
assert(Array.isArray(dashboard.scenarios) && dashboard.scenarios.length > 0, "dashboard fixture missing scenarios");
assert(Array.isArray(dashboard.actions) && dashboard.actions.length > 0, "dashboard fixture missing actions");

const dashboards = JSON.parse(await readFile(frontendDashboardFixtures, "utf8"));
assert(dashboards.defaultSnapshotId, "dashboard fixture collection missing defaultSnapshotId");
assert(Array.isArray(dashboards.snapshots) && dashboards.snapshots.length > 0, "dashboard fixture collection missing snapshots");
const snapshotIds = new Set();
assert(dashboards.snapshots.some((snapshot) => snapshot.snapshotId === dashboards.defaultSnapshotId), "defaultSnapshotId must match a dashboard snapshot");
for (const snapshot of dashboards.snapshots) {
  assert(snapshot.snapshotId, "dashboard snapshot missing snapshotId");
  assert(!snapshotIds.has(snapshot.snapshotId), `duplicate dashboard snapshotId: ${snapshot.snapshotId}`);
  snapshotIds.add(snapshot.snapshotId);
  assert(snapshot.label, `${snapshot.snapshotId} missing label`);
  assert(snapshot.asOfDate, `${snapshot.snapshotId} missing asOfDate`);
  assert(snapshot.sourceFixture, `${snapshot.snapshotId} missing sourceFixture`);
  await assertReferenceExists(snapshot.sourceFixture, snapshot.snapshotId);
  assert(Array.isArray(snapshot.metrics) && snapshot.metrics.length === 4, `${snapshot.snapshotId} must have four metrics`);
  assert(Array.isArray(snapshot.scenarios) && snapshot.scenarios.length > 0, `${snapshot.snapshotId} missing scenarios`);
  assert(Array.isArray(snapshot.actions) && snapshot.actions.length > 0, `${snapshot.snapshotId} missing actions`);
}

console.log(`Fixture validation passed with ${fixtureFiles.length} simulator fixtures.`);
