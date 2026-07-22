export function toKnowledgeViewModel(documentRecord) {
  return Object.freeze({ ...documentRecord });
}
