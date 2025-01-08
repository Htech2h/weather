import { useState, useEffect } from 'react';
import SearchBar from './components/search';
import Display from './components/display';
import './App.css';

function App() {
  const [city, setCity] = useState('johannesburg'); // Default city
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator

  // Fetch weather data
  const fetchWeather = (city, apiKey = "bbd419e79f1eaded21e42ed2be05d29e") => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.main) {
          setWeatherData({
            name: data.name,
            pressure: data.main.pressure,
            feels_like: data.main.feels_like,  
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            temp: data.main.temp,
            humidity: data.main.humidity,
            speed: data.wind.speed,
          });
        } else {
          setWeatherData(null); // If the data structure is not as expected
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false); // Set loading to false even on error
      });
  };

  // Effect to fetch weather when city changes
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching new data
    fetchWeather(city);
  }, [city]); // This effect runs when the `city` state changes

  return (
    <div className="App">
      <h1>Weather</h1>
      <SearchBar changeCity={setCity} /> {/* Pass setCity to SearchBar */}

      {/* Show loading message while fetching data */}
      {loading ? (
        <p>Loading weather data...</p>
      ) : weatherData ? (
        <Display data={weatherData} /> // Pass weatherData to Display only if it's available
      ) : (
        <p>Could not fetch weather data for <b>{city}</b>. Please try again.</p> // Error message if no data
      )}
    </div>
  );
}

export default App;

