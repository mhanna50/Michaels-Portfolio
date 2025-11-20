import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import esbuild from "esbuild";
import { portfolioCaseStudies } from "../src/data/portfolioContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");
const postsDir = path.join(srcDir, "posts");
const tempDir = path.join(rootDir, ".ssg-temp");
const require = createRequire(import.meta.url);
const envFile = path.resolve(rootDir, "../.env");
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}
const nodeEnv = process.env.SSG_NODE_ENV || "production";

const resolvePackageDir = (pkgName) => {
  let pkgJsonPath;
  try {
    pkgJsonPath = require.resolve(`${pkgName}/package.json`, { paths: [rootDir] });
  } catch (error) {
    throw new Error(`Unable to locate ${pkgName}/package.json while building the prerender bundle.`);
  }
  return path.dirname(pkgJsonPath);
};

const resolvePackageEntry = (pkgName, entryRelativePath) => {
  const pkgDir = resolvePackageDir(pkgName);
  const candidate = path.resolve(pkgDir, entryRelativePath);
  if (!fs.existsSync(candidate)) {
    throw new Error(
      `Missing entry "${entryRelativePath}" inside ${pkgName}. Please reinstall dependencies.`
    );
  }
  return candidate;
};

const reactRouterEntry = resolvePackageEntry("react-router", "dist/index.js");
const reactRouterDomEntry = resolvePackageEntry("react-router-dom", "dist/index.js");
const reactRoot = resolvePackageDir("react");
const reactDomRoot = resolvePackageDir("react-dom");
const reactDomServerEntry = resolvePackageEntry("react-dom", "server.node.js");

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const getMetaEnv = () => {
  const meta = {
    MODE: nodeEnv,
    DEV: nodeEnv !== "production",
    PROD: nodeEnv === "production",
    SSR: true,
    BASE_URL: process.env.BASE_URL || "/",
  };

  Object.entries(process.env).forEach(([key, value]) => {
    if (key.startsWith("VITE_")) {
      meta[key] = value ?? "";
    }
  });

  return meta;
};

const readPostSlugs = () => {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
};

const buildRenderer = async () => {
  ensureDir(tempDir);
  const outfile = path.join(tempDir, "ssg-entry.mjs");
  const viteEnv = JSON.stringify(getMetaEnv());
  await esbuild.build({
    entryPoints: [path.join(srcDir, "ssg-entry.jsx")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    outfile,
    sourcemap: false,
    logLevel: "silent",
    banner: {
      js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);',
    },
    alias: {
      "@": srcDir,
      "react-router": reactRouterEntry,
      "react-router-dom": reactRouterDomEntry,
      react: reactRoot,
      "react/jsx-runtime": path.join(reactRoot, "jsx-runtime.js"),
      "react/jsx-dev-runtime": path.join(reactRoot, "jsx-dev-runtime.js"),
      "react-dom": reactDomRoot,
      "react-dom/server": reactDomServerEntry,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
      "import.meta.env": viteEnv,
    },
  });
  const moduleUrl = pathToFileURL(outfile).href;
  const { render } = await import(moduleUrl);
  return render;
};

const injectHtml = (template, appHtml) =>
  template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

const normalizeRoute = (route) => {
  if (route === "/") return "";
  return route.replace(/^\//, "");
};

const main = async () => {
  if (!fs.existsSync(distDir)) {
    console.warn("dist directory not found. Skipping prerender.");
    return;
  }
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
  const render = await buildRenderer();
  const routes = new Set([
    "/",
    "/services",
    "/services/web-design",
    "/services/automations",
    "/portfolio",
    "/blog",
    "/contact",
  ]);
  portfolioCaseStudies.forEach((study) => routes.add(`/portfolio/${study.slug}`));
  readPostSlugs().forEach((slug) => routes.add(`/blog/${slug}`));

  routes.forEach((route) => {
    let appHtml;
    try {
      appHtml = render(route);
    } catch (error) {
      const componentStack = error?.componentStack || error?.cause?.componentStack;
      if (componentStack) {
        console.error(`SSR component stack for ${route}:\n${componentStack}`);
      }
      const wrapped = new Error(`Render failed for route "${route}": ${error.message}`);
      wrapped.cause = error;
      throw wrapped;
    }
    const html = injectHtml(template, appHtml);
    const outputSegment = normalizeRoute(route);
    const outDir = outputSegment ? path.join(distDir, outputSegment) : distDir;
    ensureDir(outDir);
    fs.writeFileSync(path.join(outDir, "index.html"), html);
  });
};

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
