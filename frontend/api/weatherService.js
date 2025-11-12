const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WeatherConfigError';
    this.statusCode = 500;
  }
}

export class WeatherFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WeatherFetchError';
    this.statusCode = 502;
  }
}

export async function fetchWeatherData({ lat, lon, key }) {
  if (!lat || !lon || !key) {
    throw new WeatherConfigError('Missing WEATHER_LAT, WEATHER_LON, or WEATHER_API_KEY');
  }

  const url = `${ENDPOINT}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'portfolio-weather/1.0' },
  });

  if (!response.ok) {
    throw new WeatherFetchError('Weather fetch failed');
  }

  const data = await response.json();
  const nowUtcSeconds = Date.now() / 1000;
  const sunriseUtc = data?.sys?.sunrise ?? null;
  const sunsetUtc = data?.sys?.sunset ?? null;

  let isNight = false;
  if (typeof sunriseUtc === 'number' && typeof sunsetUtc === 'number') {
    isNight = nowUtcSeconds < sunriseUtc || nowUtcSeconds > sunsetUtc;
  }

  return {
    city: data.name,
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
