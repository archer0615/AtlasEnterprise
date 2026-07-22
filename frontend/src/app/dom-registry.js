import { createApplicationError } from "./application-error-handler.js";

export function createDomRegistry(documentRef = document) {
  return {
    required({ feature, id, selector = `#${id}`, phase = "initialize" }) {
      const element = documentRef.querySelector(selector);
      if (!element) {
        throw createApplicationError("ATLAS_REQUIRED_ELEMENT_MISSING", `${feature} missing ${id}`, {
          feature,
          elementId: id,
          selector,
          phase,
        });
      }
      return element;
    },
    optional(selector) {
      return documentRef.querySelector(selector);
    },
  };
}
