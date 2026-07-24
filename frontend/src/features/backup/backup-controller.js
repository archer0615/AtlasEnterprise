import { renderBackupDryRun, renderBackupState, renderRestoreAudit } from "./backup-view.js";

export function createBackupController({ dom, listeners }) {
  let pendingBackup = null;
  let pendingDryRun = null;

  return {
    initialize() {
      renderBackupState(dom.optional("#backupPreview"), "ready");
      listeners.add(dom.optional("#importBackupInput"), "change", async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const { indexedDbBackupRepository } = await import("../../indexeddb-runtime.js");
        pendingBackup = JSON.parse(await file.text());
        pendingDryRun = await indexedDbBackupRepository.dryRunImport(pendingBackup);
        renderBackupDryRun(dom.optional("#backupDryRunPanel"), pendingDryRun);
      });
      listeners.add(dom.optional("#applyBackupButton"), "click", async () => {
        if (!pendingBackup) return;
        const { indexedDbBackupRepository } = await import("../../indexeddb-runtime.js");
        const conflictPolicy = dom.optional("#backupConflictPolicySelect")?.value || "replace";
        const result = await indexedDbBackupRepository.importBackup(pendingBackup, { conflictPolicy });
        renderRestoreAudit(dom.optional("#restoreAuditPanel"), result, conflictPolicy);
        const scenarioList = dom.optional("#scenarioList");
        if (scenarioList) {
          scenarioList.textContent = (pendingBackup.scenarios || []).map((scenario) => scenario.name).join("\n");
        }
      });
    },
    dispose() {},
  };
}
