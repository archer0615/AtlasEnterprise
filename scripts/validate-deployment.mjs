import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const cachePolicy = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "generated-fixture-cache-policy.json"), "utf8"));
const dashboardRuntime = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-runtime-snapshots.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(packageJson.scripts.validate.includes("validate:deployment"), "validate script must include deployment validation");
assert(cachePolicy.policyVersion === "generated-fixture-cache-policy.v1", "deployment cache policy version mismatch");
assert(dashboardRuntime.generatedBy === "dashboard-runtime-generator.v1", "deployment dashboard runtime artifact missing generator marker");
assert(dashboardRuntime.snapshots.every((snapshot) => snapshot.runtimeBinding?.scorePolicyVersion), "deployment dashboard runtime snapshots missing score policy version");

console.log("Deployment validation passed.");
