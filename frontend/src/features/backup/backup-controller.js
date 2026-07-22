import { renderBackupState } from "./backup-view.js";

export function createBackupController({ dom }) {
  return {
    initialize() {
      renderBackupState(dom.optional("#backupPreview"), "ready");
    },
    dispose() {},
  };
}
