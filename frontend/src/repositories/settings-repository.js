export const settingsRepositoryContract = Object.freeze({
  requiredOperations: ["get", "set", "delete", "list"],
  input: "Settings key and serializable value.",
  output: "Stored value or empty string for missing keys.",
  errors: "Atlas persistence errors with operation and recoverable metadata.",
});
