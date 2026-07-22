export function toDashboardViewModel(snapshot) {
  return Object.freeze({ ...snapshot, metrics: [...(snapshot?.metrics || [])] });
}
