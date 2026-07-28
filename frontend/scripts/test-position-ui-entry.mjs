import assert from "node:assert/strict";
import { createPortfolioController } from "../src/features/portfolio/portfolio-controller.js";

const elements = new Map([
  ["#portfolioReportPanel", { dataset: {}, textContent: "" }],
  ["#positionPanel", { dataset: {}, textContent: "", setAttribute(name, value) { this[name] = value; } }],
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
assert(elements.get("#positionPanel").textContent.includes("持倉數：0"));
assert(elements.get("#positionPanel").textContent.includes("市值合計：MIXED 0") || elements.get("#positionPanel").textContent.includes("市值合計：TWD 0"));
assert(elements.get("#positionPanel").textContent.includes("目前沒有持倉資料"));
assert.equal(elements.get("#positionPanel").role, "region");
assert.equal(elements.get("#positionPanel")["aria-label"], "持倉資料唯讀報表");
assert.equal(elements.get("#positionPanel").tabIndex, 0);
assert(!/broker sync|automated trade/i.test(elements.get("#positionPanel").textContent));

console.log("Position UI entry tests passed.");
