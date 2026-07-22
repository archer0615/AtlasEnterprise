export const incomeContract = Object.freeze({
  entity: "Income",
  fields: ["id", "ownerId", "name", "incomeType", "amount", "currency", "frequency", "startDate", "endDate", "occurrenceDate", "status", "description", "createdAt", "updatedAt", "archivedAt", "version"],
  commands: ["CreateIncome", "UpdateIncome", "ArchiveIncome", "RestoreIncome", "ActivateIncome", "DeactivateIncome"],
  events: ["IncomeCreated", "IncomeUpdated", "IncomeArchived", "IncomeRestored", "IncomeStatusChanged"],
});
