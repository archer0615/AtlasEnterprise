export function renderCsvImportDryRun(element, result) {
  if (!element) return;
  if (!result) {
    element.textContent = "尚未執行 CSV 預演。";
    return;
  }
  const lines = [
    "CSV 匯入預演",
    `模式：${result.mode}`,
    `總列數：${result.rowCount}`,
    `接受：${result.acceptedCount}`,
    `拒絕：${result.rejectedCount}`,
    `寫入：${result.writeCount}`,
  ];
  if (result.errors.length > 0) {
    lines.push("錯誤");
    lines.push(...result.errors.map((error) => `第 ${error.row} 列 ${error.field || "欄位"} ${error.code} ${error.message}`));
  }
  if (result.records.length > 0) {
    lines.push("接受項目");
    lines.push(...result.records.map((item) => `${item.entityType}:${item.record.policyId || item.record.positionId || item.record.id || ""}`));
  }
  element.textContent = lines.join("\n");
}
