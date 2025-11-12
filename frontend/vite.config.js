import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { fetchWeatherData } from './api/weatherService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function weatherDevProxy() {
  return {
    name: 'weather-dev-proxy',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/weather', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        try {
          const payload = await fetchWeatherData({
            lat: process.env.WEATHER_LAT,
            lon: process.env.WEATHER_LON,
            key: process.env.WEATHER_API_KEY,
          });

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
