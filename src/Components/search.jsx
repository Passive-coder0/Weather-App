const Search = ({ getWeatherDetails }) => {
  //Stored in .env file for security and flexibility of using in any file
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input");
    console.log(searchInput.value);
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}`;
    //Calls getWeatherDetails with the Url
    getWeatherDetails(API_URL);
  };
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          //Makes an API URL using the latitude and longitude
          const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}`;
          console.log(`Latitude: ${latitude} , Longitude: ${longitude}`);

          // Call getWeatherDetails with the url
          getWeatherDetails(API_URL);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please check your permissions."
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  };
  return (
    <div className="flex justify-center gap-4">
      <form
        className="rounded-md flex gap-2 items-center border p-2 h-13 bg-white bg-opacity-5 w-60 lg:w-full"
        action="#"
        onSubmit={handleCitySearch}
      >
        {/*This Is Awesome, Text Icons!!! */}
        <span className="material-symbols-rounded text-white">Search</span>
        <input
          className="search-input w-full h-full bg-transparent px-2 md:px-4 text-lg border-white border-opacity-25 outline-none placeholder:text-slate-50"
          type="search"
          placeholder="Enter a city name"
          required
        />
      </form>
      {/*This Is Awesome, Text Icons!!! */}
      <button onClick={handleLocation} className="location-button group">
        <span
          className="material-symbols-rounded border rounded-md border-opacity-10 p-2 md:p-4 bg-white bg-opacity-5 group-hover:bg-opacity-10 group-hover:scale-105 transition-all duration-300"
          title="Your Location"
        >
          my_location
        </span>
      </button>
    </div>
  );
};

export default Search;
