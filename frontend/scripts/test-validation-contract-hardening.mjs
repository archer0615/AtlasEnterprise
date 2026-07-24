import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { bootstrapApplication } from "../src/app/bootstrap.js";
import { parseRequiredNumber } from "../src/shared/input-validation.js";
import {
  createValidationProfileInventory,
  createValidationProfileRegistry,
  validateIdentifier,
  validatePagination,
  validateRuntimeConfiguration,
  validateSearchText,
  validateSort,
} from "../src/validation-contract.js";

const inventory = createValidationProfileInventory();
assert.equal(inventory.length >= 7, true);
assert.equal(new Set(inventory.map((item) => item.profile)).size, inventory.length);
assert.equal(inventory.every((item) => item.owner && item.ruleSource && item.consumers.length), true);

const registry = createValidationProfileRegistry();
assert.equal(registry.register({ profile: "application.command", owner: "Application", input: "Command DTO", output: "Result", ruleSource: "Application service", consumers: ["test"] }).ok, true);
assert.equal(registry.register({ profile: "application.query", owner: "Application", input: "Query DTO", output: "Result", ruleSource: "Query contract", consumers: ["test"], dependencies: ["application.command"] }).ok, true);
assert.equal(registry.validateDependencies().ok, true);
assert.equal(registry.register({ profile: "application.command", owner: "Application", input: "Command DTO", output: "Result", ruleSource: "Application service", consumers: ["duplicate"] }).ok, false);

const circular = createValidationProfileRegistry();
circular.register({ profile: "a", owner: "Runtime", input: "a", output: "a", ruleSource: "test", consumers: ["test"], dependencies: ["b"] });
circular.register({ profile: "b", owner: "Runtime", input: "b", output: "b", ruleSource: "test", consumers: ["test"], dependencies: ["a"] });
assert.equal(circular.validateDependencies().ok, false);

assert.equal(validateIdentifier("asset-123", { prefix: "asset", entityType: "Asset" }).ok, true);
assert.equal(validateIdentifier("__proto__").ok, false);
assert.equal(validateIdentifier("goal-123", { prefix: "asset", entityType: "Asset" }).ok, false);

assert.equal(validateSearchText("退休 準備 2026").ok, true);
assert.equal(validateSearchText("x".repeat(121)).ok, false);
assert.equal(validateSearchText("abc\u0000").ok, false);
assert.equal(validateSearchText("[a-z]+", { regex: true }).ok, false);

assert.deepEqual(validateSort({ field: "updatedAt", direction: "DESC" }, ["updatedAt"]).value, { field: "updatedAt", direction: "desc" });
assert.equal(validateSort({ field: "constructor", direction: "asc" }, ["updatedAt"]).ok, false);
assert.equal(validateSort({ field: "updatedAt", direction: "sideways" }, ["updatedAt"]).ok, false);

assert.deepEqual(validatePagination({ page: "2", pageSize: "50", maxPageSize: 100 }).value, { page: 2, pageSize: 50, maxPageSize: 100 });
assert.equal(validatePagination({ page: "-1", pageSize: 10 }).ok, false);
assert.equal(validatePagination({ page: "1abc", pageSize: 10 }).ok, false);
assert.equal(validatePagination({ page: 1, pageSize: 0 }).ok, false);
assert.equal(validatePagination({ page: 1, pageSize: 101, maxPageSize: 100 }).ok, false);

assert.equal(validateRuntimeConfiguration({ environment: "production", version: "1.0.0", basePath: "./" }).ok, true);
assert.equal(validateRuntimeConfiguration({ environment: "unknown" }).ok, false);
assert.equal(validateRuntimeConfiguration({ basePath: "javascript:alert(1)" }).ok, false);

assert.equal(parseRequiredNumber("0", "Amount"), 0);
assert.throws(() => parseRequiredNumber("", "Amount"), /Amount must be a number/);
assert.throws(() => parseRequiredNumber(" ", "Amount"), /Amount must be a number/);
assert.throws(() => parseRequiredNumber("Infinity", "Amount"), /Amount must be a number/);

const documentRef = { querySelector: () => null };
await assert.rejects(
  () => bootstrapApplication({ documentRef, loadRuntime: async () => ({}), runtimeOverrides: { environment: "invalid" } }),
  /Runtime environment is invalid/,
);

const startedAt = performance.now();
for (let index = 0; index < 1000; index += 1) {
  validatePagination({ page: index + 1, pageSize: 25 });
  validateSearchText(`查詢 ${index}`);
}
assert.equal(performance.now() - startedAt < 250, true);

console.log("Validation contract hardening tests passed.");
