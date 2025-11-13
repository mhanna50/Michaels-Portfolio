import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vendorDir = path.join(__dirname, "vendor", "scheduler", "cjs");
const vendorFiles = ["scheduler.production.min.js", "scheduler.development.js"];

function copyVendorFiles(targetDir, missingFiles) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const file of vendorFiles) {
    const src = path.join(vendorDir, file);
    if (!fs.existsSync(src)) {
      console.warn(`[scheduler-fallback] Missing vendor asset: ${file}`);
      continue;
    }
    fs.copyFileSync(src, path.join(targetDir, file));
  }
  const restored = missingFiles.join(", ") || vendorFiles.join(", ");
  console.log(`[*] scheduler-fallback restored ${restored} in ${path.relative(process.cwd(), targetDir)}`);
}

function ensureSchedulerCjs() {
  let schedulerPkgRoot;
  try {
    schedulerPkgRoot = path.dirname(
      require.resolve("scheduler/package.json", { paths: [process.cwd()] })
    );
  } catch (err) {
    console.warn("[scheduler-fallback] Unable to resolve scheduler/package.json. Is react-dom installed?");
    return;
  }

  const cjsDir = path.join(schedulerPkgRoot, "cjs");
  const missing = vendorFiles.filter((file) => !fs.existsSync(path.join(cjsDir, file)));
  if (missing.length === 0) {
    return;
  }

  copyVendorFiles(cjsDir, missing);
}

ensureSchedulerCjs();
