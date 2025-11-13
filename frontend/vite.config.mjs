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

function resolveRouterAsset(request) {
  try {
    return require.resolve(request);
  } catch (error) {
    throw new Error(`Failed to resolve "${request}" from vite.config.mjs: ${error.message}`);
  }
}

const reactRouterEntry = resolveRouterAsset("react-router/dist/index.js");
const reactRouterDomEntry = resolveRouterAsset("react-router-dom/dist/index.js");

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
