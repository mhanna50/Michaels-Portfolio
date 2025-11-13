import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fetchWeatherData } from "./api/weatherService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const require = createRequire(import.meta.url);

function resolvePackageEntry(pkgName, entry = "dist/index.js") {
  const packageHint = `Ensure "${pkgName}" is installed (npm install ${pkgName}) and its "${entry}" file ships with the package.`;
  let pkgJsonPath;

  try {
    pkgJsonPath = require.resolve(`${pkgName}/package.json`);
  } catch {
    throw new Error(`[router-alias] Unable to locate ${pkgName} package.json. ${packageHint}`);
  }

  const candidate = path.resolve(path.dirname(pkgJsonPath), entry);
  if (!fs.existsSync(candidate)) {
    throw new Error(`[router-alias] Found ${pkgName} but missing "${entry}". ${packageHint}`);
  }

  return candidate;
}

const reactRouterEntry = resolvePackageEntry("react-router");
const reactRouterDomEntry = resolvePackageEntry("react-router-dom");

function weatherDevProxy() {
  return {
    name: "weather-dev-proxy",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/weather", async (req, res) => {
        res.setHeader("Content-Type", "application/json");

        try {
          const url = new URL(req.originalUrl || req.url || "", "http://localhost");
          const city = (url.searchParams.get("city") || url.searchParams.get("q") || "").trim();
          if (!city) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing "city" query param' }));
            return;
          }

          const key = process.env.OPENWEATHER_KEY || process.env.WEATHER_API_KEY;
          if (!key) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "OPENWEATHER_KEY is not configured" }));
            return;
          }

          const payload = await fetchWeatherData({ city, key });

          res.statusCode = 200;
          res.end(JSON.stringify(payload));
        } catch (err) {
          const status = err?.statusCode || 500;
          res.statusCode = status;
          res.end(JSON.stringify({ error: err?.message || "Weather service failure" }));
        }
      });
    },
  };
}

// Force Vite to hit the ESM builds directly so CI installs that strip package
// entry metadata (seen on Vercel) do not break the resolver.

export default defineConfig({
  plugins: [react(), weatherDevProxy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-router": reactRouterEntry,
      "react-router-dom": reactRouterDomEntry,
    },
  },
  // If you deploy to a subpath, set `base`. Otherwise leave as default.
  // base: "/",

  // Optional: quiet down dependency pre-bundling surprises.
  optimizeDeps: {
    include: [],
    exclude: [], // do not force-internal router chunks
  },

  // Optional: ensure consistent builds on CI
  build: {
    sourcemap: false,
    target: "esnext",
  },
});
