const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherConfigError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'WeatherConfigError';
    this.statusCode = statusCode;
  }
}

export class WeatherFetchError extends Error {
  constructor(message, statusCode = 502) {
    super(message);
    this.name = 'WeatherFetchError';
    this.statusCode = statusCode;
  }
}

export async function fetchWeatherData({ city, key, units = 'metric' }) {
  const normalizedCity = (city || '').toString().trim();
  if (!normalizedCity) {
    throw new WeatherConfigError('Missing "city" parameter', 400);
  }
  if (!key) {
    throw new WeatherConfigError('OPENWEATHER_KEY is not configured');
  }

  const url = `${ENDPOINT}?q=${encodeURIComponent(normalizedCity)}&appid=${key}&units=${units}`;
  let response;
  try {
    response = await fetch(url, {
      cache: 'no-store',
      headers: { 'User-Agent': 'portfolio-weather/1.0' },
    });
  } catch {
    throw new WeatherFetchError('Failed to reach OpenWeather');
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new WeatherFetchError('Malformed response from OpenWeather');
  }

  if (!response.ok) {
    const reason = data?.message ? `Upstream error: ${data.message}` : 'Upstream error';
    throw new WeatherFetchError(reason, response.status);
  }

  const nowUtcSeconds = Date.now() / 1000;
  const sunriseUtc = data?.sys?.sunrise ?? null;
  const sunsetUtc = data?.sys?.sunset ?? null;

  let isNight = false;
  if (typeof sunriseUtc === 'number' && typeof sunsetUtc === 'number') {
    isNight = nowUtcSeconds < sunriseUtc || nowUtcSeconds > sunsetUtc;
  }

  return {
    city: data?.name || normalizedCity,
    condition: (data.weather?.[0]?.main || 'unknown').toLowerCase(),
    description: data.weather?.[0]?.description || '',
    tempC: Math.round(data.main?.temp ?? 0),
    updatedAt: new Date().toISOString(),
    isNight,
    sunrise: sunriseUtc ? new Date(sunriseUtc * 1000).toISOString() : null,
    sunset: sunsetUtc ? new Date(sunsetUtc * 1000).toISOString() : null,
    source: 'live',
  };
}
