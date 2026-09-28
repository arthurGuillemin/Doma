import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  MapPin,
  Moon,
  Sun,
} from "lucide-react";

function WeatherIcon({
  condition,
  size = 28,
}) {
  switch (condition) {
    case "sun":
      return <Sun size={size} />;

    case "moon":
      return <Moon size={size} />;

    case "partly-cloudy":
      return <CloudSun size={size} />;

    case "rain":
      return <CloudRain size={size} />;

    case "storm":
      return <CloudLightning size={size} />;

    default:
      return <Cloud size={size} />;
  }
}

function getConditionLabel(condition) {
  switch (condition) {
    case "sun":
      return "Ensoleillé";

    case "partly-cloudy":
      return "Partiellement nuageux";

    case "rain":
      return "Pluie";

    case "storm":
      return "Orage";

    default:
      return "Nuageux";
  }
}

export default function WeatherWidget({
  weather,
}) {
  return (
    <section className="weather-widget">
      <div className="weather-widget__overlay">
        <div className="weather-current">
          <div className="weather-location">
            <MapPin size={16} />
            {weather.location}
          </div>

          <div className="weather-temperature">
            <WeatherIcon
              condition={weather.condition}
              size={48}
            />

            <strong>
              {weather.temperature}°
            </strong>
          </div>

          <div className="weather-condition">
            {getConditionLabel(
              weather.condition,
            )}
          </div>

          <div className="weather-range">
            Max {weather.max}° · Min{" "}
            {weather.min}°
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-hourly">
            {weather.hourly.map((hour) => (
              <div key={hour.time}>
                <span>{hour.time}</span>

                <WeatherIcon
                  condition={hour.condition}
                />

                <strong>
                  {hour.temperature}°
                </strong>
              </div>
            ))}
          </div>

          <div className="weather-forecast">
            {weather.forecast.map(
              (day) => (
                <div key={day.day}>
                  <span>
                    {day.day}
                  </span>

                  <WeatherIcon
                    condition={
                      day.condition
                    }
                    size={22}
                  />

                  <strong>
                    {day.max}°
                  </strong>

                  <span>
                    {day.min}°
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}