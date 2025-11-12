# Michaels-Portfolio

This site showcases my background as a computer science graduate, highlights categorized projects (web apps, iOS apps, QA work, and smaller tools), lists certifications, and provides contact options via LinkedIn or email.

## Requirements

- Node.js 18.18.0 or newer (matches Vercel's default runtime)

## Local Development

```bash
npm install
npm run dev
```

This installs dependencies for the workspace and runs the Vite dev server from `frontend/`.

## Environment Variables

The weather toggle relies on the following variables (keep them out of source control):

- `OPENWEATHER_KEY` – server key used by `/api/weather`
- `VITE_HOME_CITY` – default city string for the client theme (defaults to Philadelphia if omitted)
- _Optional:_ `VITE_OPENWEATHER_KEY` if you plan to call OpenWeather directly from the browser

When running locally you can place them in a `.env` file at the repo root (already gitignored). For Vercel, add them in **Project Settings → Environment Variables** and redeploy.

## Production Build

```bash
npm run build
```

The compiled site lives in `frontend/dist/`, which is what Vercel will serve. The serverless weather function stays in `frontend/api/weather.js`.

## Deploying to Vercel

1. Push changes to GitHub and import the repository into Vercel.
2. Set **Root Directory** to `frontend` so that `vercel.json` is detected and `npm run build` emits `dist/`.
3. Set the environment variables listed above for both Preview and Production.
4. Trigger a deployment – client routes are handled via the SPA fallback defined in `vercel.json`, and `/api/weather` remains available as a Serverless Function.
