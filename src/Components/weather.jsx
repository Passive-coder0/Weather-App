const Weather = ({ temperature, description, icon }) => {
  return (
    <div className="weather-section">
      <div className="border-b pb-8 flex flex-col items-center gap-4 justify-center">
        <img
          src={icon ? icon : "/icons/clouds.svg"}
          alt="Weather Icon"
          className="w-28 aspect-square"
        />

        <h2 className="font-bold text-6xl flex">
          {temperature ? temperature : 22} <span className="celsius">C°</span>
        </h2>
        <p className="text-2xl">{description ? description : "Partly Cloudy"}</p>
      </div>
    </div>
  );
};

export default Weather;
