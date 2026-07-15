import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputRoot = path.join(root, "docs", "roadmap", "visual-artifacts");
const dashboard = JSON.parse(await readFile(path.join(root, "frontend", "fixtures", "dashboard-snapshots.json"), "utf8"));
const index = JSON.parse(await readFile(path.join(root, "frontend", "knowledge", "index.json"), "utf8"));

await mkdir(outputRoot, { recursive: true });

const html = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <title>Atlas PWA Visual Fixture Report</title>
    <style>
      body { font-family: "Segoe UI", sans-serif; margin: 32px; color: #243130; }
      table { border-collapse: collapse; width: 100%; margin: 16px 0; }
      th, td { border: 1px solid #d7dfdc; padding: 8px; text-align: left; }
      th { background: #f1f5f3; }
    </style>
  </head>
  <body>
    <h1>Atlas PWA Visual Fixture Report</h1>
    <p>Generated knowledge documents: ${index.documents.length}</p>
    <table>
      <thead><tr><th>Scenario</th><th>Date</th><th>Metrics</th><th>Actions</th></tr></thead>
      <tbody>
        ${dashboard.snapshots.map((snapshot) => `<tr><td>${snapshot.label}</td><td>${snapshot.asOfDate}</td><td>${snapshot.metrics.length}</td><td>${snapshot.actions.length}</td></tr>`).join("")}
      </tbody>
    </table>
  </body>
</html>
`;

await writeFile(path.join(outputRoot, "pwa-visual-fixture-report.html"), html, "utf8");
console.log("Generated docs/roadmap/visual-artifacts/pwa-visual-fixture-report.html");
