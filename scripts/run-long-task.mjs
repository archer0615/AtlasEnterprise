import { execSync } from "node:child_process";

const steps = [
  "validate",
  "report:release",
  "report:validation-history",
  "validate:frontend",
  "test:local-repositories",
  "validate:portfolio-reporting",
  "validate:browser-workflow",
  "validate:visual-regression",
  "validate:deployment",
  "validate:offline",
  "validate:pwa",
  "validate:preview-smoke",
  "validate:simulator",
  "build:knowledge",
  "validate:cache-policy",
  "validate:cache-invalidation",
  "validate:fixtures",
  "validate:dashboard-drift",
  "validate:runtime-fixture-drift",
  "validate:release-governance",
];

const startedAt = Date.now();

for (const [index, step] of steps.entries()) {
  const stepStartedAt = Date.now();
  try {
    console.log(`[long-task] ${index + 1}/${steps.length} ${step}`);
    execSync(`npm run ${step}`, { stdio: "inherit" });
    console.log(`[long-task] ${step} passed in ${Date.now() - stepStartedAt}ms`);
  } catch (error) {
    console.error(`[long-task] ${step} failed at step ${index + 1}/${steps.length}`);
    console.error(`[long-task] elapsed ${Date.now() - startedAt}ms`);
    process.exitCode = error.status || 1;
    throw error;
  }
}

console.log(`[long-task] completed ${steps.length} steps in ${Date.now() - startedAt}ms`);
