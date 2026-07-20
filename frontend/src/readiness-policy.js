export const readinessPolicySchema = "atlas-enterprise.readiness-policy.v1";

export const accessibilityChecklist = [
  "semantic-html",
  "landmark",
  "heading-order",
  "label-error-association",
  "focus-visible",
  "keyboard-operation",
  "dialog-focus-trap",
  "contrast",
  "reduced-motion",
];

export const responsiveViewports = [
  { id: "mobile-320", width: 320, label: "320px mobile" },
  { id: "tablet", width: 768, label: "Tablet" },
  { id: "desktop", width: 1280, label: "Desktop" },
  { id: "large-desktop", width: 1440, label: "Large desktop" },
];

export const performanceBudgets = {
  startupMs: 1500,
  knowledgeLoadMs: 1000,
  searchMs: 100,
  indexedDbQueryMs: 250,
  projectionMs: 50,
  scenarioRunMs: 250,
  renderMs: 100,
  regressionThresholdRatio: 1.2,
};

export function evaluatePerformanceBudget(measurements = {}, budgets = performanceBudgets) {
  return Object.entries(budgets)
    .filter(([key]) => key !== "regressionThresholdRatio")
    .map(([key, budget]) => {
      const actual = Number(measurements[key] ?? 0);
      return { key, budget, actual, status: actual <= budget ? "passed" : "failed" };
    });
}

export function createReleaseAcceptanceMatrix(overrides = {}) {
  const categories = [
    "Functional",
    "Data Integrity",
    "Offline",
    "Upgrade",
    "Backup",
    "Accessibility",
    "Performance",
    "Security",
  ];
  return categories.map((category) => ({
    category,
    priority: overrides[category]?.priority || (["Functional", "Data Integrity", "Backup", "Security"].includes(category) ? "P0" : "P1"),
    status: overrides[category]?.status || "pending",
    evidence: overrides[category]?.evidence || [],
  }));
}

export function createReleaseHardeningChecklist() {
  return [
    "feature-matrix-p0-p1-closure",
    "knowledge-validation",
    "feature-validation",
    "simulator-validation",
    "projection-validation",
    "repository-validation",
    "browser-validation",
    "backup-security-validation",
    "visual-validation",
    "pwa-offline-validation",
    "deployment-validation",
    "release-validation",
    "dead-code-review",
    "unused-generated-artifact-review",
    "debug-log-review",
    "broken-link-review",
    "archive-policy-lock",
    "release-notes",
    "known-limitations",
    "upgrade-notes",
    "recovery-guide",
    "backup-guide",
  ];
}

export function createMasterExecutionStatus(completedPrompts = []) {
  const expected = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "MASTER"];
  const completed = new Set(completedPrompts);
  return {
    schema: "atlas-enterprise.master-execution-status.v1",
    expected,
    completed: expected.filter((item) => completed.has(item)),
    remaining: expected.filter((item) => !completed.has(item)),
    status: expected.every((item) => completed.has(item)) ? "complete" : "in-progress",
  };
}
