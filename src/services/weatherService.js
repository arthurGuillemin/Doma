import { APP_CONFIG } from "../config/appConfig";

async function findCity(city) {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "fr",
    format: "json",
  });

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
  );

  if (!response.ok) {
    throw new Error("Geocoding failed");
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error("City not found");
  }

  return data.results[0];
}

function getCondition(code) {
  if (code === 0) return "sun";

  if ([1, 2].includes(code)) {
    return "partly-cloudy";
  }

  if (code === 3) {
    return "cloud";
  }

  if (code >= 51 && code <= 82) {
    return "rain";
  }

  if (code >= 95) {
    return "storm";
  }

  return "cloud";
}

export async function getWeather() {
  const location =
    await findCity(APP_CONFIG.weather.city);

  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,

    current:
      "temperature_2m,weather_code",

    hourly:
      "temperature_2m,weather_code",

    daily:
      "weather_code,temperature_2m_max,temperature_2m_min",

    timezone: "auto",
    forecast_days: "4",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );

  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  const data = await response.json();

  const now = new Date();

  const hourly = data.hourly.time
    .map((time, index) => ({
      date: new Date(time),
      temperature: Math.round(
        data.hourly.temperature_2m[index],
      ),
      condition: getCondition(
        data.hourly.weather_code[index],
      ),
    }))
    .filter((hour) => hour.date > now)
    .slice(0, 5)
    .map((hour) => ({
      time: `${hour.date.getHours()}h`,
      temperature: hour.temperature,
      condition: hour.condition,
    }));

  const forecast = data.daily.time
    .slice(1, 4)
    .map((date, index) => {
      const realIndex = index + 1;

      return {
        day: new Intl.DateTimeFormat(
          "fr-FR",
          { weekday: "short" },
        ).format(new Date(date)),

        condition: getCondition(
          data.daily.weather_code[realIndex],
        ),

        max: Math.round(
          data.daily.temperature_2m_max[
            realIndex
          ],
        ),

        min: Math.round(
          data.daily.temperature_2m_min[
            realIndex
          ],
        ),
      };
    });

  return {
    location: location.name,

    temperature: Math.round(
      data.current.temperature_2m,
    ),

    condition: getCondition(
      data.current.weather_code,
    ),

    max: Math.round(
      data.daily.temperature_2m_max[0],
    ),

    min: Math.round(
      data.daily.temperature_2m_min[0],
    ),

    hourly,

    forecast,
  };
}