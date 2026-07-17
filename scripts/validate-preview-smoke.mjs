import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const frontendRoot = path.join(root, "frontend");
const basePath = "/AtlasEnterprise/";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function resolveRequestPath(url) {
  const pathname = new URL(url, "http://127.0.0.1").pathname;
  const normalized = pathname.startsWith(basePath) ? pathname.slice(basePath.length - 1) : pathname;
  const requestPath = normalized === "/" ? "/index.html" : normalized;
  return path.join(frontendRoot, requestPath);
}

function request(port, pathname) {
  return new Promise((resolve, reject) => {
    const req = globalThis.fetch
      ? fetch(`http://127.0.0.1:${port}${pathname}`).then((response) => resolve(response.status), reject)
      : null;
    if (!req) reject(new Error("fetch is not available"));
  });
}

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url || "/");
    const body = await readFile(filePath);
    response.writeHead(200, { "content-type": contentTypes[path.extname(filePath)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

try {
  const { port } = server.address();
  const paths = [
    `${basePath}`,
    `${basePath}manifest.webmanifest`,
    `${basePath}sw.js`,
    `${basePath}src/main.js`,
    `${basePath}src/indexeddb-runtime.js`,
    `${basePath}knowledge/index.json`,
    `${basePath}knowledge/search-index.json`,
  ];
  const statuses = await Promise.all(paths.map((pathname) => request(port, pathname)));
  const failed = paths.filter((_, index) => statuses[index] !== 200);
  if (failed.length) {
    throw new Error(`preview smoke failed: ${failed.join(", ")}`);
  }
  console.log(`Preview smoke validation passed with ${paths.length} project-path assets.`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
