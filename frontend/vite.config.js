import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { fetchWeatherData } from './api/weatherService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const reactRouterEntry = require.resolve('react-router/dist/index.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function weatherDevProxy() {
  return {
    name: 'weather-dev-proxy',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/weather', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        try {
          const url = new URL(req.originalUrl || req.url || '', 'http://localhost');
          const city = (url.searchParams.get('city') || url.searchParams.get('q') || '').trim();
          if (!city) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing "city" query param' }));
            return;
          }

          const key = process.env.OPENWEATHER_KEY || process.env.WEATHER_API_KEY;
          if (!key) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'OPENWEATHER_KEY is not configured' }));
            return;
          }

          const payload = await fetchWeatherData({ city, key });

          res.statusCode = 200;
          res.end(JSON.stringify(payload));
        } catch (err) {
          const status = err?.statusCode || 500;
          res.statusCode = status;
          res.end(JSON.stringify({ error: err?.message || 'Weather service failure' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), weatherDevProxy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-router': reactRouterEntry,
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('marked') || id.includes('gray-matter')) return 'markdown';

          return 'vendor';
        },
      },
    },
  },
});
