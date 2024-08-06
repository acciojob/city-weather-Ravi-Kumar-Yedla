
import React, { useEffect, useState } from "react";
import axios from "axios";
import './../styles/App.css';
import { wait } from "@testing-library/react";

const API_KEY = '5ec1c68c333cf9fd48f02b945236c883'

const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        // alert('please enter a city name');
        return;
      }

      const api =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

      try {
        const response = await axios.get(api);
        setWeather(response.data);
        setError('');
        // setCity('')
      } catch (err) {
        setWeather(null);
        setError('City not found or API request failed.');
      }
    }
    fetchWeather()
  }, [city]) // it re-runs when the city changes

  

  return (
    <div>
      <input
        type="text"
        value={city}
        placeholder="Enter a city"
        onChange={(e) => setCity(e.target.value)}
      />
      {error && <p>{error}</p>}

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
            className="icon"
          />
        </div>
      )}
    </div>
  )
}

export default App
