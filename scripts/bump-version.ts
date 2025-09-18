/* eslint-disable no-console */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type BumpType =
  | "major"
  | "minor"
  | "patch"
  | "premajor"
  | "preminor"
  | "prepatch"
  | "prerelease"
  | "from-git";

const ALLOWED: BumpType[] = [
  "major",
  "minor",
  "patch",
  "premajor",
  "preminor",
  "prepatch",
  "prerelease",
  "from-git",
];

async function main() {
  const bump = (process.argv[2] || "").trim() as BumpType;
  if (!ALLOWED.includes(bump)) {
    console.error(
      `Invalid bump type: "${bump}". Allowed: ${ALLOWED.join(", ")}`
    );
    process.exit(1);
  }

  const root = resolve(process.cwd());
  const pkgPath = resolve(root, "package.json");
  const lockPath = resolve(root, "package-lock.json");
  const appPath = resolve(root, "app.json");

  // Prepare npm version command
  const isPre = bump.startsWith("pre") || bump === "prerelease";
  const npmCmd = `npm version ${bump} --no-git-tag-version${
    isPre ? " --preid rc" : ""
  }`;

  // Bump package.json using npm
  const npmOut = run(npmCmd);

  // npm prints the new version like: v1.3.0-rc.0
  const tagPrinted = npmOut.replace(/^v?/, "v");
  const newVersion = tagPrinted.replace(/^v/, "");

  // Sync app.json with release part only
  try {
    const app = readJson<any>(appPath);
    if (app?.expo) {
      app.expo.version = getReleasePart(newVersion);
      writeJson(appPath, app);
    }
  } catch (e) {
    console.error("Error updating app.json", e);
  }

  // Stage and commit (include lock if present)
  const filesToAdd = [pkgPath, appPath, lockPath]
    .filter(Boolean)
    .map((p) => JSON.stringify(p))
    .join(" ");

  run(`git add ${filesToAdd}`);
  run(
    `git commit -m ${JSON.stringify(`chore: bump version to v${newVersion}`)}`
  );

  // Create annotated tag for the FULL version (including -rc.X)
  run(`git tag -a v${newVersion} -m ${JSON.stringify(`v${newVersion}`)}`);

  console.log(`\nBumped to v${newVersion}`);
  console.log(`app.json version set to ${getReleasePart(newVersion)}`);
  console.log(`Created git tag v${newVersion}`);
}

function run(cmd: string) {
  return execSync(cmd, { stdio: "pipe" }).toString().trim();
}

function readJson<T = any>(p: string): T {
  return JSON.parse(readFileSync(p, "utf8")) as T;
}

function writeJson(p: string, obj: unknown) {
  writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function getReleasePart(v: string): string {
  // strip pre-release and build metadata, e.g. 1.3.0-rc.0 -> 1.3.0
  return v.split("-")[0];
}

main();
