import { sanitizeDownloadFilename } from "../security-boundary.js";

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = sanitizeDownloadFilename(filename);
  anchor.click();
  URL.revokeObjectURL(url);
}
