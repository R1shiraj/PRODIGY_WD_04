import { useState } from 'react';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4d87e9e2e67c4132a82160339240207&q=${location}`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>
      <div className="flex mb-8">
        <input
          type="text"
          className="p-4 text-gray-900 font-bold rounded-l-lg border-none outline-none"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="p-4 bg-blue-600 font-bold text-white rounded-r-lg hover:bg-blue-700"
          onClick={fetchWeather}
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-center text-gray-700 p-8 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg">
          <h2 className="text-4xl font-bold mb-4">{weather.location.name}, {weather.location.country}</h2>
          <p className="text-2xl">{weather.current.condition.text}</p>
          <p className="text-6xl font-bold">{weather.current.temp_c}°C</p>
          <div className="flex justify-around mt-4">
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
