const Search = ({getWeatherDetails}) => {
    //Stored in .env file for security and flexibility of using in any file
    const API_KEY =import.meta.env.VITE_API_KEY;

    const handleCitySearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input")
        console.log(searchInput.value);
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}`;
        //Calls getWeatherDetails with the Url
        getWeatherDetails(API_URL);
    }
    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
      
                //Mkes an API URL using the latitude and longitude
                const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}`;
      
                // Call getWeatherDetails with the url
                getWeatherDetails(API_URL);
              },
              (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location. Please check your permissions.");
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
            alert("Geolocation is not supported by your browser.");
          }
    }
  return (
    <div className="flex justify-center gap-4">
        <form
          className="rounded-md flex gap-2 items-center border p-2 h-14 bg-white bg-opacity-5 w-full"
          action="#"
          onSubmit={handleCitySearch}
        >
          <span className="material-symbols-rounded text-white">
            Search
          </span>
          <input
            className="search-input w-full h-full bg-transparent p-4 border-white border-opacity-25 outline-none"
            type="search"
            placeholder="Enter a city name"
            required
          />
        </form>
        <button onClick={handleLocation} className="location-button">
          <span className="material-symbols-rounded border rounded-md border-opacity-10 p-4 bg-white bg-opacity-5"
          title="Your Location">
            my_location
          </span>
        </button>
      </div>
  )
}

export default Search