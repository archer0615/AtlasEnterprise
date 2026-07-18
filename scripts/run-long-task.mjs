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

for (const step of steps) {
  execSync(`npm run ${step}`, { stdio: "inherit" });
}
