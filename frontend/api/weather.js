import { fetchWeatherData, WeatherConfigError, WeatherFetchError } from './weatherService.js';

export default async function handler(req, res) {
  try {
    const lat = process.env.WEATHER_LAT;
    const lon = process.env.WEATHER_LON;
    const key = process.env.WEATHER_API_KEY;

    const out = await fetchWeatherData({ lat, lon, key });
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=300');
    res.status(200).json(out);
  } catch (err) {
    const status =
      err instanceof WeatherConfigError || err instanceof WeatherFetchError ? err.statusCode : 500;
    res.status(status).json({ error: err.message || 'Weather service failure' });
  }
}
