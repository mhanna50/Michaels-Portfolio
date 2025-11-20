import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { SITE_URL } from "../src/data/siteMeta.js";
import { portfolioCaseStudies } from "../src/data/portfolioContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const postsDir = path.join(rootDir, "src", "posts");

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const readMarkdownFiles = () => {
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const filepath = path.join(postsDir, filename);
      const raw = fs.readFileSync(filepath, "utf8");
      const { data, content } = parseFrontMatter(raw);
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        ...data,
        content,
      };
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
};

const parseFrontMatter = (file) => {
  const lines = file.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return { data: {}, content: file };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (closingIndex === -1) {
    return { data: {}, content: file };
  }

  const frontMatterLines = lines.slice(1, closingIndex);
  const content = lines.slice(closingIndex + 1).join("\n").trimStart();
  const data = {};
  frontMatterLines.forEach((line) => {
    if (!line.trim()) return;
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const rawValue = rest.join(":").trim();
    data[key.trim()] = stripQuotes(rawValue);
  });

  return { data, content };
};

const stripQuotes = (value = "") => {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

const createExcerpt = (markdown = "", maxChars = 240) => {
  const html = marked.parse(markdown);
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars - 3).trim()}...`;
};

const formatDate = (value) => {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
};

const buildRobotsTxt = () =>
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const buildSitemap = (posts) => {
  const today = new Date().toISOString().split("T")[0];
  const staticRoutes = [
    { loc: `${SITE_URL}/`, priority: "1.0", changefreq: "monthly", lastmod: today },
    { loc: `${SITE_URL}/services`, priority: "0.9", changefreq: "monthly", lastmod: today },
    {
      loc: `${SITE_URL}/services/automations`,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: today,
    },
    { loc: `${SITE_URL}/portfolio`, priority: "0.8", changefreq: "monthly", lastmod: today },
    { loc: `${SITE_URL}/contact`, priority: "0.6", changefreq: "yearly", lastmod: today },
    { loc: `${SITE_URL}/blog`, priority: "0.7", changefreq: "weekly", lastmod: today },
  ];

  const caseStudyRoutes = portfolioCaseStudies.map((study) => ({
    loc: `${SITE_URL}/portfolio/${study.slug}`,
    priority: "0.7",
    changefreq: "yearly",
    lastmod: `${study.year || "2024"}-01-01`,
  }));

  const blogRoutes = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: formatDate(post.date),
  }));

  const allRoutes = [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
  const urlEntries = allRoutes
    .map(
      (route) => `<url>
  <loc>${route.loc}</loc>
  <lastmod>${route.lastmod}</lastmod>
  <changefreq>${route.changefreq}</changefreq>
  <priority>${route.priority}</priority>
</url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
};

const buildRssFeed = (posts) => {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const description = post.description || createExcerpt(post.content, 180);
      const contentHtml = marked.parse(post.content || "");
      return `<item>
  <title><![CDATA[${post.title || post.slug}]]></title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${new Date(post.date || Date.now()).toUTCString()}</pubDate>
  <description><![CDATA[${description}]]></description>
  <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Hanna Web Studio Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Web design, development, and automation notes from Michael Hanna.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>
`;
};

const writeFile = (filepath, contents) => {
  ensureDir(path.dirname(filepath));
  fs.writeFileSync(filepath, contents.trim() + "\n", "utf8");
};

const main = () => {
  const posts = readMarkdownFiles();
  writeFile(path.join(publicDir, "robots.txt"), buildRobotsTxt());
  writeFile(path.join(publicDir, "sitemap.xml"), buildSitemap(posts));
  writeFile(path.join(publicDir, "rss.xml"), buildRssFeed(posts));
};

main();
