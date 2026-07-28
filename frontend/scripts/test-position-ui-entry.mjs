import assert from "node:assert/strict";
import { createPortfolioController } from "../src/features/portfolio/portfolio-controller.js";

const elements = new Map([
  ["#portfolioReportPanel", { dataset: {}, textContent: "" }],
  ["#positionPanel", { dataset: {}, textContent: "" }],
]);

const controller = createPortfolioController({
  dom: { optional: (selector) => elements.get(selector) || null },
});

controller.initialize();

assert.equal(elements.get("#portfolioReportPanel").dataset.portfolioState, "ready");
assert.equal(elements.get("#positionPanel").dataset.positionState, "ready");
assert.equal(elements.get("#positionPanel").dataset.positionMode, "reporting-readonly");
assert(elements.get("#positionPanel").textContent.includes("positions"));
assert(elements.get("#positionPanel").textContent.includes("atlas-pwa-runtime-backup.v2"));
assert(elements.get("#positionPanel").textContent.includes("reporting-readonly"));
assert(!/buy|sell|rebalance/i.test(elements.get("#positionPanel").textContent));

console.log("Position UI entry tests passed.");
