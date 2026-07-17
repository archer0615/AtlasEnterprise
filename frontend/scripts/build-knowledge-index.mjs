import { mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const knowledgeRoot = path.join(root, "knowledge");
const frontendRoot = path.join(root, "frontend");
const outputRoot = path.join(frontendRoot, "knowledge");
const documentsRoot = path.join(outputRoot, "documents");

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function posixPath(value) {
  return value.split(path.sep).join("/");
}

function titleFromMarkdown(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback.replace(/\.md$/, "");
}

function headingsFromMarkdown(markdown) {
  return [...markdown.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
  }));
}

function stableId(relativePath) {
  return createHash("sha1").update(relativePath).digest("hex").slice(0, 16);
}

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .replace(/[`*_#[\](){}|>~:;,.!?/\\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function writeJsonFile(file, payload) {
  const serialized = `${JSON.stringify(payload, null, 2)}\n`;
  await writeTextFile(file, serialized);
}

async function writeTextFile(file, value) {
  const tempFile = `${file}.tmp`;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await writeFile(tempFile, value, "utf8");
      await rename(tempFile, file);
      return;
    } catch (error) {
      if (attempt === 3) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 250));
    }
  }
}

function keywordsFromMarkdown(markdown, title, headings, canonicalPath) {
  const text = normalizeSearchText(`${title} ${canonicalPath} ${headings.map((heading) => heading.text).join(" ")} ${markdown}`);
  const words = text.split(" ").filter((word) => word.length >= 2);
  return [...new Set(words)].slice(0, 800);
}

await rm(documentsRoot, { recursive: true, force: true });
await mkdir(documentsRoot, { recursive: true });

const files = await listMarkdownFiles(knowledgeRoot);
const documents = [];
const searchIndex = [];
const documentAssets = [];

for (const file of files) {
  const markdown = await readFile(file, "utf8");
  const canonicalPath = posixPath(path.relative(root, file));
  const relativeToKnowledge = posixPath(path.relative(knowledgeRoot, file));
  const category = relativeToKnowledge.split("/")[0];
  const id = stableId(canonicalPath);
  const title = titleFromMarkdown(markdown, path.basename(file));
  const headings = headingsFromMarkdown(markdown);
  const keywords = keywordsFromMarkdown(markdown, title, headings, canonicalPath);
  const sourceHash = createHash("sha256").update(markdown).digest("hex");
  const payload = {
    id,
    title,
    category,
    canonicalPath,
    sourceHash,
    headings,
    bodyMarkdown: markdown,
    references: [],
  };

  documents.push({
    id,
    title,
    category,
    path: canonicalPath,
    sourceHash,
    summary: markdown.slice(0, 240).replace(/\s+/g, " ").trim(),
  });

  searchIndex.push({
    id,
    title,
    category,
    path: canonicalPath,
    headings: headings.map((heading) => heading.text).slice(0, 24),
    keywords,
    terms: keywords.join(" "),
  });
  documentAssets.push(`knowledge/documents/${id}.json`);

  await writeJsonFile(path.join(documentsRoot, `${id}.json`), payload);
}

documents.sort((a, b) => a.path.localeCompare(b.path));
const categories = [...new Set(documents.map((doc) => doc.category))].sort();
const buildId = createHash("sha256")
  .update(JSON.stringify(documents.map((doc) => [doc.id, doc.sourceHash])))
  .digest("hex")
  .slice(0, 12);

await writeJsonFile(path.join(outputRoot, "index.json"), {
  generatedAt: new Date().toISOString(),
  buildId,
  source: "knowledge/",
  strategy: "BUILD_COPY_FROM_KNOWLEDGE",
  categories,
  documents,
});

await writeJsonFile(path.join(outputRoot, "search-index.json"), {
  generatedAt: new Date().toISOString(),
  buildId,
  documents: searchIndex,
});

await writeJsonFile(path.join(outputRoot, "document-assets.json"), {
  generatedAt: new Date().toISOString(),
  buildId,
  documents: documentAssets.sort(),
});

await writeTextFile(
  path.join(frontendRoot, "sw-version.js"),
  `self.ATLAS_CACHE_NAME = "atlas-knowledge-${buildId}";\n`
);

console.log(`Generated ${documents.length} knowledge documents.`);
