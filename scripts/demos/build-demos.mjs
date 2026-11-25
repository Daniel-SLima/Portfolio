import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sources = JSON.parse(readFileSync(join(root, "scripts/demos/sources.json"), "utf8"));
const out = join(root, "out");
if (!existsSync(join(out, "index.html"))) throw new Error("Build the portfolio static export first.");
const workspace = mkdtempSync(join(process.env.RUNNER_TEMP || tmpdir(), "portfolio-demo-build-"));

function run(command, args, cwd, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd, stdio: "inherit",
    env: { ...process.env, CI: "true", NEXT_TELEMETRY_DISABLED: "1", ...extraEnv },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with status ${result.status}`);
}

try {
  for (const name of ["orcamentos", "vlinix"]) {
    const source = sources[name];
    if (!/^Daniel-SLima\/[A-Za-z0-9_-]+$/.test(source.repository) || !/^[a-f0-9]{40}$/.test(source.commit || "")) {
      throw new Error(`A verified repository and immutable commit are required for ${name}.`);
    }
    const checkout = join(workspace, name);
    run("git", ["init", checkout], workspace);
    run("git", ["remote", "add", "origin", `https://github.com/${source.repository}.git`], checkout);
    run("git", ["fetch", "--depth=1", "origin", source.commit], checkout);
    run("git", ["checkout", "--detach", "FETCH_HEAD"], checkout);
    let output;
    if (name === "orcamentos") {
      run("npm", ["ci"], checkout);
      run("npm", ["run", "test:local-demo"], checkout);
      run("npm", ["run", "build:pages-demo"], checkout, { DEMO_BASE_PATH: "/Portfolio/demos/orcamentos" });
      output = join(checkout, "out");
    } else {
      run("bash", ["scripts/build-demo.sh"], checkout);
      output = join(checkout, "build/web");
    }
    if (!existsSync(join(output, "index.html"))) throw new Error(`Missing ${name} entry page.`);
    const destination = join(out, "demos", name);
    rmSync(destination, { recursive: true, force: true });
    cpSync(output, destination, { recursive: true, dereference: true });
    console.log(`Included ${name} from ${source.repository}@${source.commit}`);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
