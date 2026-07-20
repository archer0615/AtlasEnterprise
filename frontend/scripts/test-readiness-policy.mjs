import assert from "node:assert/strict";
import { accessibilityChecklist, createMasterExecutionStatus, createReleaseAcceptanceMatrix, createReleaseHardeningChecklist, evaluatePerformanceBudget, performanceBudgets, responsiveViewports } from "../src/readiness-policy.js";

assert.ok(accessibilityChecklist.includes("semantic-html"));
assert.ok(accessibilityChecklist.includes("keyboard-operation"));
assert.equal(responsiveViewports[0].width, 320);
assert.equal(performanceBudgets.searchMs, 100);

const budgetResults = evaluatePerformanceBudget({ startupMs: 1200, searchMs: 120 });
assert.equal(budgetResults.find((item) => item.key === "startupMs").status, "passed");
assert.equal(budgetResults.find((item) => item.key === "searchMs").status, "failed");

const matrix = createReleaseAcceptanceMatrix({ Functional: { status: "passed", evidence: ["npm run validate:release"] } });
assert.equal(matrix.find((item) => item.category === "Functional").priority, "P0");
assert.equal(matrix.find((item) => item.category === "Accessibility").priority, "P1");

const checklist = createReleaseHardeningChecklist();
assert.ok(checklist.includes("backup-security-validation"));
assert.ok(checklist.includes("archive-policy-lock"));
assert.ok(checklist.includes("GitHub Pages production path") === false);

const master = createMasterExecutionStatus(["01", "02", "MASTER"]);
assert.equal(master.status, "in-progress");
assert.ok(master.remaining.includes("16"));

console.log("Readiness policy tests passed.");
