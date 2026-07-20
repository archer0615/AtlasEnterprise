import { readFile } from "node:fs/promises";
import path from "node:path";

export async function assertValidationProfileIncludes(root, scriptName, assert) {
  const runner = await readFile(path.join(root, "scripts", "run-validation-profile.mjs"), "utf8");
  assert(runner.includes(`"${scriptName}"`), `Validation profiles must include ${scriptName}`);
}
