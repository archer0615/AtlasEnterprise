export function parseRequiredNumber(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw new Error(`${fieldName} must be a number`);
  return parsed;
}
