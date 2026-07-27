import { dryRunCsvImport, renderCsvImportErrorReport } from "../../domain/import/csv-import-dry-run.js";

export async function commitCsvImport(csvText, options = {}) {
  const dryRun = dryRunCsvImport(csvText, options);
  if (!dryRun.accepted) {
    return Object.freeze({ ...dryRun, schema: "atlas-enterprise.csv-import-commit.v1", mode: "commit", writeCount: 0 });
  }
  const repositories = options.repositories || {};
  const unitOfWork = options.unitOfWork || null;
  const auditRepository = options.auditRepository || null;
  const clock = options.clock || { now: () => new Date(0) };
  const grouped = new Map();
  for (const item of dryRun.records) {
    const repository = repositories[item.entityType];
    if (!repository?.createManyAtomic) {
      return buildCommitReport([], [error("MISSING_ATOMIC_REPOSITORY", 0, item.entityType, "CSV write path requires an atomic entity repository.")]);
    }
    grouped.set(item.entityType, [...(grouped.get(item.entityType) || []), item.record]);
  }
  if (grouped.size > 1 && !unitOfWork?.createManyAtomic) {
    return buildCommitReport([], [error("MISSING_ATOMIC_UNIT_OF_WORK", 0, "entityType", "CSV write path requires an atomic unit of work for multi-entity imports.")]);
  }
  try {
    const written = [];
    if (unitOfWork?.createManyAtomic) {
      const createdRecords = await unitOfWork.createManyAtomic(Object.fromEntries(grouped.entries()));
      for (const [entityType, records] of Object.entries(createdRecords)) {
        written.push(...records.map((record) => ({ entityType, record })));
      }
    } else {
      for (const [entityType, records] of grouped.entries()) {
        const createdRecords = await repositories[entityType].createManyAtomic(records);
        written.push(...createdRecords.map((record) => ({ entityType, record })));
      }
    }
    const occurredAt = clock.now().toISOString();
    await auditRepository?.save?.({
      auditId: `csv-import-${occurredAt}`,
      action: "csv-import-commit",
      recordedAt: occurredAt,
      schema: "atlas-enterprise.csv-import-audit.v1",
      payload: { acceptedCount: dryRun.acceptedCount, writeCount: written.length },
    });
    return Object.freeze({
      ...dryRun,
      schema: "atlas-enterprise.csv-import-commit.v1",
      mode: "commit",
      writeCount: written.length,
      records: Object.freeze(written),
    });
  } catch (commitError) {
    return buildCommitReport([], [error("CSV_COMMIT_FAILED", 0, "", commitError?.message || "CSV import commit failed.")]);
  }
}

function buildCommitReport(records, errors) {
  return Object.freeze({
    schema: "atlas-enterprise.csv-import-commit.v1",
    accepted: errors.length === 0,
    mode: "commit",
    rowCount: records.length + errors.filter((item) => item.row > 1).length,
    acceptedCount: records.length,
    rejectedCount: errors.length,
    writeCount: 0,
    records: Object.freeze(records),
    errors: Object.freeze(errors),
    reportHtml: renderCsvImportErrorReport(errors),
  });
}

function error(code, row, field, message) {
  return { code, row, field, message, valueCategory: "user-input" };
}
