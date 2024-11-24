import { useState } from "react";
import HourlyForecastItem from "./Components/HourlyForecastItem";
import Search from "./Components/search";
import Weather from "./Components/weather";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]); // Initialize as an empty array

  // Fetching the weather details
  async function getWeatherDetails(API_URL) {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);

      const temperature = Math.floor(data.current.temp_c); // To get rid of decimal
      const description = data.current.condition.text;
      const icon = data.current.condition.icon;

      setCurrentWeather({ temperature, description, icon }); // Update state with current weather
      
      // Check if hourly forecast data exists
      if (data.forecast && data.forecast.forecastday && data.forecast.forecastday[0].hour) {
        setHourlyForecast(data.forecast.forecastday[0].hour);
      } else {
        console.error("Hourly forecast data is missing in the API response.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main text-white rounded-2xl flex p-8 pb-0 flex-col gap-10">
      <Search getWeatherDetails={getWeatherDetails}></Search>
      <Weather
        temperature={currentWeather.temperature}
        description={currentWeather.description}
        icon={currentWeather.icon}
      ></Weather>
      <div className="hourly-forecast py-4 px-6">
        <ul className="flex gap-8 overflow-auto">
          {hourlyForecast.map((hour) => (
            <HourlyForecastItem
              key={hour.time_epoch} // Use a unique key
              time={hour.time}
              temperature={hour.temp_c}
              icon={hour.condition.icon}
              isDay={hour.is_day}
            ></HourlyForecastItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
