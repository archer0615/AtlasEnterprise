export function renderBackupState(element, state) {
  if (element) element.dataset.backupState = state;
}

export function renderBackupDryRun(element, dryRun) {
  if (!element) return;
  const migrationStatus = dryRun.migrationPlan?.status === "migration-required" ? "需要遷移" : "不需要";
  const migrationSteps = dryRun.migrationSteps?.length ? dryRun.migrationSteps.join("、") : "不需要";
  element.textContent = [
    "備份預覽",
    `遷移狀態：${migrationStatus}`,
    `遷移：${migrationSteps}`,
    `新增：${dryRun.creates}`,
    `覆蓋：${dryRun.updates}`,
    `衝突：${dryRun.conflicts}`,
  ].join("\n");
}

export function renderRestoreAudit(element, result, conflictPolicy) {
  if (!element) return;
  element.textContent = [
    `還原情境 ${result.inserted ?? 0}`,
    `衝突策略 ${conflictPolicy}`,
    "包含稽核存放區計數",
  ].join("\n");
}
