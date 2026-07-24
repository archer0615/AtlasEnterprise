export function parseRequiredNumber(value, fieldName) {
  if (value === null || value === undefined || String(value).trim() === "") {
    throw new Error(`${fieldName} must be a number`);
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`${fieldName} must be a number`);
  return parsed;
}
