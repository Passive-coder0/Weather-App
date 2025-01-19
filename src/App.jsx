import { useState, useEffect } from "react";
import HourlyForecastItem from "./Components/HourlyForecastItem";
import Search from "./Components/search";
import Weather from "./Components/weather";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]); // Initially as an empty array

  const updateDarkMode = (isDay) => {
    setDarkMode(!isDay);
  };

  // Apply dark mode class to <html> when darkMode is true
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Add dark class to <html>
    } else if (!darkMode) {
      document.documentElement.classList.remove("dark"); // Remove dark class from <html>
    }
  }, [darkMode]);

  // Update dark mode based on isDay
  useEffect(() => {
    if (currentWeather.isDay !== undefined) {
      console.log(currentWeather.isDay);
      updateDarkMode(currentWeather.isDay);
    }
    else {console.log("Weather details is undefined");
    }
  }, [currentWeather]);
  
  // Fetching the weather details
  async function getWeatherDetails(API_URL) {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("API Response:", data);

      let temperature = Math.floor(data.current.temp_c);
      let description = data.current.condition.text;
      let isDay = data.current.is_day;
      console.log("IsDay:", isDay);

      // Day Vs Night icons
      let icon = isDay ? `Day/${description}.svg` : `Night/${description}.svg`;
      
      setCurrentWeather({ temperature, description, icon, isDay }); // Update state with current weather

      // Check if hourly forecast data exists then Sets it
      if (
        data.forecast &&
        data.forecast.forecastday &&
        data.forecast.forecastday[0].hour
      ) {
        setHourlyForecast(data.forecast.forecastday[0].hour);
      } else {
        console.error("Hourly forecast data is missing in the API response.");
      }

    } catch (error) {
      console.log(`An error occured: ${error}`);
    }
  }

  return (
    <div className="main bg-gradient-to-b from-sky-600 to-sky-400 text-slate-100 dark:bg-gradient-to-b dark:from-violet-700 dark:to-sky-800 rounded-2xl flex p-4 md:p-8 pb-0 flex-col gap-10">
      <Search getWeatherDetails={getWeatherDetails}></Search>
      <Weather
        temperature={currentWeather.temperature}
        description={currentWeather.description}
        icon={currentWeather.icon}
        day={currentWeather.isDay}
      ></Weather>
      {/* Shows default text instead of forecast */}
      <div className="hourly-forecast pb-4 px-3 md:px-6 ">
        <h2 className="text-2xl text-white pb-6 text-center">24-Hour Forecast</h2>
        {hourlyForecast.length === 0 ? (
          <p className="py-6 text-center text-xl">
            Enter a city name to get Hourly Forecast
          </p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default App;
