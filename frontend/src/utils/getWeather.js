export async function getWeather(city) {
  const normalizedCity = (city || '').toString().trim();
  if (!normalizedCity) {
    throw new Error('City is required to fetch weather');
  }

  const response = await fetch(`/api/weather?city=${encodeURIComponent(normalizedCity)}`, {
    cache: 'no-store',
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (err) {
    throw new Error('Failed to parse weather response');
  }

  if (!response.ok) {
    const error = payload?.error || `Weather fetch failed: ${response.status}`;
    throw new Error(error);
  }

  return payload;
}
