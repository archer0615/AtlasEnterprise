export function validateJsonSchema(schema, value, label) {
  const errors = [];
  validateNode(schema, value, label, errors);
  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateNode(schema, value, label, errors) {
  if (schema.const !== undefined && value !== schema.const) {
    errors.push(`${label} must equal schema const`);
    return;
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${label} must be one of schema enum values`);
    return;
  }

  if (schema.type && !matchesType(schema.type, value)) {
    errors.push(`${label} must be ${schema.type}`);
    return;
  }

  for (const field of schema.required || []) {
    if (!Object.hasOwn(value || {}, field)) errors.push(`${label} missing schema-required field: ${field}`);
  }

  if (schema.type === "string" && typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push(`${label} shorter than minLength`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push(`${label} longer than maxLength`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${label} does not match pattern`);
  }

  if (schema.type === "number" && Number.isFinite(value)) {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${label} smaller than minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${label} greater than maximum`);
  }

  if (schema.type === "array" && Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${label} has fewer items than minItems`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${label} has more items than maxItems`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) errors.push(`${label} must contain unique items`);
    if (schema.items) value.forEach((item, index) => validateNode(schema.items, item, `${label}[${index}]`, errors));
  }

  if (schema.type === "object" && value && typeof value === "object" && !Array.isArray(value)) {
    if (schema.additionalProperties === false) {
      for (const field of Object.keys(value)) {
        if (!Object.hasOwn(schema.properties || {}, field)) errors.push(`${label}.${field} is not allowed by schema`);
      }
    }
    for (const [field, fieldSchema] of Object.entries(schema.properties || {})) {
      if (Object.hasOwn(value, field)) validateNode(fieldSchema, value[field], `${label}.${field}`, errors);
    }
  }

  if (schema.oneOf) {
    const matches = schema.oneOf.filter((candidate) => {
      const candidateErrors = [];
      validateNode(candidate, value, label, candidateErrors);
      return candidateErrors.length === 0;
    });
    if (matches.length !== 1) errors.push(`${label} must match exactly one schema`);
  }

  if (schema.anyOf) {
    const matches = schema.anyOf.some((candidate) => {
      const candidateErrors = [];
      validateNode(candidate, value, label, candidateErrors);
      return candidateErrors.length === 0;
    });
    if (!matches) errors.push(`${label} must match at least one schema`);
  }
}

function matchesType(type, value) {
  if (type === "array") return Array.isArray(value);
  if (type === "number") return Number.isFinite(value);
  if (type === "object") return value && typeof value === "object" && !Array.isArray(value);
  return typeof value === type;
}
