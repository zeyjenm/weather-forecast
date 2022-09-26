// get weather data of location

function getWeatherData (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',au&APPID=977c03827acf14dc26fe2e44aa4551df', {mode: 'cors',})
    .then(function(weatherData) {
        return weatherData.json();
    })
    .then(function(weatherData) {   // convert to celsius
        let currentTemp = Math.floor(weatherData.main.temp - 273.15); 
        let minTemp = Math.floor(weatherData.main.temp_min - 273.15);
        let maxTemp = Math.ceil(weatherData.main.temp_max - 273.15);
        let status = weatherData.weather[0].main;
        let description = weatherData.weather[0].description;
        let windDirection = weatherData.wind.deg;
        let windSpeed = weatherData.wind.speed;
        console.log({
            currentTemp,
            minTemp,
            maxTemp,
            status,
            description,
            windDirection,
            windSpeed
        });
    });
}



// Event listener for user location input

function getUserLocation() {
    const userLocation = document.querySelector('#city');
    const searchButton = document.querySelector('button');
    searchButton.addEventListener('click', () => {
        let userInput = userLocation.value;
        getWeatherData(userInput);
    })
}

getUserLocation();
