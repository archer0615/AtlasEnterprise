export const expenseContract = Object.freeze({
  entity: "Expense",
  fields: ["id", "ownerId", "name", "expenseType", "amount", "currency", "frequency", "startDate", "endDate", "occurrenceDate", "status", "description", "createdAt", "updatedAt", "archivedAt", "version"],
  commands: ["CreateExpense", "UpdateExpense", "ArchiveExpense", "RestoreExpense", "ActivateExpense", "DeactivateExpense"],
  events: ["ExpenseCreated", "ExpenseUpdated", "ExpenseArchived", "ExpenseRestored", "ExpenseStatusChanged"],
});
