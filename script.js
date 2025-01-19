// OpenWeatherMap API key and base URL
const apikey = "a186fe92354d3dbcdb2a4af8d39bd8b4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements for search input, button, and weather icon
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data
async function checkWeather(city) {
    // Fetch weather data from API
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    // If city is not found, show error and hide weather details
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse JSON response
        const data = await response.json();

        // Update DOM elements with weather data
        document.querySelector(".city").innerHTML = data.name; // City name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Wind speed

        // Change weather icon based on condition
        if (data.weather[0].main == "Clouds") {
            WeatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            WeatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            WeatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            WeatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            WeatherIcon.src = "images/Thunder.png";
        }

        // Show weather details and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add event listener to search button
searchBtn.addEventListener("click", () => {
    // Call checkWeather function with input value
    checkWeather(searchBox.value);
});
