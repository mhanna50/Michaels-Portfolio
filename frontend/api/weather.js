import { fetchWeatherData, WeatherConfigError, WeatherFetchError } from './weatherService.js';

function resolveCity(req) {
  const fromQuery = req?.query?.city ?? req?.query?.q;
  if (Array.isArray(fromQuery)) {
    return (fromQuery[0] || '').toString();
  }
  if (typeof fromQuery === 'string') {
    return fromQuery;
  }

  if (req?.url) {
    try {
      const parsed = new URL(req.url, 'http://localhost');
      return parsed.searchParams.get('city') || parsed.searchParams.get('q') || '';
    } catch (_) {
      return '';
    }
  }

  return '';
}

export default async function handler(req, res) {
  try {
    const city = resolveCity(req).trim();
    if (!city) {
      return res.status(400).json({ error: 'Missing "city" query param' });
    }

    const key = process.env.OPENWEATHER_KEY || process.env.WEATHER_API_KEY;
    if (!key) {
      console.error('OPENWEATHER_KEY is not configured');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const out = await fetchWeatherData({ city, key });
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
    return res.status(200).json(out);
  } catch (err) {
    if (err instanceof WeatherConfigError || err instanceof WeatherFetchError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    console.error('Weather API route error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
