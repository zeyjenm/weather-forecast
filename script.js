// Output references
const currentTempOutput = document.querySelector('#current-temp');
const minTempOutput = document.querySelector('#min-temp');
const maxTempOutput = document.querySelector('#max-temp');
const weatherStatusOutput = document.querySelector('#status');
const windSpeedOutput = document.querySelector('#wind-speed');
const windDirectionOutput = document.querySelector('#wind-direction');

const backgroundImage = document.querySelector('body');

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
        let windDirection = weatherData.wind.deg;
        let windSpeed = weatherData.wind.speed;
        currentTempOutput.textContent += 'Current temperature: ' + currentTemp;
        minTempOutput.textContent += 'Low: ' + minTemp;
        maxTempOutput.textContent += 'High: ' + maxTemp;
        weatherStatusOutput.textContent += 'Current weather: ' + status;
        windSpeedOutput.textContent += 'Wind speed: ' + windSpeed + ' knots';
        windDirectionOutput.textContent += 'Wind direction: ' + windDirection + ' deg';
        return {
            currentTemp,
            minTemp,
            maxTemp,
            status,
            windDirection,
            windSpeed
        }
    })
    
    .then(function(weatherData) {
        console.log(weatherData.status);
        setBackgroundImage(weatherData.status);
    });
    
}


// Event listener for user location input

function getUserLocation () {
    const userLocation = document.querySelector('#city');
    const searchButton = document.querySelector('button');
    searchButton.addEventListener('click', () => {
        //clear previous search
        currentTempOutput.textContent = '';
        minTempOutput.textContent = '';
        maxTempOutput.textContent = '';
        weatherStatusOutput.textContent = '';
        windSpeedOutput.textContent = '';
        windDirectionOutput.textContent = '';
        let userInput = userLocation.value;
        getWeatherData(userInput);
});
}

getUserLocation();

function setBackgroundImage (status) {
    if (status == 'Clouds') {
        backgroundImage.style.backgroundImage = 'url("background_images/clouds.jpg")';
    }
    else if (status == 'Rain') {
        backgroundImage.style.backgroundImage = 'url("background_images/rain.jpg")';
    }
    else if (status == 'Clear') {
        backgroundImage.style.backgroundImage = 'url("background_images/clear.jpg")';
    }
}