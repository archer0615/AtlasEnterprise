import { readFile } from "node:fs/promises";
import path from "node:path";

export async function assertValidationProfileIncludes(root, scriptName, assert) {
  const runner = await readFile(path.join(root, "scripts", "run-validation-profile.mjs"), "utf8");
  const manifest = await readFile(path.join(root, "scripts", "validation-profiles.json"), "utf8").catch(() => "");
  assert(runner.includes(`"${scriptName}"`) || manifest.includes(`"command": "npm run ${scriptName}"`), `Validation profiles must include ${scriptName}`);
}
