import { readFile } from "node:fs/promises";
import path from "node:path";
import { scorePolicy } from "./score-policy.mjs";

const root = process.cwd();
const persistedPolicy = JSON.parse(await readFile(path.join(root, "simulator", "config", "score-policy.json"), "utf8"));
const migration = JSON.parse(await readFile(path.join(root, "simulator", "config", "score-policy-migration.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(JSON.stringify(persistedPolicy) === JSON.stringify(scorePolicy), "persisted score policy must match runtime score policy");
assert(scorePolicy.policyVersion, "score policy missing policyVersion");
assert(scorePolicy.formulaId === "FORM-DECISION-SCORE", "score policy formulaId mismatch");
assert(Number.isFinite(scorePolicy.defaultScore), "score policy defaultScore must be numeric");
assert(migration.status === "applied", "score policy migration must be applied");
assert(migration.policyVersion === scorePolicy.policyVersion, "score policy migration version mismatch");

for (const [status, score] of Object.entries(scorePolicy.statusScores)) {
  assert(status.length > 0, "score policy status key must not be empty");
  assert(Number.isFinite(score), `${status} score must be numeric`);
}

for (const rule of scorePolicy.metricRules) {
  assert(rule.metric, "score policy metric rule missing metric");
  assert([">", ">=", "<="].includes(rule.operator), `${rule.metric} uses unsupported operator`);
  assert(Number.isFinite(rule.threshold), `${rule.metric} threshold must be numeric`);
  assert(Number.isFinite(rule.score), `${rule.metric} score must be numeric`);
}

console.log(`Score policy validation passed for ${scorePolicy.policyVersion}.`);
