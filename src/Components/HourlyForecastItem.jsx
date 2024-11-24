const HourlyForecastItem = ({ time, temperature, icon, isDay }) => {
  return (
    <li className="hourly-forecast-item flex flex-col items-center">
      <p className="text-sm">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <img
        src={icon}
        alt="Weather Icon"
        className="w-12 h-12"
      />
      <p className="text-lg">{temperature ? temperature : "20"}°C</p>
      <p className="text-xs">{isDay ? "Day" : "Night"}</p>
    </li>
  );
};

export default HourlyForecastItem;