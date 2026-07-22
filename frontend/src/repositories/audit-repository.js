export const auditRepositoryContract = Object.freeze({
  requiredOperations: ["list", "save", "clear"],
  input: "Audit entry with auditId, action, recordedAt, schema, and detail.",
  output: "Sanitized audit entries.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
