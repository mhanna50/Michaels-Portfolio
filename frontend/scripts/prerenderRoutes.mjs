import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import esbuild from "esbuild";
import { portfolioCaseStudies } from "../src/data/portfolioContent.js";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildSiteGraph } from "../src/data/siteMeta.js";

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

// Metadata must be present in the server-delivered HTML: social scrapers often never run React.
const routeMetadata = {
  "/": {
    title: "Hanna Web Studio | Web Design & Business Automations",
    description: "Hanna Web Studio builds modern small-business websites and practical AI-powered automations. See our work and get a project quote.",
  },
  "/services": {
    title: "Web Design & Automation Services | Hanna Web Studio",
    description: "Explore custom web design, development, branding, SEO and business automation services from Hanna Web Studio.",
  },
  "/services/web-design": {
    title: "Small Business Web Design | Hanna Web Studio",
    description: "Custom responsive websites for service businesses, with clear messaging, modern design and easy ways for customers to get in touch.",
  },
  "/services/automations": {
    title: "Business Automation Services | Hanna Web Studio",
    description: "Automate repetitive business tasks, customer follow-ups and workflows with practical integrations and AI-assisted solutions.",
  },
  "/portfolio": {
    title: "Web Design Portfolio & Case Studies | Hanna Web Studio",
    description: "Browse real web design and development projects by Hanna Web Studio, including small business websites and case studies.",
  },
  "/contact": {
    title: "Contact Hanna Web Studio | Start a Project",
    description: "Tell Hanna Web Studio about your website or automation project. Share your goals, budget and timeline to start a conversation.",
  },
  "/blog": {
    title: "Web Design & Automation Insights | Hanna Web Studio",
    description: "Practical articles about websites, SEO, development and business automation from Hanna Web Studio.",
  },
};

const escapeAttribute = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

const getRouteMetadata = (route) => {
  const staticMeta = routeMetadata[route];
  if (staticMeta) return staticMeta;
  if (route.startsWith("/portfolio/")) {
    const slug = route.split("/").pop();
    const study = portfolioCaseStudies.find((entry) => entry.slug === slug);
    if (study) return {
      title: study.metaTitle || String(study.title) + " | Hanna Web Studio",
      description: study.metaDescription || study.summary,
      image: study.coverImage,
      type: "article",
    };
  }
  if (route.startsWith("/blog/")) {
    const slug = route.split("/").pop();
    const postFile = path.join(postsDir, slug + ".md");
    if (fs.existsSync(postFile)) {
      const source = fs.readFileSync(postFile, "utf8");
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const fields = {};
      if (frontmatter) {
        for (const line of frontmatter[1].split(/\r?\n/)) {
          const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
          if (match) fields[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
        }
      }
      return {
        title: (fields.title || slug.replace(/-/g, " ")) + " | Hanna Web Studio",
        description: fields.description || "Web design and automation ideas from Hanna Web Studio.",
        type: "article",
      };
    }
  }
  return routeMetadata["/"];
};

const injectHtml = (template, appHtml, route) => {
  const metadata = getRouteMetadata(route);
  const canonical = SITE_URL + (route === "/" ? "/" : route);
  const image = metadata.image
    ? (metadata.image.startsWith("http") ? metadata.image : SITE_URL + metadata.image)
    : DEFAULT_OG_IMAGE;
  const title = escapeAttribute(metadata.title);
  const description = escapeAttribute(metadata.description);
  const url = escapeAttribute(canonical);
  const imageUrl = escapeAttribute(image);
  const graph = route === "/"
    ? buildSiteGraph()
    : {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metadata.title,
      description: metadata.description,
      url: canonical,
      isPartOf: { "@id": SITE_URL + "#website" },
      publisher: { "@id": SITE_URL + "#organization" },
    };
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  const tags = [
    '<title>' + title + '</title>',
    '<meta name="description" content="' + description + '" />',
    '<link rel="canonical" href="' + url + '" />',
    '<meta property="og:site_name" content="' + escapeAttribute(SITE_NAME) + '" />',
    '<meta property="og:locale" content="en_US" />',
    '<meta property="og:type" content="' + (metadata.type || "website") + '" />',
    '<meta property="og:title" content="' + title + '" />',
    '<meta property="og:description" content="' + description + '" />',
    '<meta property="og:url" content="' + url + '" />',
    '<meta property="og:image" content="' + imageUrl + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + title + '" />',
    '<meta name="twitter:description" content="' + description + '" />',
    '<meta name="twitter:image" content="' + imageUrl + '" />',
    '<script type="application/ld+json" id="page-structured-data">' + json + '</script>',
  ].join("\n  ");
  return template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace("</head>", "  " + tags + "\n</head>")
    .replace('<div id="root"></div>', '<div id="root">' + appHtml + '</div>');
};

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
    const html = injectHtml(template, appHtml, route);
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
