import assert from "node:assert/strict";
import { renderBackupDryRun, renderRestoreAudit } from "../src/features/backup/backup-view.js";

const dryRunElement = { textContent: "" };
renderBackupDryRun(dryRunElement, {
  migrationPlan: { status: "migration-required" },
  migrationSteps: ["database-2-to-3", "database-6-to-7"],
  creates: 3,
  updates: 2,
  conflicts: 1,
});

assert(dryRunElement.textContent.includes("備份預覽"));
assert(dryRunElement.textContent.includes("遷移狀態：需要遷移"));
assert(dryRunElement.textContent.includes("database-6-to-7"));
assert(dryRunElement.textContent.includes("衝突：1"));

const auditElement = { textContent: "" };
renderRestoreAudit(auditElement, { inserted: 3 }, "merge");

assert(auditElement.textContent.includes("還原情境 3"));
assert(auditElement.textContent.includes("衝突策略 merge"));
assert(auditElement.textContent.includes("包含稽核存放區計數"));

console.log("Backup restore UX tests passed.");
