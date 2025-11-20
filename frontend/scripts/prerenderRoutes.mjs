import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import esbuild from "esbuild";
import { portfolioCaseStudies } from "../src/data/portfolioContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");
const postsDir = path.join(srcDir, "posts");
const tempDir = path.join(rootDir, ".ssg-temp");
const require = createRequire(import.meta.url);

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
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
  const resolveModule = (specifier) => {
    try {
      return require.resolve(specifier);
    } catch (error) {
      console.warn(`Unable to resolve "${specifier}" while building prerender bundle.`);
      throw error;
    }
  };
  await esbuild.build({
    entryPoints: [path.join(srcDir, "ssg-entry.jsx")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    outfile,
    sourcemap: false,
    logLevel: "silent",
    alias: {
      "@": srcDir,
      "react-router": resolveModule("react-router/dist/index.js"),
      "react-router-dom": resolveModule("react-router-dom/dist/index.js"),
      "react-router-dom/server.js": resolveModule("react-router-dom/server.js"),
    },
    define: {
      "process.env.NODE_ENV": '"production"',
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
    const appHtml = render(route);
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
