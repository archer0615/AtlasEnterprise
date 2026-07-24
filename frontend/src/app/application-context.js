import { createFrontendCompositionRoot } from "./composition-root.js";

export function buildApplicationContext(documentRef = document) {
  return createFrontendCompositionRoot({ documentRef });
}
