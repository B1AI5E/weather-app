document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("cityInput"); 
    const searchButton = document.getElementById("getWeather"); 
    const cityName = document.getElementById("cityName"); 
    const temp = document.getElementById("temperature"); 
    const humidity = document.getElementById("humidity"); 
    const uvIndex = document.getElementById("uvIndex"); 
    const windSpeed = document.getElementById("windSpeed"); 
    const toggleButton = document.getElementById("toggleTemp"); 
    const tempUnitElement = document.getElementById("tempUnit"); 
    const tempIcon = document.getElementById("tempIcon"); 
    const windIcon = document.getElementById("windIcon"); 
    const humidityIcon = document.getElementById("humidityIcon"); 
    const uvIcon = document.getElementById("uvIcon"); 

    function fetchWeatherData(city) {
        fetch("../sample.json")  
            .then(response => response.json()) // Convert the JSON into a JavaScript object
            .then(data => {
                //  Find the city weather data in the JSON file
                const cityWeather = data.find(entry => entry.cityName.toLowerCase() === city.toLowerCase());
                if (cityWeather) {
                    //  Update the display with new weather data for that city
                    if (cityName) cityName.textContent = cityWeather.cityName;
                    if (temp) temp.textContent = cityWeather.temperatureCelsius;
                    if (humidity) humidity.textContent = (cityWeather.humidity * 100).toFixed(0); // Convert decimal to percentage
                    if (uvIndex) uvIndex.textContent = cityWeather.uvIndex;
                    if (windSpeed) windSpeed.textContent = cityWeather.windSpeed;

                    //  Store weather data in localStorage (persists across pages)
                    const weatherData = {
                        cityName: cityWeather.cityName,
                        temperatureCelsius: cityWeather.temperatureCelsius,
                        humidity: cityWeather.humidity,
                        uvIndex: cityWeather.uvIndex,
                        windSpeed: cityWeather.windSpeed,
                    };
                    //  Store each value separately in localStorage
                    Object.entries(weatherData).forEach(([key, value]) => localStorage.setItem(key, value));

                    updateIconColors(cityWeather);
                } 
            })
    }

    //  When the search button is clicked, fetch the weather data for the entered city
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const city = input.value.trim(); // Remove any extra spaces
            if (city) fetchWeatherData(city); // Fetch weather data if input is not empty
        });
    }

    //  Load stored weather data on page refresh or navigation
    const storedCity = localStorage.getItem("cityName");
    if (storedCity) {
        fetchWeatherData(storedCity); // Fetch the weather data for the last searched city
    }

  
    // Updates the colour of weather icons based on the weather conditions
    function updateIconColors(cityWeather) {
        if (tempIcon) {
            let tempValue = parseFloat(cityWeather.temperatureCelsius);
            tempIcon.style.filter = tempValue >= 20 
                ? "brightness(1.3) hue-rotate(30deg)" 
                : "brightness(0.7) hue-rotate(220deg)";
        }
        if (windIcon) {
            let windValue = parseInt(cityWeather.windSpeed);
            console.log("Wind Speed:", windValue);
            windIcon.style.filter = windValue > 20 
                ? "brightness(0)"  
                : "brightness(10)"; 
        }
        if (humidityIcon) {
            let humidityValue = cityWeather.humidity * 100; // Convert to percentage
            console.log("Humidity:", humidityValue);
            humidityIcon.style.filter = humidityValue > 50 
                ? "brightness(1.1) hue-rotate(-10deg)" 
                : "brightness(0.5) grayscale(1)"; 
        }
        if (uvIcon) {
            let uvValue = parseInt(cityWeather.uvIndex);
            console.log("UV Index:", uvValue);
            uvIcon.style.filter = uvValue > 15 
                ? "brightness(1.2) hue-rotate(-40deg)" 
                : "brightness(0.8) hue-rotate(0deg)"; 
        }
    }
    // Switch between C & F (temp)
        let isCelsius = true; 
        let tempCelsius = parseFloat(localStorage.getItem("temperatureCelsius")); // Load Celsius temperature from localStorage

        toggleButton.addEventListener("click", () => {
            let tempValue = parseFloat(temp.textContent); // Get current temperature value
            isCelsius = !isCelsius; // Toggle between Celsius and Fahrenheit
            temp.textContent = isCelsius
                ? tempCelsius
                : ((tempValue * 9/5) + 32).toFixed(2);
            tempUnitElement.textContent = isCelsius ? "°C" : "°F"; // Update unit label
            toggleButton.textContent = isCelsius ? "Switch to °F" : "Switch to °C"; // Update button text
        });
});
