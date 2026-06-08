import React, { useState, useEffect } from "react";

const weatherCodeMap = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getConditionLabel = (code) => weatherCodeMap[code] || "Unknown";

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=17.38&longitude=78.48&current_weather=true&hourly=relativehumidity_2m"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const data = await response.json();
      const current = data.current_weather;
      const humidityIndex = data.hourly?.time?.indexOf(current.time);
      const humidity = humidityIndex >= 0 ? data.hourly.relativehumidity_2m[humidityIndex] : null;

      setWeather({
        ...current,
        humidity,
        condition: getConditionLabel(current.weathercode),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return <h2>Loading Weather Information...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  const tempF = (weather.temperature * 9) / 5 + 32;
  const windMs = weather.windspeed / 3.6;

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="weather-header">
          <div>
            <h1>Weather Information</h1>
            <p className="weather-location">Location: Hyderabad</p>
          </div>
          <span className="weather-condition">{weather.condition}</span>
        </div>

        <div className="weather-grid">
          <div className="weather-item">
            <span>Temperature</span>
            <strong>{weather.temperature.toFixed(1)} °C / {tempF.toFixed(1)} °F</strong>
          </div>

          <div className="weather-item">
            <span>Humidity</span>
            <strong>{weather.humidity != null ? `${weather.humidity}%` : "N/A"}</strong>
          </div>

          <div className="weather-item">
            <span>Wind Speed</span>
            <strong>{weather.windspeed.toFixed(1)} km/h · {windMs.toFixed(1)} m/s</strong>
          </div>

          <div className="weather-item">
            <span>Wind Direction</span>
            <strong>{weather.winddirection.toFixed(0)}°</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
