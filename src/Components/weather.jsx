const Weather = ({ temperature, description, icon, day }) => {
  // Logs if day(1) or night(0)
  console.log(day);
  
  return (
    <div className="weather-section">
      <div className="border-b pb-8 flex flex-col items-center justify-center">
        {/* Javascript is dumb sometimes... */}
        <p className="text-3xl mb-4 font-bold">{day === 0 ? "Night" : "Day"}</p>
        <img
          src={icon ? icon : "/Day/no-result.svg"}
          alt="Weather Icon"
          className="w-28 h-28 mb-4 "
        />
        <p className="text-3xl mb-4 font-bold">{description ? description : "Search for a city"}</p>
        <h2 className="text-4xl font-bold md:text-5xl flex">
          {temperature ? temperature : 22} <span className="celsius">C°</span>
        </h2>
        
      </div>
    </div>
  );
};

export default Weather;
