import { dryRunCsvImport } from "../../domain/import/csv-import-dry-run.js";
import { renderCsvImportDryRun } from "./csv-import-view.js";

export function createCsvImportController({ dom, listeners }) {
  let selectedCsvText = "";

  return {
    initialize() {
      renderCsvImportDryRun(dom.optional("#csvImportDryRunPanel"), null);
      listeners.add(dom.optional("#csvImportInput"), "change", async (event) => {
        const file = event.target.files?.[0];
        selectedCsvText = file ? await file.text() : "";
        renderCsvImportDryRun(dom.optional("#csvImportDryRunPanel"), null);
      });
      listeners.add(dom.optional("#csvDryRunButton"), "click", () => {
        const result = dryRunCsvImport(selectedCsvText, { ownerId: "owner-1" });
        renderCsvImportDryRun(dom.optional("#csvImportDryRunPanel"), result);
      });
      listeners.add(dom.optional("#csvClearPreviewButton"), "click", () => {
        selectedCsvText = "";
        const input = dom.optional("#csvImportInput");
        if (input) input.value = "";
        renderCsvImportDryRun(dom.optional("#csvImportDryRunPanel"), null);
      });
    },
    dispose() {},
  };
}
